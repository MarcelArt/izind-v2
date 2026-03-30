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
import { User, MapPin, Briefcase, Save } from 'lucide-react';

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

  const { mutate, isPending } = useMutation(
    upsertProfileOption({
      onSuccess: () => {
        toast.success('Profile updated successfully');
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
    <div className="container-custom py-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
          <User className="size-4" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Profile Settings</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">Manage your personal information</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <User className="size-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Personal Information</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <form.Field
                name="nik"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      NIK
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        disabled
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 bg-muted/50 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="name"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Full Name
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
              <form.Field
                name="placeOfBirth"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Place of Birth
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="dateOfBirthStr"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Date of Birth
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="date"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="gender"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Gender
                    </FieldLabel>
                    <FieldContent>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value.toString()}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value as Gender)}
                        className="flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-2 py-1.5 text-xs font-medium shadow-sm placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select</option>
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
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Blood Type
                    </FieldLabel>
                    <FieldContent>
                      <select
                        id={field.name}
                        name={field.name}
                        value={String(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value as BloodType)}
                        className="flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-2 py-1.5 text-xs font-medium shadow-sm placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select</option>
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
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <MapPin className="size-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Address Information</h2>
            </div>
          </div>
          <div className="p-4">
            <form.Field
              name="address"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                    Full Address
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </FieldContent>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
              <form.Field
                name="rt"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      RT
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="rw"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      RW
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="village"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Village
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="district"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      District
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="city"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      City
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <Briefcase className="size-3.5 text-primary" />
              <h2 className="text-sm font-semibold">Professional Information</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <form.Field
                name="religion"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Religion
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="maritalStatus"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Marital Status
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="job"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Job
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="nationality"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-xs font-medium">
                      Nationality
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </FieldContent>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isPending} className="h-9 gap-1.5 text-sm">
            <Save className="size-3.5" />
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
