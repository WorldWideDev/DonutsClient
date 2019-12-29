import React, {Component} from 'react';
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
        let errors = [];
        this.props.handleSubmit(this.state.model)
            .then(result => {
                console.log(result);
                if(result.apierror) {
                    errors = result.apierror.subErrors;
                }
                this.setState({
                    model: {...donutModel},
                    errors: [...errors]
                });
            });
    }
    render() {
        const nameErrors = this.state.errors.filter(e => e.field === "name");
        const descErrors = this.state.errors.filter(e => e.field === "description");
        return (
            <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
                <h3>Add a Donut</h3>
                <div className="jumbotron">
                    <div className="form-group">
                        <label>Name:</label>
                        {nameErrors.map(e => { 
                            return <span 
                                key={`${new Date()}: ${e.field}-${e.message}`}
                                className="error">{e.message}</span>; 
                        })}
                        <input type="text" 
                            className="form-control" 
                            onChange={(e) => this.updateModel(e.target.value, "name")}
                            value={this.state.model.name} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        {descErrors.map(e => { 
                            return <span 
                                key={`${new Date()}: ${e.field}-${e.message}`}
                                className="error">{e.message}</span>; 
                        })}
                        <input type="text" 
                            className="form-control" 
                            onChange={(e) => this.updateModel(e.target.value, "description")}
                            value={this.state.model.description} />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        );
    }
}
