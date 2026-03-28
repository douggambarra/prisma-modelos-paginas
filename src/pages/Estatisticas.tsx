import { BarChart3, TrendingUp, Activity, Target, BookOpen, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const desempenhoMaterias = [
  { materia: "Direito Constitucional", acertos: 87, total: 120, pct: 72 },
  { materia: "Direito Administrativo", acertos: 95, total: 110, pct: 86 },
  { materia: "Português", acertos: 78, total: 90, pct: 87 },
  { materia: "Raciocínio Lógico", acertos: 45, total: 65, pct: 69 },
  { materia: "Informática", acertos: 52, total: 60, pct: 87 },
  { materia: "Direito Penal", acertos: 38, total: 55, pct: 69 },
];

const evolucaoSemanal = [
  { semana: "Sem 1", questoes: 120, acertos: 78 },
  { semana: "Sem 2", questoes: 145, acertos: 98 },
  { semana: "Sem 3", questoes: 180, acertos: 134 },
  { semana: "Sem 4", questoes: 210, acertos: 168 },
  { semana: "Sem 5", questoes: 195, acertos: 162 },
  { semana: "Sem 6", questoes: 230, acertos: 196 },
];

const atividadesRecentes = [
  { dia: "Hoje", horas: 4.5, questoes: 42, provas: 1 },
  { dia: "Ontem", horas: 3.2, questoes: 35, provas: 0 },
  { dia: "Seg", horas: 5.0, questoes: 50, provas: 1 },
  { dia: "Dom", horas: 2.0, questoes: 18, provas: 0 },
  { dia: "Sáb", horas: 6.5, questoes: 65, provas: 2 },
  { dia: "Sex", horas: 3.8, questoes: 38, provas: 1 },
  { dia: "Qui", horas: 4.2, questoes: 40, provas: 0 },
];

function BarProgress({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="h-3 rounded-full bg-secondary overflow-hidden">
      <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}

export default function Estatisticas() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Estatísticas</h1>
        <p className="text-muted-foreground mt-1">Acompanhe seus números detalhadamente</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total de Questões", value: "1.247", icon: BookOpen, color: "text-prisma-cyan" },
          { label: "Taxa de Acertos", value: "81%", icon: CheckCircle, color: "text-prisma-green" },
          { label: "Horas de Estudo", value: "186h", icon: Clock, color: "text-prisma-yellow" },
          { label: "Provas Completas", value: "34", icon: Target, color: "text-prisma-pink" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-secondary">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="desempenho">
        <TabsList className="mb-4">
          <TabsTrigger value="desempenho" className="gap-1.5">
            <BarChart3 className="h-4 w-4" /> Meu Desempenho
          </TabsTrigger>
          <TabsTrigger value="evolucao" className="gap-1.5">
            <TrendingUp className="h-4 w-4" /> Minha Evolução
          </TabsTrigger>
          <TabsTrigger value="atividades" className="gap-1.5">
            <Activity className="h-4 w-4" /> Atividades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="desempenho">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h3 className="text-lg font-semibold text-foreground">Desempenho por Matéria</h3>
              {desempenhoMaterias.map((m) => (
                <div key={m.materia} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{m.materia}</span>
                    <span className="text-muted-foreground">{m.acertos}/{m.total} ({m.pct}%)</span>
                  </div>
                  <BarProgress value={m.pct} max={100} color={m.pct >= 80 ? "bg-prisma-green" : m.pct >= 70 ? "bg-prisma-yellow" : "bg-prisma-orange"} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolucao">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Evolução Semanal</h3>
              <div className="space-y-4">
                {evolucaoSemanal.map((s) => (
                  <div key={s.semana} className="flex items-center gap-4">
                    <span className="w-14 text-sm font-medium text-muted-foreground">{s.semana}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${(s.questoes / 250) * 100}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-16">{s.questoes} quest.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full bg-prisma-green" style={{ width: `${(s.acertos / 250) * 100}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-16">{s.acertos} acertos</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="atividades">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Atividades dos Últimos 7 Dias</h3>
              <div className="grid grid-cols-7 gap-3">
                {atividadesRecentes.map((a) => (
                  <div key={a.dia} className="text-center space-y-3 p-3 rounded-xl bg-secondary/50">
                    <p className="text-xs font-semibold text-foreground">{a.dia}</p>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-accent">{a.horas}h</p>
                      <p className="text-[10px] text-muted-foreground">estudo</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-foreground font-medium">{a.questoes}</p>
                      <p className="text-[10px] text-muted-foreground">questões</p>
                    </div>
                    {a.provas > 0 && (
                      <div className="text-[10px] text-prisma-pink font-medium">{a.provas} prova{a.provas > 1 ? "s" : ""}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
