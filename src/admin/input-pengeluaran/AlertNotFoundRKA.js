import React, { Component } from 'react';
import {Alert} from "react-bootstrap";

class AlertNotFoundRKA extends Component {
    render() {
        const { heading, body } = this.props;
        return (
            <Alert variant='info' className='m-3'>
                <Alert.Heading>{heading}</Alert.Heading>
                {body}
            </Alert>
        );
    }
}

export default AlertNotFoundRKA;