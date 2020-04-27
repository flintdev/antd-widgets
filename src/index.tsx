// src/index.tsx

import {Registry} from "@flintdev/widget-builder";

import Tree , {Props as TreeProps, configJson as TreeConfig} from "./widget/Tree";
import FlowEditor , {Props as FlowEditorProps, configJson as FlowEditorConfig} from "./widget/GGeditor/FlowEditor";


let registry = new Registry();

registry.add('Tree', Tree, TreeConfig, {category: "widget"});
registry.add('FlowEditor', FlowEditor, FlowEditorConfig, {category: "widget"});


export {
    Tree,
    FlowEditor
};

export const library = registry.pack();
