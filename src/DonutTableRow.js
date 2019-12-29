import React, { Component } from 'react';
import DonutRowEdit from './DonutRowEdit';
const stateMap = {
    EDITING: "EDITING",
    DEFAULT: "DEFAULT",
    ERROR: "ERROR",
}
export default class DonutTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crudState: stateMap.DEFAULT 
        }
    }
    handleReturn(result) {
        let newState = stateMap.DEFAULT;
        switch(result) {
            case "error":
                newState = stateMap.EDITING;
                break;
            case "done":
                break;
            default:
                break;
        }
        this.setState({crudState: newState});
    }
    renderEditing() {
        const {donut} = this.props;
        return (
            <DonutRowEdit 
                donut={donut} 
                onSubmit = {(donut) => this.props.onSubmit(donut)}
                onReturn={(result) => this.handleReturn(result)}/>
        );
    }
    renderDefault() {
        const {donut} = this.props;
        return (
            <tr>
                <td>{donut.name}</td>
                <td>{donut.description}</td>
                <td>
                    <button
                        onClick={() => this.setState({crudState:stateMap.EDITING})}
                        className="btn btn-warning">Edit</button>
                    <button 
                        onClick={() => this.props.onDelete(donut.id)}
                        className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
    render() {
        switch(this.state.crudState) {
            case stateMap.EDITING:
                return this.renderEditing();
            default:
                return this.renderDefault();
        }
    }
}
