import * as cheerio from 'cheerio'
import { take } from 'lodash-es'
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

export const fetchFeedWithContent = async ({ url }: { url: string }) => {
  let items = await fetchFeedItems({ url })
  items = take(items, 3)
  const itemsWithContent = await Promise.all(
    items.map(async (item) => {
      const content = await fetchContent({ url: item.link })
      return {
        ...item,
        content,
      }
    }),
  )
  return itemsWithContent
}

const fetchContent = async ({ url }: { url: string }) => {
  const response = await fetch(url)
  const html = await response.text()
  const $ = cheerio.load(html)
  const article = $('article')
  article.find('script').remove() // remove script tags
  article.find('nav').remove() // remove script tags
  article.find('.taglist').remove() // remove script tags
  article.find('.label').remove() // remove script tags
  let text = article.text()
  text = text
    .replace(/<[^>]+>/g, '') // Remove HTML
    .replace(/\s+/g, ' ') // Remove Whitespace
    .trim()
  return text
}
