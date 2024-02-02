import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

const title = 'Was ist GoodNews?'
const sourceName = process.env.SOURCE_NAME!
const sourceUrl = process.env.SOURCE_URL!

export default async function Page() {
  return (
    <>
      <article className="flex flex-col">
        <div className="my-8">
          <h1 className=" text-3xl">{title}</h1>
          <Link
            href={'https://teampilot.ai'}
            target="_blank"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              'text-muted-foreground',
              'flex flex-row items-center gap-1',
            )}
          >
            <div>by Teampilot AI</div>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
        <p>
          <strong>
            GoodNews ist eine technische Demo, die Inhalte von {sourceName}{' '}
            mittels Künstlicher Intelligenz (KI) positiv umschreibt. Bitte
            beachten Sie, dass es sich hierbei nicht um echte Nachrichten
            handelt. Wir haben keine Redaktion, und es besteht kein Anspruch auf
            Richtigkeit oder journalistische Sorgfalt der präsentierten Inhalte.
          </strong>
        </p>
        <div className="my-4 flex flex-col gap-4">
          <p>
            GoodNews ist Ihr experimenteller Ort für Positivität. In dieser
            technischen Demo verwenden wir fortschrittliche Algorithmen, um
            Nachrichtenartikel in eine hoffnungsvollere Sprache zu
            transformieren. Unser Ziel ist es, einen heiteren Kontrapunkt zum
            oft schweren Ton der aktuellen Nachrichtenlandschaft zu setzen.
          </p>
          <p>
            Wir möchten darauf hinweisen, dass die umgeschriebenen Artikel nicht
            die Realität abbilden und lediglich als kreative Ausdrucksform der
            KI zu verstehen sind. GoodNews soll als Anregung dienen, die
            Präsentation und Wirkung von Nachrichten zu reflektieren und die
            Bedeutung einer ausgewogenen Medienlandschaft zu diskutieren.
          </p>
          <p>
            Diese Plattform ist als spielerische Anwendung gedacht und soll
            Nutzern aufzeigen, wie KI Texte manipulieren kann. Wir ermutigen
            Sie, stets eine kritische Perspektive einzunehmen und sich für eine
            umfassende Sichtweise von vertrauenswürdigen Nachrichtenquellen zu
            informieren.
          </p>
          <p>
            Genießen Sie die positiven Spin-offs der aktuellen Nachrichten und
            betrachten Sie GoodNews als eine Einladung, die Welt einmal durch
            eine optimistischere Brille zu sehen – aber stets mit einem
            Bewusstsein für die Bedeutung von Fakten und differenzierter
            Berichterstattung.
          </p>
        </div>
        <div>
          Original-Texte und Bilder von:{' '}
          <Link
            href={sourceUrl}
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            {sourceName}
          </Link>
        </div>
      </article>
    </>
  )
}
