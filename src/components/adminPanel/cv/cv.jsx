import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EditSingleCv, GetAllCv} from "../../../redux/actions/cv/cv";
import _ from "lodash"
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "../../utils/formik/input";
import TextArea from "../../utils/formik/textArea";

const Cv = () => {


    const selector = useSelector(state => state.cvReducer)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState("")

    const dispatch = useDispatch()


    useEffect(() => {
        if (!_.isEmpty(selector)) {
            setTitle(selector.title)
            setDescription(selector.description)
            setImages(selector.images.map(item => item.base64))
        }
    }, [selector])


    const validationSchema = Yup.object({
        images: Yup.array().min(1, 'لطفا عکس های خود را انتخاب کنید'),
        title: Yup.string().required('لطفا عنوان خود را وارد کنید').trim(),
        description: Yup.string().required('لطفا توضیحات خود را وارد کنید').trim()
    });

    const readFileContents = (file) => {
        let fileReader = new FileReader();

        return new Promise((resolve, reject) => {
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.readAsDataURL(file);
            fileReader.onerror = (err) => {
                reject(err)
            }
        });
    };

    const handleAddImage = async (e, props) => {
         try {
                const result = await Promise.all([...e.target.files].map(async file => {
                    const fileContents = await readFileContents(file);
                    return fileContents;
                }));
                props.setFieldValue("images", [...props.values.images, ...result])

            } catch (err) {
                throw err
            }
    };

    const handleRemoveImages = (indexOfImage, props) => {
        const res = props.values.images.filter((image, index) => index !== indexOfImage);
        props.setFieldValue("images", [...res])

        document.getElementById("files").value = ""
    };


    useEffect(() => {
        dispatch(GetAllCv())
    }, [])


    const handleSubmit = async (values, actions) => {

        actions.setSubmitting(false);

        const mainImage = selector.images.map(item => item.base64)
        const equal = mainImage.map((item, index) => item === values.images[index]).filter(x => x === true)
        const trueA = (equal.length === selector.images.length) && (selector.images.length === values.images.length)

        if (selector.title !== values.title || selector.description !== values.description || !trueA) {
          await dispatch(EditSingleCv(values))
        }

    };

    const clearAllImage = (props) => {
        if (props.values.images.length > 0) {
            document.getElementById("files").value = ""
            props.setFieldValue("images", [])
        }
    }


    return (
        <div className="cv">
            <div className="card">
                <Formik initialValues={{title, description, images}}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize>
                    {(props) => {

                        const error = props.errors.images;

                        return (
                            <Form>
                                <div className="form-group">
                                    <div
                                        className="d-flex image-uploader__top justify-content-between align-items-center">
                                        <div className="custom-file">
                                            <input type="file" id="files"
                                                   onChange={(e) => handleAddImage(e, props)} multiple
                                                   accept="image/png;image/jpg" hidden/>
                                            <label htmlFor="files" className="mb-0 py-2 px-3">
                                <span className="iconify add-image__btn  pointer" data-icon="mdi-plus"
                                      data-inline="false"/>
                                            </label>
                                        </div>
                                        <button type="button" onClick={() => clearAllImage(props)}
                                                className="py-2 px-3">
                                            <span className="iconify  remove-image__btn pointer"
                                                  data-icon="mdi-delete-forever"
                                                  data-inline="false"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="image-uploader mb-5">
                                    <div className="d-flex flex-wrap image-uploader__main gap-3">
                                        {props.values.images && props.values.images.map((image, index) =>
                                                <div className="image-uploaded-wrapper" key={index}>
                                                    <div style={{backgroundImage: `url(${image})`}}
                                                         className="image-uploaded pointer">
                                                        <button className="remove-image" type="button mt-2"
                                                                onClick={() => handleRemoveImages(index, props)}>
                                    <span className="iconify remove-image__btn" data-icon="mdi-delete-forever"
                                          data-inline="false"/>
                                                        </button>
                                                    </div>
                                                </div>
                                        )}
                                    </div>
                                    {error && (
                                        <span className="error">{error}</span>)}
                                </div>

                                <Input name="title" type="text" label="عنوان"/>
                                <TextArea name="description" rows="10" cols="15" type="text" label="توضیحات"/>
                                <div className="d-fex justify-content-start text-center mt-3">
                                    <button type="submit" className="btn btn-lg btn-primary">ثبت تغییرات</button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    );
};
export default Cv;