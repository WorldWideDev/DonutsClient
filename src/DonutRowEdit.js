import React, {Component} from 'react';
import ValidationError from './ValidationError';
export default class DonutRowEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {...props.donut},
            errors: []
        }
    }
    updateModel(input, field) {
        let updated = {...this.state.model};
        updated[field] = input;
        this.setState({model:updated});
    }
    async handleSubmit() {
        let errors = [];
        let {model} = {...this.state};
        let result = await this.props.onSubmit(this.state.model);
        console.log(result);
        if(result.apierror) {
            errors = [...result.apierror.subErrors];
            this.props.onReturn("error");
        } else {
            model = {...result};
            this.props.onReturn("done");
        }
        this.setState({ 
            errors: errors,
            model: model
        });
    }
    render() {
        const nameErrors = this.state.errors.filter(e => e.field === "name");
        const descErrors = this.state.errors.filter(e => e.field === "description");
        const nameClassName = (nameErrors.length > 0) 
            ? "form-control is-invalid" 
            : "form-control";
        const descClassName = (descErrors.length > 0) 
            ? "form-control is-invalid" 
            : "form-control";
        return (
            <tr>
                <td className="form-group">
                    <input type="text" 
                        className={nameClassName} 
                        onChange={(e) => this.updateModel(e.target.value, "name")}
                        value={this.state.model.name} />
                    {nameErrors.map(e => { 
                        return <ValidationError error={e}
                            key={`${new Date()}: ${e.field}-${e.message}`}/>; 
                    })}
                </td>
                <td className="form-group">
                    <input type="text" 
                        className={descClassName} 
                        onChange={(e) => this.updateModel(e.target.value, "description")}
                        value={this.state.model.description} />
                    {descErrors.map(e => { 
                        return <ValidationError error={e}
                            key={`${new Date()}: ${e.field}-${e.message}`}/>; 
                    })}
                </td>
                <td>
                    <button onClick={() => this.handleSubmit()}
                        className="btn btn-primary">Update</button>
                    <button onClick={() => this.props.onReturn("cancel")}
                        className="btn btn-danger">Cancel</button>
                </td>
            </tr>
        );
    }
}
