import { requireAuth } from '@/middlewares/auth.middleware'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/me')({
  component: RouteComponent,
  beforeLoad: requireAuth,
})

function RouteComponent() {
  return <div>Hello "/me"!</div>
}
