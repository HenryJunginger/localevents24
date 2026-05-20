import { z } from 'zod';
import { EVENT_CATEGORIES } from '@/lib/categories';

export const eventSchema = z.object({
  title: z
    .string()
    .min(3, 'Mindestens 3 Zeichen erforderlich.')
    .max(100, 'Maximal 100 Zeichen.'),
  location: z
    .string()
    .min(3, 'Mindestens 3 Zeichen erforderlich.')
    .max(200, 'Maximal 200 Zeichen.'),
  date: z
    .string()
    .min(1, 'Datum ist erforderlich.')
    .refine((v) => !isNaN(Date.parse(v)), 'Ungültiges Datum.'),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Uhrzeit ist erforderlich.'),
  categoryId: z
    .string()
    .refine(
      (v) => EVENT_CATEGORIES.some((c) => c.id === v),
      'Bitte wähle eine Kategorie.',
    ),
  description: z.string().max(500, 'Maximal 500 Zeichen.').optional(),
});

export type EventFormData = z.infer<typeof eventSchema>;
