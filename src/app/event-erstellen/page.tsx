'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { EVENT_CATEGORIES } from '@/lib/categories';
import { saveEvent } from '@/lib/events';
import { eventSchema, type EventFormData } from '@/lib/validators/event';
import { cn } from '@/lib/utils';

export default function EventErstellenPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({ resolver: zodResolver(eventSchema) });

  async function onSubmit(data: EventFormData) {
    saveEvent(data);
    router.push('/');
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Event erstellen</h1>
        <p className="text-sm text-muted mt-1">
          Füge ein neues Event hinzu – es erscheint sofort in der Übersicht.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-background border border-border rounded-lg shadow-card p-6 space-y-5"
      >
        <Input
          id="title"
          label="Titel"
          placeholder="z.B. Sommerkonzert im Stadtpark"
          error={errors.title?.message}
          {...register('title')}
        />

        <Input
          id="location"
          label="Ort / Adresse"
          placeholder="z.B. Stadtpark, 89522 Heidenheim"
          error={errors.location?.message}
          {...register('location')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="date"
            type="date"
            label="Datum"
            min={today}
            error={errors.date?.message}
            {...register('date')}
          />

          <Input
            id="time"
            type="time"
            label="Uhrzeit"
            error={errors.time?.message}
            {...register('time')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="categoryId" className="text-sm font-semibold text-foreground">
            Kategorie
          </label>
          <select
            id="categoryId"
            className={cn(
              'w-full border rounded-md bg-background text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'py-2.5 px-3 text-sm transition',
              errors.categoryId ? 'border-danger' : 'border-border',
            )}
            defaultValue=""
            {...register('categoryId')}
          >
            <option value="" disabled>
              Bitte wählen …
            </option>
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-danger">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-semibold text-foreground">
            Beschreibung{' '}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="Kurze Beschreibung des Events …"
            className={cn(
              'w-full border border-border rounded-md bg-background text-foreground placeholder:text-muted',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'py-2.5 px-3 text-sm transition resize-none',
            )}
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-danger">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-1">
          <Button type="submit" className="flex-1" isLoading={isSubmitting}>
            Event veröffentlichen
          </Button>
          <Link href="/">
            <Button type="button" variant="secondary">
              Abbrechen
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
