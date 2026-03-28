import { BookOpen, FileText, FolderOpen, GraduationCap, TrendingUp, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Cadernos", value: "12", icon: FolderOpen, color: "text-prisma-cyan" },
  { label: "Concursos", value: "8", icon: GraduationCap, color: "text-prisma-pink" },
  { label: "Provas Realizadas", value: "34", icon: FileText, color: "text-prisma-yellow" },
  { label: "Questões Resolvidas", value: "1.247", icon: BookOpen, color: "text-prisma-green" },
];

const recentActivity = [
  { title: "Prova TRF 5ª Região - Analista", date: "Hoje, 14:30", score: "78%", type: "prova" },
  { title: "Caderno: Direito Constitucional", date: "Hoje, 10:15", score: "23 questões", type: "caderno" },
  { title: "Prova INSS - Técnico do Seguro Social", date: "Ontem, 19:00", score: "82%", type: "prova" },
  { title: "Caderno: Português - Interpretação", date: "Ontem, 15:30", score: "45 questões", type: "caderno" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Acompanhe seu progresso nos estudos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="card-hover border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Atividade Recente</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'prova' ? 'bg-prisma-pink' : 'bg-prisma-cyan'}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-accent">{activity.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target className="h-5 w-5 text-prisma-pink" />
              <h2 className="text-lg font-semibold text-foreground">Metas da Semana</h2>
            </div>
            <div className="space-y-5">
              {[
                { label: "Questões por dia", current: 42, goal: 50 },
                { label: "Provas simuladas", current: 2, goal: 3 },
                { label: "Horas de estudo", current: 18, goal: 25 },
              ].map((meta, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{meta.label}</span>
                    <span className="text-muted-foreground">{meta.current}/{meta.goal}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{ width: `${Math.min((meta.current / meta.goal) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
