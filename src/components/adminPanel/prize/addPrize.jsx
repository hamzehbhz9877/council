import React from 'react';
import {useDispatch} from "react-redux";
import {AddNewPrize} from "../../../redux/actions/prize/prize";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import Input from "../../utils/formik/input";
import TextArea from "../../utils/formik/textArea";


const AddPrize = ({close, title}) => {


    const dispatch = useDispatch()


    const initialValues = {
        name: "",
        description: "",
        countInvited: "",
    };


    const validationSchema = Yup.object({
        name: Yup.string().required("لطفا نام را وارد کنید").trim(),
        description: Yup.string().required("لطفا توضیحات را وارد کنید").trim(),
        countInvited: Yup.number().required("لطفا تعداد را وارد کنید")
    });


    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        console.log(values)
        close()
        await dispatch(AddNewPrize(values))
    }

    return (
        <div className="prize__modal">
            <h4>{title}</h4>
            <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                {(props) => {
                    return (
                        <Form>

                            <Input name="name" type="text" label="عنوان جایزه"/>
                            <TextArea name="description" rows="7" type="text" label="متن جایزه"/>
                            <Input name="countInvited" type="number"  label="تعداد جایزه"/>

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

export default AddPrize;