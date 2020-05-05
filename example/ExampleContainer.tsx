// example/ExampleContainer.tsx

import * as React from 'react';
import { treeData } from "./data/treeNodes";
import { KoniEditor } from "../src";
import { flowData, customNodes, dataTree } from "./data/flowData";
import { mindData } from "./data/mindData";
import { Tabs, Row, Switch } from 'antd';

const { TabPane } = Tabs;

export interface Props {

}

export interface State {
    hidePanelSwitch: boolean,
    hideMimiMapSwitch: boolean
}

class ExampleContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hidePanelSwitch: false,
            hideMimiMapSwitch: false
        }
    }

    render() {
        const { hideMimiMapSwitch, hidePanelSwitch } = this.state;
        return (
            <Tabs defaultActiveKey="0" tabPosition={'left'}>
                {["koni", "tree", "mind"].map((tab, i) => (
                    <TabPane tab={tab} key={i.toString()}>
                        {/* {tab === "tree" &&
                            <Tree params={{
                                data: treeData,
                                handleOnCheck: (selectedKeys: any, info: any) => console.log(">>> handleOnCheck", selectedKeys, info),
                                handleOnSelect: (selectedKeys: any, info: any) => console.log(">>> handleOnSelect", selectedKeys, info),
                                checkable: true
                            }} />
                        } */}
                        {tab === "koni" && <>
                            <KoniEditor
                                params={{
                                    dataTree: dataTree,
                                    customNodes: customNodes,
                                    hideMimiMap: hideMimiMapSwitch ? "hide" : "show",
                                    hidePanel: hidePanelSwitch ? "hide" : "show",
                                }}
                                events={{
                                    onNodeSelect: (data) => console.log('>>> TopoEditor.onNodeSelect', data),
                                    onGroupSelect: (data) => console.log('>>> TopoEditor.onGroupSelect', data),
                                    onNodeDoubleClick: (data) => console.log('>>> TopoEditor.onNodeDoubleClick', data),
                                    onSave: (data) => console.log('>>> TopoEditor.onSave', data),
                                }}
                            />
                        </>
                        }
                        {/* {tab === "mind" && <>
                            <MindEditor
                                params={{
                                    data: mindData
                                }}
                                events={{
                                    onNodeSelect: (data) => console.log('>>> MindEditor.onNodeSelect', data),
                                    onSave: (data) => console.log('>>> MindEditor.onSave', data)
                                }}
                            />
                        </>
                        } */}
                    </TabPane>
                ))}
            </Tabs>
        )
    }
}

export default ExampleContainer;
