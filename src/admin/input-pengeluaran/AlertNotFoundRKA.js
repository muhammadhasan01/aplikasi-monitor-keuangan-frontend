import React, { Component } from 'react';
import {Alert} from "react-bootstrap";

class AlertNotFoundRKA extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { heading, body } = this.props;
        return (
            <Alert variant='info'>
                <Alert.Heading>{heading}</Alert.Heading>
                {body}
            </Alert>
        );
    }
}

export default AlertNotFoundRKA;