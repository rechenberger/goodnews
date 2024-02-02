import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function MainTopNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        'flex flex-1 flex-wrap items-center justify-center gap-4 lg:gap-6',
        className,
      )}
      {...props}
    >
      <Link
        href={'/about'}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          'text-muted-foreground',
          'tracking-wide',
          'flex flex-row items-center gap-1',
          'border rounded-md px-2 py-1',
        )}
      >
        <div>Was ist GoodNews?</div>
      </Link>
      <Link
        href={'https://teampilot.ai'}
        target="_blank"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          'text-muted-foreground',
          'flex flex-row items-center gap-1',
        )}
      >
        <div>by Teampilot AI</div>
        <ExternalLink className="h-3 w-3" />
      </Link>
    </nav>
  )
}
