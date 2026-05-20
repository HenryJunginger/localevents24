'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validators/auth';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(data: ForgotPasswordFormData) {
    await new Promise((r) => setTimeout(r, 800));
    console.log('Passwort-Reset:', data);
    setSubmitted(true);
  }

  return (
    <AuthLayout
      title="Passwort vergessen"
      subtitle="Gib deine E-Mail-Adresse ein und wir senden dir einen Reset-Link."
    >
      {submitted ? (
        <div className="space-y-4">
          <div className="rounded-md bg-primary-light border border-primary/20 p-4 text-sm text-foreground">
            Falls die E-Mail-Adresse bei uns registriert ist, erhältst du in Kürze einen Link
            zum Zurücksetzen deines Passworts.
          </div>
          <Link href="/login">
            <Button variant="secondary" className="w-full">
              Zurück zur Anmeldung
            </Button>
          </Link>
        </div>
      ) : (
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

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Reset-Link anfordern
          </Button>

          <p className="text-center text-sm text-muted">
            <Link href="/login" className="text-primary hover:underline">
              Zurück zur Anmeldung
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
