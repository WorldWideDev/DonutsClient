import React, { Component } from 'react';
const stateMap = {
    EDITING: "EDITING",
    DEFAULT: "DEFAULT",
}
export default class DonutTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crudState: stateMap.DEFAULT 
        }
    }
    renderEditing() {
        const {donut} = this.props;
        return (
            <tr>
                <form action="">

                </form>
            </tr>
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
                        onClick={() => console.log("Editing ", donut.id)}
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
