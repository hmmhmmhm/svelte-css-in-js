/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 *
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/parsejs.js
 */

import flatten from 'flat'
export const isLayered = obj => {
    let layerFound = false
    for (let possibleLayer in obj) {
        if (
            !/^\$/.test(possibleLayer) &&
            typeof obj[possibleLayer] === 'object'
        ) {
            layerFound = true
            break
        }
    }
    return layerFound
}

export const addDotToClassName = className => {
    if (!/^(\.|\$)/.test(className)) return '.' + className
    else return className
}

export const getParent = (obj, delimiter) => {
    const returnObj = {}

    Object.keys(obj).forEach(key => {
        const roots = key.split(delimiter)
        const root = roots[roots.length - 1]

        returnObj[root] = obj[key]
    })

    return returnObj
}

export const flattenObjectChildren = (obj, id) => {
    const delimiter = `|`
    const savedObject = obj

    const callAllFunctions = obj => {
        let funcsExist = true

        const callVisibileFunctions = obj => {
            funcsExist = false

            for (let key in obj) {
                if (typeof obj[key] === 'function') {
                    const rootKeys = key.split(delimiter)
                    const lastKey = rootKeys.pop()
                    const className = rootKeys[0].replace(/^\./, '')
                    const res = obj[key]({
                        obj: savedObject,
                        parent: getParent(obj, delimiter),
                        key: lastKey,
                        id,
                        className,
                        querySelector: `.${id}.${className}`,
                    })

                    // If last key starts with '&'...
                    if (lastKey && /^&/.test(lastKey)) {
                        // Spread it over the parent
                        delete obj[key]

                        if (typeof res !== 'object')
                            throw new Error(
                                `The value of all keys starting with an '&' symbol of type 'function' must return an object.`
                            )

                        const rootKey = rootKeys.join(delimiter)
                        Object.keys(res).forEach(newKey => {
                            obj[`${rootKey}|${newKey}`] = res[newKey]
                        })
                    }
                    // Otherwise
                    else {
                        // Carry on
                        obj[key] = res
                    }

                    funcsExist = true
                }
            }

            return obj
        }

        while (funcsExist)
            obj = callVisibileFunctions(flatten(obj, { delimiter }))

        return obj
    }

    const changeKey = (key: string) => {
        const levels = key.split('|')
        const highestLevel = levels.pop()
        return `${levels.join('').replace(/\$/g, ' ')}|${highestLevel}`
    }

    const flatObj = callAllFunctions(obj)
    const newObj = {}

    for (let key in flatObj) {
        const value = flatObj[key]

        key = changeKey(key)
        newObj[key] = value
    }

    return flatten.unflatten(newObj, { delimiter })
}

export const parse = (obj = {}, id: string = 'svelte') => {
    // Check the types
    if (typeof obj !== 'object')
        throw new Error(
            `The first paramater must be of type 'object'.  Recieved type '${typeof obj}';`
        )
    if (typeof id !== 'string')
        throw new Error(
            `The second paramater must be of type 'string'.  Recieved type '${typeof id}';`
        )

    if (JSON.stringify(obj) === `{}`) return { css: {}, classes: {} }

    // All the types are valid.  Carry on.
    if (!isLayered(obj)) {
        const defaultName = 'default'
        const defaultCSS = { [defaultName]: {} }
        defaultCSS[defaultName] = obj
        obj = defaultCSS
    }

    const classes: any = {}

    for (let className in obj) {
        const dottedClassname = addDotToClassName(className)
        obj[dottedClassname] = obj[className]
        classes[className] = `${id} ${className}`
        delete obj[className]
    }

    const css = flattenObjectChildren(obj, id)
    return { css, classes }
}
