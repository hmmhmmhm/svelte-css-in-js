import { randomString } from './random'
import { ready } from './ready'
import { createStyles } from './styles'
import deepmerge from 'deepmerge'
import { afterUpdate } from 'svelte'

export const makeCSS = ({ style = {}, theme = {} }) => {
    const cssId = `svelte-${randomString(7)}`

    let css = {}
    const applyCSS = () => {
        ready()
        const mergedStyle = deepmerge(style, theme)
        css = createStyles(JSON.parse(JSON.stringify(mergedStyle)), cssId)
    }
    applyCSS()
    afterUpdate(applyCSS)
    return css
}

export default makeCSS
