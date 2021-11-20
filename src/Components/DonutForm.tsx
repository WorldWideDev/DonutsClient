import React, { FormEvent, FormEventHandler, useState } from 'react';
import Donut from '../Types/Donut';
import APIService from '../Services/APIService';
import DonutFormProps from '../Types/DonutFormProps';
import DonutFormFieldError from '../Types/DonutFormFieldError';
const INITIAL_DONUT:Donut = {
    name: "",
    description: "",
    id:-1
};

const DonutForm:React.FC<DonutFormProps> = props => {
    const { donuts, setDonuts } = props;
    const [ donut, setDonut ] = useState(INITIAL_DONUT);
    const [ errors, setErrors ] = useState<DonutFormFieldError[]>([]);
    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await APIService.post(donut)
            .then(res => {
                setDonuts([...donuts, donut])
                setDonut(INITIAL_DONUT);
            })
            .catch(err => setErrors(err.response.data.apierror.subErrors));
    }
    const fieldErrors = (field:string):DonutFormFieldError[] => errors.filter(e => e.field === field);
    return (
        <form onSubmit={(e) => submitHandler(e)}>

            <h3>Add a Donut</h3>
            <div className="jumbotron">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text"
                        className="form-control"
                        onChange={(e) => setDonut({...donut, name:e.target.value})}
                        value={donut.name} />
                    {fieldErrors("name").map((err, i) => (
                        <span key={i}>{err.message}</span>
                    ))}
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text"
                        className="form-control"
                        onChange={(e) => setDonut({...donut, description:e.target.value})}
                        value={donut.description} />
                    {fieldErrors("description").map((err, i) => (
                        <span key={i}>{err.message}</span>
                    ))}
                </div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default DonutForm;