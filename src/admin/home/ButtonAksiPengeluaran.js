import React, { Component } from 'react';
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";

export default class ButtonAksiPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = { value: null }
    }

    static getDerivedStateFromProps(props) {
        return { value: props.value }
    }

    handleClick = () => { this.props.handleAction(this.state.value) }

    render() {
        const { icon, action, variant } = this.props;
        return (
            <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                    <Tooltip id="tooltip-bottom">
                        {action}
                    </Tooltip>
                }
            >
                <Button className='m-2' onClick={this.handleClick} variant={variant} >
                    {icon}
                </Button>
            </OverlayTrigger>
        )
    }
}