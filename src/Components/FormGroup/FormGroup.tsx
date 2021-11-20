import React, { FC } from "react";
import FormGroupProps from "./FormGroupProps";

const FormGroup:FC<FormGroupProps> = (props) => {
    const {field, onInputChanged, errors, value } = props;
    const {name, type, displayName} = field;

    const onChangeHandler = (value:string) => {
        onInputChanged(value, name)
    }
    return (
        <div className="form-group">
            <label>{displayName}:</label>
            <input type={type}
                className="form-control"
                onChange={(e) => onChangeHandler(e.target.value)}
                value={value} />
            {errors.map((err, i) => (
                <span className="field-error" key={i}>{err.message}</span>
            ))}
        </div>
    )
}
export default FormGroup;