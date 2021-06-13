import React from 'react';
import {useDispatch} from "react-redux";
import {AddNewJob} from "../../../redux/actions/jobs/jobs";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "../../utils/formik/input";

const AddJob = ({close, title}) => {

    const dispatch = useDispatch()

    const initialValues = {
        name: ""
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('لطفا نام شغل را وارد کنید').trim(),
    });

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        close()
        await dispatch(AddNewJob(values))
    };

    return (
        <div className="job__modal">
            <h4>{title}</h4>
            <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                {(props) => {
                    console.log(props)
                    return (
                        <Form>
                            <Input name="name" type="text" label="نام"/>
                            <div className="mt-5">
                                <button className="btn btn-success" type="submit">ثبت</button>
                                <button onClick={close} className="btn btn-danger ">بستن</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
};

export default AddJob;