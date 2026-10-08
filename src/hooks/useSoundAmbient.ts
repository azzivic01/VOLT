import { useState, useRef, useEffect, useCallback } from 'react';

export function useSoundAmbient(audioSrc?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<Array<AudioNode>>([]);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = useCallback(() => {
    if (audioSrc && audioElemRef.current) {
      const el = audioElemRef.current;
      // Fade out
      let vol = el.volume;
      const fadeOut = setInterval(() => {
        vol = Math.max(0, vol - 0.1);
        el.volume = vol;
        if (vol <= 0.01) {
          clearInterval(fadeOut);
          el.pause();
          setIsPlaying(false);
        }
      }, 100);
      return;
    }

    if (audioContextRef.current && masterGainRef.current) {
      const ctx = audioContextRef.current;
      const gain = masterGainRef.current;
      const now = ctx.currentTime;
      // 1-second fade-out
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 1.0);

      setTimeout(() => {
        nodesRef.current.forEach((node) => {
          try {
            if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
              (node as AudioScheduledSourceNode).stop();
            }
            node.disconnect();
          } catch {
            // Ignore if already disconnected
          }
        });
        nodesRef.current = [];
        setIsPlaying(false);
      }, 1050);
    } else {
      setIsPlaying(false);
    }
  }, [audioSrc]);

  const startAudio = useCallback(() => {
    if (audioSrc) {
      if (!audioElemRef.current) {
        audioElemRef.current = new Audio(audioSrc);
        audioElemRef.current.loop = true;
      }
      const el = audioElemRef.current;
      el.volume = 0;
      el.play()
        .then(() => {
          setIsPlaying(true);
          let vol = 0;
          const fadeIn = setInterval(() => {
            vol = Math.min(0.2, vol + 0.02);
            el.volume = vol;
            if (vol >= 0.2) clearInterval(fadeIn);
          }, 100);
        })
        .catch(() => {
          setIsPlaying(false);
        });
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Master Gain set to 0 initially for fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Lowpass filter at 300 Hz
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(300, ctx.currentTime);
      lowpass.Q.setValueAtTime(1.0, ctx.currentTime);

      // Tremolo: 2 Hz LFO
      const tremoloGain = ctx.createGain();
      tremoloGain.gain.setValueAtTime(0.04, ctx.currentTime);

      const tremoloLFO = ctx.createOscillator();
      tremoloLFO.type = 'sine';
      tremoloLFO.frequency.setValueAtTime(2.0, ctx.currentTime);

      const tremoloDepth = ctx.createGain();
      tremoloDepth.gain.setValueAtTime(0.015, ctx.currentTime);

      tremoloLFO.connect(tremoloDepth);
      tremoloDepth.connect(tremoloGain.gain);

      // Osc 1: Sine at 55 Hz
      const oscSine = ctx.createOscillator();
      oscSine.type = 'sine';
      oscSine.frequency.setValueAtTime(55, ctx.currentTime);

      // Osc 2: Triangle at 110 Hz
      const oscTri = ctx.createOscillator();
      oscTri.type = 'triangle';
      oscTri.frequency.setValueAtTime(110, ctx.currentTime);

      // Connect oscillators to lowpass filter
      oscSine.connect(lowpass);
      oscTri.connect(lowpass);

      // Connect lowpass to tremoloGain, then to masterGain
      lowpass.connect(tremoloGain);
      tremoloGain.connect(masterGain);

      const now = ctx.currentTime;
      oscSine.start(now);
      oscTri.start(now);
      tremoloLFO.start(now);

      // 1-second fade-in to 0.04
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.04, now + 1.0);

      nodesRef.current = [oscSine, oscTri, tremoloLFO, tremoloDepth, tremoloGain, lowpass];
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [audioSrc]);

  const toggleSound = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }, [isPlaying, startAudio, stopAudio]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return { isPlaying, toggleSound };
}
