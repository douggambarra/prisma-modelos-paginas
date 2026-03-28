import { MessageSquare, ThumbsUp, Reply, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const comentarios = [
  {
    id: 1, autor: "Ana Beatriz", avatar: "AB", tempo: "Há 2 horas",
    questao: "Questão 42 - Direito Constitucional",
    texto: "Alguém pode me explicar por que a alternativa C está errada? O artigo 5º não garante esse direito?",
    likes: 12, respostas: 3, tag: "Dúvida",
  },
  {
    id: 2, autor: "Carlos Silva", avatar: "CS", tempo: "Há 5 horas",
    questao: "Prova TRF 5ª Região - Q.18",
    texto: "Essa questão foi anulada pelo CESPE em 2024. A banca alterou o gabarito de B para D após recursos.",
    likes: 28, respostas: 7, tag: "Informação",
  },
  {
    id: 3, autor: "Fernanda Lima", avatar: "FL", tempo: "Há 1 dia",
    questao: "Caderno: Raciocínio Lógico - Q.5",
    texto: "Dica: para resolver esse tipo de questão, comecem pelo final. Fica muito mais fácil identificar a sequência lógica.",
    likes: 45, respostas: 11, tag: "Dica",
  },
  {
    id: 4, autor: "Douglas G.", avatar: "DG", tempo: "Há 1 dia",
    questao: "Questão 87 - Direito Administrativo",
    texto: "O princípio da autotutela permite que a administração anule seus próprios atos. Súmula 473 do STF.",
    likes: 19, respostas: 5, tag: "Explicação",
  },
  {
    id: 5, autor: "João Pedro", avatar: "JP", tempo: "Há 2 dias",
    questao: "Prova INSS 2024 - Q.33",
    texto: "Questão clássica sobre benefícios previdenciários. Fiquem atentos às mudanças da EC 103/2019.",
    likes: 33, respostas: 8, tag: "Dica",
  },
];

function getTagColor(tag: string) {
  switch (tag) {
    case "Dúvida": return "bg-prisma-yellow/10 text-prisma-yellow";
    case "Informação": return "bg-prisma-cyan/10 text-prisma-cyan";
    case "Dica": return "bg-prisma-green/10 text-prisma-green";
    case "Explicação": return "bg-prisma-pink/10 text-prisma-pink";
    default: return "bg-muted text-muted-foreground";
  }
}

export default function Comentarios() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comentários</h1>
          <p className="text-muted-foreground mt-1">Discussões e dúvidas da comunidade</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors">
          Novo Comentário
        </button>
      </div>

      <div className="space-y-4">
        {comentarios.map((c) => (
          <Card key={c.id} className="border-0 shadow-sm card-hover">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 mt-0.5">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                    {c.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-foreground">{c.autor}</span>
                    <Badge variant="secondary" className={`text-[10px] ${getTagColor(c.tag)}`}>
                      {c.tag}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                      <Clock className="h-3 w-3" /> {c.tempo}
                    </span>
                  </div>
                  <p className="text-xs text-accent font-medium mb-2">{c.questao}</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{c.texto}</p>
                  <div className="flex items-center gap-5 mt-3">
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
                      <ThumbsUp className="h-3.5 w-3.5" /> {c.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
                      <Reply className="h-3.5 w-3.5" /> {c.respostas} respostas
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
