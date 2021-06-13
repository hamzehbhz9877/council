import {dashboardWeaklyData} from "../../../services/council";

import {ErrorMessage} from "../notification";

export const GetAdminDashboardData = () => async dispatch =>{
    try {
        const res = await dashboardWeaklyData();
        console.log(res)

        if (res.data.statusCode === 0) {
            const {
                payPrizes,
                registerUsers
            } = res.data.data;
            dispatch({
                type: "GET_DATA", payload: {
                    payPrizes,
                    registerUsers
                }
            })
        } else {
            dispatch(ErrorMessage(res.data.Message))
        }
    } catch (e) {
    }
};
