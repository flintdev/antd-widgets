// src/index.tsx

import {Registry} from "@flintdev/widget-builder";

import Tree , {Props as TreeProps, configJson as TreeConfig} from "./widget/Tree";


let registry = new Registry();

registry.add('Tree', Tree, TreeConfig, {category: "widget"});


export {
    Tree
};

export const library = registry.pack();
