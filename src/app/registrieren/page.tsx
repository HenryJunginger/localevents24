'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { PasswordStrength } from '@/components/ui/PasswordStrength';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { registerSchema, type RegisterFormData } from '@/lib/validators/auth';

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { newsletter: false },
  });

  const passwordValue = watch('password') ?? '';

  async function onSubmit(data: RegisterFormData) {
    await new Promise((r) => setTimeout(r, 800));
    console.log('Registrierung:', data);
    router.push('/registrieren/erfolg');
  }

  return (
    <AuthLayout
      title="Konto erstellen"
      subtitle="Finde Events in deiner Nähe und behalte deine Favoriten im Blick."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          id="email"
          type="email"
          label="E-Mail"
          placeholder="deine@email.de"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="space-y-2">
          <PasswordInput
            id="password"
            label="Passwort"
            placeholder="Mindestens 8 Zeichen, 1 Großbuchstabe, 1 Zahl"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordStrength password={passwordValue} />
        </div>

        <PasswordInput
          id="passwordConfirm"
          label="Passwort wiederholen"
          placeholder="Passwort erneut eingeben"
          autoComplete="new-password"
          error={errors.passwordConfirm?.message}
          {...register('passwordConfirm')}
        />

        <Input
          id="plz"
          label="Postleitzahl"
          placeholder="z.B. 89522"
          maxLength={5}
          inputMode="numeric"
          error={errors.plz?.message}
          {...register('plz')}
        />

        <div className="space-y-3 pt-1">
          <Checkbox
            id="agbAccepted"
            error={errors.agbAccepted?.message}
            label={
              <>
                Ich akzeptiere die{' '}
                <Link href="/agb" className="text-primary hover:underline">
                  AGB
                </Link>{' '}
                und{' '}
                <Link href="/datenschutz" className="text-primary hover:underline">
                  Datenschutzerklärung
                </Link>
                .
              </>
            }
            {...register('agbAccepted')}
          />

          <Checkbox
            id="newsletter"
            label="Newsletter abonnieren – Wir informieren dich über neue Events in deiner Nähe."
            {...register('newsletter')}
          />
        </div>

        <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
          Konto erstellen
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Bereits ein Konto?{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Jetzt anmelden
        </Link>
      </p>
    </AuthLayout>
  );
}
