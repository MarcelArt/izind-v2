// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
// import { Input } from '@/components/ui/input';
// import { useMutation } from '@tanstack/react-query';
// import { loginMutation } from '@/queries/auth.query';
// import { useForm } from '@tanstack/react-form-start';
// import { LoginInputSchema } from '@/@types/user.d';
// import { useNavigate } from '@tanstack/react-router';

// export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
//   const navigate = useNavigate();
//   const { mutate, isPending } = useMutation(
//     loginMutation({
//       // onSuccess: () => navigate({ to: '/me/profile' }),
//       onError: (e) => console.log('e :>> ', e),
//     })
//   );

//   const form = useForm({
//     defaultValues: {
//       nik: '',
//       password: '',
//     },
//     validators: {
//       onSubmit: LoginInputSchema,
//     },
//     onSubmit: async ({ value }) => mutate(value),
//   });

//   return (
//     <div className={cn('flex flex-col gap-6', className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>Enter your NIK below to login to your account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               form.handleSubmit();
//             }}
//           >
//             <FieldGroup>
//               <form.Field
//                 name="nik"
//                 children={(field) => {
//                   const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
//                   return (
//                     <Field data-invalid={isInvalid}>
//                       <FieldLabel htmlFor={field.name}>NIK</FieldLabel>
//                       <Input
//                         id={field.name}
//                         name={field.name}
//                         value={field.state.value}
//                         onBlur={field.handleBlur}
//                         onChange={(e) => field.handleChange(e.target.value)}
//                         aria-invalid={isInvalid}
//                         type="text"
//                         placeholder="NIK"
//                         required
//                       />
//                       {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                     </Field>
//                   );
//                 }}
//               />
//               <form.Field
//                 name="password"
//                 children={(field) => {
//                   const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
//                   return (
//                     <Field data-invalid={isInvalid}>
//                       <div className="flex items-center">
//                         <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                         <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
//                           Forgot your password?
//                         </a>
//                       </div>
//                       <Input
//                         id={field.name}
//                         name={field.name}
//                         value={field.state.value}
//                         onBlur={field.handleBlur}
//                         onChange={(e) => field.handleChange(e.target.value)}
//                         aria-invalid={isInvalid}
//                         type="password"
//                         placeholder="Password"
//                         required
//                       />
//                       {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                     </Field>
//                   );
//                 }}
//               />
//               <Field>
//                 <Button disabled={isPending} type="submit">Login</Button>
//                 <FieldDescription className="text-center">
//                   Don&apos;t have an account? <a href="/register">Sign up</a>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
