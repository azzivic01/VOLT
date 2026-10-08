/**
 * Conteúdo central do site VOLT.
 * Único arquivo com textos e caminhos de mídia da aplicação.
 * Nenhum fato verificável inventado; marcadores entre colchetes onde aplicável.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SoundConfig {
  labelOn: string;
  labelOff: string;
  audioSrc?: string;
}

export interface ActionLink {
  label: string;
  href: string;
}

export interface CapituloItem {
  enabled: boolean;
  id: string;
  number: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  alt: string;
}

export interface ServicoItem {
  enabled: boolean;
  id: string;
  title: string;
  kicker: string;
  description: string;
  badge: string;
  image: string;
  alt: string;
}

export interface GaleriaItem {
  enabled: boolean;
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export interface FaqItem {
  enabled: boolean;
  id: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  brand: {
    enabled: boolean;
    name: string;
    kicker: string;
    tagline: string;
  };
  header: {
    enabled: boolean;
    nav: NavItem[];
    primaryAction: ActionLink;
    sound: SoundConfig;
  };
  intro: {
    enabled: boolean;
    kicker: string;
    text: string;
  };
  hero: {
    enabled: boolean;
    kicker: string;
    title: {
      leadingText: string;
      highlightedWord: string;
      trailingText: string;
    };
    description: string;
    primaryAction: ActionLink;
    secondaryAction: ActionLink;
    metadataNote: string;
    image: string;
    mobileImage: string;
  };
  capitulos: CapituloItem[];
  servicos: ServicoItem[];
  galeria: GaleriaItem[];
  visite: {
    enabled: boolean;
    title: string;
    kicker: string;
    address: string;
    hours: string;
    phone: string;
    email: string;
    note: string;
    ctaAction: ActionLink;
  };
  depoimentos: {
    enabled: boolean;
    items: Array<{
      quote: string;
      author: string;
      role: string;
    }>;
  };
  faq: FaqItem[];
  ctaFinal: {
    enabled: boolean;
    kicker: string;
    title: string;
    description: string;
    primaryAction: ActionLink;
    secondaryAction: ActionLink;
  };
  rodape: {
    enabled: boolean;
    copyright: string;
    links: NavItem[];
    reducedMotionLabel: string;
    normalMotionLabel: string;
  };
}

export const siteContent: SiteContent = {
  brand: {
    enabled: true,
    name: "VOLT",
    kicker: "ESTÚDIO DE CONDICIONAMENTO",
    tagline: "Treino funcional e condicionamento de impacto sobre concreto e aço.",
  },
  header: {
    enabled: true,
    nav: [
      { label: "Capítulos", href: "#capitulos" },
      { label: "Serviços", href: "#servicos" },
      { label: "Galeria", href: "#galeria" },
      { label: "Visite", href: "#visite" },
      { label: "FAQ", href: "#faq" },
      { label: "Laboratório", href: "#uikit" },
    ],
    primaryAction: {
      label: "Agendar sessão",
      href: "#visite",
    },
    sound: {
      labelOn: "Desligar som",
      labelOff: "Ligar som",
      audioSrc: "", // Vazio aciona o sintetizador sonoro analógico via Web Audio
    },
  },
  intro: {
    enabled: true,
    kicker: "PULSO & RIGOR",
    text: "Um piso industrial, barras recartilhadas e baterias cronometradas. O treino existe para construir capacidade real de movimento sem firula.",
  },
  hero: {
    enabled: true,
    kicker: "CONDICIONAMENTO DE IMPACTO",
    title: {
      leadingText: "FORÇA REAL.",
      highlightedWord: "VELOCIDADE",
      trailingText: "CRUA.",
    },
    description: "Treino funcional de alta intensidade sobre concreto e aço. Sem distrações decorativas, sem promessas vazias.",
    primaryAction: {
      label: "Ver horários",
      href: "#visite",
    },
    secondaryAction: {
      label: "Conhecer método",
      href: "#capitulos",
    },
    metadataNote: "[GRADE DE SESSÕES · ZONA SUL]",
    image: "/src/assets/images/hero.jpg",
    mobileImage: "/src/assets/images/hero.jpg",
  },
  capitulos: [
    {
      enabled: true,
      id: "chegar",
      number: "01",
      title: "CHEGAR",
      kicker: "TRANSIÇÃO DE ESTADO",
      description: "O ruído da cidade fica no portão. Troca rápida, calçado firme no chão e foco alinhado antes da contagem regressiva.",
      image: "/src/assets/images/chegar.jpg",
      alt: "Calçado esportivo sobre piso de concreto escuro com luz lateral",
    },
    {
      enabled: true,
      id: "aquecer",
      number: "02",
      title: "AQUECER",
      kicker: "MOBILIDADE & ATIVAÇÃO",
      description: "Elevação deliberada de temperatura corporal. Cordas náuticas, mobilidade escapular e ativação de cadeia posterior.",
      image: "/src/assets/images/aquecer.jpg",
      alt: "Cordas de treino naval pretas enroladas sobre piso de borracha",
    },
    {
      enabled: true,
      id: "empurrar",
      number: "03",
      title: "EMPURRAR",
      kicker: "INTENSIDADE & CARGA",
      description: "O bloco central de trabalho. Séries densas, transições curtas e potência constante até o cronômetro zerar.",
      image: "/src/assets/images/empurrar.jpg",
      alt: "Anilhas de ferro fundido montadas em barra de aço",
    },
    {
      enabled: true,
      id: "recuperar",
      number: "04",
      title: "RECUPERAR",
      kicker: "DESACELERAÇÃO",
      description: "Controle da respiração diafragmática e liberação miofascial. Preparação do corpo para o próximo estímulo.",
      image: "/src/assets/images/recuperar.jpg",
      alt: "Caixa de magnésio em pó branco com iluminação de alto contraste",
    },
  ],
  servicos: [
    {
      enabled: true,
      id: "grupo",
      kicker: "COLETIVO",
      title: "Treino em Grupo",
      description: "Turmas reduzidas de até 8 atletas por bateria. Trabalho coordenado com cordas, kettlebells e ritmo constante.",
      badge: "ATÉ 8 ATLETAS",
      image: "/src/assets/images/servico_grupo.jpg",
      alt: "Fileira de kettlebells de ferro sobre chão escuro",
    },
    {
      enabled: true,
      id: "individual",
      kicker: "INDIVIDUAL",
      title: "Treino Individual",
      description: "Periodização sob medida com foco na mecânica de levantamento e condicionamento cardiovascular específico.",
      badge: "1 ATLETA : 1 TREINADOR",
      image: "/src/assets/images/servico_individual.jpg",
      alt: "Cronômetro digital de treino sobre chão de concreto",
    },
    {
      enabled: true,
      id: "avaliacao",
      kicker: "MÉTRICA",
      title: "Avaliação de Movimento",
      description: "Mapeamento neuromuscular e biomecânico antes da primeira carga. Ajuste fino de postura, mobilidade articular e potência.",
      badge: "SESSÃO INICIAL",
      image: "/src/assets/images/empurrar.jpg",
      alt: "Equipamentos de musculação e anilhas de treino",
    },
  ],
  galeria: [
    {
      enabled: true,
      id: "g1",
      title: "Barra e Magnésio",
      category: "CARGA",
      image: "/src/assets/images/hero.jpg",
      alt: "Mãos cobertas com magnésio segurando barra de aço",
    },
    {
      enabled: true,
      id: "g2",
      title: "Piso de Treino",
      category: "BASE",
      image: "/src/assets/images/chegar.jpg",
      alt: "Calçado esportivo sobre concreto rústico",
    },
    {
      enabled: true,
      id: "g3",
      title: "Cordas de Batalha",
      category: "VELOCIDADE",
      image: "/src/assets/images/aquecer.jpg",
      alt: "Cordas náuticas pretas sobre borracha",
    },
    {
      enabled: true,
      id: "g4",
      title: "Ferro e Anilhas",
      category: "FORÇA",
      image: "/src/assets/images/empurrar.jpg",
      alt: "Anilhas de ferro fundido com textura fosca",
    },
    {
      enabled: true,
      id: "g5",
      title: "Blocos de Magnésio",
      category: "ADERÊNCIA",
      image: "/src/assets/images/recuperar.jpg",
      alt: "Pó de giz e magnésio em caixa escura",
    },
    {
      enabled: true,
      id: "g6",
      title: "Kettlebells Alinhados",
      category: "POTÊNCIA",
      image: "/src/assets/images/servico_grupo.jpg",
      alt: "Kettlebells alinhados sob iluminação lateral",
    },
  ],
  visite: {
    enabled: true,
    title: "O ESTÚDIO",
    kicker: "LOCALIZAÇÃO & ROTINA",
    address: "[endereço da unidade]",
    hours: "[horário de funcionamento]",
    phone: "[telefone de contato]",
    email: "[contato@volt.exemplo]",
    note: "Sessões agendadas previamente para controle rigoroso de fluxo na pista de treino.",
    ctaAction: {
      label: "Solicitar horário",
      href: "#contato",
    },
  },
  depoimentos: {
    enabled: false,
    items: [],
  },
  faq: [
    {
      enabled: true,
      id: "q1",
      question: "Como funciona a aula experimental?",
      answer: "A primeira sessão inclui avaliação inicial de mobilidade articular e um bloco adaptado com duração de [duração da sessão]. Agendamento prévio obrigatório.",
    },
    {
      enabled: true,
      id: "q2",
      question: "Preciso de condicionamento prévio para treinar?",
      answer: "Não. As cargas, amplitudes e intervalos de descanso são calibrados individualmente pelos treinadores, independentemente do seu ponto de partida.",
    },
    {
      enabled: true,
      id: "q3",
      question: "O que devo vestir e levar para o estúdio?",
      answer: "Tênis com sola plana para estabilidade no solo, roupas leves e elásticas para movimentação ampla, além de garrafa individual de água.",
    },
    {
      enabled: true,
      id: "q4",
      question: "Como funcionam os horários e as baterias?",
      answer: "As baterias iniciam a cada [intervalo entre baterias], entre [horário de início] e [horário de término]. Recomendamos chegar com 10 minutos de antecedência.",
    },
    {
      enabled: true,
      id: "q5",
      question: "Qual é a política de cancelamento ou reagendamento?",
      answer: "Cancelamentos ou reagendamentos podem ser realizados com até [prazo de cancelamento] de antecedência sem desconto da sessão contratada.",
    },
  ],
  ctaFinal: {
    enabled: true,
    kicker: "PRÓXIMA BATERIA",
    title: "SUA PRIMEIRA SESSÃO COMEÇA NO CHÃO.",
    description: "Sem burocracia, sem termos complexos. Venha conhecer o espaço, pisar no concreto e sentir o ritmo do estúdio.",
    primaryAction: {
      label: "Reservar vaga",
      href: "#visite",
    },
    secondaryAction: {
      label: "Conversar via WhatsApp",
      href: "#visite",
    },
  },
  rodape: {
    enabled: true,
    copyright: "© VOLT. Todos os direitos reservados. Marca fictícia para demonstração.",
    links: [
      { label: "Capítulos", href: "#capitulos" },
      { label: "Serviços", href: "#servicos" },
      { label: "Galeria", href: "#galeria" },
      { label: "Visite", href: "#visite" },
      { label: "FAQ", href: "#faq" },
      { label: "Kit de UI", href: "#uikit" },
    ],
    reducedMotionLabel: "Reduzir animações",
    normalMotionLabel: "Ativar animações",
  },
};
