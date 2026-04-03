import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  BookOpen,
  Palette,
  FileText,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestaoDisponivel {
  id: string;
  enunciado: string;
  materia: string;
  assunto: string;
  banca: string;
  ano: number;
  orgao: string;
  dificuldade: "fácil" | "médio" | "difícil";
}

const questoesDisponiveis: QuestaoDisponivel[] = [
  { id: "q1", enunciado: "Acerca dos direitos e garantias fundamentais previstos na CF/88, julgue o item a seguir.", materia: "Direito Constitucional", assunto: "Direitos Fundamentais", banca: "CESPE/CEBRASPE", ano: 2023, orgao: "STF", dificuldade: "médio" },
  { id: "q2", enunciado: "No que se refere à organização político-administrativa do Estado brasileiro, assinale a alternativa correta.", materia: "Direito Constitucional", assunto: "Organização do Estado", banca: "FCC", ano: 2023, orgao: "TRT", dificuldade: "fácil" },
  { id: "q3", enunciado: "Considerando a legislação penal vigente, analise as assertivas sobre crimes contra a administração pública.", materia: "Direito Penal", assunto: "Crimes contra a AP", banca: "CESPE/CEBRASPE", ano: 2024, orgao: "PF", dificuldade: "difícil" },
  { id: "q4", enunciado: "Sobre interpretação de texto, leia o trecho a seguir e responda à questão proposta.", materia: "Português", assunto: "Interpretação de Texto", banca: "FGV", ano: 2024, orgao: "CGU", dificuldade: "médio" },
  { id: "q5", enunciado: "Com relação aos atos administrativos, é correto afirmar que a revogação:", materia: "Direito Administrativo", assunto: "Atos Administrativos", banca: "CESPE/CEBRASPE", ano: 2023, orgao: "AGU", dificuldade: "médio" },
  { id: "q6", enunciado: "Analise a proposição lógica composta P → (Q ∧ R) e determine seu valor lógico.", materia: "Raciocínio Lógico", assunto: "Lógica Proposicional", banca: "FCC", ano: 2024, orgao: "TRF", dificuldade: "difícil" },
  { id: "q7", enunciado: "No que concerne à segurança da informação, os princípios básicos são:", materia: "Informática", assunto: "Segurança da Informação", banca: "FGV", ano: 2023, orgao: "IBGE", dificuldade: "fácil" },
  { id: "q8", enunciado: "Acerca das licitações e contratos administrativos conforme a Lei 14.133/2021, julgue o item.", materia: "Direito Administrativo", assunto: "Licitações", banca: "CESPE/CEBRASPE", ano: 2024, orgao: "TCU", dificuldade: "difícil" },
  { id: "q9", enunciado: "Quanto ao regime jurídico dos servidores públicos federais, é incorreto afirmar:", materia: "Direito Administrativo", assunto: "Servidores Públicos", banca: "FCC", ano: 2023, orgao: "TRE", dificuldade: "médio" },
  { id: "q10", enunciado: "Em relação à concordância verbal e nominal, assinale a alternativa que apresenta erro.", materia: "Português", assunto: "Gramática", banca: "CESPE/CEBRASPE", ano: 2024, orgao: "MPU", dificuldade: "fácil" },
];

const materias = [...new Set(questoesDisponiveis.map((q) => q.materia))];
const assuntos = [...new Set(questoesDisponiveis.map((q) => q.assunto))];
const bancas = [...new Set(questoesDisponiveis.map((q) => q.banca))];
const orgaos = [...new Set(questoesDisponiveis.map((q) => q.orgao))];
const anos = [...new Set(questoesDisponiveis.map((q) => q.ano))].sort((a, b) => b - a);

const cores = [
  { nome: "Ciano", classe: "bg-prisma-cyan" },
  { nome: "Rosa", classe: "bg-prisma-pink" },
  { nome: "Amarelo", classe: "bg-prisma-yellow" },
  { nome: "Verde", classe: "bg-prisma-green" },
  { nome: "Laranja", classe: "bg-prisma-orange" },
];

const dificuldadeConfig = {
  fácil: "bg-emerald-100 text-emerald-700",
  médio: "bg-amber-100 text-amber-700",
  difícil: "bg-red-100 text-red-700",
};

interface NovoCadernoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NovoCadernoDialog({ open, onOpenChange }: NovoCadernoDialogProps) {
  const [step, setStep] = useState<"info" | "questoes">("info");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("bg-prisma-cyan");

  // Filtros de questões
  const [searchQuestao, setSearchQuestao] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filtroMateria, setFiltroMateria] = useState("");
  const [filtroAssunto, setFiltroAssunto] = useState("");
  const [filtroBanca, setFiltroBanca] = useState("");
  const [filtroOrgao, setFiltroOrgao] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [filtroDificuldade, setFiltroDificuldade] = useState("");

  const [selecionadas, setSelecionadas] = useState<Set<string>>(new Set());

  const questoesFiltradas = questoesDisponiveis.filter((q) => {
    if (searchQuestao && !q.enunciado.toLowerCase().includes(searchQuestao.toLowerCase()) && !q.materia.toLowerCase().includes(searchQuestao.toLowerCase())) return false;
    if (filtroMateria && q.materia !== filtroMateria) return false;
    if (filtroAssunto && q.assunto !== filtroAssunto) return false;
    if (filtroBanca && q.banca !== filtroBanca) return false;
    if (filtroOrgao && q.orgao !== filtroOrgao) return false;
    if (filtroAno && q.ano !== Number(filtroAno)) return false;
    if (filtroDificuldade && q.dificuldade !== filtroDificuldade) return false;
    return true;
  });

  const toggleQuestao = (id: string) => {
    setSelecionadas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (questoesFiltradas.every((q) => selecionadas.has(q.id))) {
      setSelecionadas((prev) => {
        const next = new Set(prev);
        questoesFiltradas.forEach((q) => next.delete(q.id));
        return next;
      });
    } else {
      setSelecionadas((prev) => {
        const next = new Set(prev);
        questoesFiltradas.forEach((q) => next.add(q.id));
        return next;
      });
    }
  };

  const limparFiltros = () => {
    setSearchQuestao("");
    setFiltroMateria("");
    setFiltroAssunto("");
    setFiltroBanca("");
    setFiltroOrgao("");
    setFiltroAno("");
    setFiltroDificuldade("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("info");
      setNome("");
      setDescricao("");
      setCorSelecionada("bg-prisma-cyan");
      setSelecionadas(new Set());
      limparFiltros();
    }, 200);
  };

  const filtrosAtivos = [filtroMateria, filtroAssunto, filtroBanca, filtroOrgao, filtroAno, filtroDificuldade].filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-lg font-bold text-foreground">
            {step === "info" ? "Criar Novo Caderno" : "Adicionar Questões"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {step === "info"
              ? "Defina o nome, descrição e cor do seu caderno de estudos."
              : `Busque e selecione as questões para o caderno "${nome}".`}
          </DialogDescription>
          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-3">
            <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${step === "info" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
              <FileText className="h-3 w-3" /> 1. Informações
            </div>
            <div className="w-6 h-px bg-border" />
            <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${step === "questoes" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
              <BookOpen className="h-3 w-3" /> 2. Questões
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === "info" ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nome-caderno" className="text-sm font-medium text-foreground">Nome do Caderno</Label>
                <Input
                  id="nome-caderno"
                  placeholder="Ex: Direito Constitucional - Concursos Federais"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc-caderno" className="text-sm font-medium text-foreground">Descrição (opcional)</Label>
                <Textarea
                  id="desc-caderno"
                  placeholder="Descreva o objetivo deste caderno..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="bg-secondary/50 border-border resize-none h-20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5" /> Cor do Caderno
                </Label>
                <div className="flex gap-3">
                  {cores.map((cor) => (
                    <button
                      key={cor.classe}
                      onClick={() => setCorSelecionada(cor.classe)}
                      className={`w-10 h-10 rounded-xl ${cor.classe} flex items-center justify-center transition-all ${corSelecionada === cor.classe ? "ring-2 ring-accent ring-offset-2 ring-offset-background scale-110" : "hover:scale-105"}`}
                    >
                      {corSelecionada === cor.classe && <Check className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Search bar */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por enunciado, matéria..."
                    className="pl-9 bg-secondary/50 border-border"
                    value={searchQuestao}
                    onChange={(e) => setSearchQuestao(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="gap-1.5 flex-shrink-0"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {filtrosAtivos > 0 && (
                    <Badge className="bg-accent text-accent-foreground h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                      {filtrosAtivos}
                    </Badge>
                  )}
                  {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
              </div>

              {/* Advanced filters */}
              {showAdvanced && (
                <div className="bg-secondary/30 rounded-xl p-4 space-y-3 border border-border">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Filter className="h-3.5 w-3.5" /> Busca Avançada
                    </h4>
                    {filtrosAtivos > 0 && (
                      <Button variant="ghost" size="sm" onClick={limparFiltros} className="text-xs h-7 text-muted-foreground hover:text-foreground">
                        Limpar filtros
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Disciplina</Label>
                      <Select value={filtroMateria} onValueChange={setFiltroMateria}>
                        <SelectTrigger className="h-9 text-xs bg-card border-border">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          {materias.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Assunto</Label>
                      <Select value={filtroAssunto} onValueChange={setFiltroAssunto}>
                        <SelectTrigger className="h-9 text-xs bg-card border-border">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          {assuntos.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Banca</Label>
                      <Select value={filtroBanca} onValueChange={setFiltroBanca}>
                        <SelectTrigger className="h-9 text-xs bg-card border-border">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          {bancas.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Órgão</Label>
                      <Select value={filtroOrgao} onValueChange={setFiltroOrgao}>
                        <SelectTrigger className="h-9 text-xs bg-card border-border">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          {orgaos.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Ano</Label>
                      <Select value={filtroAno} onValueChange={setFiltroAno}>
                        <SelectTrigger className="h-9 text-xs bg-card border-border">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          {anos.map((a) => <SelectItem key={String(a)} value={String(a)}>{a}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Dificuldade</Label>
                      <Select value={filtroDificuldade} onValueChange={setFiltroDificuldade}>
                        <SelectTrigger className="h-9 text-xs bg-card border-border">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fácil">Fácil</SelectItem>
                          <SelectItem value="médio">Médio</SelectItem>
                          <SelectItem value="difícil">Difícil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Results bar */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {questoesFiltradas.length} questões encontradas
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-accent font-medium">
                    {selecionadas.size} selecionada{selecionadas.size !== 1 ? "s" : ""}
                  </span>
                  <Button variant="ghost" size="sm" onClick={toggleAll} className="text-xs h-7">
                    {questoesFiltradas.every((q) => selecionadas.has(q.id)) ? "Desmarcar todas" : "Selecionar todas"}
                  </Button>
                </div>
              </div>

              {/* Question list */}
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {questoesFiltradas.map((q) => {
                  const selected = selecionadas.has(q.id);
                  return (
                    <div
                      key={q.id}
                      onClick={() => toggleQuestao(q.id)}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        selected
                          ? "border-accent bg-accent/5"
                          : "border-border bg-card hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className="pt-0.5">
                        <Checkbox checked={selected} className="pointer-events-none" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <p className="text-sm text-foreground line-clamp-2 leading-relaxed">{q.enunciado}</p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Badge variant="secondary" className="text-[10px] font-normal">{q.materia}</Badge>
                          <Badge variant="secondary" className="text-[10px] font-normal">{q.assunto}</Badge>
                          <Badge variant="secondary" className="text-[10px] font-normal">{q.banca}</Badge>
                          <Badge variant="secondary" className="text-[10px] font-normal">{q.ano}</Badge>
                          <Badge variant="secondary" className="text-[10px] font-normal">{q.orgao}</Badge>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${dificuldadeConfig[q.dificuldade]}`}>
                            {q.dificuldade}
                          </span>
                        </div>
                      </div>
                      {selected && (
                        <div className="flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                            <Check className="h-3 w-3 text-accent-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {questoesFiltradas.length === 0 && (
                  <div className="text-center py-10 text-muted-foreground text-sm">
                    Nenhuma questão encontrada com os filtros aplicados.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between flex-shrink-0 bg-card/50">
          {step === "info" ? (
            <>
              <Button variant="ghost" onClick={handleClose}>Cancelar</Button>
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
                disabled={!nome.trim()}
                onClick={() => setStep("questoes")}
              >
                Próximo: Adicionar Questões
                <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setStep("info")}>
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {selecionadas.size} questão(ões)
                </span>
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
                  onClick={handleClose}
                >
                  <Check className="h-4 w-4" />
                  Criar Caderno
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
