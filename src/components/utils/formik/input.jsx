import React from 'react';
import {useField} from 'formik';


const Input = ({label,classes, ...props}) => {

    const [field, meta] = useField(props);
    const error =  meta.error && meta.touched;

    return (
        <>
            <div className={`form-group ${classes?classes:""}`}>
                <label htmlFor="" >{label}</label>
                <input {...field} {...props}
                           className={`form-control ${meta.touched && !meta.error ? "success" : ""}`}
                           placeholder="وارد کنید"/>
                {error && (<span className="error">{meta.error}</span>)}
            </div>

        </>
    );
};
export default Input