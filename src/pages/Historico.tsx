import { Clock, FileText, FolderOpen, BookOpen, Calendar, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const historico = [
  { id: 1, tipo: "prova", titulo: "Prova TRF 5ª Região - Analista", data: "28/03/2026 14:30", resultado: "78%", questoes: 60, tempo: "3h 20min" },
  { id: 2, tipo: "caderno", titulo: "Caderno: Direito Constitucional", data: "28/03/2026 10:15", resultado: "23 questões", questoes: 23, tempo: "1h 45min" },
  { id: 3, tipo: "prova", titulo: "Prova INSS - Técnico do Seguro Social", data: "27/03/2026 19:00", resultado: "82%", questoes: 50, tempo: "2h 50min" },
  { id: 4, tipo: "caderno", titulo: "Caderno: Português - Interpretação", data: "27/03/2026 15:30", resultado: "45 questões", questoes: 45, tempo: "2h 10min" },
  { id: 5, tipo: "questao", titulo: "Questões avulsas - Direito Administrativo", data: "26/03/2026 20:00", resultado: "85%", questoes: 20, tempo: "40min" },
  { id: 6, tipo: "prova", titulo: "Prova TCU - Auditor Federal", data: "26/03/2026 09:00", resultado: "71%", questoes: 80, tempo: "4h 15min" },
  { id: 7, tipo: "caderno", titulo: "Caderno: Raciocínio Lógico", data: "25/03/2026 14:00", resultado: "30 questões", questoes: 30, tempo: "1h 30min" },
  { id: 8, tipo: "prova", titulo: "Prova STJ - Analista Judiciário", data: "24/03/2026 16:00", resultado: "76%", questoes: 70, tempo: "3h 45min" },
];

function getTipoConfig(tipo: string) {
  switch (tipo) {
    case "prova": return { icon: FileText, label: "Prova", color: "bg-prisma-pink/10 text-prisma-pink" };
    case "caderno": return { icon: FolderOpen, label: "Caderno", color: "bg-prisma-cyan/10 text-prisma-cyan" };
    case "questao": return { icon: BookOpen, label: "Questões", color: "bg-prisma-green/10 text-prisma-green" };
    default: return { icon: FileText, label: tipo, color: "bg-muted text-muted-foreground" };
  }
}

export default function Historico() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Histórico</h1>
          <p className="text-muted-foreground mt-1">Todas as suas atividades de estudo</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:bg-secondary/80 transition-colors">
          <Filter className="h-4 w-4" /> Filtrar
        </button>
      </div>

      <div className="space-y-3">
        {historico.map((item) => {
          const config = getTipoConfig(item.tipo);
          const Icon = config.icon;
          return (
            <Card key={item.id} className="border-0 shadow-sm card-hover cursor-pointer">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${config.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.titulo}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {item.data}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {item.tempo}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className={config.color}>
                  {config.label}
                </Badge>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent">{item.resultado}</p>
                  <p className="text-xs text-muted-foreground">{item.questoes} questões</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
