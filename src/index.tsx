// src/index.tsx

import {Registry} from "@flintdev/widget-builder";

import Tree , {Props as TreeProps, configJson as TreeConfig} from "./widget/Tree";
import KoniEditor , {Props as KoniEditorProps, configJson as KoniEditorConfig} from "./widget/GGeditor/KoniEditor";
import MindEditor , {Props as MindEditorProps, configJson as MindEditorConfig} from "./widget/GGeditor/MindEditor";


let registry = new Registry();

registry.add('Tree', Tree, TreeConfig, {category: "widget"});
registry.add('KoniEditor', KoniEditor, KoniEditorConfig, {category: "widget"});
registry.add('MindEditor', MindEditor, MindEditorConfig, {category: "widget"});


export {
    Tree,
    KoniEditor,
    MindEditor
};

export const library = registry.pack();
