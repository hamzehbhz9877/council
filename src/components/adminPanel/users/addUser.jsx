import React, {useEffect, useRef, useState} from 'react';
import {getInfoRegister} from "../../../services/council";
import {AddNewUser} from "../../../redux/actions/user/user";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import Select from "react-select";
import _ from "lodash";
import Input from "../../utils/formik/input";
import CustomSelect from "../../utils/formik/CustomSelect";
import {useDispatch} from "react-redux";
import SelectInput from "../../utils/formik/select";

const AddUser = ({close, title}) => {

    let districtRef = useRef(null)
    let jobRef = useRef(null)

    const dispatch = useDispatch()
    const [districtAndJobs, setDistrictAndJobs] = useState({})


    const initialValues = {
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        age: "",
        password: "",
        confirmPassword: "",
        districtId: "",
        jobId: ""
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().min(3, "حداقل سه کاراکتر وارد کنید").required("لطفا نام را انتخاب کنید").trim(),
        lastName: Yup.string().min(3, "حداقل سه کاراکتر وارد کنید").required("لطفا نام خانوادگی  را انتخاب کنید").trim(),
        phone: Yup.string().matches(/^(9([0-3]|9)[0-9]-?[0-9]{3}-?[0-9]{4})$/,{message:"شماره همراه معتبر نمیباشد"}).required('لطفا شماره همراه خود را وارد کنید').trim(),
        gender: Yup.string().required("لطفا جنسیت را انتخاب کنید"),
        age: Yup.string().required("لطفا سن را انتخاب کنید"),
        password: Yup.string().min(6, "رمز عبور باید حداقل حاوی شش کاراکتر باشد").required('لطفا رمز عبور خود را وارد کنید').trim(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'رمز عبور با تکرار رمز عبور برابر نیست').required('لطفا تکرار رمز عبور خود را وارد کنید').trim(),
        districtId: Yup.string().required("لطفا محله را انتخاب کنید"),
        jobId: Yup.string().required("لطفا شغل را انتخاب کنید")
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
        await dispatch(AddNewUser({...values, gender: Number(values.gender), age: Number(values.age)}))
    };


    return (
        <div className="user__modal">
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


                    return (
                        <Form>

                            <Input name="firstName" type="text" label="نام"/>
                            <Input name="lastName" type="text" label="نام خانوادگی"/>
                            <Input name="phone" type="number" label="شماره تلفن"/>
                            <SelectInput name="gender" label="جنسیت" values={["آقا", "خانم"]}/>
                            <CustomSelect name="age" label="سن"/>

                            <div className="form-group">
                                <label htmlFor="">محله</label>
                                <Select
                                    ref={ref => districtRef = ref}
                                    className="basic-single"
                                    placeholder="انتخاب کنید ..."
                                    isClearable={true}
                                    isRtl={true}
                                    isSearchable={true}
                                    isLoading={_.isEmpty(districtAndJobs)}
                                    isDisabled={_.isEmpty(districtAndJobs)}
                                    name="district"
                                    onBlur={() => touchedDistrict()}
                                    onChange={e => props.setFieldValue("districtId", e ? e.value : "")}
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
                            <Input name="password" type="password" label="رمز عبور" autoComplete="new-password"/>
                            <Input name="confirmPassword" type="password" label="تکرار رمز عبور"/>

                            <div className="mt-5">
                                <button className="btn btn-success" type="submit">ثبت</button>
                                <button onClick={close} className="btn btn-danger">بستن</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
};

export default AddUser;
