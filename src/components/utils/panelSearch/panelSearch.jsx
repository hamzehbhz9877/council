import React from 'react';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import CloseFilter from "../filter/closeFilter";
import Paginate from "../pagination";

const PanelSearch = ({handleSendData, handleFilter, se,setCurrPage}) => {

    const initialValues = {
        search: '',
    };
    const validationSchema = Yup.object({
        search: Yup.string().required('لطفا فیلد مورد نظر خود را را وارد کنید').trim()

    })
    const handleSubmit = (values, actions) => {
        setCurrPage(1)
        actions.setSubmitting(false);
        handleSendData(values, actions)
    };

    return (
        <>
            <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                {() => (
                    <Form className="formik-search" noValidate>
                        <Field name="search">
                            {({
                                  field,
                                  form: {handleReset},
                                  meta,
                              }) => (
                                <>
                                    <div className="input-group position-relative search">
                                        <CloseFilter se={se} handleFilter={handleFilter} search={meta.value}
                                                     reset={handleReset}/>
                                        <input type="text"
                                               className={`form-control padding-search-close ${meta.error && meta.touched ? "error" : ""} ${meta.touched && !meta.error ? "success" : ""}`}
                                               placeholder=" " {...field} required/>
                                        <button type="submit"
                                                className="btn formik-search__btn input-group-text">جستجو
                                        </button>

                                        {meta.touched && meta.error && (
                                            <span className="error-message">{meta.error}</span>
                                        )}
                                    </div>
                                </>
                            )}
                        </Field>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default PanelSearch;