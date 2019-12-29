/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 * 
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/attach-styles.js
 */

import { inject } from './inject'
import { parse } from './parse'
import { cssifyObject  } from 'css-in-js-utils'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'

export const attachStyles = async (styles = {}, key: string) => {
	if (!styles || typeof styles !== `object`)
		throw new Error(`'styles' must be a defined object.`)
	if (!key || typeof key !== `string` || key.length < 1)
		throw new Error(`'key' must be a defined string and not be empty.`)

	let str = ``

	Object.keys(styles).forEach((key) => {
		str += `${key}{${cssifyObject(styles[key])}}`
	})
	const {css} = await postcss([ autoprefixer({
		overrideBrowserslist: 'cover 99.5%'
	}) ]).process(str, { from: undefined, to: undefined})

	inject(
		css,
		key
	)
}

export const createStyles = (
	obj: any = {},
	key: string = 'svelte'
) => {
	const { css, classes } = parse(obj, key)
	const newParsed = {}

	let length = 0
	for (let className in css) {
		const selector = `.${key}${className}`

		newParsed[selector] = css[className]
		length++
	}

	classes.get = (className) => classes[className]
	attachStyles(newParsed, key)

	if (length === 1 && classes.default) return classes.default
	else return classes
}