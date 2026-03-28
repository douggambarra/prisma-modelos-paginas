import { useState } from "react";
import { BookOpen, CheckCircle2, XCircle, Search, ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal, Save, RefreshCw, Printer, Settings2, Moon, MinusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Questao {
  id: string;
  concurso: string;
  banca: string;
  ano: number;
  materia: string;
  assunto: string;
  enunciado: string;
  alternativas: { letra: string; texto: string }[];
  gabarito: string;
  dificuldade: "fácil" | "médio" | "difícil";
}

const questoes: Questao[] = [
  {
    id: "1",
    concurso: "TRF 5ª Região",
    banca: "FGV",
    ano: 2024,
    materia: "Direito Constitucional",
    assunto: "Direitos Fundamentais",
    enunciado: "De acordo com a Constituição Federal de 1988, sobre os direitos e garantias fundamentais, assinale a alternativa correta:",
    alternativas: [
      { letra: "A", texto: "Os direitos e garantias expressos na Constituição excluem outros decorrentes do regime e dos princípios por ela adotados." },
      { letra: "B", texto: "As normas definidoras dos direitos e garantias fundamentais têm aplicação imediata." },
      { letra: "C", texto: "Os tratados internacionais sobre direitos humanos aprovados pelo Congresso Nacional têm status de emenda constitucional automaticamente." },
      { letra: "D", texto: "É vedada a extradição de brasileiro nato e naturalizado." },
      { letra: "E", texto: "O mandado de segurança pode ser impetrado mesmo quando cabível habeas corpus." },
    ],
    gabarito: "B",
    dificuldade: "médio",
  },
  {
    id: "2",
    concurso: "INSS",
    banca: "CEBRASPE",
    ano: 2024,
    materia: "Direito Previdenciário",
    assunto: "Benefícios Previdenciários",
    enunciado: "Acerca da aposentadoria por incapacidade permanente, prevista na Lei nº 8.213/91, com as alterações promovidas pela EC nº 103/2019, julgue o item a seguir:",
    alternativas: [
      { letra: "A", texto: "A aposentadoria por incapacidade permanente será devida ao segurado que estiver incapacitado para o trabalho e insuscetível de reabilitação." },
      { letra: "B", texto: "Não há necessidade de carência para concessão da aposentadoria por incapacidade permanente." },
      { letra: "C", texto: "O valor da aposentadoria por incapacidade permanente corresponderá sempre a 100% da média aritmética dos salários de contribuição." },
      { letra: "D", texto: "A doença preexistente à filiação gera direito ao benefício em qualquer situação." },
      { letra: "E", texto: "A aposentadoria por incapacidade permanente não pode ser convertida em aposentadoria por idade." },
    ],
    gabarito: "A",
    dificuldade: "difícil",
  },
  {
    id: "3",
    concurso: "Banco do Brasil",
    banca: "CESGRANRIO",
    ano: 2024,
    materia: "Português",
    assunto: "Interpretação de Texto",
    enunciado: "Considerando as regras de concordância verbal da norma culta da língua portuguesa, assinale a alternativa em que a concordância está CORRETA:",
    alternativas: [
      { letra: "A", texto: "Fazem dois anos que não viajo para o exterior." },
      { letra: "B", texto: "Houveram muitos problemas na execução do projeto." },
      { letra: "C", texto: "Existem, no Brasil, diversas espécies de animais em extinção." },
      { letra: "D", texto: "Aluga-se apartamentos na região central da cidade." },
      { letra: "E", texto: "Já é meio-dia e meio." },
    ],
    gabarito: "C",
    dificuldade: "fácil",
  },
];

const dificuldadeConfig = {
  fácil: "bg-prisma-green/10 text-prisma-green",
  médio: "bg-prisma-yellow/10 text-prisma-yellow",
  difícil: "bg-prisma-pink/10 text-prisma-pink",
};

const filterSelects = [
  { label: "Disciplina", placeholder: "Disciplina", options: ["Direito Constitucional", "Direito Administrativo", "Português", "Raciocínio Lógico", "Direito Previdenciário", "Informática"] },
  { label: "Assunto", placeholder: "Assunto", options: ["Direitos Fundamentais", "Atos Administrativos", "Interpretação de Texto", "Benefícios Previdenciários"] },
  { label: "Banca", placeholder: "Banca", options: ["FGV", "CEBRASPE", "CESGRANRIO", "FCC", "VUNESP"] },
  { label: "Instituição", placeholder: "Instituição", options: ["TRF", "INSS", "Banco do Brasil", "STJ", "TCU"] },
  { label: "Ano", placeholder: "Ano", options: ["2024", "2023", "2022", "2021", "2020"] },
  { label: "Cargo", placeholder: "Cargo", options: ["Analista", "Técnico", "Auditor", "Escriturário"] },
  { label: "Nível", placeholder: "Nível", options: ["Superior", "Médio", "Fundamental"] },
  { label: "Área de Formação", placeholder: "Área de Formação", options: ["Direito", "Administração", "Contabilidade", "TI"] },
  { label: "Área de Atuação", placeholder: "Área de Atuação", options: ["Judiciária", "Administrativa", "Apoio"] },
  { label: "Modalidade", placeholder: "Modalidade", options: ["Múltipla Escolha", "Certo/Errado", "Discursiva"] },
  { label: "Dificuldade", placeholder: "Dificuldade", options: ["Fácil", "Médio", "Difícil"] },
];

const excluirOptions = ["Dos meus cadernos", "Dos meus simulados", "Inéditas", "Anuladas", "Desatualizadas"];
const questoesComOptions = ["Gabarito Comentado", "Comentários", "Meus Comentários", "Aulas", "Minhas Anotações"];

export default function Questoes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [reveladas, setReveladas] = useState<Record<string, boolean>>({});
  const [expandida, setExpandida] = useState<Record<string, boolean>>({ "1": true });
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [porPagina, setPorPagina] = useState("5");
  const [ordenar, setOrdenar] = useState("recentes");

  const handleResponder = (questaoId: string, letra: string) => {
    setRespostas((prev) => ({ ...prev, [questaoId]: letra }));
  };

  const handleRevelar = (questaoId: string) => {
    setReveladas((prev) => ({ ...prev, [questaoId]: true }));
  };

  const handleReset = (questaoId: string) => {
    setRespostas((prev) => {
      const copy = { ...prev };
      delete copy[questaoId];
      return copy;
    });
    setReveladas((prev) => {
      const copy = { ...prev };
      delete copy[questaoId];
      return copy;
    });
  };

  const toggleExpand = (questaoId: string) => {
    setExpandida((prev) => ({ ...prev, [questaoId]: !prev[questaoId] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Questões</h1>
        <p className="text-muted-foreground mt-1">Resolva questões de concursos anteriores</p>
      </div>

      {/* Advanced Filter Panel */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          {/* Search + first row of selects */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-shrink-0 w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Palavra Chave"
                className="pl-9 bg-secondary border-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filterSelects.slice(0, 5).map((f) => (
              <Select key={f.label}>
                <SelectTrigger className="w-40 bg-secondary border-0">
                  <SelectValue placeholder={f.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {f.options.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>

          {/* Collapsible advanced section */}
          {showAdvanced && (
            <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
              {/* Second row of selects */}
              <div className="flex flex-wrap gap-3">
                {filterSelects.slice(5).map((f) => (
                  <Select key={f.label}>
                    <SelectTrigger className="w-40 bg-secondary border-0">
                      <SelectValue placeholder={f.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>

              {/* Excluir questões */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="text-sm font-medium text-foreground whitespace-nowrap">Excluir questões</span>
                {excluirOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    <Checkbox />
                    {opt}
                  </label>
                ))}
              </div>

              {/* Questões com */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="text-sm font-medium text-foreground whitespace-nowrap">Questões com</span>
                {questoesComOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    <Checkbox />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Toggle + filter bar */}
          <div className="flex items-center justify-end mt-3">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAdvanced ? "Mostrar filtro simples" : "Mostrar filtro avançado"}
              <MinusCircle className="h-4 w-4" />
            </button>
          </div>

          {/* Filter actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-accent font-medium">Filtrar por:</span>
              <span className="text-muted-foreground">Os seus filtros aparecerão aqui.</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors">
                <Save className="h-4 w-4" /> Salvar Filtros
              </button>
              <button className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors">
                <RefreshCw className="h-4 w-4" /> Limpar
              </button>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6">
                Filtrar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Foram encontradas <span className="font-bold text-foreground">2.629.988</span> questões
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 border rounded-lg p-1">
            <button className="p-1.5 rounded hover:bg-secondary transition-colors" title="Modo noturno">
              <Moon className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded hover:bg-secondary transition-colors" title="Imprimir">
              <Printer className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded hover:bg-secondary transition-colors" title="Configurações">
              <Settings2 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <button className="px-2 py-1 rounded text-sm font-medium hover:bg-secondary transition-colors">A+</button>
            <button className="px-2 py-1 rounded text-sm font-medium hover:bg-secondary transition-colors">A-</button>
          </div>
          <Select value={porPagina} onValueChange={setPorPagina}>
            <SelectTrigger className="w-32 bg-secondary border-0 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Por página: 5</SelectItem>
              <SelectItem value="10">Por página: 10</SelectItem>
              <SelectItem value="20">Por página: 20</SelectItem>
              <SelectItem value="50">Por página: 50</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ordenar} onValueChange={setOrdenar}>
            <SelectTrigger className="w-36 bg-secondary border-0 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais recentes</SelectItem>
              <SelectItem value="antigas">Mais antigas</SelectItem>
              <SelectItem value="dificuldade">Dificuldade</SelectItem>
              <SelectItem value="materia">Matéria</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm">
        <span className="text-muted-foreground">{questoes.length} questões exibidas</span>
        <span className="text-accent flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {Object.keys(respostas).filter((id) => {
            const q = questoes.find((q) => q.id === id);
            return q && respostas[id] === q.gabarito;
          }).length} acertos
        </span>
        <span className="text-destructive flex items-center gap-1">
          <XCircle className="h-3.5 w-3.5" />
          {Object.keys(respostas).filter((id) => {
            const q = questoes.find((q) => q.id === id);
            return q && reveladas[id] && respostas[id] !== q.gabarito;
          }).length} erros
        </span>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questoes.map((questao, idx) => {
          const respondida = respostas[questao.id];
          const revelada = reveladas[questao.id];
          const isExpanded = expandida[questao.id];
          const acertou = respondida === questao.gabarito;

          return (
            <Card key={questao.id} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpand(questao.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-8">Q{idx + 1}</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{questao.materia}</Badge>
                      <Badge variant="outline" className={dificuldadeConfig[questao.dificuldade]}>{questao.dificuldade}</Badge>
                      <span className="text-xs text-muted-foreground">{questao.banca} • {questao.concurso} • {questao.ano}</span>
                    </div>
                    {revelada && (
                      <div className={`flex items-center gap-1 text-xs ${acertou ? "text-accent" : "text-destructive"}`}>
                        {acertou ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        {acertou ? "Correta" : "Incorreta"}
                      </div>
                    )}
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t">
                    <p className="text-sm text-foreground leading-relaxed mt-4 mb-5">
                      {questao.enunciado}
                    </p>

                    <RadioGroup
                      value={respondida}
                      onValueChange={(v) => handleResponder(questao.id, v)}
                      className="space-y-2"
                    >
                      {questao.alternativas.map((alt) => {
                        const isSelected = respondida === alt.letra;
                        const isGabarito = alt.letra === questao.gabarito;
                        let bgClass = "hover:bg-secondary/50";

                        if (revelada) {
                          if (isGabarito) bgClass = "bg-accent/10 border-accent/30";
                          else if (isSelected && !acertou) bgClass = "bg-destructive/10 border-destructive/30";
                        }

                        return (
                          <Label
                            key={alt.letra}
                            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${bgClass} ${isSelected && !revelada ? "border-primary/40 bg-primary/5" : ""}`}
                          >
                            <RadioGroupItem value={alt.letra} disabled={revelada} className="mt-0.5" />
                            <span className="text-sm text-foreground leading-relaxed">
                              <strong className="mr-1">{alt.letra})</strong>
                              {alt.texto}
                            </span>
                            {revelada && isGabarito && <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />}
                          </Label>
                        );
                      })}
                    </RadioGroup>

                    <div className="flex gap-2 mt-5">
                      {!revelada ? (
                        <Button
                          size="sm"
                          className="bg-accent text-accent-foreground hover:bg-accent/90"
                          disabled={!respondida}
                          onClick={() => handleRevelar(questao.id)}
                        >
                          Ver Gabarito
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => handleReset(questao.id)}>
                          <RotateCcw className="h-3.5 w-3.5" />
                          Refazer
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
