import React, { Component } from 'react';
import { Button } from "react-bootstrap";

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
        const { action, variant } = this.props;
        return (
            <Button className='m-2' onClick={this.handleClick} variant={variant} >
                {action}
            </Button>
        )
    }
}