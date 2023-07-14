import BLOG from '@/blog.config'
import Link from 'next/link'
import Avatar from './NotionAvatar.js'
import Social from '../Common/Social.js'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  MailIcon,
  RssIcon,
  ClipboardCheckIcon
} from '@heroicons/react/outline'
import NotionRenderer from '@/components/Post/NotionRenderer'

const Hero = ({ blockMap }) => {
  const [showCopied, setShowCopied] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]

  return (
      <div className='container mx-auto'>
          <NotionRenderer
            className='md:ml-0'
            blockMap={blockMap}
            frontMatter={{}}
            subPageTitle={null}
          />
      </div>
  )
}

export default Hero
