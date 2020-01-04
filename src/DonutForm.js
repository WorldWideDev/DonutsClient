import React, {Component} from 'react';
import ValidationError from './ValidationError';
import './DonutForm.css'

const donutModel = {
    name: "",
    description: ""
}
export default class DonutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {...donutModel},
            errors: []
        }
    }
    updateModel(input, field) {
        let updated = {...this.state.model};
        updated[field] = input;
        this.setState({model:updated});
    }
    handleSubmit(e) {
        e.preventDefault();
        let errors = [],
	    model = donutModel;
        this.props.handleSubmit(this.state.model)
            .then(result => {
                console.log(result);
                if(result.apierror) {
                    errors = result.apierror.subErrors;
		    model = this.state.model;
                }
                this.setState({
		    model: {...model},
                    errors: [...errors]
                });
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
            <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
                <h3>Add a Donut</h3>
                <div className="jumbotron">
                    <div className="form-group">
                        <label>Name:</label>
                        {nameErrors.map(e => { 
                            return <ValidationError error={e}
                                key={`${new Date()}: ${e.field}-${e.message}`}/>; 
                        })}
                        <input type="text" 
                            className={nameClassName} 
                            onChange={(e) => this.updateModel(e.target.value, "name")}
                            value={this.state.model.name} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        {descErrors.map(e => { 
                            return <ValidationError error={e}
                                key={`${new Date()}: ${e.field}-${e.message}`}/>; 
                        })}
                        <input type="text" 
                            className={descClassName} 
                            onChange={(e) => this.updateModel(e.target.value, "description")}
                            value={this.state.model.description} />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        );
    }
}
