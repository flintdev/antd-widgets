// src/index.tsx

import {Registry} from "@flintdev/widget-builder";

import Tree , {Props as TreeProps, configJson as TreeConfig} from "./widget/Tree";
import KubeEditor , {Props as KubeEditorProps, configJson as KubeEditorConfig} from "./widget/GGeditor/KubeEditor";
import MindEditor , {Props as MindEditorProps, configJson as MindEditorConfig} from "./widget/GGeditor/MindEditor";


let registry = new Registry();

registry.add('Tree', Tree, TreeConfig, {category: "widget"});
registry.add('KubeEditor', KubeEditor, KubeEditorConfig, {category: "widget"});
registry.add('MindEditor', MindEditor, MindEditorConfig, {category: "widget"});


export {
    Tree,
    KubeEditor,
    MindEditor
};

export const library = registry.pack();
