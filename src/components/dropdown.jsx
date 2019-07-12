import Rcdropdown from 'rc-dropdown';
import * as React from 'react';
import "./dropdown.css"
export default class Dropdown extends React.Component {
    // onVisibleChange = (b) => {
    //     console.log()
    // }
    render() {
        const {
            children,
            overlay
        } = this.props
        return <Rcdropdown
            trigger={['click']}
            overlay={overlay}
            animation="slide-up"
        >
            <div>{children}</div>
        </Rcdropdown>;
    }
}