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
    SaveOutlined,
    LayoutOutlined
} from "@ant-design/icons"
import React from "react"

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
        "save": <SaveOutlined />,
        "layout": <LayoutOutlined />
}

export default function getIcon (icon){
    return map[icon] || <FileOutlined />
}