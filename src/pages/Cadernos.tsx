import { useState } from "react";
import { FolderOpen, Plus, MoreVertical, BookOpen, Clock, ChevronRight, Search, Grid3X3, List } from "lucide-react";
import NovoCadernoDialog from "@/components/cadernos/NovoCadernoDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Caderno {
  id: string;
  nome: string;
  descricao: string;
  totalQuestoes: number;
  questoesResolvidas: number;
  materias: string[];
  atualizadoEm: string;
  cor: string;
}

const cadernos: Caderno[] = [
  {
    id: "1",
    nome: "Direito Constitucional",
    descricao: "Questões de Direito Constitucional para concursos federais",
    totalQuestoes: 150,
    questoesResolvidas: 87,
    materias: ["Direitos Fundamentais", "Organização do Estado", "Poder Legislativo"],
    atualizadoEm: "Hoje",
    cor: "bg-prisma-cyan",
  },
  {
    id: "2",
    nome: "Português - Interpretação",
    descricao: "Foco em interpretação de texto e compreensão textual",
    totalQuestoes: 200,
    questoesResolvidas: 134,
    materias: ["Interpretação", "Gramática", "Redação"],
    atualizadoEm: "Ontem",
    cor: "bg-prisma-pink",
  },
  {
    id: "3",
    nome: "Raciocínio Lógico",
    descricao: "Lógica proposicional, diagramas e probabilidade",
    totalQuestoes: 120,
    questoesResolvidas: 45,
    materias: ["Lógica Proposicional", "Probabilidade", "Análise Combinatória"],
    atualizadoEm: "3 dias atrás",
    cor: "bg-prisma-yellow",
  },
  {
    id: "4",
    nome: "Direito Administrativo",
    descricao: "Atos administrativos, licitações e contratos",
    totalQuestoes: 180,
    questoesResolvidas: 102,
    materias: ["Atos Administrativos", "Licitações", "Servidores Públicos"],
    atualizadoEm: "1 semana atrás",
    cor: "bg-prisma-green",
  },
  {
    id: "5",
    nome: "Informática",
    descricao: "Questões de informática para concursos públicos",
    totalQuestoes: 90,
    questoesResolvidas: 67,
    materias: ["Segurança da Informação", "Redes", "Sistemas Operacionais"],
    atualizadoEm: "2 semanas atrás",
    cor: "bg-prisma-orange",
  },
  {
    id: "6",
    nome: "Direito Penal",
    descricao: "Crimes contra a administração pública e legislação penal",
    totalQuestoes: 160,
    questoesResolvidas: 23,
    materias: ["Crimes contra a AP", "Teoria do Crime", "Penas"],
    atualizadoEm: "3 semanas atrás",
    cor: "bg-prisma-cyan",
  },
];

export default function Cadernos() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = cadernos.filter((c) =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cadernos</h1>
          <p className="text-muted-foreground mt-1">Organize suas questões em cadernos de estudo</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Novo Caderno
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cadernos..."
            className="pl-9 bg-card border-0 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center bg-card rounded-lg shadow-sm p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((caderno) => {
            const progress = Math.round((caderno.questoesResolvidas / caderno.totalQuestoes) * 100);
            return (
              <Card key={caderno.id} className="card-hover border-0 shadow-sm cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${caderno.cor} flex items-center justify-center`}>
                        <FolderOpen className="h-5 w-5" style={{ color: 'white' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {caderno.nome}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {caderno.atualizadoEm}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded-md hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{caderno.descricao}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {caderno.materias.slice(0, 2).map((m) => (
                      <Badge key={m} variant="secondary" className="text-xs font-normal">
                        {m}
                      </Badge>
                    ))}
                    {caderno.materias.length > 2 && (
                      <Badge variant="secondary" className="text-xs font-normal">
                        +{caderno.materias.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {caderno.questoesResolvidas}/{caderno.totalQuestoes} questões
                      </span>
                      <span className="font-medium text-foreground">{progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add new card */}
          <Card className="border-2 border-dashed border-muted cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all" onClick={() => setDialogOpen(true)}>
            <CardContent className="p-5 flex flex-col items-center justify-center min-h-[220px] text-muted-foreground">
              <Plus className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Criar novo caderno</span>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* List View */
        <div className="space-y-2">
          {filtered.map((caderno) => {
            const progress = Math.round((caderno.questoesResolvidas / caderno.totalQuestoes) * 100);
            return (
              <Card key={caderno.id} className="card-hover border-0 shadow-sm cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${caderno.cor} flex items-center justify-center flex-shrink-0`}>
                    <FolderOpen className="h-5 w-5" style={{ color: 'white' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                      {caderno.nome}
                    </h3>
                    <p className="text-xs text-muted-foreground">{caderno.descricao}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{progress}%</p>
                      <p className="text-xs text-muted-foreground">{caderno.questoesResolvidas}/{caderno.totalQuestoes}</p>
                    </div>
                    <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
