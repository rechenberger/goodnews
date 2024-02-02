import { GoodNewsItem } from '@/server/fetchGoodNews'
import { fetchTeampilot } from '@teampilot/sdk'

export const TextToSpeech = async ({ item }: { item: GoodNewsItem }) => {
  const result = await fetchTeampilot({
    message: `Lese diesen Artikel for indem du die TextToSpeech-Funktion aufrufst:\n\n${item.title}\n${item.contentSnippet}\n${item.content}`,
    launchpadSlugId: process.env.TEAMPILOT_TEXT_TO_SPEECH_LAUNCHPAD_SLUG_ID!,
  })

  const audio = result.mediaAttachments?.find(
    (attachment) => attachment.type === 'AUDIO',
  )
  if (!audio) return null

  return (
    <audio
      src={audio.url}
      controls
      className="w-full mb-4 h-[54px]"
      title="TextToSpeech"
    />
  )
}
