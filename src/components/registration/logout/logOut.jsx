import {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {SuccessMessage} from "../../../redux/actions/notification";
import {useDispatch} from "react-redux";
import {ClearUser} from "../../../redux/actions/registration/registration";


const Logout = () => {
    const history = useHistory();
    const dispatch=useDispatch()
    useEffect(() => {
        const logout = async () => {
            await dispatch(ClearUser());
            localStorage.clear();
            await dispatch(SuccessMessage("شما با موفقیت از حساب کاربری خود خارج شدید"))
            history.push("/login")
        };
        logout()
    }, [history])

    return null
};

export default Logout