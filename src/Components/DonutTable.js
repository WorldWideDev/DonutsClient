import React, { Component } from 'react';
import DonutTableRow from './DonutTableRow';

export default class DonutTable extends Component {
    render() {
        return (
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.donuts.map(donut => {
                    return (
                        <DonutTableRow 
                            key={donut.id} 
                            onSubmit={(donut) => this.props.onSubmit(donut)}
                            onDelete={(id) => this.props.onDelete(id)}
                            donut={donut}/>
                    );
                })}
                </tbody>
            </table>
        );
    }
}
