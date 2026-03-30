import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AuthProvider } from '@/context/auth-context';
import { requireAuth } from '@/middlewares/auth.middleware';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Shield, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/me')({
  component: RouteComponent,
  beforeLoad: requireAuth,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  return (
    <AuthProvider userId={user.id} username={user.username ?? user.email}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbPage className="text-sm font-medium">Dashboard</BreadcrumbPage>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-md hover:bg-primary/20">
                  <Bell className="size-4" />
                </Button>
                <div className="hidden items-center gap-2 rounded-md border border-primary/30 bg-primary/20 py-1 pr-1.5 pl-2 sm:flex">
                  <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                    <Shield className="size-3.5" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs font-medium">{user.username || user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
