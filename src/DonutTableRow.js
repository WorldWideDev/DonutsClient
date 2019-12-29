import React, {Component} from 'react';
import DonutRowEdit from './DonutRowEdit';
const stateMap = {
    EDITING: "EDITING",
    DEFAULT: "DEFAULT",
    CONFIRM_DELETE: "CONFIRM_DELETE",
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
    renderConfirm() {
        const {donut} = this.props;
        return (
            <tr>
                <td>Are you sure you want to delete this Donut?</td>
                <td></td>
                <td>
                    <button className="btn btn-danger"
                        onClick={() => this.props.onDelete(donut.id)}
                    >DO IT</button>
                    <button className="btn btn-primary"
                        onClick={() => this.setState({crudState: stateMap.DEFAULT})}
                    >Cancel</button>
                </td>
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
                        onClick={() => this.setState({crudState:stateMap.EDITING})}
                        className="btn btn-warning">Edit</button>
                    <button 
                        onClick={() => this.setState({crudState: stateMap.CONFIRM_DELETE})}
                        className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
    render() {
        switch(this.state.crudState) {
            case stateMap.EDITING:
                return this.renderEditing();
            case stateMap.CONFIRM_DELETE:
                return this.renderConfirm();
            default:
                return this.renderDefault();
        }
    }
}
