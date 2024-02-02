import Parser from 'rss-parser'
import { z } from 'zod'
const parser: Parser = new Parser({})

const NewsFeedItem = z.object({
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
      return [parsed.data]
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
      <pre className="overflow-x-auto">{JSON.stringify(feed, null, 2)}</pre>
    </>
  )
}
