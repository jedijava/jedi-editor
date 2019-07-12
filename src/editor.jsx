import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Prism from 'prismjs'
import isEmpty from "is-empty";
import Plain from 'slate-plain-serializer';
import Html from './html';

import Toolbar from './toolbar'
import RenderPlugin from './plugins/render'
import KeymapPlugin from './plugins/keymap'
import HighghtPlugin from './plugins/highlight'
import emptyValue from "./data/empty-value.json"

import "./editor.css"

const plugins = [RenderPlugin(), HighghtPlugin()];

export default class JediEditor extends React.Component {
    constructor(props) {
        super(props)
        if (isEmpty(props.value)) {
            props.value = emptyValue
        }
        this.state = {
            value: Value.fromJSON(props.value)
        }
    }
    // componentDidMount() {
    //     console.log("componentDidMount")
    // }

    //留意下入参的形式
    onChange = ({ value }) => {
        this.setState({ value })
        this.props.onChange(this.value)
    }

    ref = editor => {
        this.editor = editor
    }
    value = {
        json: (json) => {
            if (json) {
                let value = Value.fromJSON(json)
                this.setState({ value })
            } else {
                return this.state.value.toJSON();
            }
        },
        text: (txt) => {
            if (txt) {
                let value = Plain.deserialize(txt)
                this.setState({ value })
            } else {
                return Plain.serialize(this.state.value);
            }
        },
        html: () => {
            return Html.serialize(this.state.value);
        },
        markdown: () => { return "暂未实现" },
    }
    render() {
        const { menu } = this.props;
        return (<div>
            <Toolbar
                editor={this.editor}
                menu={menu}
            />
            <div className={"jedi-editor-content"} >
                <Editor
                    plugins={plugins}
                    value={this.state.value}
                    onChange={this.onChange}
                    spellCheck={false}
                    autoFocus
                    placeholder="在此处开始输入..."
                    ref={this.ref}
                />
            </div>
        </div >)
    }
}