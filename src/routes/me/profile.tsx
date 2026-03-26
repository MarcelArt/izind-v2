import { createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import moment from 'moment';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldContent, FieldLabel, FieldError } from '@/components/ui/field';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProfileInputSchema, type BloodType, type Gender, type Profile } from '@/@types/profile.d';
import { useAuth } from '@/context/auth-context';
import { getProfileByUserIdOption, upsertProfileOption } from '@/queries/profile.query';
import { useMemo } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/me/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId, username } = useAuth();
  const queryClient = useQueryClient();

  const { data, error, status } = useQuery(getProfileByUserIdOption(userId));

  const profile: Profile = useMemo(() => {
    return status !== 'success'
      ? ({
          address: '',
          bloodType: 'O',
          city: '',
          createdAt: new Date(),
          dateOfBirth: new Date(),
          district: '',
          gender: 'L',
          id: 0,
          job: '',
          maritalStatus: '',
          name: '',
          nationality: '',
          nik: '',
          placeOfBirth: '',
          religion: '',
          rt: '',
          rw: '',
          userId: '',
          village: '',
          updatedAt: new Date(),
        } satisfies Profile)
      : data;
  }, [status, error, data]);

  const { mutate } = useMutation(
    upsertProfileOption({
      onSuccess: () => {
        toast.success('Profile updated');
        queryClient.invalidateQueries({
          queryKey: ['profile-by-user-id', userId],
        });
      },
      onError: (e) => toast.error(e.message),
    })
  );

  const form = useForm({
    defaultValues: {
      nik: profile?.nik || username,
      name: profile?.name ?? '',
      placeOfBirth: profile?.placeOfBirth ?? '',
      dateOfBirth: profile?.dateOfBirth ?? new Date(),
      dateOfBirthStr: moment(profile?.dateOfBirth).format('YYYY-MM-DD') ?? '',
      gender: profile?.gender || 'L',
      bloodType: profile?.bloodType || 'O',
      address: profile?.address ?? '',
      rt: profile?.rt ?? '',
      rw: profile?.rw ?? '',
      village: profile?.village ?? '',
      district: profile?.district ?? '',
      city: profile?.city ?? '',
      religion: profile?.religion ?? '',
      maritalStatus: profile?.maritalStatus ?? '',
      job: profile?.job ?? '',
      nationality: profile?.nationality ?? '',
      userId,
    },
    validators: {
      onSubmit: ProfileInputSchema,
    },
    onSubmit: ({ value }) => {
      return mutate({
        id: profile?.id,
        input: {
          ...value,
          dateOfBirth: moment(value.dateOfBirthStr, 'YYYY-MM-DD').toDate(),
        },
      });
    },
  });

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="mb-8 text-2xl font-semibold">My Profile</h1>
      <form
        onSubmit={(e) => {
          console.log('clicked');
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <form.Field
            name="nik"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>NIK</FieldLabel>
                <FieldContent>
                  <Input disabled id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="name"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <form.Field
            name="placeOfBirth"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Place of Birth</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="dateOfBirthStr"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} type="date" value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="gender"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                <FieldContent>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value.toString()}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value as Gender)}
                    className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select gender</option>
                    <option value="L">Male</option>
                    <option value="P">Female</option>
                  </select>
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="bloodType"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Blood Type</FieldLabel>
                <FieldContent>
                  <select
                    id={field.name}
                    name={field.name}
                    value={String(field.state.value)}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value as BloodType)}
                    className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select blood type</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />
        </div>

        <form.Field
          name="address"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Address</FieldLabel>
              <FieldContent>
                <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
              </FieldContent>
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <form.Field
            name="rt"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>RT</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="rw"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>RW</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="village"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Village</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="district"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>District</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="city"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <form.Field
            name="religion"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Religion</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="maritalStatus"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Marital Status</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="job"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Job</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="nationality"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Nationality</FieldLabel>
                <FieldContent>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </FieldContent>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
