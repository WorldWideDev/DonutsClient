import React, {Component} from 'react';

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
    handleSubmit() {
        let errors = [];
        let {model} = {...this.state};
        this.props.onSubmit(this.state.model)
            .then(result => {
                console.log(result);
                if(result.apierror) {
                    errors = [...result.apierror.subErrors];
                    this.props.onReturn("error");
                }
                else {
                    model = {...result}
                }
                this.setState({
                    errors: errors,
                    model: model
                });
                this.props.onReturn("done");
            });
    }
    render() {
        const nameErrors = this.state.errors.filter(e => e.field === "name");
        const descErrors = this.state.errors.filter(e => e.field === "description");
        return (
            <tr>
                <td className="form-group">
                    {nameErrors.map(e => { 
                        return <span 
                            key={`${new Date()}: ${e.field}-${e.message}`}
                            className="error">{e.message}</span>; 
                    })}
                    <input type="text" 
                        className="form-control" 
                        onChange={(e) => this.updateModel(e.target.value, "name")}
                        value={this.state.model.name} />
                </td>
                <td className="form-group">
                    {descErrors.map(e => { 
                        return <span 
                            key={`${new Date()}: ${e.field}-${e.message}`}
                            className="error">{e.message}</span>; 
                    })}
                    <input type="text" 
                        className="form-control" 
                        onChange={(e) => this.updateModel(e.target.value, "description")}
                        value={this.state.model.description} />
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
