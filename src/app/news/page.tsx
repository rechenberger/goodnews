import { LocalDateTime } from '@/components/demo/LocalDateTime'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchGoodNews } from '@/server/fetchGoodNews'
import Image from 'next/image'
import { Fragment } from 'react'

export default async function Page() {
  const feed = await fetchGoodNews({
    url: process.env.DEFAULT_RSS_FEED_URL!,
  })
  return (
    <>
      {/* <h1>News</h1> */}
      <div className="grid grid-cols-3 gap-4">
        {feed.map((item) => {
          return (
            <Fragment key={item.guid}>
              <Card className="overflow-hidden">
                <Image
                  src={item.imgUrl}
                  alt={item.title}
                  unoptimized
                  width={360}
                  height={360}
                  className="w-full "
                />
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
              </Card>
            </Fragment>
          )
        })}
      </div>
    </>
  )
}
