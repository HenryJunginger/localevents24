import { z } from 'zod';

const optionalUrl = z
  .string()
  .refine(val => !val || /^https?:\/\/.+/.test(val), {
    message: 'Bitte eine gültige URL eingeben (z.B. https://...)',
  })
  .optional();

export const eventSchema = z
  .object({
    // Abschnitt 1
    title: z.string().min(1, 'Titel ist Pflicht').max(80, 'Maximale Länge: 80 Zeichen'),
    category: z.enum(['sport', 'kultur', 'bildung', 'nightlife', 'familie', 'maerkte'], {
      error: 'Bitte wähle eine Kategorie',
    }),
    shortDescription: z
      .string()
      .min(1, 'Kurzbeschreibung ist Pflicht')
      .max(200, 'Maximale Länge: 200 Zeichen'),
    description: z
      .string()
      .min(1, 'Beschreibung ist Pflicht')
      .max(2000, 'Maximale Länge: 2000 Zeichen'),

    // Abschnitt 2
    startDate: z.string().min(1, 'Startdatum ist Pflicht'),
    startTime: z.string().min(1, 'Startzeit ist Pflicht'),
    endDate: z.string().optional(),
    endTime: z.string().optional(),

    // Abschnitt 3
    venueName: z.string().optional(),
    street: z.string().min(1, 'Straße und Hausnummer sind Pflicht'),
    plz: z.string().regex(/^\d{5}$/, 'Bitte eine gültige PLZ eingeben (5 Ziffern)'),
    city: z.string().min(1, 'Stadt ist Pflicht'),

    // Abschnitt 5
    admission: z.enum(['free', 'paid', 'donation']),
    priceFrom: z.number().min(0, 'Preis muss mindestens 0 EUR sein').optional().nullable(),
    ticketLink: optionalUrl,

    // Abschnitt 6
    organizerName: z.string().min(1, 'Veranstalter-Name ist Pflicht'),
    contactEmail: z.string().email('Bitte eine gültige E-Mail-Adresse eingeben'),
    phone: z.string().optional(),
    website: optionalUrl,
  })
  .superRefine((data, ctx) => {
    if (data.endDate && data.startDate) {
      const start = new Date(`${data.startDate}T${data.startTime || '00:00'}`);
      const end = new Date(`${data.endDate}T${data.endTime || '23:59'}`);
      if (end < start) {
        ctx.addIssue({
          code: 'custom',
          message: 'Enddatum/-zeit darf nicht vor dem Startdatum/-zeit liegen',
          path: ['endDate'],
        });
      }
    }
    if (data.admission === 'paid' && (data.priceFrom === null || data.priceFrom === undefined)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Bitte gib einen Preis ein',
        path: ['priceFrom'],
      });
    }
  });

export type EventFormValues = z.infer<typeof eventSchema>;
