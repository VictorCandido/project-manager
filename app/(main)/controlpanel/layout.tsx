import { SidebarNav } from "@/componentes/control-panel/sidebar-nav"
import { Separator } from "@/componentes/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Painel de Controle | Project Manager"
}
interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Painel de Controle</h2>

          <p className="text-muted-foreground">
            Gerencie perfis, clientes, empresas e projetos.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav />
          </aside>

          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}