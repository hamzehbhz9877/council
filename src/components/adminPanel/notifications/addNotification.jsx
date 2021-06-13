import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {AddNewNotification} from "../../../redux/actions/notification/notification";
import {getInfoRegister} from "../../../services/council";
import Select from 'react-select'
import _ from "lodash"
import {Form, Formik} from "formik";
import Input from "../../utils/formik/input";
import TextArea from "../../utils/formik/textArea";
import * as Yup from "yup";

const AddNotification = ({close, title}) => {

    let districtRef = useRef(null)
    let jobRef = useRef(null)


    const [districtAndJobs, setDistrictAndJobs] = useState({})

    const dispatch = useDispatch()


    const initialValues = {
        title: "",
        text: "",
        districts: [],
        jobs: [],
    };


    const validationSchema = Yup.object({
        title: Yup.string().required("لطفا عنوان را وارد کنید").trim(),
        text: Yup.string().required("لطفا توضیحات را وارد کنید").trim(),
        districts: Yup.array(),
        jobs: Yup.array()
    });

    useEffect(() => {
        getDistAndJob()
    }, [])


    const getDistAndJob = async () => {
        const {data} = await getInfoRegister();
        setDistrictAndJobs(data.data)
    }


    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        districtRef.select.clearValue()
        jobRef.select.clearValue()
        close()
        await dispatch(AddNewNotification(values))
    }

    return (
        <div className="notification__modal">
            <h4>{title}</h4>
            <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                {(props) => {
                    const touchedJob = () => {
                        props.setFieldTouched("jobId", true)
                    };
                    const touchedDistrict = () => {
                        props.setFieldTouched("districtId", true)
                    };

                    const districtError = props.errors.districtId && props.touched.districtId
                    const jobIdError = props.errors.jobId && props.touched.jobId;
                    console.log(props)

                    return (
                        <Form>

                            <Input name="title" type="text" label="عنوان پیامک"/>
                            <TextArea name="text" rows="7" type="text" label="متن پیامک"/>

                            <div className="form-group">
                                <label htmlFor="">محله</label>
                                <Select
                                    ref={ref => districtRef = ref}
                                    className="basic-single"
                                    placeholder="انتخاب کنید ..."
                                    isClearable={true}
                                    isRtl={true}
                                    isSearchable={true}
                                    isMulti
                                    isLoading={_.isEmpty(districtAndJobs)}
                                    isDisabled={_.isEmpty(districtAndJobs)}
                                    name="district"
                                    onBlur={() => touchedDistrict()}
                                    onChange={e => props.setFieldValue("districtId", e ? e.map((item) => item.value) : "")}
                                    options={!_.isEmpty(districtAndJobs) && districtAndJobs.districts.map(data => {
                                        return {value: data.id, label: data.name}
                                    })}
                                />
                                <div className="error">
                                    {districtError && props.errors.districtId}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">شغل</label>
                                <Select
                                    ref={ref => jobRef = ref}
                                    className="basic-single"
                                    placeholder="انتخاب کنید ..."
                                    isLoading={_.isEmpty(districtAndJobs)}
                                    isClearable={true}
                                    isMulti
                                    isRtl={true}
                                    isDisabled={_.isEmpty(districtAndJobs)}
                                    isSearchable={true}
                                    name="job"
                                    onBlur={() => touchedJob()}
                                    onChange={e => props.setFieldValue("jobId", e ? e.value : "")}
                                    options={!_.isEmpty(districtAndJobs) && districtAndJobs.jobs.map(data => {
                                        return {value: data.id, label: data.name}
                                    })}
                                />
                                <div className="error">
                                    {jobIdError && props.errors.jobId}
                                </div>
                            </div>

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

export default AddNotification;