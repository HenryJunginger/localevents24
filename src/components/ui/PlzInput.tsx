'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

type LocationState = 'idle' | 'loading' | 'error';

const ERROR_MESSAGES: Record<string, string> = {
  not_german: 'Dein Standort liegt nicht in Deutschland.',
  no_plz: 'Keine Postleitzahl für deinen Standort gefunden.',
  network_error: 'Standort konnte nicht ermittelt werden.',
  permission_denied: 'Standortzugriff wurde verweigert.',
  position_unavailable: 'Standort ist nicht verfügbar.',
  timeout: 'Standortabfrage hat zu lange gedauert.',
  unsupported: 'Dein Browser unterstützt keine Standortermittlung.',
};

interface PlzInputProps {
  className?: string;
  id?: string;
}

export function PlzInput({ className, id = 'plz' }: PlzInputProps) {
  const [value, setValue] = useState('');
  const [locationState, setLocationState] = useState<LocationState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLocationClick = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationState('error');
      setErrorMessage(ERROR_MESSAGES.unsupported);
      return;
    }

    setLocationState('loading');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`);
          const data = await response.json();

          if (!response.ok || 'type' in data) {
            setLocationState('error');
            setErrorMessage(ERROR_MESSAGES[data.type] ?? ERROR_MESSAGES.network_error);
            return;
          }

          setValue(data.plz);
          setLocationState('idle');
        } catch {
          setLocationState('error');
          setErrorMessage(ERROR_MESSAGES.network_error);
        }
      },
      (error) => {
        setLocationState('error');
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMessage(ERROR_MESSAGES.permission_denied);
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setErrorMessage(ERROR_MESSAGES.position_unavailable);
        } else if (error.code === error.TIMEOUT) {
          setErrorMessage(ERROR_MESSAGES.timeout);
        } else {
          setErrorMessage(ERROR_MESSAGES.network_error);
        }
      },
      { timeout: 10000 },
    );
  }, []);

  return (
    <div className={cn('flex flex-col gap-1 w-full sm:max-w-[200px]', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        PLZ / Ort
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (locationState === 'error') {
              setLocationState('idle');
              setErrorMessage(null);
            }
          }}
          placeholder="z.B. 89522 Heidenheim"
          className={cn(
            'w-full border border-border rounded-md bg-background text-foreground placeholder:text-muted',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'py-2.5 pl-3 pr-9 text-sm transition',
            locationState === 'error' && 'border-red-400 focus:ring-red-400',
          )}
        />
        <button
          type="button"
          onClick={handleLocationClick}
          disabled={locationState === 'loading'}
          className="absolute right-2.5 text-muted hover:text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Aktuellen Standort verwenden"
          title="Aktuellen Standort verwenden"
        >
          {locationState === 'loading' ? <SpinnerIcon /> : <LocationPinIcon />}
        </button>
      </div>
      {locationState === 'error' && errorMessage && (
        <p role="alert" className="text-xs text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
