import '../css/style.scss'
import './oldScripts.js'
import {Analytics} from './Analytics'

const search = document.querySelector("form#search-nav") as HTMLFormElement

if (search) {
    const input = search.querySelector("input[type=search]") as HTMLInputElement
    let lastQuery = ""
    search.addEventListener('submit', (ev) => {
        ev.preventDefault()
        Analytics.logEvent("OWID_SITE_SEARCH", { query: input.value }).then(() => search.submit()).catch(() => search.submit())
    })
}

function getParent(el: HTMLElement, condition: Function): HTMLElement | null {
    let current: HTMLElement | null = el
    while (current) {
        if (condition(current)) return current
        current = current.parentElement
    }
    return null
}

const trackedLinkExists: boolean = !!document.querySelector("a[data-track-click]")

if (trackedLinkExists) {
    document.addEventListener("click", (ev) => {
        const targetElement: HTMLElement = ev.target as HTMLElement
        const trackedElement = getParent(targetElement, (el: HTMLElement) => el.getAttribute("data-track-click") != null)
        if (trackedElement) {
            Analytics.logEvent("OWID_SITE_CLICK", { text: trackedElement.innerText, href: trackedElement.getAttribute("href") })
        }
    })
}
