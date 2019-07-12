import defaultMenu from "./data/default-menu.json";
import MENU_ICON from "./data/support-menu";
import TYPE from "./data/support-type";
import { ToolbarWrapper, Button, Seperator, Dropdown, Inline } from "./components";
import isEmpty from "is-empty";
import Menu, { Item as MenuItem, Divider } from "rc-menu";

import './icon.css'
import './toolbar.css'

const DEFAULT_NODE = "paragraph";

export default class Toolbar extends React.Component {
    state = {
        btnDisable: false,
        headingText: "正文"
    }
    render() {
        const editor = this.props.editor;
        if (isEmpty(editor)) {
            return <ToolbarWrapper />;
        }
        const {
            value: { document, blocks, activeMarks, data }
        } = editor;
        let menu = this.props.menu;
        const menuArr = []
        if (isEmpty(menu)) {
            menu = defaultMenu;
        }
        //渲染工具栏菜单
        menu.forEach(iconArr => {
            let lineMenu = iconArr.map(icon => {
                switch (icon) {
                    case MENU_ICON.SEPERATOR:
                        return <Seperator />;
                    case MENU_ICON.SAVE:
                        return (
                            <Button
                                icon={icon}
                                onMouseDown={() => {
                                    console.log("保存");
                                }}
                            />
                        );
                    case MENU_ICON.UNDO:
                        const undos = data.get('undos');
                        const disable = !(undos && undos.size > 1)
                        return (
                            <Button
                                icon={icon}
                                disable={disable}
                                onMouseDown={() => {
                                    event.preventDefault()
                                    editor.undo()
                                }}
                            />
                        );
                    case MENU_ICON.REDO:
                        const redos = data.get('redos')
                        const disableRedo = !(redos && redos.size > 0)
                        return (<Button
                            icon={icon}
                            disable={disableRedo}
                            onMouseDown={() => {
                                event.preventDefault()
                                editor.redo()
                            }}
                        />)
                    case MENU_ICON.IMAGE:
                    case MENU_ICON.LINK:
                        return (
                            <Button
                                icon={icon}
                                onMouseDown={() => {
                                    console.log("按钮", icon);
                                }}
                            />
                        );
                    case MENU_ICON.BOLD:
                    case MENU_ICON.ITALIC:
                    case MENU_ICON.UNDERLINE:
                    case MENU_ICON.STRIKETHROUGH:
                    case MENU_ICON.CODE_INLINE:
                        const isMarkActive = hasMark(activeMarks, icon);
                        return (
                            <Button
                                active={isMarkActive}
                                icon={icon}
                                onMouseDown={event => {
                                    event.preventDefault();
                                    editor.toggleMark(icon);
                                }}
                            />
                        );

                    case MENU_ICON.HEADING:
                        const headingMenu = (
                            <Menu
                                selectable={false}
                                onClick={value => {
                                    if (value) {
                                        onClickBlock(event, editor, value.key);
                                        this.setState({
                                            headingText: value.item.props.children
                                        })
                                    }
                                }}
                            >
                                <MenuItem key="paragraph">正文</MenuItem>
                                <Divider />
                                <MenuItem key="h1">H1</MenuItem>
                                <MenuItem key="h2">H2</MenuItem>
                                <MenuItem key="h3">H3</MenuItem>
                                <MenuItem key="h4">H4</MenuItem>
                                <MenuItem key="h5">H5</MenuItem>
                            </Menu>
                        );
                        return (
                            <Dropdown overlay={headingMenu}>
                                <div className={"heading-dropdown"}>
                                    <span>{this.state.headingText}</span>
                                    <span><i className={"iconfont icon-down"} /></span>
                                </div>
                            </Dropdown>
                        );
                    case MENU_ICON.BLOCKQUOTE:
                    case MENU_ICON.CHECK_LIST:
                        const isBlockActive = hasBlock(blocks, icon);
                        return (
                            <Button
                                active={isBlockActive}
                                icon={icon}
                                onMouseDown={event => onClickBlock(event, editor, icon)}
                            />
                        );
                    case MENU_ICON.CODE_BLOCK:
                        const isCodeBlockActive = hasBlock(blocks, icon) || hasBlock(blocks, TYPE.CODE_PIECE);
                        return (
                            <Button
                                active={isCodeBlockActive}
                                disable={isCodeBlockActive}
                                icon={icon}
                                onMouseDown={event => onClickBlock(event, editor, icon)}
                            />
                        );
                    case MENU_ICON.NUMBER_LIST:
                    case MENU_ICON.BULLET_LIST:
                        let isListActive = hasBlock(blocks, icon);
                        if (blocks.size > 0) {
                            const parent = document.getParent(blocks.first().key);
                            isListActive =
                                hasBlock(blocks, "list-item") && parent && parent.type === icon;
                        }
                        return (
                            <Button
                                active={isListActive}
                                icon={icon}
                                onMouseDown={event => onClickBlock(event, editor, icon)}
                            />
                        );
                    default:
                        console.warn("暂未实现此功能", icon);
                        return;
                }
            });
            menuArr.push(<Inline>{lineMenu}</Inline>);
        });
        return (<ToolbarWrapper>{menuArr} </ToolbarWrapper >)
    }
}


function hasMark(activeMarks, type) {
    return activeMarks.some(node => node.type === type);
}
function hasBlock(blocks, type) {
    return blocks.some(node => node.type === type);
}

function onClickBlock(event, editor, type) {
    event.preventDefault();
    const {
        value: { document, blocks }
    } = editor;
    const hasListItem = hasBlock(blocks, 'list-item')
    switch (type) {
        case MENU_ICON.BULLET_LIST:
        case MENU_ICON.NUMBER_LIST:
            const isType = blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })
            if (hasListItem && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock(MENU_ICON.NUMBER_LIST)
                    .unwrapBlock(MENU_ICON.BULLET_LIST)
            } else if (hasListItem) {
                editor
                    .unwrapBlock(
                        type === MENU_ICON.BULLET_LIST ? MENU_ICON.NUMBER_LIST : MENU_ICON.BULLET_LIST
                    )
                    .wrapBlock(type)
            } else {
                editor.setBlocks('list-item').wrapBlock(type)
            }
            break;
        case MENU_ICON.CODE_BLOCK:
            //代码块中不能再插入代码块
            return

        default:
            const isActive = hasBlock(blocks, type)
            if (hasListItem) {
                editor
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock(MENU_ICON.BULLET_LIST)
                    .unwrapBlock(MENU_ICON.NUMBER_LIST)
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type)
            }
            return;
    }


}