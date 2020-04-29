// example/ExampleContainer.tsx

import * as React from 'react';
import { treeData } from "./data/treeNodes";
import { KubeEditor, MindEditor, Tree } from "../src";
import { flowData, customNodes } from "./data/flowData";
import { mindData } from "./data/mindData";
import { Switch } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export interface Props {

}

export interface State {
    displayMode: string,
    showMimiMap: string
}

class ExampleContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            displayMode: 'edit',
            showMimiMap: "show"
        }
        this.handleSwitchViewOnly = this.handleSwitchViewOnly.bind(this);
        this.handleSwitchShowMimiMap = this.handleSwitchShowMimiMap.bind(this);
    }

    handleSwitchViewOnly() {
        // this.setState({ viewOnly: !this.state.viewOnly })
    }

    handleSwitchShowMimiMap() {
        // this.setState({ showMimiMap: !this.state.showMimiMap })
    }

    render() {
        const { displayMode, showMimiMap } = this.state;
        return (
            <Tabs defaultActiveKey="1" tabPosition={'left'}>
                {["tree", "kube", "mind"].map((tab, i) => (
                    <TabPane tab={tab} key={i.toString()}>
                        {tab === "tree" &&
                            <Tree params={{
                                data: treeData,
                                handleOnCheck: (selectedKeys: any, info: any) => console.log(">>> handleOnCheck", selectedKeys, info),
                                handleOnSelect: (selectedKeys: any, info: any) => console.log(">>> handleOnSelect", selectedKeys, info),
                                checkable: true
                            }} />
                        }
                        {tab === "kube" && <>
                            <KubeEditor
                                params={{
                                    data: flowData,
                                    customNodes: customNodes,
                                    hideMimiMap: displayMode,
                                    hidePanel: showMimiMap,
                                }}
                                events={{
                                    onNodeSelect: (data) => console.log('>>> KubeEditor.onNodeSelect', data),
                                    onNodeDoubleClick: (data) => console.log('>>> KubeEditor.onNodeDoubleClick', data),
                                    onSave: (data) => console.log('>>> KubeEditor.onSave', data),
                                }}
                            />
                        </>
                        }
                        {tab === "mind" && <>
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
                        }
                    </TabPane>
                ))}
            </Tabs>
        )
    }
}

export default ExampleContainer;
