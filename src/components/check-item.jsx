import './check-item.css'
export default class CheckItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }

    toggleCheck = () => {
        let checked = !this.state.checked;
        this.setState({
            checked
        })
    }

    render() {
        const { attributes, children, node } = this.props
        let checked = undefined;
        if (node.data && node.data.size > 0) {
            checked = node.data.get('checked');
        }
        if (checked === undefined || checked === null) {
            checked = this.state.checked
        }
        let icon = checked ? "checkbox-checked" : "checkbox";
        return (
            <cli class={icon}>
                <div class={"check-item"} {...attributes}>
                    <span class={"check-item-icon"}><i onMouseDown={() => this.toggleCheck()} class={`iconfont icon-${icon}`} ></i></span>
                    <span>{children}</span>
                </div>
            </cli>
        )
    }
}