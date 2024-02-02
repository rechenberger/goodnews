import { LocalDateTime } from '@/components/demo/LocalDateTime'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as cheerio from 'cheerio'
import Image from 'next/image'
import { Fragment } from 'react'
import Parser from 'rss-parser'
import { z } from 'zod'

const parser: Parser = new Parser({})

const NewsFeedItem = z.object({
  guid: z.string(),
  title: z.string(),
  link: z.string(),
  content: z.string(),
  // contentSnippet: z.string(),
  'content:encoded': z.string(),
  isoDate: z.string(),
})

const fetchFeedItems = async ({ url }: { url: string }) => {
  const feed = await parser.parseURL(url)
  const items = feed.items.flatMap((item) => {
    const parsed = NewsFeedItem.safeParse(item)
    if (parsed.success) {
      const contentEncoded = cheerio.load(parsed.data['content:encoded'])
      const imgUrl = contentEncoded('img').attr('src')
      if (!imgUrl) return []
      const result = {
        ...parsed.data,
        imgUrl,
      }
      return [result]
    }
    // console.warn('Failed to parse feed item', item, parsed.error.message)
    return []
  })
  return items
}

export default async function Page() {
  const feed = await fetchFeedItems({
    url: process.env.DEFAULT_RSS_FEED_URL!,
  })
  return (
    <>
      <h1>News</h1>
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
                  <>{item.content}</>
                </CardContent>
              </Card>
            </Fragment>
          )
        })}
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
        </Card>
      </div>
      <pre className="overflow-x-auto">{JSON.stringify(feed, null, 2)}</pre>
    </>
  )
}
