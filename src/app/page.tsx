import { LocalDateTime } from '@/components/demo/LocalDateTime'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { fetchGoodNews } from '@/server/fetchGoodNews'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

export { revalidate } from '@/server/revalidate'

export default async function Page() {
  const feed = await fetchGoodNews({
    url: process.env.DEFAULT_RSS_FEED_URL!,
  })
  return (
    <>
      {/* <h1>News</h1> */}
      <div className="grid grid-cols-1 gap-4">
        {feed.map((item, idx) => {
          const isBig = idx === 0
          return (
            <Fragment key={item.guid}>
              <Link href={`/news/${item.guid}`}>
                <Card
                  className={cn(
                    'overflow-hidden',
                    'flex flex-col',
                    !isBig && 'md:flex-row',
                  )}
                >
                  <div
                    className={cn('aspect-video relative', !isBig && 'md:h-60')}
                  >
                    <Image
                      src={item.imgUrl}
                      alt={item.title}
                      unoptimized
                      fill
                    />
                  </div>
                  <div>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>
                        <LocalDateTime datetime={item.isoDate} />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>{item.contentSnippet}</strong>
                      </p>
                      {/* <p className="mt-4 whitespace-pre-wrap">{item.content}</p> */}
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </Fragment>
          )
        })}
      </div>
    </>
  )
}
