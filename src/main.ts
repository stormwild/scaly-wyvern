import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter.ts'
import { mountMenu } from './menu/menu'

mountMenu()

const viteLogo = new URL(
  `${import.meta.env.BASE_URL}vite.svg`,
  window.location.origin
).toString()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="demo">
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </main>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
