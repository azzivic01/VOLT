import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { SiteContent } from '../content';
import { Button } from '../components/ui/Button';
import { InputText } from '../components/ui/InputText';
import { Select } from '../components/ui/Select';
import { useMotionPreference } from '../context/MotionContext';

export interface VisiteProps {
  content: SiteContent['visite'];
}

export const Visite: React.FC<VisiteProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [preferredShift, setPreferredShift] = useState('manha');

  if (!content.enabled) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="visite"
      className="py-24 md:py-32 border-b border-[var(--tema-color-border)] bg-[var(--tema-color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Information Panel */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden mb-2">
              <motion.span
                initial={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: 'var(--tema-font-label)' }}
                className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase"
              >
                {content.kicker}
              </motion.span>
            </div>

            <motion.h2
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--tema-font-display)' }}
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--tema-color-text)]"
            >
              {content.title}
            </motion.h2>

            <p
              style={{ fontFamily: 'var(--tema-font-body)' }}
              className="mt-6 text-base text-[var(--tema-color-text-muted)] leading-relaxed"
            >
              {content.note}
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div
                style={{
                  borderRadius: 'var(--tema-radius)',
                  backgroundColor: 'var(--tema-color-surface)',
                  borderColor: 'var(--tema-color-border)',
                }}
                className="flex items-start gap-4 p-4 border"
              >
                <div className="p-2.5 rounded bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] text-[var(--tema-color-accent-ink)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span
                    style={{ fontFamily: 'var(--tema-font-label)' }}
                    className="text-xs font-bold tracking-wider uppercase text-[var(--tema-color-text-muted)] block"
                  >
                    Endereço
                  </span>
                  <span
                    style={{ fontFamily: 'var(--tema-font-body)' }}
                    className="text-sm font-semibold text-[var(--tema-color-text)] mt-0.5 block"
                  >
                    {content.address}
                  </span>
                </div>
              </div>

              <div
                style={{
                  borderRadius: 'var(--tema-radius)',
                  backgroundColor: 'var(--tema-color-surface)',
                  borderColor: 'var(--tema-color-border)',
                }}
                className="flex items-start gap-4 p-4 border"
              >
                <div className="p-2.5 rounded bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] text-[var(--tema-color-accent-ink)]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span
                    style={{ fontFamily: 'var(--tema-font-label)' }}
                    className="text-xs font-bold tracking-wider uppercase text-[var(--tema-color-text-muted)] block"
                  >
                    Horários
                  </span>
                  <span
                    style={{ fontFamily: 'var(--tema-font-body)' }}
                    className="text-sm font-semibold text-[var(--tema-color-text)] mt-0.5 block"
                  >
                    {content.hours}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  style={{
                    borderRadius: 'var(--tema-radius)',
                    backgroundColor: 'var(--tema-color-surface)',
                    borderColor: 'var(--tema-color-border)',
                  }}
                  className="flex items-center gap-3 p-3.5 border"
                >
                  <Phone className="w-4 h-4 text-[var(--tema-color-accent-ink)] shrink-0" />
                  <span className="text-xs font-mono text-[var(--tema-color-text)] truncate">
                    {content.phone}
                  </span>
                </div>

                <div
                  style={{
                    borderRadius: 'var(--tema-radius)',
                    backgroundColor: 'var(--tema-color-surface)',
                    borderColor: 'var(--tema-color-border)',
                  }}
                  className="flex items-center gap-3 p-3.5 border"
                >
                  <Mail className="w-4 h-4 text-[var(--tema-color-accent-ink)] shrink-0" />
                  <span className="text-xs font-mono text-[var(--tema-color-text)] truncate">
                    {content.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Scheduling Simulation Card */}
          <div className="lg:col-span-7">
            <div
              style={{
                borderRadius: 'var(--tema-radius-lg)',
                backgroundColor: 'var(--tema-color-surface)',
                borderColor: 'var(--tema-color-border)',
              }}
              className="p-8 md:p-10 border shadow-2xl relative overflow-hidden"
            >
              <div className="mb-6">
                <span
                  style={{ fontFamily: 'var(--tema-font-label)' }}
                  className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase"
                >
                  PRÉ-RESERVA DE BATERIA
                </span>
                <h3
                  style={{ fontFamily: 'var(--tema-font-display)' }}
                  className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--tema-color-text)] mt-1"
                >
                  ESCOLHA SEU TURNO
                </h3>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--tema-color-accent)]/20 text-[var(--tema-color-accent)] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4
                    style={{ fontFamily: 'var(--tema-font-display)' }}
                    className="text-2xl font-bold uppercase text-[var(--tema-color-text)]"
                  >
                    SOLICITAÇÃO RECEBIDA
                  </h4>
                  <p
                    style={{ fontFamily: 'var(--tema-font-body)' }}
                    className="text-sm text-[var(--tema-color-text-muted)] mt-2 max-w-sm"
                  >
                    A equipe entrará em contato via WhatsApp com os horários disponíveis na pista para o turno selecionado.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Nova solicitação
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <InputText
                    label="Nome do Atleta"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <InputText
                    label="Telefone / WhatsApp"
                    placeholder="[DDD] 90000-0000"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    required
                  />

                  <Select
                    label="Turno Desejado"
                    value={preferredShift}
                    onChange={(e) => setPreferredShift(e.target.value)}
                    options={[
                      { value: 'manha', label: 'Manhã (06h às 10h)' },
                      { value: 'almoco', label: 'Almoço (11h às 14h)' },
                      { value: 'tarde', label: 'Tarde / Noite (17h às 21h)' },
                      { value: 'sabado', label: 'Sábados (08h às 12h)' },
                    ]}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      {content.ctaAction.label}
                    </Button>
                    <p className="text-[11px] text-[var(--tema-color-text-muted)] mt-2 text-center">
                      Sem taxa de matrícula imediata. Sessão sujeita a disponibilidade da grade.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
