import { fetchTeampilotData } from '@teampilot/sdk'
import { z } from 'zod'
import { fetchFeedWithContent } from './fetchFeedItems'

const GoodNewsItem = z.object({
  title: z.string(),
  contentSnippet: z.string(),
  content: z.string(),
})

export type GoodNewsItem = z.infer<typeof GoodNewsItem>

export const fetchGoodNews = async ({ url }: { url: string }) => {
  let items = await fetchFeedWithContent({ url })

  // Filter Forbidden Phrases to not hit content filter of AI:
  const forbiddenPhrases = process.env.FORBIDDEN_PHRASES!.split(',')
  items = items.filter(
    (item) =>
      ![item.title, item.contentSnippet, item.content].some((field) =>
        forbiddenPhrases.some((phrase) => field.includes(phrase)),
      ),
  )

  const itemsModified = await Promise.allSettled(
    items.map(async (item) => {
      const input = GoodNewsItem.parse(item)
      const answer = await fetchTeampilotData({
        schema: GoodNewsItem,
        message: `${process.env
          .GOOD_NEWS_PROMPT!}\n\`\`\`json\n${JSON.stringify(
          input,
          null,
          2,
        )}\n\`\`\``,
      })
      return {
        ...item,
        ...answer,
      }
    }),
  )
  return itemsModified.flatMap((item) =>
    item.status === 'fulfilled' ? [item.value] : [],
  )
}
