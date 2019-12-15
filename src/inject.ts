import { callOnReady } from './ready'

/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 * 
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/string-to-head.js
 */
export const inject = (str: string, id: string) => {
	callOnReady(() => {
		id = `${id}-styles`

		let element = document.getElementById(id)
        if (element) {
            element.textContent = str
            return
        }

		element = document.createElement(`style`)
		element.id = id
		element.textContent = str
		document.head.appendChild(element)
	})
}