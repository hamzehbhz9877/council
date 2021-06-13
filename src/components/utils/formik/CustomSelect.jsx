import React from 'react';
import {useField} from "formik";

const CustomSelect = ({label,classes, ...props}) => {

    const [field, meta] = useField(props);
    const error =  meta.error  && meta.touched;

    return (
        <div className="form-group">
            <label htmlFor="">{label}</label>
            <select {...field} {...props}
                    className="form-select form-select-lg"
                    aria-label=".form-select-lg example">
                {!meta.initialValue && <option defaultChecked></option>}
                {
                    new Array(82).fill(0).map((item, index) => {
                        return <option value={index + 18} key={index}>{index + 18}</option>
                    })
                }
            </select>
            {error && (<span className="error">{meta.error}</span>)}
        </div>
    );
};

export default CustomSelect;