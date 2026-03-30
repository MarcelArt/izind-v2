import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Zap, CheckCircle, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/')({ component: App });

function App() {
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
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-sm">
                Features
              </Button>
              <Button variant="ghost" className="text-sm">
                Pricing
              </Button>
              <Button className="text-sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container-custom">
        <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center py-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="badge-primary mb-4 inline-flex items-center gap-1.5 px-3 py-1">
              <span className="text-xs font-medium">Now available</span>
            </div>
            <h1 className="mb-4 text-2xl font-semibold sm:text-3xl md:text-4xl">Secure Your Digital Identity</h1>
            <p className="mx-auto mb-6 max-w-xl text-sm text-muted-foreground sm:text-base">The modern platform for managing personal data with enterprise-grade security.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button className="group text-sm">
                Start Free Trial
                <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="ghost" className="text-sm">
                Watch Demo
                <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground sm:flex-row sm:gap-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="size-3.5 text-success" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="size-3.5 text-success" />
                <span>14-day trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="size-3.5 text-success" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-xl font-semibold sm:text-2xl">Everything you need</h2>
              <p className="text-sm text-muted-foreground">Powerful features for simplicity and security</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex size-8 items-center justify-center rounded-md bg-primary/20 text-primary">
                  <Shield className="size-4" />
                </div>
                <h3 className="mb-2 text-base font-semibold">Enterprise Security</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">Bank-level encryption and security protocols.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex size-8 items-center justify-center rounded-md bg-primary/20 text-primary">
                  <Users className="size-4" />
                </div>
                <h3 className="mb-2 text-base font-semibold">Team Collaboration</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">Real-time updates and permission controls.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex size-8 items-center justify-center rounded-md bg-primary/20 text-primary">
                  <Zap className="size-4" />
                </div>
                <h3 className="mb-2 text-base font-semibold">Lightning Fast</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">Instant data access with minimal latency.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Ready to get started?</h2>
            <p className="mx-auto mb-6 max-w-lg text-sm text-muted-foreground">Join thousands of users who trust Izind.</p>
            <Button className="text-sm">
              Create Your Free Account
              <ArrowRight className="ml-1.5 size-3.5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/50">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Shield className="size-3.5" />
              </div>
              <span className="text-sm font-semibold">Izind</span>
            </div>
            <p className="text-xs text-muted-foreground">© 2024 Izind. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
