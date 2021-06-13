import axios from "axios"
const LoginUser = user => axios.post('Account/LoginAdmin', JSON.stringify(user));


export {LoginUser}

