import React, { useState } from 'react';
import Donut from '../../GlobalTypes/Donut';
import APIService from '../../Services/APIService';
import { ActionState } from './ActionState';
import DonutTableRowProps from './DonutTableRowProps';
import FormGroup from '../FormGroup/FormGroup';
import { InputField } from '../../GlobalTypes/InputField';
import DonutFieldError from '../../GlobalTypes/DonutFieldError';

const DonutTableRow:React.FC<DonutTableRowProps> = (props) => {
    const { donut, setDonuts, donuts } = props;
    const [ editDonut, setEditDonut ] = useState<Donut>(props.donut);
    const [ actionState, setActionState ] = useState<ActionState>(ActionState.DEFAULT);
    const [ errors, setErrors ] = useState<DonutFieldError[]>([]);

    const deleteHandler = async(id:number) => {
        try {
            await APIService.delete(id)
                .then((res) => {
                    setDonuts((prevDonuts) => [...prevDonuts.filter(d => d.id !== id)]);
                })
        } catch(err) {
            console.log(err);
        }
    }
    const updateHandler = async() => {
        await APIService.patch(editDonut)
            .then((res) => {
                setDonuts((prevDonuts) => {
                    const updated:Donut = donuts.filter(d => d.id === res.data.id)[0],
                        i:number = donuts.indexOf(updated), 
                        len:number = donuts.length;
                    const newDonuts = [...donuts.slice(0, i), res.data, ...donuts.slice(i+1, len)];
                    return newDonuts;
                });
                setActionState(ActionState.DEFAULT);

            })
            .catch(err => setErrors(err.response.data.apierror.subErrors));
    }
    const onInputUpdated = (value:string, name:string) => {
        setEditDonut({...editDonut, [name]:value});
    }
    const fieldErrors = (field:string):DonutFieldError[] => errors.filter(e => e.field === field);


    switch(actionState) {
        case ActionState.EDITING:
            return (
                <tr>
                    <td>
                        <FormGroup 
                            field={{ 
                                name:"name", 
                                displayName:"Donut Name", 
                                type:InputField.Text }} 
                            value={editDonut.name}
                            onInputChanged={onInputUpdated} 
                            errors={fieldErrors("name")}/>    
                    </td>
                    <td>
                        <FormGroup 
                            field={{ 
                                name:"description", 
                                displayName:"Description", 
                                type:InputField.Text }} 
                            value={editDonut.description}
                            onInputChanged={onInputUpdated} 
                            errors={fieldErrors("description")}/>    
                    </td>
                    <td>
                        <button className="btn btn-primary" 
                            onClick={updateHandler}    
                        >Update</button>
                        <button className="btn btn-warning" onClick={() => setActionState(ActionState.DEFAULT)}>Cancel</button>
                    </td>
                </tr>
            )
        case ActionState.CONFIRM_DELETE:
            return (
                <tr>
                    <td>Are you sure you want to delete this Donut?</td>
                    <td></td>
                    <td>
                        <button className="btn btn-danger"
                            onClick={() => {
                                console.log(`Time to delete Donut #${donut.id}`)
                                deleteHandler(donut.id);
                                setActionState(ActionState.DEFAULT);
                            }}
                        >DO IT</button>
                        <button className="btn btn-primary"
                            onClick={() => setActionState(ActionState.DEFAULT)}
                        >Cancel</button>
                    </td>
                </tr>
            )
        default:
            return (
                <tr>
                    <td>{donut.name}</td>
                    <td>{donut.description}</td>
                    <td>
                        <button
                            onClick={() => setActionState(ActionState.EDITING)}
                            className="btn btn-warning">Edit</button>
                        <button 
                            onClick={() => setActionState(ActionState.CONFIRM_DELETE)}
                            className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
    }
};

export default DonutTableRow;