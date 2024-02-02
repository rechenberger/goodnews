import { fetchTeampilotData } from '@teampilot/sdk'
import { z } from 'zod'
import { fetchFeedWithContent } from './fetchFeedItems'

const GoodNewsItem = z.object({
  title: z.string(),
  contentSnippet: z.string(),
  content: z.string(),
})

export const fetchGoodNews = async ({ url }: { url: string }) => {
  const items = await fetchFeedWithContent({ url })
  const itemsModified = await Promise.all(
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
  return itemsModified
}
