/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 *
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/parsejs.js
 */
export declare const isLayered: (obj: any) => boolean;
export declare const addDotToClassName: (className: any) => any;
export declare const getParent: (obj: any, delimiter: any) => {};
export declare const flattenObjectChildren: (obj: any, id: any) => any;
export declare const parse: (obj?: {}, id?: string) => {
    css: any;
    classes: any;
};
