import { randomString } from './random'
import deepmerge from 'deepmerge'
import { ready } from './ready'
import { createStyles } from './styles'

export const makeCSS = ({style = {}, theme = {}}, svelte) => {
    if(!svelte || !svelte.afterUpdate) return

    const cssId = `svelte-${randomString(7)}`

    let css = {}
    const applyCSS = () => {
        ready()
        const mergedStyle = deepmerge(style, theme)
        css = createStyles(JSON.parse(JSON.stringify(mergedStyle)), cssId)
    }
    applyCSS()
    svelte.afterUpdate(applyCSS)
    return css
}

export default makeCSS