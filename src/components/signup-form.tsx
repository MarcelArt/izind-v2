import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form-start';
import { RegisterInputSchema } from '@/@types/user.d';
import { useMutation } from '@tanstack/react-query';
import { registerMutation } from '@/queries/auth.query';
import { Link, useNavigate } from '@tanstack/react-router';

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation(
    registerMutation({
      onSuccess: () => navigate({ to: '/auth/login' }),
      onError: (e) => console.log('e :>> ', e),
    })
  );

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: RegisterInputSchema,
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
                      placeholder="16+ digits"
                      required
                      className="h-9 text-sm"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                        Password
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="password"
                        placeholder="6+ characters"
                        required
                        className="h-9 text-sm"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="confirmPassword"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                        Confirm
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="password"
                        placeholder="Re-enter"
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
              {isPending ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
