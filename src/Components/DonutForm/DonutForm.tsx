import React, { FormEvent, useState, useEffect } from 'react';
import Donut from '../../GlobalTypes/Donut';
import APIService from '../../Services/APIService';
import DonutFormProps from './DonutFormProps';
import DonutFieldError from '../../GlobalTypes/DonutFieldError';
import './DonutForm.scss';
import { InputField } from '../../GlobalTypes/InputField';
import FormGroup from '../FormGroup/FormGroup';
const INITIAL_DONUT:Donut = {
    name: "",
    description: "",
    id:-1
};

const DonutForm:React.FC<DonutFormProps> = props => {
    const { setDonuts } = props;
    const [ donut, setDonut ] = useState({...INITIAL_DONUT});
    const [ errors, setErrors ] = useState<DonutFieldError[]>([]);
    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await APIService.post(donut)
            .then(res => {
                console.log("submitted donut", donut);
                setDonut({...INITIAL_DONUT});
                setDonuts(prevDonuts => [res.data, ...prevDonuts]);
                console.log("donut is now", donut);
            })
            .catch(err => setErrors(err.response.data.apierror.subErrors));
    }
    const onInputUpdated = (value:string, name:string) => {
        console.log(name);
        setDonut({...donut, [name]:value});
        console.log("input updated, donut is now", donut);
    }
    const fieldErrors = (field:string):DonutFieldError[] => errors.filter(e => e.field === field);
    return (
        <form onSubmit={(e) => submitHandler(e)}>

            <h3>Add a Donut</h3>
            <div className="jumbotron">
                <FormGroup 
                    field={{ 
                        name:"name", 
                        displayName:"Donut Name", 
                        type:InputField.Text }} 
                    value={donut.name}
                    onInputChanged={onInputUpdated} 
                    errors={fieldErrors("name")}/>
                <FormGroup 
                    field={{ 
                        name:"description", 
                        displayName:"Description", 
                        type:InputField.Text }} 
                    value={donut.description}
                    onInputChanged={onInputUpdated} 
                    errors={fieldErrors("description")}/>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default DonutForm;