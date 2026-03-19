import { authenticated } from '@/middlewares/auth.middleware'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  beforeLoad: authenticated,
})

function RouteComponent() {
  return <Outlet/>
}
