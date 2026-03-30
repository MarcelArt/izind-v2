import { LoginForm } from '@/components/login-form';
import { createFileRoute } from '@tanstack/react-router';
import { Shield, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-svh bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container-custom">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Shield className="size-4" />
              </div>
              <span className="text-base font-semibold">Izind</span>
            </div>
            <Button variant="ghost" asChild className="text-sm">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container-custom flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-8">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lock className="size-6" />
            </div>
            <h1 className="mb-1.5 text-xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/auth/register" className="font-medium text-primary hover:underline">
                Create one
                <ArrowRight className="ml-0.5 inline size-3" />
              </Link>
            </p>
          </div>

          <div className="mt-6 rounded-md border border-border bg-card p-4">
            <p className="mb-2 text-xs font-medium">Demo Account</p>
            <p className="text-xs text-muted-foreground">Use any 16+ digit NIK and password with 6+ characters</p>
          </div>
        </div>
      </main>
    </div>
  );
}
