import './code-block.css'
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import Dropdown from "./dropdown";

export default class CodeBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            txt: "JavaScript"
        }
    }

    // onSelect = (event) => {
    //     console.log("选择语言")
    //     this.props.editor.setNodeByKey(this.props.node.key, { data: { language: event.target.value } })
    // }

    render() {
        const { attributes, children, node, editor } = this.props
        if (!node) {
            return <div></div>;
        }
        const langMenu = (
            <Menu
                className={"lang-menu"}
                selectable={false}
                onClick={value => {
                    if (value) {
                        console.log(value);
                        // editor.setNodeByKey(node.key, { data: { language: value.key } })
                        this.setState({
                            txt: value.item.props.children
                        })
                    }
                }}
            >
                <MenuItem key="java">Java</MenuItem>
                <MenuItem key="html">Html</MenuItem>
                <MenuItem key="markdown">Markdown</MenuItem>
                <MenuItem key="js">JavaScript</MenuItem>
                <MenuItem key="jsx">React JSX</MenuItem>
                <MenuItem key="tsx">React TSX</MenuItem>
            </Menu>
        );
        if (this.state.txt == null) {
            this.state.txt = node.data.get("language");
            console.log(this.state.txt)
        }
        return (
            <div style={{ padding: '0 20px', backgroundColor: "#eee", borderRadius: '3px' }}>
                <div style={{ borderBottom: "2px solid #e6e6e6", padding: '5px 0', }}>
                    <Dropdown overlay={langMenu}>
                        <div className={"lang-dropdown"}>
                            <span>{this.state.txt}</span>
                            <span><i className={"iconfont icon-down"} /></span>
                        </div>
                    </Dropdown>
                </div>
                <div style={{ maxHeight: "400px", overflow: "auto" }}>
                    <pre>
                        <code {...attributes}>{children}</code>
                    </pre>
                </div>
            </div>

        )
    }
}