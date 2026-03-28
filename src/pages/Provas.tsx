import { useState } from "react";
import { FileText, Clock, BookOpen, BarChart3, Search, ChevronRight, CheckCircle2, XCircle, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Prova {
  id: string;
  concurso: string;
  cargo: string;
  banca: string;
  ano: number;
  totalQuestoes: number;
  duracao: string;
  dificuldade: "fácil" | "médio" | "difícil";
  materias: string[];
  status: "nao_iniciada" | "em_andamento" | "concluida";
  acertos?: number;
  nota?: number;
}

const provas: Prova[] = [
  {
    id: "1",
    concurso: "TRF 5ª Região",
    cargo: "Analista Judiciário - Área Judiciária",
    banca: "FGV",
    ano: 2024,
    totalQuestoes: 80,
    duracao: "4h",
    dificuldade: "difícil",
    materias: ["Direito Constitucional", "Direito Administrativo", "Direito Civil", "Português"],
    status: "concluida",
    acertos: 62,
    nota: 77.5,
  },
  {
    id: "2",
    concurso: "INSS",
    cargo: "Técnico do Seguro Social",
    banca: "CEBRASPE",
    ano: 2024,
    totalQuestoes: 120,
    duracao: "3h30",
    dificuldade: "médio",
    materias: ["Direito Previdenciário", "Direito Constitucional", "Ética", "Informática"],
    status: "concluida",
    acertos: 98,
    nota: 81.7,
  },
  {
    id: "3",
    concurso: "Receita Federal",
    cargo: "Auditor-Fiscal",
    banca: "FGV",
    ano: 2023,
    totalQuestoes: 70,
    duracao: "4h30",
    dificuldade: "difícil",
    materias: ["Direito Tributário", "Contabilidade", "Legislação Aduaneira", "Comércio Internacional"],
    status: "em_andamento",
  },
  {
    id: "4",
    concurso: "Polícia Federal",
    cargo: "Agente de Polícia Federal",
    banca: "CEBRASPE",
    ano: 2025,
    totalQuestoes: 120,
    duracao: "4h30",
    dificuldade: "difícil",
    materias: ["Direito Penal", "Direito Processual Penal", "Direito Constitucional", "Informática"],
    status: "nao_iniciada",
  },
  {
    id: "5",
    concurso: "Banco do Brasil",
    cargo: "Escriturário - Agente Comercial",
    banca: "CESGRANRIO",
    ano: 2024,
    totalQuestoes: 70,
    duracao: "3h",
    dificuldade: "fácil",
    materias: ["Conhecimentos Bancários", "Matemática", "Português", "Informática"],
    status: "nao_iniciada",
  },
  {
    id: "6",
    concurso: "TRT 2ª Região",
    cargo: "Técnico Judiciário",
    banca: "FCC",
    ano: 2024,
    totalQuestoes: 60,
    duracao: "3h",
    dificuldade: "médio",
    materias: ["Direito do Trabalho", "Direito Processual do Trabalho", "Português", "Informática"],
    status: "concluida",
    acertos: 48,
    nota: 80,
  },
];

const dificuldadeConfig = {
  fácil: "bg-prisma-green/10 text-prisma-green",
  médio: "bg-prisma-yellow/10 text-prisma-yellow",
  difícil: "bg-prisma-pink/10 text-prisma-pink",
};

const statusConfig = {
  nao_iniciada: { label: "Não iniciada", icon: Play, color: "text-muted-foreground" },
  em_andamento: { label: "Em andamento", icon: Clock, color: "text-prisma-yellow" },
  concluida: { label: "Concluída", icon: CheckCircle2, color: "text-accent" },
};

export default function Provas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = provas.filter((p) => {
    const matchSearch = p.concurso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "todos" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Provas</h1>
          <p className="text-muted-foreground mt-1">Pratique com provas anteriores de concursos</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-4 bg-card rounded-xl shadow-sm px-4 py-2.5">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{provas.filter(p => p.status === "concluida").length}</p>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-accent">
                {provas.filter(p => p.nota).length > 0
                  ? (provas.filter(p => p.nota).reduce((a, b) => a + (b.nota || 0), 0) / provas.filter(p => p.nota).length).toFixed(1) + "%"
                  : "—"}
              </p>
              <p className="text-xs text-muted-foreground">Média</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar provas..."
            className="pl-9 bg-card border-0 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: "todos", label: "Todas" },
            { value: "nao_iniciada", label: "Não iniciadas" },
            { value: "em_andamento", label: "Em andamento" },
            { value: "concluida", label: "Concluídas" },
          ].map((f) => (
            <Button
              key={f.value}
              variant={statusFilter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(f.value)}
              className={statusFilter === f.value ? "bg-primary text-primary-foreground" : "bg-card border-0 shadow-sm"}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Provas List */}
      <div className="space-y-3">
        {filtered.map((prova) => {
          const statusInfo = statusConfig[prova.status];
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={prova.id} className="card-hover border-0 shadow-sm cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {prova.concurso} ({prova.ano})
                      </h3>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={dificuldadeConfig[prova.dificuldade]}>
                          {prova.dificuldade}
                        </Badge>
                        <div className={`flex items-center gap-1 text-xs ${statusInfo.color}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusInfo.label}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{prova.cargo}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {prova.totalQuestoes} questões
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {prova.duracao}
                      </span>
                      <span>{prova.banca}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {prova.materias.slice(0, 3).map((m) => (
                        <Badge key={m} variant="secondary" className="text-xs font-normal">
                          {m}
                        </Badge>
                      ))}
                      {prova.materias.length > 3 && (
                        <Badge variant="secondary" className="text-xs font-normal">
                          +{prova.materias.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Score / Action */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {prova.status === "concluida" && prova.nota !== undefined && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">{prova.nota}%</p>
                        <p className="text-xs text-muted-foreground">{prova.acertos}/{prova.totalQuestoes} acertos</p>
                      </div>
                    )}
                    <Button
                      size="sm"
                      className={prova.status === "nao_iniciada"
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : prova.status === "em_andamento"
                          ? "bg-prisma-yellow/10 text-prisma-yellow hover:bg-prisma-yellow/20 border border-prisma-yellow/20"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }
                    >
                      {prova.status === "nao_iniciada" ? "Iniciar" : prova.status === "em_andamento" ? "Continuar" : "Revisar"}
                    </Button>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
