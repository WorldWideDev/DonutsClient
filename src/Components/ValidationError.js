import React, {Component} from 'react';
import './ValidationError.css';
export default class ValidationError extends Component {
    niceErrorMessage() {
        const {error} = this.props;
        return `${error.field.toUpperCase()} ${error.message}!`;
    }
    render() {
        return <span className="error">{this.niceErrorMessage()}</span>; 
    }
}
