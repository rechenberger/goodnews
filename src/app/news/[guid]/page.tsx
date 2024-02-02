import { LocalDateTime } from '@/components/demo/LocalDateTime'
import { fetchGoodNews } from '@/server/fetchGoodNews'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type PageProps = { params: { guid: string } }

export const generateMetadata = async (
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const item = await fetchItem({ guid: params.guid })
  if (!item) return notFound()
  return {
    title: item.title,
    description: item.contentSnippet,
    openGraph: {
      type: 'article',
      images: [{ url: item.imgUrl }],
      title: item.title,
      description: item.contentSnippet,
    },
  }
}

const fetchItem = async ({ guid }: { guid: string }) => {
  const feed = await fetchGoodNews({
    url: process.env.DEFAULT_RSS_FEED_URL!,
  })
  return feed.find((item) => item.guid === guid)
}

export default async function Page({ params }: PageProps) {
  const item = await fetchItem({ guid: params.guid })
  if (!item) return notFound()
  return (
    <>
      <article className="flex flex-col">
        <Image
          src={item.imgUrl}
          alt={item.title}
          unoptimized
          width={360}
          height={360}
          className="w-full "
        />
        <h1 className="mt-8 text-3xl">{item.title}</h1>
        <div className="mb-8">
          <LocalDateTime datetime={item.isoDate} />
        </div>
        <p>
          <strong>{item.contentSnippet}</strong>
        </p>
        <p className="mt-4 whitespace-pre-wrap">{item.content}</p>
      </article>
      <div>
        Original:{' '}
        <Link
          href={item.link}
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          {item.link}
        </Link>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const feed = await fetchGoodNews({
    url: process.env.DEFAULT_RSS_FEED_URL!,
  })
  return feed.map((item) => ({
    guid: item.guid,
  }))
}
