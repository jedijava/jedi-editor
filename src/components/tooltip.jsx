import RcTooltip from 'rc-tooltip';
import TipText from '../data/menu-tip';
import './tooltip.css';

export default class Toolbar extends React.Component {

    render() {
        const { children, icon, disable } = this.props;
        const text = TipText[icon];
        if (text && !disable) {
            return <RcTooltip
                placement="bottom"
                overlay={text}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >{children}</RcTooltip>
        } else {
            return <div>{children}</div>
        }
    }
}
