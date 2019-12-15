# svelte-css-in-js

> 📦 This module makes to handle css in js form from svelte.

With svelte-css-in-js, you can use css in javascript (and typescript). You can use this module when you want to conveniently use the css attribute that should be changed frequently on js or when you have the style that you want to assign as component properties.

> This module has been developed by modifying some of the code in the [shineup](https://github.com/Vehmloewff/shineup/blob/master/index.js) library created by `Vehmloewff`. The code also specifies the source. Do not erase that. The licenses for the original module from which the code was quoted are all the same under MIT License.

## Spec

- Entering JSON data to generate css class.
- When data entered in JSON format is changed, only changes are apply as dom.
- Reuse of css keys that prevent conflicts between components without generating them each time.
- Allow deformation by distinguishing between style and theme concept.

## Install

```bash
npm i svelte-css-in-js
```

## Usage

```svelte
<script>
    import * as svelte from 'svelte'
    import { makeCSS } from 'svelte-css-in-js'

    export let a = ''
    export let b = ''
    export let c = ''

    // CSS Prop
    let themePrimaryColor = 'blue'

    // CSS Style
    export let style = {
        background: {
            color: themePrimaryColor
        }
    }

    // CSS Theme
    export let theme = {
        background: {
            fontSize: '30px'
        }
    }

		// You can transform css as soon as you want.
		// The value of the key remaining in the <header> will not be wasted.
    setTimeout(()=>{
        style.background.color = 'yellow'
    }, 3000)

    const css = makeCSS({ style, theme, svelte })
</script>

<div class='{css.background}'>
    {a} {b} {c}
</div>

```

## License

MIT License.

