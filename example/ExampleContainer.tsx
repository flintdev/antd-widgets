// example/ExampleContainer.tsx

import * as React from 'react';
import {Tree} from "../src";
import {treeData} from "./data/treeNodes";

export interface Props {

}

class ExampleContainer extends React.Component<Props, object> {
    componentDidMount(): void {

    }

    render() {
        return (
            <div>
                <Tree params={{
                    data: treeData,
                    handleOnCheck: (selectedKeys: any, info: any) => console.log(">>> handleOnCheck", selectedKeys, info),
                    handleOnSelect: (selectedKeys: any, info: any) => console.log(">>> handleOnSelect", selectedKeys, info),
                    checkable: true
                }}/>
            </div>
        )
    }
}

export default ExampleContainer;
