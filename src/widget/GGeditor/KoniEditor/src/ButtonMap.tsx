import React from "react"
import { Button } from "antd"
import {
    FileOutlined,
    UndoOutlined,
    RedoOutlined,
    CopyOutlined,
    SnippetsOutlined,
    DeleteOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
    EyeOutlined,
    DesktopOutlined,
    DownSquareOutlined,
    UpSquareOutlined,
    SelectOutlined,
    GroupOutlined,
    UngroupOutlined,
    SaveOutlined
} from "@ant-design/icons"

const map = {
        "undo": <UndoOutlined/>,
        "redo": <RedoOutlined/>,
        "copy": <CopyOutlined/>,
        "paste": <SnippetsOutlined/>,
        "delete": <DeleteOutlined/>,
        "zoom-in": <ZoomInOutlined/>,
        "zoom-out": <ZoomOutOutlined/>,
        "fit-map": <EyeOutlined/>,
        "actual-size": <DesktopOutlined/>,
        "to-back": <DownSquareOutlined/>,
        "to-front": <UpSquareOutlined/>,
        "multi-select": <SelectOutlined/>,
        "group": <GroupOutlined/>,
        "ungroup": <UngroupOutlined/>,
        "save": <SaveOutlined />
}

export default class ButtonMap extends React.Component<any> {
    constructor(props) {
        super(props)
    }
    render() {
        const { icon, handleClick } = this.props;
        return (
            <Button
                icon={map[icon] || <FileOutlined />}
                type="link"
                onClick={!!handleClick ? handleClick : null}
            />
        )
    }
}