import React, { useState } from 'react';
import { ArrowRight, Sparkles, Heart, Bell, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import { LinkAnimado } from '../components/ui/LinkAnimado';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';
import { Tabs } from '../components/ui/Tabs';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { InputText } from '../components/ui/InputText';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { Radio } from '../components/ui/Radio';
import { Toggle } from '../components/ui/Toggle';
import { Tooltip } from '../components/ui/Tooltip';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Divisor } from '../components/ui/Divisor';

export const UiKit: React.FC = () => {
  const [activeTab, setActiveTab] = useState('botoes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toggleState, setToggleState] = useState(true);
  const [radioState, setRadioState] = useState('opcao-a');
  const [checkboxState, setCheckboxState] = useState(true);

  return (
    <section
      id="uikit"
      className="py-24 md:py-36 border-b border-[var(--tema-color-border)] bg-[var(--tema-color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-14 border-b border-[var(--tema-color-border)] pb-8">
          <span
            style={{ fontFamily: 'var(--tema-font-label)' }}
            className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase block mb-2"
          >
            SISTEMA DE DESIGN & COMPONENTES
          </span>
          <h2
            style={{ fontFamily: 'var(--tema-font-display)' }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--tema-color-text)]"
          >
            LABORATÓRIO DE COMPONENTES
          </h2>
          <p
            style={{ fontFamily: 'var(--tema-font-body)' }}
            className="mt-3 text-base text-[var(--tema-color-text-muted)] max-w-3xl"
          >
            Vitrine do kit de UI isolado do tema VOLT. Todos os componentes respeitam as variáveis CSS, tamanhos mínimos de toque de 44px, contraste WCAG AA e estados acessíveis.
          </p>

          {/* Category Tabs for easier navigation in the lab */}
          <div className="mt-8">
            <Tabs
              activeId={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: 'botoes', label: 'Botões & Links' },
                { id: 'formularios', label: 'Formulários & Seleção' },
                { id: 'cards-dialogos', label: 'Cards, Modais & Menus' },
                { id: 'indicadores', label: 'Feedback & Indicadores' },
              ]}
            />
          </div>
        </div>

        {/* 1. BUTTONS, ICONS & LINKS */}
        {(activeTab === 'botoes' || activeTab === 'todos') && (
          <div className="space-y-16">
            <div>
              <h3
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-2xl font-bold uppercase text-[var(--tema-color-accent-ink)] mb-6 flex items-center gap-3"
              >
                <span>01. Botões (Button) — Variantes & Estados</span>
                <span className="h-px flex-1 bg-[var(--tema-color-border)]" />
              </h3>

              {/* Grid of states */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6 rounded border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]">
                {/* Normal */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)]">ESTADO: NORMAL</span>
                  <Button variant="primary" size="md">Primário</Button>
                  <Button variant="secondary" size="md">Secundário</Button>
                  <Button variant="ghost" size="md">Fantasma</Button>
                </div>

                {/* Forced Hover */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)]">ESTADO: HOVER FORÇADO</span>
                  <Button variant="primary" size="md" forceHover>Primário Hover</Button>
                  <Button variant="secondary" size="md" forceHover>Secundário Hover</Button>
                  <Button variant="ghost" size="md" forceHover>Fantasma Hover</Button>
                </div>

                {/* Forced Focus */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)]">ESTADO: FOCO VISÍVEL</span>
                  <Button variant="primary" size="md" forceFocus>Primário Foco</Button>
                  <Button variant="secondary" size="md" forceFocus>Secundário Foco</Button>
                  <Button variant="ghost" size="md" forceFocus>Fantasma Foco</Button>
                </div>

                {/* Disabled */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)]">ESTADO: DESATIVADO</span>
                  <Button variant="primary" size="md" disabled>Desativado</Button>
                  <Button variant="secondary" size="md" disabled>Desativado</Button>
                  <Button variant="ghost" size="md" disabled>Desativado</Button>
                </div>

                {/* Loading */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)]">ESTADO: CARREGANDO</span>
                  <Button variant="primary" size="md" loading>Salvando</Button>
                  <Button variant="secondary" size="md" loading>Carregando</Button>
                  <Button variant="ghost" size="md" loading>Processando</Button>
                </div>
              </div>

              {/* Button Sizes & Magnetic */}
              <div className="mt-8 p-6 rounded border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)] flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-2">TAMANHOS (P, M, G)</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" size="sm">Tamanho P</Button>
                    <Button variant="primary" size="md">Tamanho M</Button>
                    <Button variant="primary" size="lg">Tamanho G</Button>
                  </div>
                </div>

                <div className="border-l border-[var(--tema-color-border)] pl-6">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-2">COM ÍCONES / MAGNÉTICO</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" magnetic rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Magnético + Seta
                    </Button>
                    <Button variant="secondary" leftIcon={<Sparkles className="w-4 h-4 text-[var(--tema-color-accent-ink)]" />}>
                      Ícone Esquerdo
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* IconButton & LinkAnimado & Badge */}
            <div>
              <h3
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-2xl font-bold uppercase text-[var(--tema-color-accent-ink)] mb-6 flex items-center gap-3"
              >
                <span>02. IconButton, Links Animados & Badges</span>
                <span className="h-px flex-1 bg-[var(--tema-color-border)]" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]">
                {/* IconButton */}
                <div>
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-3">ICON BUTTON (&gt;= 44x44px)</span>
                  <div className="flex items-center gap-3">
                    <IconButton label="Curtir treino" variant="primary">
                      <Heart className="w-5 h-5" />
                    </IconButton>
                    <IconButton label="Notificações" variant="secondary" forceHover>
                      <Bell className="w-5 h-5" />
                    </IconButton>
                    <IconButton label="Abrir link" variant="ghost" forceFocus>
                      <ExternalLink className="w-5 h-5" />
                    </IconButton>
                    <IconButton label="Desativado" variant="secondary" disabled>
                      <Bell className="w-5 h-5" />
                    </IconButton>
                  </div>
                </div>

                {/* LinkAnimado */}
                <div>
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-3">LINK ANIMADO COM SUBLINHADO</span>
                  <div className="flex flex-col gap-2">
                    <LinkAnimado href="#uikit">Link padrão normal</LinkAnimado>
                    <LinkAnimado href="#uikit" forceHover accent>Link acentuado (hover forçado)</LinkAnimado>
                    <LinkAnimado href="#uikit" forceFocus>Link com foco visível</LinkAnimado>
                  </div>
                </div>

                {/* Badge */}
                <div>
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-3">BADGES / RÓTULOS (ZERO-PILL)</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent">Destaque</Badge>
                    <Badge variant="outline">Contorno</Badge>
                    <Badge variant="subtle">Neutro</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FORMS & INPUTS */}
        {(activeTab === 'formularios' || activeTab === 'todos') && (
          <div className="space-y-16">
            <div>
              <h3
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-2xl font-bold uppercase text-[var(--tema-color-accent-ink)] mb-6 flex items-center gap-3"
              >
                <span>03. Controles de Entrada (Inputs & Textareas)</span>
                <span className="h-px flex-1 bg-[var(--tema-color-border)]" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]">
                <InputText label="Input Normal" placeholder="Digite seu texto..." defaultValue="Texto padrão" />
                <InputText label="Input Foco Forçado" defaultValue="Texto focado" forceFocus />
                <InputText label="Input com Erro" defaultValue="Formato inválido" error="Informe um e-mail válido com @" />
                <InputText label="Input Desativado" defaultValue="Campo bloqueado" disabled />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-6 rounded border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]">
                <Textarea label="Textarea Normal" placeholder="Instruções ou notas do treino..." rows={3} />
                <Textarea label="Textarea com Foco" defaultValue="Observação biomecânica detalhada" rows={3} forceFocus />
                <Textarea label="Textarea com Erro" defaultValue="Texto curto demais" error="A mensagem precisa conter no mínimo 20 caracteres." rows={3} />
              </div>
            </div>

            <div>
              <h3
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-2xl font-bold uppercase text-[var(--tema-color-accent-ink)] mb-6 flex items-center gap-3"
              >
                <span>04. Seleção (Select, Checkbox, Radio & Toggle)</span>
                <span className="h-px flex-1 bg-[var(--tema-color-border)]" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 rounded border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]">
                {/* Select */}
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block">SELECT</span>
                  <Select
                    label="Opção de Carga"
                    defaultValue="barra"
                    options={[
                      { value: 'barra', label: 'Barra Olímpica' },
                      { value: 'kettlebell', label: 'Kettlebells' },
                      { value: 'peso-corporal', label: 'Peso Corporal' },
                    ]}
                  />
                  <Select
                    label="Select com Erro"
                    defaultValue=""
                    error="Selecione ao menos um item"
                    options={[
                      { value: '', label: 'Selecione uma opção...' },
                      { value: '1', label: 'Opção 1' },
                    ]}
                  />
                </div>

                {/* Checkbox */}
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block">CHECKBOX</span>
                  <Checkbox
                    label="Aceito os termos da pista"
                    helperText="Termo de responsabilidade física"
                    checked={checkboxState}
                    onChange={(e) => setCheckboxState(e.target.checked)}
                  />
                  <Checkbox label="Opção marcada forçada" forceChecked />
                  <Checkbox label="Opção desmarcada forçada" forceChecked={false} />
                  <Checkbox label="Opção desativada" disabled checked />
                </div>

                {/* Radio */}
                <div>
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-3">RADIO GROUP</span>
                  <Radio
                    name="modalidade-teste"
                    value={radioState}
                    onChange={setRadioState}
                    options={[
                      { value: 'opcao-a', label: 'Bateria Manhã', helperText: '06h30 às 07h30' },
                      { value: 'opcao-b', label: 'Bateria Noite', helperText: '19h00 às 20h00' },
                    ]}
                  />
                </div>

                {/* Toggle */}
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block">SWITCH / TOGGLE</span>
                  <Toggle
                    label="Som do Ambiente"
                    helperText="Síntese harmônica 55 Hz"
                    checked={toggleState}
                    onChange={setToggleState}
                  />
                  <Toggle
                    label="Notificações Push"
                    helperText="Avisos de novas baterias"
                    checked={false}
                    onChange={() => {}}
                  />
                  <Toggle
                    label="Modo Bloqueado"
                    helperText="Não editável"
                    checked={true}
                    disabled
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CARDS, MODALS & DIALOGS */}
        {(activeTab === 'cards-dialogos' || activeTab === 'todos') && (
          <div className="space-y-16">
            <div>
              <h3
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-2xl font-bold uppercase text-[var(--tema-color-accent-ink)] mb-6 flex items-center gap-3"
              >
                <span>05. Cards (Com Imagem, Sem Imagem & Canto em Diagonal)</span>
                <span className="h-px flex-1 bg-[var(--tema-color-border)]" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  cutCorner
                  kicker="VARIANTE COM IMAGEM"
                  title="Card com Imagem e Canto Cortado"
                  description="Com notch de canto diagonal no topo direito e gradiente de escurecimento sobre a imagem."
                  imageSrc="/src/assets/images/hero.jpg"
                  badge="EXEMPLO"
                  clickable
                />

                <Card
                  cutCorner
                  kicker="VARIANTE SEM IMAGEM"
                  title="Card Puramente Textual"
                  description="Ideal para métricas, parâmetros ou avisos rápidos sem sobrecarga fotográfica."
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--tema-color-accent-ink)]">
                    <span>STATUS: PRONTO</span>
                    <span>100% WCAG AA</span>
                  </div>
                </Card>

                <Card
                  cutCorner={false}
                  kicker="ESTADO HOVER FORÇADO"
                  title="Card com Hover Ativado"
                  description="Borda realçada em acento e elevação espacial suave sem sombra pesada artificial."
                  forceHover
                  clickable
                />
              </div>
            </div>

            <div>
              <h3
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-2xl font-bold uppercase text-[var(--tema-color-accent-ink)] mb-6 flex items-center gap-3"
              >
                <span>06. Modal, Drawer & Accordion</span>
                <span className="h-px flex-1 bg-[var(--tema-color-border)]" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]">
                <div>
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-3">MODAL & DRAWER INTERATIVOS</span>
                  <p className="text-sm text-[var(--tema-color-text-muted)] mb-4">
                    Ambos possuem captura de foco (focus trap), fechamento por tecla ESC, restauração de foco ao fechar e backdrop com desfoque.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                      Testar Modal / Dialog
                    </Button>
                    <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
                      Testar Drawer Lateral
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-3">ACCORDION (EXPANSÍVEL)</span>
                  <Accordion
                    items={[
                      {
                        id: 'demo-1',
                        title: 'Item de demonstração 01',
                        content: 'Conteúdo interno revelado com AnimatePresence e medição de altura fluida.',
                      },
                      {
                        id: 'demo-2',
                        title: 'Item de demonstração 02',
                        content: 'Sem empurrões bruscos de layout, com rotação suave do chevron.',
                      },
                    ]}
                    defaultOpenId="demo-1"
                  />
                </div>
              </div>

              {/* Modal instance */}
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Janela de Teste Modal"
              >
                <div className="space-y-4">
                  <p className="text-sm text-[var(--tema-color-text-muted)]">
                    Este modal intercepta a tecla ESC, trava a navegação com Tab no seu interior e devolve o foco para o botão de origem ao ser encerrado.
                  </p>
                  <InputText label="Exemplo de campo no modal" placeholder="Pressione Tab para testar o foco" />
                  <div className="pt-2 flex justify-end gap-3">
                    <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                      Confirmar
                    </Button>
                  </div>
                </div>
              </Modal>

              {/* Drawer instance */}
              <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Painel de Demonstração"
                side="right"
              >
                <div className="space-y-4">
                  <p className="text-sm text-[var(--tema-color-text-muted)]">
                    Gaveta lateral com deslizamento coordenado e controle de scroll no body.
                  </p>
                  <InputText label="Identificador" placeholder="Dado de exemplo" />
                  <Button variant="primary" size="md" className="w-full" onClick={() => setIsDrawerOpen(false)}>
                    Concluir e Fechar
                  </Button>
                </div>
              </Drawer>
            </div>
          </div>
        )}

        {/* 4. FEEDBACK & INDICATORS */}
        {(activeTab === 'indicadores' || activeTab === 'todos') && (
          <div className="space-y-16">
            <div>
              <h3
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-2xl font-bold uppercase text-[var(--tema-color-accent-ink)] mb-6 flex items-center gap-3"
              >
                <span>07. Barras de Progresso, Tooltips & Divisores</span>
                <span className="h-px flex-1 bg-[var(--tema-color-border)]" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]">
                {/* Progress bars */}
                <div className="space-y-5">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block">BARRAS DE PROGRESSO (25%, 65%, 100%)</span>
                  <ProgressBar value={25} label="Aquecimento Articular" showValue />
                  <ProgressBar value={65} label="Bateria Principal" showValue />
                  <ProgressBar value={100} label="Sessão Concluída" showValue />
                </div>

                {/* Tooltips */}
                <div className="space-y-6">
                  <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block">TOOLTIPS (HOVER & FORÇADO)</span>
                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <Tooltip content="Tooltip interativo ao pairar o mouse" position="top">
                      <Button variant="secondary" size="sm">
                        Passe o cursor aqui
                      </Button>
                    </Tooltip>

                    <Tooltip content="Estado forçado para catálogo" position="bottom" forceVisible>
                      <span className="px-3 py-1.5 border border-[var(--tema-color-border)] rounded text-xs text-[var(--tema-color-text)]">
                        Alvo com Tooltip Fixo
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* Section divider samples */}
              <div className="mt-8">
                <span className="text-xs font-mono text-[var(--tema-color-text-muted)] block mb-2">DIVISOR DE SEÇÃO</span>
                <Divisor label="DIVISÃO COM RÓTULO INDUSTRIAL" />
                <Divisor accent />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
