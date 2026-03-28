import { Settings, User, Palette, Bell, Shield, Moon, Sun, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">Gerencie sua conta e preferências</p>
      </div>

      <Tabs defaultValue="geral">
        <TabsList className="mb-4">
          <TabsTrigger value="geral" className="gap-1.5">
            <Settings className="h-4 w-4" /> Geral
          </TabsTrigger>
          <TabsTrigger value="temas" className="gap-1.5">
            <Palette className="h-4 w-4" /> Temas
          </TabsTrigger>
          <TabsTrigger value="perfil" className="gap-1.5">
            <User className="h-4 w-4" /> Meu Perfil
          </TabsTrigger>
        </TabsList>

        {/* Geral */}
        <TabsContent value="geral">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Configurações Gerais</h3>

              <div className="space-y-5">
                {[
                  { label: "Notificações por e-mail", desc: "Receba atualizações sobre novos concursos e provas", icon: Bell },
                  { label: "Notificações push", desc: "Alertas em tempo real no navegador", icon: Bell },
                  { label: "Modo de estudo", desc: "Ocultar distrações durante a resolução de questões", icon: Shield },
                  { label: "Salvar progresso automaticamente", desc: "Salvar respostas ao trocar de questão", icon: Settings },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Temas */}
        <TabsContent value="temas">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Aparência</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Claro", icon: Sun, active: true },
                  { label: "Escuro", icon: Moon, active: false },
                  { label: "Sistema", icon: Monitor, active: false },
                ].map((theme) => (
                  <button
                    key={theme.label}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                      theme.active
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50 bg-secondary/30"
                    }`}
                  >
                    <theme.icon className={`h-8 w-8 ${theme.active ? "text-accent" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${theme.active ? "text-accent" : "text-foreground"}`}>
                      {theme.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-sm font-semibold text-foreground">Cor de destaque</h4>
                <div className="flex gap-3">
                  {[
                    { color: "bg-accent", active: true },
                    { color: "bg-prisma-pink", active: false },
                    { color: "bg-prisma-cyan", active: false },
                    { color: "bg-prisma-yellow", active: false },
                    { color: "bg-prisma-orange", active: false },
                  ].map((c, i) => (
                    <button
                      key={i}
                      className={`w-10 h-10 rounded-full ${c.color} transition-transform ${
                        c.active ? "ring-2 ring-offset-2 ring-accent scale-110" : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-sm font-semibold text-foreground">Tamanho da fonte</h4>
                <div className="flex gap-3">
                  {["Pequena", "Média", "Grande"].map((size, i) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        i === 1
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meu Perfil */}
        <TabsContent value="perfil">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-5">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    DG
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Douglas G.</h3>
                  <p className="text-sm text-muted-foreground">doug@gmail.com</p>
                  <button className="mt-2 text-xs text-accent hover:underline">Alterar foto</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input id="nome" defaultValue="Douglas Gambarra" className="bg-secondary border-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" defaultValue="doug@gmail.com" className="bg-secondary border-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" className="bg-secondary border-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="concurso">Concurso alvo</Label>
                  <Input id="concurso" placeholder="Ex: TRF 5ª Região" className="bg-secondary border-0" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="px-6 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors">
                  Salvar Alterações
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
