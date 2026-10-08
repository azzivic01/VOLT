import { siteContent } from './content';
import { MotionProvider } from './context/MotionContext';
import { useSoundAmbient } from './hooks/useSoundAmbient';
import { MenuNav } from './components/ui/MenuNav';
import { Hero } from './sections/Hero';
import { Capitulos } from './sections/Capitulos';
import { Servicos } from './sections/Servicos';
import { Galeria } from './sections/Galeria';
import { Visite } from './sections/Visite';
import { Faq } from './sections/Faq';
import { CtaFinal } from './sections/CtaFinal';
import { UiKit } from './sections/UiKit';
import { Rodape } from './sections/Rodape';

function AppContent() {
  const { isPlaying, toggleSound } = useSoundAmbient(siteContent.header.sound.audioSrc);

  return (
    <div className="min-h-screen bg-[var(--tema-color-bg)] text-[var(--tema-color-text)] flex flex-col selection:bg-[var(--tema-color-accent)] selection:text-[var(--tema-color-on-accent)]">
      {/* Accessible skip link */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--tema-color-accent)] focus:text-[var(--tema-color-on-accent)] focus:font-bold focus:shadow-xl"
      >
        Pular para o conteúdo principal
      </a>

      {/* 1. Header Fixo com navegação, ação primária e som */}
      {siteContent.header.enabled && (
        <MenuNav
          brandName={siteContent.brand.name}
          navItems={siteContent.header.nav}
          primaryAction={siteContent.header.primaryAction}
          sound={siteContent.header.sound}
          isSoundPlaying={isPlaying}
          onToggleSound={toggleSound}
        />
      )}

      {/* Main Landmark */}
      <main id="conteudo" className="flex-1">
        {/* 2. Hero */}
        <Hero content={siteContent.hero} />

        {/* 3. Capítulos */}
        <Capitulos content={siteContent.capitulos} intro={siteContent.intro} />

        {/* 4. Serviços */}
        <Servicos content={siteContent.servicos} />

        {/* 5. Galeria */}
        <Galeria content={siteContent.galeria} />

        {/* 6. Visite */}
        <Visite content={siteContent.visite} />

        {/* 7. FAQ */}
        <Faq content={siteContent.faq} />

        {/* 8. CTA Final */}
        <CtaFinal content={siteContent.ctaFinal} />

        {/* 9. Laboratório de Componentes (UiKit) */}
        <UiKit />
      </main>

      {/* 10. Rodapé com botão de movimento reduzido */}
      <Rodape content={siteContent.rodape} brand={siteContent.brand} />
    </div>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <AppContent />
    </MotionProvider>
  );
}
