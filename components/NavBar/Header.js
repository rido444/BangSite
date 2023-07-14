import { useEffect, useCallback, useState, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  UserIcon,
  NewspaperIcon,
  CollectionIcon,
  SparklesIcon,
  SearchIcon,
  MenuIcon
} from '@heroicons/react/outline'
import Social from '../Common/Social.js'
import ThemeSwitcher from './ThemeSwitcher.js'
import LangSwitcher from './LangSwitcher.js'
import Logo from '@/components/Common/Logo'
import { motion } from 'framer-motion'

const NavBar = () => {
  const router = useRouter()
  const { locale } = useRouter()
  const t = lang[locale]
  const [showMenu, setShowMenu] = useState(false)

  let activeMenu = ''
  if (router.query.slug) {
    activeMenu = '/' + router.query.slug
  } else {
    activeMenu = router.pathname
  }

  const links = [
    {
      id: 0,
      name: t.NAV.INDEX,
      to: BLOG.path || '/',
      icon: <HomeIcon className='inline-block mb-1 h-5 w-5' />,
      show: false
    },
    {
      id: 1,
      name: t.NAV.NEWSLETTER,
      to: '/newsletter',
      icon: <NewspaperIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.newsletter
    },
    {
      id: 2,
      name: t.NAV.NOTES,
      to: '/notes',
      icon: <CollectionIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.notes
    },
    {
      id: 3,
      name: t.NAV.PROJECTS,
      to: '/projects',
      icon: <SparklesIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.projects
    },
    {
      id: 4,
      name: t.NAV.SEARCH,
      to: '/search',
      icon: <SearchIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 5,
      name: '',
      to: BLOG.path || '/about',
      icon: <UserIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 6,
      name: t.NAV.INDEX,
      to: BLOG.path || '/',
      icon: <HomeIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    }
  ]
  return (
    <motion.div className='flex'>
      {/* Desktop Menu */}
      <ul className='flex gap-1'>
        {links.map(
          (link) =>
            link.show && (
              <Link passHref href={link.to} key={link.id} scroll={false}>
                <li
                  className={`${
                    activeMenu === link.to ? 'bg-gray-200 dark:bg-gray-700' : ''
                  } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block py-1 px-2 nav`}
                >
                  <div className='font-light'>
                    {link.icon}
                  </div>
                </li>
              </Link>
            )
        )}
      </ul>
    </motion.div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const [showTitle, setShowTitle] = useState(false)
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(/** @type {HTMLDivElement} */ undefined)
  const sentinelRef = useRef(/** @type {HTMLDivElement} */ undefined)
  const handler = useCallback(([entry]) => {
    if (useSticky && navRef.current) {
      navRef.current?.classList.toggle('sticky-nav-full', !entry.isIntersecting)
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }, [useSticky])

  useEffect(() => {
    const sentinelEl = sentinelRef.current
    const observer = new window.IntersectionObserver(handler)
    observer.observe(sentinelEl)

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        setShowTitle(true)
      } else {
        setShowTitle(false)
      }
    })
    return () => {
      sentinelEl && observer.unobserve(sentinelEl)
    }
  }, [handler, sentinelRef])
  return (
    <>
      <div className='observer-element h-4 md:h-12' ref={sentinelRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-70 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id='sticky-nav'
        ref={navRef}
      >
        <div className='flex items-center'>
          <ThemeSwitcher />
          {navBarTitle ? (
            <p
              className={`ml-2 font-medium ${
                !showTitle ? '' : ''
              }`}
            >
              {navBarTitle}
            </p>
          ) : (
            <p
              className={`ml-2 font-medium ${
                !showTitle ? '' : ''
              }`}
            >
              {BLOG.title} ~ {' '}
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
