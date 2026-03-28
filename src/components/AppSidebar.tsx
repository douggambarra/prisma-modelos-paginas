import { BookOpen, FileText, FolderOpen, LayoutDashboard, GraduationCap, Settings, Trophy, Clock, BarChart3, MessageSquare } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Cadernos", url: "/cadernos", icon: FolderOpen },
  { title: "Concursos", url: "/concursos", icon: GraduationCap },
  { title: "Provas", url: "/provas", icon: FileText },
  { title: "Questões", url: "/questoes", icon: BookOpen },
  { title: "Ranking", url: "/ranking", icon: Trophy },
  { title: "Histórico", url: "/historico", icon: Clock },
  { title: "Estatísticas", url: "/estatisticas", icon: BarChart3 },
  { title: "Comentários", url: "/comentarios", icon: MessageSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-6">
        {/* Logo */}
        <div className="px-4 pb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg prisma-gradient flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold" style={{ color: 'white' }}>P</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-base font-bold text-sidebar-foreground">Prisma</h1>
              <p className="text-[10px] tracking-[0.2em] uppercase text-sidebar-foreground/60">Concursos</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-[10px] tracking-widest uppercase">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50 text-sidebar-foreground/70 transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/50">
              <Settings className="mr-3 h-4 w-4" />
              {!collapsed && <span>Configurações</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
