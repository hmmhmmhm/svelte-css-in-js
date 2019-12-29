/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 *
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/ready.js
 */

const functions: any = []
let isReady = false

export const ready = () => {
    isReady = true
    functions.forEach((fn: () => any) => fn())
}
export const callOnReady = (fn: () => any) => {
    if (isReady) fn()
    else functions.push(fn)
}
