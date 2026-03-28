import { useState } from "react";
import { GraduationCap, MapPin, Calendar, Users, Building2, Clock, ExternalLink, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Concurso {
  id: string;
  nome: string;
  orgao: string;
  banca: string;
  estado: string;
  vagas: number;
  salario: string;
  escolaridade: string;
  status: "aberto" | "previsto" | "encerrado";
  dataInscricao: string;
  dataProva: string;
  editalUrl?: string;
  areas: string[];
}

const concursos: Concurso[] = [
  {
    id: "1",
    nome: "TRF 5ª Região",
    orgao: "Tribunal Regional Federal da 5ª Região",
    banca: "FGV",
    estado: "Nacional",
    vagas: 143,
    salario: "R$ 13.994,78",
    escolaridade: "Superior",
    status: "aberto",
    dataInscricao: "15/01/2026 a 14/02/2026",
    dataProva: "30/03/2026",
    areas: ["Analista Judiciário", "Técnico Judiciário"],
  },
  {
    id: "2",
    nome: "INSS - Técnico do Seguro Social",
    orgao: "Instituto Nacional do Seguro Social",
    banca: "CEBRASPE",
    estado: "Nacional",
    vagas: 1000,
    salario: "R$ 5.905,79",
    escolaridade: "Médio",
    status: "aberto",
    dataInscricao: "01/02/2026 a 28/02/2026",
    dataProva: "13/04/2026",
    areas: ["Técnico do Seguro Social"],
  },
  {
    id: "3",
    nome: "Receita Federal - Auditor",
    orgao: "Secretaria da Receita Federal do Brasil",
    banca: "FGV",
    estado: "Nacional",
    vagas: 699,
    salario: "R$ 21.029,09",
    escolaridade: "Superior",
    status: "previsto",
    dataInscricao: "A definir",
    dataProva: "A definir",
    areas: ["Auditor-Fiscal", "Analista Tributário"],
  },
  {
    id: "4",
    nome: "Polícia Federal - Agente",
    orgao: "Departamento de Polícia Federal",
    banca: "CEBRASPE",
    estado: "Nacional",
    vagas: 2000,
    salario: "R$ 12.522,50",
    escolaridade: "Superior",
    status: "previsto",
    dataInscricao: "A definir",
    dataProva: "A definir",
    areas: ["Agente de Polícia Federal", "Delegado", "Escrivão", "Papiloscopista"],
  },
  {
    id: "5",
    nome: "Banco do Brasil - Escriturário",
    orgao: "Banco do Brasil S/A",
    banca: "CESGRANRIO",
    estado: "Nacional",
    vagas: 4480,
    salario: "R$ 3.622,23",
    escolaridade: "Médio",
    status: "encerrado",
    dataInscricao: "01/11/2025 a 30/11/2025",
    dataProva: "11/01/2026",
    areas: ["Escriturário - Agente Comercial", "Escriturário - Agente de Tecnologia"],
  },
];

const statusConfig = {
  aberto: { label: "Inscrições Abertas", className: "bg-accent/10 text-accent border-accent/20" },
  previsto: { label: "Previsto", className: "bg-prisma-yellow/10 text-prisma-yellow border-prisma-yellow/20" },
  encerrado: { label: "Encerrado", className: "bg-muted text-muted-foreground border-muted" },
};

export default function Concursos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  const filtered = concursos.filter((c) => {
    const matchSearch = c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.orgao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "todos" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Concursos</h1>
        <p className="text-muted-foreground mt-1">Acompanhe os principais concursos públicos do Brasil</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar concursos..."
            className="pl-9 bg-card border-0 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: "todos", label: "Todos" },
            { value: "aberto", label: "Abertos" },
            { value: "previsto", label: "Previstos" },
            { value: "encerrado", label: "Encerrados" },
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

      {/* List */}
      <div className="space-y-4">
        {filtered.map((concurso) => {
          const status = statusConfig[concurso.status];
          return (
            <Card key={concurso.id} className="card-hover border-0 shadow-sm cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        {concurso.nome}
                      </h3>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{concurso.orgao}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4 flex-shrink-0" />
                        <span>{concurso.banca}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{concurso.estado}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 flex-shrink-0" />
                        <span>{concurso.vagas.toLocaleString()} vagas</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <span>{concurso.salario}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Inscrição: {concurso.dataInscricao}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Prova: {concurso.dataProva}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {concurso.areas.map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs font-normal">
                          {area}
                        </Badge>
                      ))}
                      <Badge variant="secondary" className="text-xs font-normal">
                        {concurso.escolaridade}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2 flex-shrink-0">
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Ver Provas
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Edital
                    </Button>
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
