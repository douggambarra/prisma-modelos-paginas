import { Trophy, Target, Percent, Medal, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const rankingGeral = [
  { pos: 1, name: "Ana Beatriz", score: "9.847", acertos: "94%", avatar: "AB" },
  { pos: 2, name: "Carlos Silva", score: "9.312", acertos: "91%", avatar: "CS" },
  { pos: 3, name: "Douglas G.", score: "8.956", acertos: "89%", avatar: "DG" },
  { pos: 4, name: "Fernanda Lima", score: "8.720", acertos: "87%", avatar: "FL" },
  { pos: 5, name: "João Pedro", score: "8.534", acertos: "86%", avatar: "JP" },
  { pos: 6, name: "Maria Clara", score: "8.201", acertos: "84%", avatar: "MC" },
  { pos: 7, name: "Rafael Costa", score: "7.988", acertos: "82%", avatar: "RC" },
  { pos: 8, name: "Larissa Souza", score: "7.645", acertos: "80%", avatar: "LS" },
];

const rankingAcertos = [
  { pos: 1, name: "Ana Beatriz", score: "4.231", acertos: "94%", avatar: "AB" },
  { pos: 2, name: "Carlos Silva", score: "3.987", acertos: "91%", avatar: "CS" },
  { pos: 3, name: "Douglas G.", score: "3.845", acertos: "89%", avatar: "DG" },
  { pos: 4, name: "Maria Clara", score: "3.612", acertos: "87%", avatar: "MC" },
  { pos: 5, name: "Fernanda Lima", score: "3.490", acertos: "86%", avatar: "FL" },
];

const rankingPorcentagem = [
  { pos: 1, name: "Ana Beatriz", score: "94.2%", acertos: "4.231/4.490", avatar: "AB" },
  { pos: 2, name: "Carlos Silva", score: "91.8%", acertos: "3.987/4.342", avatar: "CS" },
  { pos: 3, name: "Douglas G.", score: "89.5%", acertos: "3.845/4.296", avatar: "DG" },
  { pos: 4, name: "João Pedro", score: "88.1%", acertos: "3.320/3.768", avatar: "JP" },
  { pos: 5, name: "Fernanda Lima", score: "86.7%", acertos: "3.490/4.026", avatar: "FL" },
];

function getMedalColor(pos: number) {
  if (pos === 1) return "text-prisma-yellow";
  if (pos === 2) return "text-muted-foreground";
  if (pos === 3) return "text-prisma-orange";
  return "text-muted-foreground/50";
}

function RankingTable({ data, scoreLabel }: { data: typeof rankingGeral; scoreLabel: string }) {
  return (
    <div className="space-y-2">
      {data.map((user) => (
        <div
          key={user.pos}
          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
            user.pos <= 3 ? "bg-secondary" : "hover:bg-secondary/50"
          }`}
        >
          <div className="w-8 text-center">
            {user.pos <= 3 ? (
              <Medal className={`h-5 w-5 mx-auto ${getMedalColor(user.pos)}`} />
            ) : (
              <span className="text-sm font-medium text-muted-foreground">{user.pos}º</span>
            )}
          </div>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.acertos}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-accent">{user.score}</p>
            <p className="text-[10px] text-muted-foreground">{scoreLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Ranking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ranking</h1>
        <p className="text-muted-foreground mt-1">Veja sua posição entre os concurseiros</p>
      </div>

      {/* Destaque Top 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {rankingGeral.slice(0, 3).map((user) => (
          <Card key={user.pos} className="border-0 shadow-sm card-hover">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Medal className={`h-8 w-8 mb-3 ${getMedalColor(user.pos)}`} />
              <Avatar className="h-14 w-14 mb-3">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-foreground">{user.name}</p>
              <p className="text-2xl font-bold text-accent mt-1">{user.score}</p>
              <p className="text-xs text-muted-foreground">pontos • {user.acertos} acertos</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <Tabs defaultValue="geral">
            <TabsList className="mb-4">
              <TabsTrigger value="geral" className="gap-1.5">
                <Trophy className="h-4 w-4" /> Geral
              </TabsTrigger>
              <TabsTrigger value="acertos" className="gap-1.5">
                <Target className="h-4 w-4" /> Mais Acertos
              </TabsTrigger>
              <TabsTrigger value="porcentagem" className="gap-1.5">
                <Percent className="h-4 w-4" /> Melhor %
              </TabsTrigger>
            </TabsList>
            <TabsContent value="geral">
              <RankingTable data={rankingGeral} scoreLabel="pontos" />
            </TabsContent>
            <TabsContent value="acertos">
              <RankingTable data={rankingAcertos} scoreLabel="acertos" />
            </TabsContent>
            <TabsContent value="porcentagem">
              <RankingTable data={rankingPorcentagem} scoreLabel="aproveitamento" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
