import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function RegisterSuccessPage() {
  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[480px] text-center">
        <div className="bg-background rounded-lg shadow-card border border-border p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto text-3xl">
            ✉️
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">Fast geschafft!</h1>
            <p className="text-muted text-sm mt-2">
              Bitte bestätige deine E-Mail-Adresse. Wir haben dir einen Bestätigungslink
              zugeschickt – schau auch in deinem Spam-Ordner nach.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <Link href="/login">
              <Button className="w-full">Zur Anmeldung</Button>
            </Link>
            <Link
              href="/"
              className="block text-sm text-muted hover:text-foreground transition-colors"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
