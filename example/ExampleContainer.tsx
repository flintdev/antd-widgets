// example/ExampleContainer.tsx

import * as React from 'react';
import { treeData } from "./data/treeNodes";
import { FlowEditor, Tree } from "../src";
import { flowData, customNode } from "./data/flowData";
import { Switch } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export interface Props {

}

export interface State {
    viewOnly: boolean,
    showMimiMap: boolean
}

class ExampleContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            viewOnly: false,
            showMimiMap: true
        }
        this.handleSwitchViewOnly = this.handleSwitchViewOnly.bind(this);
        this.handleSwitchShowMimiMap = this.handleSwitchShowMimiMap.bind(this);
    }

    handleSwitchViewOnly() {
        this.setState({ viewOnly: !this.state.viewOnly })
    }

    handleSwitchShowMimiMap() {
        this.setState({ showMimiMap: !this.state.showMimiMap })
    }

    onNodeSelect(data: any) {
        console.log('>>>> onNodeSelect', data)
    }

    render() {
        const { viewOnly, showMimiMap } = this.state;
        return (
            <Tabs defaultActiveKey="1" tabPosition={'left'}>
                {["tree", "flow"].map((tab, i) => (
                    <TabPane tab={tab} key={i.toString()}>
                        {tab === "tree" &&
                            <Tree params={{
                                data: treeData,
                                handleOnCheck: (selectedKeys: any, info: any) => console.log(">>> handleOnCheck", selectedKeys, info),
                                handleOnSelect: (selectedKeys: any, info: any) => console.log(">>> handleOnSelect", selectedKeys, info),
                                checkable: true
                            }} />
                        }
                        {tab === "flow" && <>
                            <div style={{ padding: 20, float: "right" }}>
                                <Switch checkedChildren="viewOnly: true" unCheckedChildren="viewOnly: false" checked={viewOnly} onChange={this.handleSwitchViewOnly} />
                                <Switch checkedChildren="showMimiMap: true" unCheckedChildren="showMimiMap: false" checked={showMimiMap} onClick={this.handleSwitchShowMimiMap} />
                            </div>
                            <FlowEditor
                                params={{
                                    data: flowData,
                                    viewOnly: viewOnly,
                                    customNode: customNode,
                                    showMimiMap: showMimiMap,

                                }}
                                events={{
                                    onNodeSelect: this.onNodeSelect
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
