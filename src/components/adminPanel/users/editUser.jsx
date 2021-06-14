import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getInfoRegister} from "../../../services/council";
import Select from "react-select";
import _ from "lodash";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import Input from "../../utils/formik/input";
import CustomSelect from "../../utils/formik/CustomSelect";
import CustomSelectInput from "../../utils/formik/select";
import {EditSingleUser} from "../../../redux/actions/user/user";

const EditUser = ({close, title, data}) => {


    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [districtId, setDistrictId] = useState("")
    const [jobId, setJobId] = useState("");

    const [singleJob, setSingleJob] = useState({label: "", value: 0})
    const [singleDistrict, setSingleDistrict] = useState({label: "", value: 0})

    const [districtAndJobs, setDistrictAndJobs] = useState({})


    const validationSchema = Yup.object({
        firstName: Yup.string().min(3, "حداقل سه کاراکتر وارد کنید").required("لطفا نام را انتخاب کنید").trim(),
        lastName: Yup.string().min(3, "حداقل سه کاراکتر وارد کنید").required("لطفا نام خانوادگی  را انتخاب کنید").trim(),
        phone: Yup.string().matches(/^(9([0-3]|9)[0-9]-?[0-9]{3}-?[0-9]{4})$/,{message:"شماره همراه معتبر نمیباشد"}).required('لطفا شماره همراه خود را وارد کنید').trim(),
        gender: Yup.string().required("لطفا جنسیت را انتخاب کنید"),
        age: Yup.string().required("لطفا سن را انتخاب کنید"),
        districtId: Yup.string().required("لطفا محله را انتخاب کنید"),
        jobId: Yup.string().required("لطفا شغل را انتخاب کنید")
    });

    console.log(data)
    useEffect(() => {
        getDistAndJob();
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setPhone(data.phone)
        setAge(data.age)
        setDistrictId(data.districtId)
        setJobId(data.jobId)
        if (data.gender === "آقا") {
            setGender("1")
        } else {
            setGender("2")
        }

    }, [])

    const getDistAndJob = async () => {
        const res = await getInfoRegister();

        const findJob = res.data.data.jobs.find(item => item.id === data.jobId)
        const findDistrict = res.data.data.districts.find(item => item.id === data.districtId)

        setSingleJob({...singleJob, label: findJob.name})
        setSingleDistrict({...singleDistrict, label: findDistrict.name})

        setDistrictAndJobs(res.data.data)
    }


    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        close()
        await dispatch(EditSingleUser({
            ...values,
            age: Number(values.age),
            createAt: data.createAt,
            id: data.id
        }, data.id))
    };


    return (
        <div className="user__modal">
            <h4>{title}</h4>
            <Formik initialValues={{firstName, lastName, phone, gender, districtId, jobId, age}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
            >
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
                            <CustomSelectInput name="gender" label="جنسیت" values={["آقا", "خانم"]}/>
                            <CustomSelect name="age" label="سن"/>

                            <div className="form-group">
                                <label htmlFor="">محله</label>
                                {!_.isEmpty(districtAndJobs) && <Select
                                    className="basic-single"
                                    placeholder="انتخاب کنید ..."
                                    isClearable={true}
                                    isRtl={true}
                                    defaultValue={singleDistrict}
                                    isSearchable={true}
                                    isLoading={_.isEmpty(districtAndJobs)}
                                    isDisabled={_.isEmpty(districtAndJobs)}
                                    name="district"
                                    onBlur={() => touchedDistrict()}
                                    onChange={e => props.setFieldValue("districtId", e ? e.value : "")}
                                    options={districtAndJobs.districts.map(data => {
                                        return {value: data.id, label: data.name}
                                    })}
                                />}
                                <div className="error">
                                    {districtError && props.errors.districtId}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">شغل</label>
                                {
                                    !_.isEmpty(districtAndJobs) &&
                                    <Select
                                        className="basic-single"
                                        placeholder="انتخاب کنید ..."
                                        isClearable={true}
                                        isRtl={true}
                                        defaultValue={singleJob}
                                        isLoading={_.isEmpty(districtAndJobs)}
                                        isDisabled={_.isEmpty(districtAndJobs)}
                                        isSearchable={true}
                                        name="job"
                                        onBlur={() => touchedJob()}
                                        onChange={e => props.setFieldValue("jobId", e ? e.value : "")}
                                        options={districtAndJobs.jobs.map(data => {
                                            return {value: data.id, label: data.name}
                                        })}
                                    />
                                }
                                <div className="error">
                                    {jobIdError && props.errors.jobId}
                                </div>
                            </div>

                            <div className="mt-5">
                                <button className="btn btn-success" type="submit">ثبت</button>
                                <button onClick={close} className="btn btn-danger ">بستن</button>
                            </div>
                        </Form>)
                }}
            </Formik>
        </div>
    );
};

export default EditUser;
