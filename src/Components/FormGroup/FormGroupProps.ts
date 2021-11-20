import { SetStateAction } from "react";
import Donut from "../../GlobalTypes/Donut";
import DonutFieldError from "../../GlobalTypes/DonutFieldError";
import { InputField } from "../../GlobalTypes/InputField";

export interface FormGroupField {
    name:string,
    displayName:string
    type:InputField
};

export default interface FormGroupProps {
    field:FormGroupField,
    value:string,
    onInputChanged:(value: string, name: string) => void,
    errors:DonutFieldError[]
};