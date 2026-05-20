import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum – LocalEvents24',
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-foreground">Impressum</h1>

      {/* § 5 TMG */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          Angaben gemäß § 5 TMG
        </h2>
        <address className="not-italic text-sm text-foreground leading-relaxed space-y-0.5">
          <p className="font-medium">Henry Junginger</p>
          <p>
            <span className="inline-flex items-center gap-1.5 bg-warning/10 border border-warning/30 text-warning text-xs font-medium px-2 py-0.5 rounded">
              ⚠ Bitte ergänzen: Straße und Hausnummer
            </span>
          </p>
          <p>
            <span className="inline-flex items-center gap-1.5 bg-warning/10 border border-warning/30 text-warning text-xs font-medium px-2 py-0.5 rounded">
              ⚠ Bitte ergänzen: PLZ und Stadt
            </span>
          </p>
          <p>Deutschland</p>
        </address>
      </section>

      {/* Kontakt */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
        <dl className="text-sm text-foreground space-y-1">
          <div className="flex gap-2">
            <dt className="text-muted w-20 shrink-0">E-Mail:</dt>
            <dd>
              <a
                href="mailto:henryjunginger@gmail.com"
                className="text-primary hover:underline"
              >
                henryjunginger@gmail.com
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {/* Verantwortlich */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
        </h2>
        <p className="text-sm text-foreground">Henry Junginger</p>
        <p className="text-xs text-muted">
          (Anschrift wie oben)
        </p>
      </section>

      <hr className="border-border" />

      {/* Haftung für Inhalte */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          Haftungsausschluss
        </h2>
        <h3 className="text-sm font-semibold text-foreground mt-4">
          Haftung für Inhalte
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr
          übernommen werden. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
          Inhalte auf dieser Website nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
          oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
          die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
          Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis
          einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
          Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>

        <h3 className="text-sm font-semibold text-foreground mt-4">
          Haftung für Links
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
          keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
          Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
          Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
          Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
          waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
          Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
          Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
          derartige Links umgehend entfernen.
        </p>

        <h3 className="text-sm font-semibold text-foreground mt-4">
          Nutzergenerierte Inhalte
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          LocalEvents24 ermöglicht es Nutzern, eigene Event-Einträge zu erstellen. Für diese
          nutzergenerierten Inhalte übernehmen wir keine Haftung. Solltest du rechtswidrige
          Inhalte entdecken, wende dich bitte an{' '}
          <a href="mailto:henryjunginger@gmail.com" className="text-primary hover:underline">
            henryjunginger@gmail.com
          </a>
          . Wir werden gemeldete Inhalte unverzüglich prüfen und ggf. entfernen.
        </p>
      </section>

      <hr className="border-border" />

      {/* Urheberrecht */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Urheberrecht</h2>
        <p className="text-sm text-muted leading-relaxed">
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website
          unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
          und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
          schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
          dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
          Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
          gekennzeichnet. Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam
          werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </section>

      <hr className="border-border" />

      {/* Datenschutz */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Datenschutz</h2>
        <p className="text-sm text-muted leading-relaxed">
          Informationen zur Verarbeitung deiner personenbezogenen Daten findest du in unserer{' '}
          <a href="/datenschutz" className="text-primary hover:underline">
            Datenschutzerklärung
          </a>
          .
        </p>
      </section>

      {/* Stand */}
      <p className="text-xs text-muted border-t border-border pt-6">
        Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
}
