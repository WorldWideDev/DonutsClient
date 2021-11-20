import { table } from 'console';
import React from 'react';
import DonutTableRow from '../DonutTableRow/DonutTableRow';
import DonutTableProps from "./DonutTableProps";

const DonutTable:React.FC<DonutTableProps> = props => {
    const { donuts, setDonuts } = props;
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
            { donuts.map(donut => (
                <DonutTableRow key={donut.id} donut={donut} donuts={donuts} setDonuts={setDonuts} />
            ))}
            </tbody>
       </table> 
    )
};

export default DonutTable;