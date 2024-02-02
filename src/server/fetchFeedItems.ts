import * as cheerio from 'cheerio'
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

export const fetchFeedItems = async ({ url }: { url: string }) => {
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
