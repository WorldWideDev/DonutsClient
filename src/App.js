import React from 'react';
import DonutTable from './DonutTable';
import DonutForm from './DonutForm';
import './App.css';

const api = `http://localhost:8080/`;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donuts: []
        }
    }
    componentDidMount() {
        this.fetchDonuts();
    }
    async delete(id) {
        await fetch(`${api}/${id}`, {
            method: 'DELETE',
        });
        this.fetchDonuts();
    }
    async post(data = {}) {
        const response = await fetch(api, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        this.fetchDonuts();
        return await response.json();
    }
    fetchDonuts() {
        fetch(api)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({donuts: data});
            });
    }

    render() {
        return (
            <div className="container">
                <h1>Donuts</h1>
                <blockquote>A full-circle solution.</blockquote>
                <DonutForm handleSubmit={(donut) => this.post(donut)}/>
                <hr />
                <DonutTable 
                    onDelete={(id) => this.delete(id)}
                    donuts={this.state.donuts} />
            </div>
        );
    }
}
