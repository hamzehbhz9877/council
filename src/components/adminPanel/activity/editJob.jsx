import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {EditSingleJob} from "../../../redux/actions/jobs/jobs";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import Input from "../../utils/formik/input";

const EditDistrict = ({close, data, title}) => {

    const [name, setName] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setName(data.name)
    }, [])

    const validationSchema = Yup.object({
        name: Yup.string().required('لطفا نام شغل را وارد کنید').trim(),
    });


    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        close()
        await dispatch(EditSingleJob({...values,id:data.id},data.id))
    };

    return (
        <div className="job__modal">
            <h4>{title}</h4>
            <Formik initialValues={{name}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
            >
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

export default EditDistrict;