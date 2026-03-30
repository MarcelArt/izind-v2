import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { loginMutation } from '@/queries/auth.query';
import { useForm } from '@tanstack/react-form-start';
import { LoginInputSchema } from '@/@types/user.d';
import { useNavigate, Link } from '@tanstack/react-router';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation(
    loginMutation({
      onSuccess: () => navigate({ to: '/me/profile' }),
      onError: (e) => console.log('e :>> ', e),
    })
  );

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: LoginInputSchema,
    },
    onSubmit: async ({ value }) => mutate(value),
  });

  return (
    <div className={cn('flex flex-col gap-5', className)} {...props}>
      <Card className="border border-border bg-card">
        <CardContent className="p-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <div className="space-y-3">
              <form.Field
                name="username"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                        NIK
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="text"
                        placeholder="Enter your NIK"
                        required
                        className="h-9 text-sm"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                          Password
                        </FieldLabel>
                        <a href="#" className="text-xs text-primary hover:underline">
                          Forgot?
                        </a>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="h-9 text-sm"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </div>
            <Button disabled={isPending} type="submit" className="h-9 w-full text-sm">
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/auth/register" className="font-medium text-primary hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
