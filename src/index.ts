import { randomString } from './random'
import deepmerge from 'deepmerge'
import { ready } from './ready'
import { createStyles } from './styles'
import { afterUpdate } from 'svelte'

export const makeCSS = ({style = {}, theme = {}}) => {
    const cssId = `svelte-${randomString(7)}`
    const mergedStyle = deepmerge(style, theme)

    let css = {}
    const applyCSS = () => {
        ready()
        css = createStyles(mergedStyle, cssId)
    }
    applyCSS()
    afterUpdate(applyCSS)
    return css
}

export default makeCSS