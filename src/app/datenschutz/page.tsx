import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – LocalEvents24',
  description: 'Informationen zur Verarbeitung personenbezogener Daten auf LocalEvents24.',
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <div className="bg-surface min-h-full py-10 px-4">
      <article className="max-w-2xl mx-auto bg-background border border-border rounded-lg shadow-card p-8 sm:p-10">
        <header className="mb-8 pb-6 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
            Rechtliches
          </p>
          <h1 className="text-2xl font-bold text-foreground">Datenschutzerklärung</h1>
          <p className="text-sm text-muted mt-1">Stand: Mai 2026</p>
        </header>

        <div className="prose-custom space-y-8 text-sm leading-relaxed text-foreground">

          {/* Einleitung */}
          <section>
            <p>
              Wir freuen uns über Ihr Interesse an LocalEvents24. Der Schutz Ihrer
              personenbezogenen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir
              Sie gemäß Art.&nbsp;13 und 14 der Datenschutz-Grundverordnung (DSGVO) über die
              Verarbeitung personenbezogener Daten bei der Nutzung unserer Website.
            </p>
          </section>

          {/* 1. Verantwortlicher */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">1. Verantwortlicher</h2>
            <p className="mb-3">
              Verantwortlicher im Sinne der DSGVO ist:
            </p>
            <address className="not-italic bg-surface border border-border rounded-md p-4 text-sm space-y-0.5 mb-3">
              <p className="font-semibold">LocalEvents24</p>
              <p className="text-amber-700 font-medium">[Vollständiger Name des Betreibers / Firma]</p>
              <p className="text-amber-700">[Straße und Hausnummer]</p>
              <p className="text-amber-700">[PLZ und Ort]</p>
              <p className="mt-2">
                E-Mail:{' '}
                <a
                  href="mailto:datenschutz@localevents24.de"
                  className="text-primary hover:underline"
                >
                  <span className="text-amber-700">[datenschutz@ihre-domain.de]</span>
                </a>
              </p>
            </address>
            <p className="text-xs text-muted mt-2">
              ⚠ Bitte ergänzen Sie die mit [ ] markierten Angaben vor der Veröffentlichung.
            </p>
          </section>

          {/* 2. Überblick */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">
              2. Überblick der Verarbeitungen
            </h2>
            <p className="mb-4">
              Die folgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer
              Verarbeitung zusammen und verweist auf die betroffenen Personen.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-border rounded-md overflow-hidden">
                <thead className="bg-surface">
                  <tr>
                    <th className="text-left font-semibold p-3 border-b border-border">Datenkategorie</th>
                    <th className="text-left font-semibold p-3 border-b border-border">Zweck</th>
                    <th className="text-left font-semibold p-3 border-b border-border">Rechtsgrundlage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 align-top">Zugriffsdaten (IP-Adresse, Browser, Zeitstempel)</td>
                    <td className="p-3 align-top">Sicherer Serverbetrieb</td>
                    <td className="p-3 align-top">Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO</td>
                  </tr>
                  <tr>
                    <td className="p-3 align-top">
                      Standortkoordinaten (nur bei aktiver Nutzung der Standortfunktion)
                    </td>
                    <td className="p-3 align-top">Automatisches Befüllen des PLZ-Felds</td>
                    <td className="p-3 align-top">Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Hosting / Server-Logs */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">
              3. Bereitstellung des Onlineangebots und Webhosting
            </h2>
            <p className="mb-3">
              Beim Aufruf unserer Website übermittelt Ihr Browser automatisch Daten an unseren
              Webserver, die in sogenannten Server-Logfiles gespeichert werden:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 pl-1">
              <li>IP-Adresse des anfragenden Geräts</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>Aufgerufene URL und übertragene Datenmenge</li>
              <li>Referrer-URL (Seite, von der der Zugriff erfolgte)</li>
              <li>Verwendeter Browser und Betriebssystem</li>
            </ul>
            <p className="mb-3">
              Diese Daten werden zur Sicherstellung eines störungsfreien Betriebs, zur
              Verbesserung unseres Angebots sowie zur Erkennung und Abwehr von Angriffen
              verarbeitet. Eine Zusammenführung mit anderen Datenquellen findet nicht statt.
            </p>
            <dl className="space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Rechtsgrundlage:</dt>
                <dd>Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigte Interessen: sicherer und zuverlässiger Betrieb)</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Speicherdauer:</dt>
                <dd>Logfiles werden nach spätestens 7 Tagen automatisch gelöscht, sofern sie nicht zur Aufklärung eines Sicherheitsvorfalls länger benötigt werden.</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Hosting-Anbieter:</dt>
                <dd className="text-amber-700">[Name und Adresse des Hosting-Anbieters; ggf. Hinweis auf abgeschlossenen Auftragsverarbeitungsvertrag (AVV) gemäß Art.&nbsp;28 DSGVO]</dd>
              </div>
            </dl>
          </section>

          {/* 4. Standortabfrage */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">
              4. Standortabfrage und Geolokalisierung
            </h2>
            <p className="mb-3">
              Unsere Website bietet eine <strong>optionale Funktion</strong>, mit der Sie Ihren
              aktuellen Gerätestandort verwenden können, um die Postleitzahl in das Suchfeld
              automatisch einzutragen. Diese Funktion wird ausschließlich dann ausgeführt, wenn
              Sie aktiv auf den Standort-Button (📍) klicken.
            </p>
            <h3 className="font-semibold mb-2">Ablauf der Datenverarbeitung:</h3>
            <ol className="list-decimal list-inside space-y-1 mb-4 pl-1">
              <li>
                Ihr Browser zeigt einen Berechtigungsdialog an und fragt Sie nach Ihrer
                Zustimmung zur Standortermittlung.
              </li>
              <li>
                Nur bei Zustimmung: Ihr Browser übermittelt die GPS-Koordinaten (Breiten- und
                Längengrad) an unseren Server.
              </li>
              <li>
                Unser Server leitet die Koordinaten zur Auflösung in eine Postleitzahl
                (Reverse-Geocoding) an den Dienst <strong>Nominatim der OpenStreetMap
                Foundation</strong> weiter.
              </li>
              <li>
                Nominatim gibt die zugehörige Postleitzahl zurück. Wir speichern die Koordinaten
                <strong> nicht</strong>.
              </li>
              <li>
                Die ermittelte Postleitzahl wird im Suchfeld eingetragen und{' '}
                <strong>nicht dauerhaft gespeichert</strong>.
              </li>
            </ol>
            <dl className="space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Verarbeitete Daten:</dt>
                <dd>Geografische Koordinaten (Breitengrad, Längengrad)</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Zweck:</dt>
                <dd>Vereinfachung der PLZ-Suche durch automatisches Befüllen des Suchfelds</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Rechtsgrundlage:</dt>
                <dd>
                  Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO – Einwilligung durch aktives Auslösen
                  der Funktion und Erteilen der Browser-Berechtigung
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Speicherdauer:</dt>
                <dd>
                  Die Koordinaten werden nicht gespeichert. Die Verarbeitung erfolgt
                  ausschließlich für die Dauer der Anfrage (transient).
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-muted">
              Sie können die Standortberechtigung jederzeit in den Einstellungen Ihres Browsers
              widerrufen. Die Nutzung der übrigen Website-Funktionen ist davon nicht betroffen.
            </p>
          </section>

          {/* 5. Nominatim / OSM */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">
              5. Weitergabe an Dritte – Nominatim / OpenStreetMap
            </h2>
            <p className="mb-3">
              Wenn Sie die Standortfunktion nutzen, werden Ihre geografischen Koordinaten zur
              Reverse-Geocoding-Anfrage an den Dienst <strong>Nominatim</strong> der
              OpenStreetMap Foundation übermittelt. Anbieter ist:
            </p>
            <address className="not-italic bg-surface border border-border rounded-md p-4 text-sm space-y-0.5 mb-3">
              <p className="font-semibold">OpenStreetMap Foundation (OSMF)</p>
              <p>St John's Innovation Centre</p>
              <p>Cowley Road, Cambridge CB4 0WS</p>
              <p>United Kingdom</p>
              <p className="mt-2">
                Datenschutzrichtlinie:{' '}
                <a
                  href="https://osmfoundation.org/wiki/Privacy_Policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  osmfoundation.org/wiki/Privacy_Policy
                </a>
              </p>
            </address>
            <p className="mb-2">
              Die Übermittlung der Koordinaten erfolgt ausschließlich auf Grundlage Ihrer
              Einwilligung (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO) und nur dann, wenn Sie die
              Standortfunktion aktiv nutzen. Wir haben mit der OSMF keinen
              Auftragsverarbeitungsvertrag, da Nominatim als eigenständiger Dienst betrieben wird.
              Die Anfrage erfolgt von unserem Server aus, sodass Ihre IP-Adresse gegenüber
              Nominatim nicht offenbart wird – stattdessen erscheint die IP-Adresse unseres Servers.
            </p>
            <p className="text-muted">
              Die OpenStreetMap Foundation ist in Großbritannien ansässig. Die Datenübermittlung
              in das Vereinigte Königreich ist gemäß Angemessenheitsbeschluss der
              Europäischen Kommission (Art.&nbsp;45 DSGVO) zulässig.
            </p>
          </section>

          {/* 6. Keine Cookies / Tracking */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">
              6. Cookies, Tracking und Analyse
            </h2>
            <p className="mb-3">
              Unsere Website verwendet derzeit <strong>keine Cookies</strong> und keine
              vergleichbaren Speichertechnologien. Wir setzen außerdem ein:
            </p>
            <ul className="space-y-2">
              {[
                'keine Web-Analyse-Dienste (z. B. Google Analytics, Matomo)',
                'keine Tracking-Pixel oder Session-Recording',
                'keine Social-Media-Plugins (z. B. Facebook, Instagram)',
                'keine Werbenetzwerke oder Remarketing-Dienste',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-muted">
              Sollte sich dies in Zukunft ändern, werden wir diese Datenschutzerklärung
              rechtzeitig aktualisieren und – soweit erforderlich – Ihre Einwilligung einholen.
            </p>
          </section>

          {/* 7. Betroffenenrechte */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">
              7. Ihre Rechte als betroffene Person
            </h2>
            <p className="mb-4">
              Ihnen stehen gegenüber uns folgende Datenschutzrechte zu:
            </p>
            <div className="space-y-3">
              {[
                {
                  artikel: 'Art. 15 DSGVO',
                  titel: 'Auskunftsrecht',
                  text: 'Sie können Auskunft darüber verlangen, welche personenbezogenen Daten wir über Sie verarbeiten.',
                },
                {
                  artikel: 'Art. 16 DSGVO',
                  titel: 'Recht auf Berichtigung',
                  text: 'Sie können die unverzügliche Berichtigung unrichtiger oder Vervollständigung unvollständiger Daten verlangen.',
                },
                {
                  artikel: 'Art. 17 DSGVO',
                  titel: 'Recht auf Löschung',
                  text: 'Sie können die Löschung Ihrer personenbezogenen Daten verlangen, sofern keine gesetzliche Aufbewahrungspflicht oder ein überwiegendes berechtigtes Interesse entgegensteht.',
                },
                {
                  artikel: 'Art. 18 DSGVO',
                  titel: 'Recht auf Einschränkung der Verarbeitung',
                  text: 'Sie können in bestimmten Fällen die Einschränkung der Verarbeitung verlangen, z. B. wenn Sie die Richtigkeit der Daten bestreiten.',
                },
                {
                  artikel: 'Art. 20 DSGVO',
                  titel: 'Recht auf Datenübertragbarkeit',
                  text: 'Sie können verlangen, die Sie betreffenden Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.',
                },
                {
                  artikel: 'Art. 21 DSGVO',
                  titel: 'Widerspruchsrecht',
                  text: 'Sie können der Verarbeitung Ihrer Daten auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen) jederzeit widersprechen.',
                },
                {
                  artikel: 'Art. 7 Abs. 3 DSGVO',
                  titel: 'Recht auf Widerruf einer Einwilligung',
                  text: 'Eine erteilte Einwilligung (z. B. Standortberechtigung) können Sie jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass Ihnen dadurch Nachteile entstehen.',
                },
              ].map(({ artikel, titel, text }) => (
                <div key={artikel} className="flex gap-3">
                  <span className="text-xs font-mono bg-surface border border-border rounded px-1.5 py-0.5 shrink-0 h-fit mt-0.5 whitespace-nowrap">
                    {artikel}
                  </span>
                  <div>
                    <p className="font-semibold">{titel}</p>
                    <p className="text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-muted">
              Zur Wahrnehmung Ihrer Rechte wenden Sie sich bitte an die unter Ziffer&nbsp;1
              genannte Kontaktadresse. Wir bearbeiten Anfragen in der Regel innerhalb von
              30 Tagen.
            </p>
          </section>

          {/* 8. Beschwerderecht */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">
              8. Beschwerderecht bei einer Aufsichtsbehörde
            </h2>
            <p className="mb-3">
              Unbeschadet anderweitiger Rechtsbehelfe haben Sie gemäß Art.&nbsp;77 DSGVO das
              Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der
              Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO
              verstößt. Die zuständige Aufsichtsbehörde für unseren Sitz ist:
            </p>
            <address className="not-italic bg-surface border border-border rounded-md p-4 text-sm space-y-0.5">
              <p className="font-semibold">
                Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
                Baden-Württemberg (LfDI BW)
              </p>
              <p>Königstraße 10a</p>
              <p>70173 Stuttgart</p>
              <p className="mt-2">
                Web:{' '}
                <a
                  href="https://www.baden-wuerttemberg.datenschutz.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.baden-wuerttemberg.datenschutz.de
                </a>
              </p>
            </address>
            <p className="mt-3 text-muted">
              Alternativ können Sie sich an die Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsorts
              oder Arbeitsorts wenden.
            </p>
          </section>

          {/* 9. Aktualität */}
          <section>
            <h2 className="text-base font-bold text-foreground mb-3">
              9. Aktualität und Änderungen dieser Datenschutzerklärung
            </h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{' '}
              <strong>Mai 2026</strong>. Wir behalten uns vor, sie bei Änderungen unseres
              Angebots oder bei Anpassungen gesetzlicher Anforderungen zu aktualisieren. Die
              jeweils aktuelle Fassung ist stets auf dieser Seite abrufbar. Soweit Änderungen
              eine Einwilligung Ihrerseits erfordern, werden wir diese vorab einholen.
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}
