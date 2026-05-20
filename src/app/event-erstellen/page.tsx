'use client';
// TODO: Protect this route – only authenticated users should be able to create events

import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, useWatch, Controller, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import { de } from 'react-day-picker/locale';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/categories';
import { eventSchema, type EventFormValues } from '@/lib/validators/event';
import { Button } from '@/components/ui/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

type ImageEntry = { file: File; url: string };

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'grundinfos', label: 'Grundinfos', number: 1 },
  { id: 'datum', label: 'Datum & Uhrzeit', number: 2 },
  { id: 'ort', label: 'Ort', number: 3 },
  { id: 'bilder', label: 'Bilder', number: 4 },
  { id: 'preis', label: 'Preis & Tickets', number: 5 },
  { id: 'kontakt', label: 'Kontakt', number: 6 },
] as const;

const DRAFT_KEY = 'localevents24-event-draft';

// ─── Helper: format date for display ─────────────────────────────────────────

function formatDateDE(isoDate: string): string {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-');
  return `${d}.${m}.${y}`;
}

function isoToDate(isoDate: string): Date | undefined {
  if (!isoDate) return undefined;
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

function dateToIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function calculateFilledSections(values: Partial<EventFormValues>, images: ImageEntry[]): number {
  let count = 0;
  if (values.title && values.category && values.shortDescription && values.description) count++;
  if (values.startDate && values.startTime) count++;
  if (values.street && values.plz && values.city) count++;
  if (images.length > 0) count++;
  if (values.admission) count++;
  if (values.organizerName && values.contactEmail) count++;
  return count;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground mb-1">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function CharCounter({ current, max }: { current: number; max: number }) {
  const near = current > max * 0.85;
  const over = current > max;
  return (
    <span
      className={cn(
        'text-xs',
        over ? 'text-red-500 font-semibold' : near ? 'text-amber-500' : 'text-muted',
      )}
    >
      {current}/{max}
    </span>
  );
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="relative group inline-flex items-center ml-1.5">
      <button
        type="button"
        className="w-4 h-4 rounded-full bg-muted/20 text-muted text-[10px] font-bold flex items-center justify-center hover:bg-primary-light hover:text-primary transition cursor-help"
        tabIndex={-1}
        aria-label="Info"
      >
        ?
      </button>
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 px-3 py-2 bg-foreground text-background text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-normal text-center leading-snug">
        {text}
        <span className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-foreground" />
      </span>
    </span>
  );
}

function SectionCard({
  id,
  number,
  title,
  hasError,
  children,
}: {
  id: string;
  number: number;
  title: string;
  hasError?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={cn(
        'bg-background rounded-lg border shadow-card p-6 scroll-mt-8 transition-colors',
        hasError ? 'border-red-400' : 'border-border',
      )}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className={cn(
            'w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0',
            hasError
              ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-primary-light text-primary',
          )}
        >
          {number}
        </span>
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">{title}</h2>
        {hasError && (
          <span className="ml-auto text-xs text-red-500 font-medium">Bitte prüfen</span>
        )}
      </div>
      {children}
    </div>
  );
}

function DatePickerField({
  label,
  required,
  value,
  onChange,
  error,
  minDate,
  placeholder = 'Datum wählen',
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  minDate?: Date;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = isoToDate(value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (date: Date | undefined) => {
    onChange(date ? dateToIso(date) : '');
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <Label required={required}>{label}</Label>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={cn(
          'w-full text-left border rounded-md bg-background text-foreground px-3 py-2.5 text-sm transition',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'flex items-center justify-between',
          error ? 'border-red-400' : 'border-border',
          !value && 'text-muted',
        )}
      >
        <span>{value ? formatDateDE(value) : placeholder}</span>
        <CalendarIcon />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-background border border-border rounded-lg shadow-lg">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={de}
            disabled={minDate ? { before: minDate } : undefined}
            defaultMonth={selected ?? minDate ?? new Date()}
          />
        </div>
      )}
      <FieldError message={error} />
    </div>
  );
}

function ImageUploadSection({
  images,
  onAdd,
  onRemove,
}: {
  images: ImageEntry[];
  onAdd: (entries: ImageEntry[]) => void;
  onRemove: (index: number) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [sizeError, setSizeError] = useState('');

  const MAX_IMAGES = 5;
  const MAX_SIZE_BYTES = 5 * 1024 * 1024;
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const processFiles = (rawFiles: File[]) => {
    setSizeError('');
    const oversized = rawFiles.filter(f => f.size > MAX_SIZE_BYTES);
    if (oversized.length > 0) {
      setSizeError(`${oversized.length} Bild(er) übersteigen die maximale Größe von 5 MB.`);
    }
    const valid = rawFiles
      .filter(f => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_SIZE_BYTES)
      .slice(0, MAX_IMAGES - images.length);
    if (valid.length > 0) {
      onAdd(valid.map(f => ({ file: f, url: URL.createObjectURL(f) })));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {images.length < MAX_IMAGES && (
        <div
          onDragOver={e => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition',
            isDragOver
              ? 'border-primary bg-primary-light'
              : 'border-border hover:border-primary hover:bg-primary-light/30',
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <UploadIcon />
          <p className="text-sm text-muted mt-3">
            Bilder hierher ziehen oder{' '}
            <span className="text-primary font-semibold">klicken zum Auswählen</span>
          </p>
          <p className="text-xs text-muted mt-1">
            JPG, PNG, WebP · max. 5 MB pro Bild · bis zu {MAX_IMAGES} Bilder
          </p>
        </div>
      )}

      {sizeError && <p className="text-xs text-red-500">{sizeError}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((entry, index) => (
            <div key={entry.url} className="relative group aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={entry.url}
                alt=""
                className="w-full h-full object-cover rounded-lg border border-border"
              />
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 rounded font-semibold shadow">
                  Hauptbild
                </span>
              )}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black/80"
                aria-label="Bild entfernen"
              >
                <XIcon />
              </button>
            </div>
          ))}
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted hover:border-primary hover:text-primary transition"
            >
              <span className="text-2xl">+</span>
              <span className="text-xs mt-1">Weiteres Bild</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function SidebarNav({
  active,
  sectionErrors,
}: {
  active: string;
  sectionErrors: Record<string, boolean>;
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav aria-label="Abschnitte">
      <p className="text-xs font-bold text-muted uppercase tracking-wide mb-3">Abschnitte</p>
      <ul className="space-y-1">
        {SECTIONS.map(section => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => scrollTo(section.id)}
              className={cn(
                'w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition',
                active === section.id
                  ? 'bg-primary-light text-primary font-semibold'
                  : 'text-muted hover:text-foreground hover:bg-surface',
              )}
            >
              <span
                className={cn(
                  'w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0',
                  sectionErrors[section.id]
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    : active === section.id
                      ? 'bg-primary text-white'
                      : 'bg-surface text-muted',
                )}
              >
                {section.number}
              </span>
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Dialog({
  title,
  children,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-background rounded-xl border border-border shadow-xl p-6 max-w-sm w-full">
        <h3 className="font-bold text-foreground mb-2">{title}</h3>
        <div className="text-sm text-muted mb-5">{children}</div>
        <div className="flex gap-3 justify-end">{actions}</div>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted mx-auto">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const DEFAULT_VALUES: Partial<EventFormValues> = {
  admission: 'free',
  title: '',
  shortDescription: '',
  description: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  venueName: '',
  street: '',
  plz: '',
  city: '',
  ticketLink: '',
  organizerName: '',
  contactEmail: '',
  phone: '',
  website: '',
};

export default function EventErstellenPage() {
  const router = useRouter();
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [activeSection, setActiveSection] = useState('grundinfos');
  const [pendingDraft, setPendingDraft] = useState<Partial<EventFormValues> | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? (JSON.parse(raw) as Partial<EventFormValues>) : null;
    } catch {
      return null;
    }
  });
  const [showDraftDialog, setShowDraftDialog] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(DRAFT_KEY);
  });
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [sectionErrors, setSectionErrors] = useState<Record<string, boolean>>({});

  const isDirtyRef = useRef(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: DEFAULT_VALUES as EventFormValues,
  });

  const watchedValues = useWatch({ control });
  const admission = watchedValues.admission;
  const filledSections = calculateFilledSections(watchedValues as Partial<EventFormValues>, images);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirtyRef.current) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(getValues()));
      }
    }, 10_000);
    return () => clearInterval(interval);
  }, [getValues]);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(entry => URL.revokeObjectURL(entry.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addImages = useCallback((entries: ImageEntry[]) => {
    setImages(prev => [...prev, ...entries].slice(0, 5));
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const computeSectionErrors = (errs: FieldErrors<EventFormValues>): Record<string, boolean> => ({
    grundinfos: !!(errs.title || errs.category || errs.shortDescription || errs.description),
    datum: !!(errs.startDate || errs.startTime || errs.endDate || errs.endTime),
    ort: !!(errs.street || errs.plz || errs.city),
    bilder: false,
    preis: !!(errs.priceFrom || errs.ticketLink),
    kontakt: !!(errs.organizerName || errs.contactEmail || errs.website),
  });

  const onSubmit = (data: EventFormValues) => {
    const imageFiles = images.map(e => e.file);
    console.log('Event-Daten:', { ...data, images: imageFiles });
    localStorage.removeItem(DRAFT_KEY);
    router.push('/event-erstellen/erfolg');
  };

  const onError = (errs: FieldErrors<EventFormValues>) => {
    const secErrs = computeSectionErrors(errs);
    setSectionErrors(secErrs);
    const firstSection = SECTIONS.find(s => secErrs[s.id]);
    if (firstSection) {
      const el = document.getElementById(firstSection.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSaveDraft = () => {
    const values = getValues();
    localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    console.log('Entwurf gespeichert (wird später in DB gespeichert):', values);
  };

  const handleCancel = () => {
    if (isDirty || images.length > 0) {
      setShowCancelDialog(true);
    } else {
      router.push('/');
    }
  };

  const handleRestoreDraft = () => {
    if (pendingDraft) reset(pendingDraft as EventFormValues);
    setShowDraftDialog(false);
    setPendingDraft(null);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setShowDraftDialog(false);
    setPendingDraft(null);
  };

  const inputClass = (hasError?: boolean) =>
    cn(
      'w-full border rounded-md bg-background text-foreground placeholder:text-muted',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
      'py-2.5 px-3 text-sm transition',
      hasError ? 'border-red-400' : 'border-border',
    );

  return (
    <div className="bg-surface min-h-full py-8 px-4">
      {/* Dialogs */}
      {showDraftDialog && (
        <Dialog
          title="Entwurf gefunden"
          actions={
            <>
              <Button variant="secondary" size="sm" onClick={handleDiscardDraft}>
                Verwerfen
              </Button>
              <Button variant="primary" size="sm" onClick={handleRestoreDraft}>
                Wiederherstellen
              </Button>
            </>
          }
        >
          Du hast einen gespeicherten Entwurf. Möchtest du ihn wiederherstellen?
        </Dialog>
      )}
      {showCancelDialog && (
        <Dialog
          title="Formular verlassen?"
          actions={
            <>
              <Button variant="secondary" size="sm" onClick={() => setShowCancelDialog(false)}>
                Weiterbearbeiten
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowCancelDialog(false);
                  router.push('/');
                }}
              >
                Ja, abbrechen
              </Button>
            </>
          }
        >
          Du hast ungespeicherte Änderungen. Wenn du jetzt abbrichst, gehen sie verloren.
        </Dialog>
      )}

      <div className="max-w-[960px] mx-auto">
        <div className="lg:flex lg:gap-8">
          {/* ── Main form ─────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 max-w-[720px]">
            <h1 className="text-2xl font-bold text-foreground mb-2">Event erstellen</h1>
            <p className="text-sm text-muted mb-6">
              Fülle alle Pflichtfelder aus, um dein Event zu veröffentlichen.
            </p>

            {/* Progress indicator */}
            <div className="bg-background rounded-lg border border-border shadow-card p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">
                  {filledSections} von 6 Abschnitten ausgefüllt
                </span>
                <span className="text-xs text-muted">
                  {Math.round((filledSections / 6) * 100)}%
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(filledSections / 6) * 100}%` }}
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              noValidate
              className="space-y-5"
            >
              {/* ── Section 1: Grundinfos ─────────────────────────────────── */}
              <SectionCard
                id="grundinfos"
                number={1}
                title="Grundinfos"
                hasError={sectionErrors['grundinfos']}
              >
                <div className="space-y-5">
                  {/* Titel */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="title" required>
                        Titel
                      </Label>
                      <CharCounter current={watchedValues.title?.length ?? 0} max={80} />
                    </div>
                    <input
                      id="title"
                      placeholder="z.B. Sommerfest im Stadtpark"
                      maxLength={80}
                      className={inputClass(!!errors.title)}
                      {...register('title')}
                    />
                    <FieldError message={errors.title?.message} />
                  </div>

                  {/* Kategorie */}
                  <div>
                    <Label htmlFor="category" required>
                      Kategorie
                    </Label>
                    <select
                      id="category"
                      className={cn(inputClass(!!errors.category), 'cursor-pointer')}
                      {...register('category')}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Kategorie wählen …
                      </option>
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.emoji} {cat.label}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.category?.message} />
                  </div>

                  {/* Kurzbeschreibung */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="shortDescription" required>
                        Kurzbeschreibung
                      </Label>
                      <CharCounter
                        current={watchedValues.shortDescription?.length ?? 0}
                        max={200}
                      />
                    </div>
                    <input
                      id="shortDescription"
                      placeholder="Kurze Beschreibung für die Listenansicht"
                      maxLength={200}
                      className={inputClass(!!errors.shortDescription)}
                      {...register('shortDescription')}
                    />
                    <FieldError message={errors.shortDescription?.message} />
                  </div>

                  {/* Beschreibung */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="description" required>
                        Beschreibung
                      </Label>
                      <CharCounter current={watchedValues.description?.length ?? 0} max={2000} />
                    </div>
                    <textarea
                      id="description"
                      placeholder="Vollständige Beschreibung deines Events …"
                      maxLength={2000}
                      rows={6}
                      className={cn(inputClass(!!errors.description), 'resize-y')}
                      {...register('description')}
                    />
                    <FieldError message={errors.description?.message} />
                  </div>
                </div>
              </SectionCard>

              {/* ── Section 2: Datum & Uhrzeit ───────────────────────────── */}
              <SectionCard
                id="datum"
                number={2}
                title="Datum & Uhrzeit"
                hasError={sectionErrors['datum']}
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-1 text-xs text-muted bg-surface rounded-md px-3 py-2">
                    <InfoTooltip text="Mehrtägige Events sind möglich – gib einfach ein Enddatum an." />
                    <span>Mehrtägige Events sind möglich</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Startdatum */}
                    <Controller
                      control={control}
                      name="startDate"
                      render={({ field }) => (
                        <DatePickerField
                          label="Startdatum"
                          required
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          error={errors.startDate?.message}
                          minDate={new Date()}
                        />
                      )}
                    />

                    {/* Startzeit */}
                    <div>
                      <Label htmlFor="startTime" required>
                        Startzeit
                      </Label>
                      <input
                        id="startTime"
                        type="time"
                        className={inputClass(!!errors.startTime)}
                        {...register('startTime')}
                      />
                      <FieldError message={errors.startTime?.message} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Enddatum */}
                    <Controller
                      control={control}
                      name="endDate"
                      render={({ field }) => (
                        <DatePickerField
                          label="Enddatum (optional)"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          error={errors.endDate?.message}
                          minDate={
                            watchedValues.startDate
                              ? (isoToDate(watchedValues.startDate) ?? new Date())
                              : new Date()
                          }
                        />
                      )}
                    />

                    {/* Endzeit */}
                    <div>
                      <Label htmlFor="endTime">Endzeit (optional)</Label>
                      <input
                        id="endTime"
                        type="time"
                        className={inputClass(!!errors.endTime)}
                        {...register('endTime')}
                      />
                      <FieldError message={errors.endTime?.message} />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* ── Section 3: Ort ────────────────────────────────────────── */}
              <SectionCard id="ort" number={3} title="Ort" hasError={sectionErrors['ort']}>
                <div className="space-y-4">
                  <p className="text-xs text-muted bg-surface rounded-md px-3 py-2">
                    Die genaue Adresse hilft Nutzern, dein Event zu finden.
                  </p>

                  {/* Veranstaltungsname */}
                  <div>
                    <Label htmlFor="venueName">Veranstaltungsort (optional)</Label>
                    <input
                      id="venueName"
                      placeholder="z.B. Stadthalle Aalen"
                      className={inputClass()}
                      {...register('venueName')}
                    />
                  </div>

                  {/* Straße */}
                  <div>
                    <Label htmlFor="street" required>
                      Straße und Hausnummer
                    </Label>
                    <input
                      id="street"
                      placeholder="z.B. Musterstraße 12"
                      className={inputClass(!!errors.street)}
                      {...register('street')}
                    />
                    <FieldError message={errors.street?.message} />
                  </div>

                  <div className="grid grid-cols-[140px_1fr] gap-4">
                    {/* PLZ */}
                    <div>
                      <Label htmlFor="plz" required>
                        PLZ
                      </Label>
                      <input
                        id="plz"
                        placeholder="73430"
                        maxLength={5}
                        inputMode="numeric"
                        className={inputClass(!!errors.plz)}
                        {...register('plz')}
                      />
                      <FieldError message={errors.plz?.message} />
                    </div>

                    {/* Stadt */}
                    <div>
                      <Label htmlFor="city" required>
                        Stadt
                      </Label>
                      <input
                        id="city"
                        placeholder="Aalen"
                        className={inputClass(!!errors.city)}
                        {...register('city')}
                      />
                      <FieldError message={errors.city?.message} />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* ── Section 4: Bilder ─────────────────────────────────────── */}
              <SectionCard id="bilder" number={4} title="Bilder">
                <ImageUploadSection
                  images={images}
                  onAdd={addImages}
                  onRemove={removeImage}
                />
              </SectionCard>

              {/* ── Section 5: Preis & Tickets ────────────────────────────── */}
              <SectionCard
                id="preis"
                number={5}
                title="Preis & Tickets"
                hasError={sectionErrors['preis']}
              >
                <div className="space-y-4">
                  {/* Eintritt Radio */}
                  <div>
                    <Label required>Eintritt</Label>
                    <div className="flex gap-4 mt-2">
                      {(
                        [
                          { value: 'free', label: 'Kostenlos' },
                          { value: 'paid', label: 'Kostenpflichtig' },
                          { value: 'donation', label: 'Spende' },
                        ] as const
                      ).map(opt => (
                        <label
                          key={opt.value}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="radio"
                            value={opt.value}
                            className="accent-primary"
                            {...register('admission')}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preis (nur wenn kostenpflichtig) */}
                  {admission === 'paid' && (
                    <div>
                      <Label htmlFor="priceFrom" required>
                        Preis ab (EUR)
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                          €
                        </span>
                        <input
                          id="priceFrom"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0,00"
                          className={cn(inputClass(!!errors.priceFrom), 'pl-7')}
                          {...register('priceFrom', {
                            setValueAs: v => (v === '' || v === null ? undefined : parseFloat(v)),
                          })}
                        />
                      </div>
                      <FieldError message={errors.priceFrom?.message} />
                    </div>
                  )}

                  {/* Ticket-Link */}
                  <div>
                    <Label htmlFor="ticketLink">Ticket-Link (optional)</Label>
                    <input
                      id="ticketLink"
                      type="url"
                      placeholder="https://tickets.example.com"
                      className={inputClass(!!errors.ticketLink)}
                      {...register('ticketLink')}
                    />
                    <FieldError message={errors.ticketLink?.message} />
                  </div>
                </div>
              </SectionCard>

              {/* ── Section 6: Kontakt ────────────────────────────────────── */}
              <SectionCard
                id="kontakt"
                number={6}
                title="Kontakt"
                hasError={sectionErrors['kontakt']}
              >
                <div className="space-y-4">
                  {/* Veranstalter */}
                  <div>
                    <Label htmlFor="organizerName" required>
                      Veranstalter-Name
                    </Label>
                    <input
                      id="organizerName"
                      placeholder="z.B. Kulturverein Aalen e.V."
                      className={inputClass(!!errors.organizerName)}
                      {...register('organizerName')}
                    />
                    <FieldError message={errors.organizerName?.message} />
                  </div>

                  {/* E-Mail */}
                  <div>
                    <Label htmlFor="contactEmail" required>
                      Kontakt-E-Mail
                    </Label>
                    <input
                      id="contactEmail"
                      type="email"
                      placeholder="kontakt@example.com"
                      className={inputClass(!!errors.contactEmail)}
                      {...register('contactEmail')}
                    />
                    <FieldError message={errors.contactEmail?.message} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Telefon */}
                    <div>
                      <Label htmlFor="phone">Telefonnummer (optional)</Label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+49 7361 …"
                        className={inputClass()}
                        {...register('phone')}
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <Label htmlFor="website">Website (optional)</Label>
                      <input
                        id="website"
                        type="url"
                        placeholder="https://example.com"
                        className={inputClass(!!errors.website)}
                        {...register('website')}
                      />
                      <FieldError message={errors.website?.message} />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* ── Actions ───────────────────────────────────────────────── */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-12">
                <Button type="submit" variant="primary" size="lg" className="sm:flex-1">
                  Event veröffentlichen
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleSaveDraft}
                >
                  Als Entwurf speichern
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={handleCancel}
                  className="text-muted hover:text-foreground"
                >
                  Abbrechen
                </Button>
              </div>
            </form>
          </div>

          {/* ── Sticky Sidebar ────────────────────────────────────────────── */}
          <div className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-8 space-y-6">
              <SidebarNav active={activeSection} sectionErrors={sectionErrors} />
              <div className="bg-background rounded-lg border border-border shadow-card p-4">
                <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2">
                  Fortschritt
                </p>
                <p className="text-2xl font-bold text-primary">
                  {Math.round((filledSections / 6) * 100)}%
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {filledSections} / 6 ausgefüllt
                </p>
                <div className="w-full bg-surface rounded-full h-1.5 mt-3">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(filledSections / 6) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
