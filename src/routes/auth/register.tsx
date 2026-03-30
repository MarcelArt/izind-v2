import { SignupForm } from '@/components/signup-form';
import { createFileRoute } from '@tanstack/react-router';
import { Shield, ArrowRight, UserPlus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register')({
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
              <UserPlus className="size-6" />
            </div>
            <h1 className="mb-1.5 text-xl font-semibold">Create an account</h1>
            <p className="text-sm text-muted-foreground">Start your journey with secure data management</p>
          </div>

          <SignupForm />

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-medium text-primary hover:underline">
                Sign in
                <ArrowRight className="ml-0.5 inline size-3" />
              </Link>
            </p>
          </div>

          <div className="mt-6 rounded-md border border-border bg-card p-4">
            <p className="mb-3 text-xs font-medium">Requirements</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-3.5 flex-shrink-0 text-success" />
                <span>NIK must be 16 characters minimum</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-3.5 flex-shrink-0 text-success" />
                <span>Password must be 6 characters minimum</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-3.5 flex-shrink-0 text-success" />
                <span>Passwords must match</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
