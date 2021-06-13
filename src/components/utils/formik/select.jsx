import React from 'react';
import {useField} from 'formik';


const CustomSelectInput = ({label, classes, values, ...props}) => {

    const [field, meta] = useField(props);
    const error = meta.error  && meta.touched;

    return (
        <>
            <div className={`form-group ${classes ? classes : ""}`}>
                <label htmlFor="">{label}</label>
                <select {...field} {...props} placeholder="وارد کنید"
                        className="form-select form-select-lg"
                        aria-label=".form-select-lg example">
                    {!meta.initialValue && <option defaultChecked></option>}
                    {values.map((value, index) => <option key={index} value={index + 1}>{value}</option>)}
                </select>
                {error && (<span className="error">{meta.error}</span>)}
            </div>

        </>
    );
};
export default CustomSelectInput