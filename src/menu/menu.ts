import template from './menu.html?raw'
import './menu.css'

const MENU_ID = 'global-menu'

type RouteKey = 'home' | 'grid' | 'repo'

const ROUTES: Record<RouteKey, string> = {
  home: '',
  grid: 'grid.html',
  repo: 'https://github.com/stormwild/scaly-wyvern',
}

export function mountMenu(): void {
  if (document.getElementById(MENU_ID)) {
    return
  }

  const wrapper = document.createElement('div')
  wrapper.innerHTML = template.trim()
  const menu = wrapper.firstElementChild as HTMLElement | null

  if (!menu) {
    return
  }

  menu.id = MENU_ID
  document.body.prepend(menu)

  wireLinks(menu)
  wireToggle(menu)
}

function wireLinks(menu: HTMLElement): void {
  const base = new URL(import.meta.env.BASE_URL, window.location.origin)
  const current = deriveCurrentRoute(base.pathname)

  menu
    .querySelectorAll<HTMLAnchorElement>('[data-menu-route]')
    .forEach((anchor) => {
      const key = anchor.dataset.menuRoute as RouteKey | undefined
      if (!key) {
        return
      }

      const target = ROUTES[key]
      const isExternal = /^https?:\/\//.test(target)
      anchor.href = isExternal ? target : new URL(target, base).toString()

      if (isExternal) {
        anchor.target = '_blank'
        anchor.rel = 'noreferrer noopener'
      }

      if (!isExternal && key === current) {
        anchor.classList.add('is-active')
      }
    })
}

function wireToggle(menu: HTMLElement): void {
  const toggle = menu.querySelector<HTMLButtonElement>('[data-menu-toggle]')
  if (!toggle) {
    return
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', String(isOpen))
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open')
      toggle.setAttribute('aria-expanded', 'false')
    }
  })
}

function deriveCurrentRoute(basePath: string): RouteKey {
  let relative = window.location.pathname
  if (relative.startsWith(basePath)) {
    relative = relative.slice(basePath.length)
  }
  relative = relative.replace(/^\/*/, '')

  if (relative === '' || relative === 'index.html') {
    return 'home'
  }
  if (relative.startsWith('grid')) {
    return 'grid'
  }
  return 'home'
}
