import React from 'react';
import {useHistory} from "react-router-dom";
import {LoginUser} from "../../../services/userService";
import {useDispatch} from "react-redux";
import {ErrorMessage, SuccessMessage} from "../../../redux/actions/notification";
import {AddUser} from "../../../redux/actions/registration/registration";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import Input from "../../utils/formik/input";

const Login = () => {

    const initialValues = {
        userName: "",
        password: "",
    };


    const validationSchema = Yup.object({
        userName: Yup.string().required("لطفا نام کاربری  را انتخاب کنید").trim(),
        password: Yup.string().min(6, "رمز عبور باید حداقل حاوی شش کاراکتر باشد").required('لطفا رمز عبور خود را وارد کنید').trim(),
    });

    const history = useHistory();
    const dispatch = useDispatch()

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        try {
            const res = await LoginUser(values)
            const date = new Date();
            if (res.data.statusCode === 0) {
                dispatch(SuccessMessage("شما با موفقیت وارد حساب کاربری خود شدید"));
                localStorage.setItem("token", res.data.data.jwt);
                localStorage.setItem("user", res.data.data.fullName);
                localStorage.setItem("date", date.setDate(date.getDate() + 1));
                if (res.data.data.role) {
                    localStorage.setItem("Ro", res.data.data.role);
                    dispatch(AddUser({username: res.data.data.fullName}));
                }

                history.replace("/adminPanel/dashboard");
            } else {
                dispatch(ErrorMessage(res.data.Message))
            }
        } catch (e) {
        }
    }


    return (
        <div className="login d-flex align-items-center">
            <div className="account-pages pt-sm-5 flex-grow-1">
                <div className="card login__wrapper mx-auto p-0">
                    <div className="bg-login text-center">
                        <div className="bg-login-overlay"/>
                        <div className="position-relative">
                            <h5 className="text-white font-size-20">خوش آمدید!</h5>
                            <p className="text-white-50 mb-0">جهت دسترسی به پنل مدیریت وارد شوید</p>
                        </div>
                    </div>
                    <div className="card-body pt-5">
                        <div className="p-2">
                            <Formik initialValues={initialValues}
                                    onSubmit={handleSubmit}
                                    validationSchema={validationSchema}>
                                {(props) => {
                                    return (
                                        <Form>
                                            <Input name="userName" type="text" label="نام کاربری"/>
                                            <Input name="password" type="password" label="رمز عبور"/>
                                            <div className="login__btn">
                                                <button className="btn btn-primary w-100 py-2" type="submit">ورود
                                                </button>
                                            </div>

                                            <div className="mt-4 text-center">
                                                <a className="text-muted forget-password">
                                                    <span className="iconify me-1" data-icon="mdi-lock" data-inline="false"/>رمز عبور خود را فراموش کرده اید؟</a>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;