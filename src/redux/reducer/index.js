import {combineReducers} from "redux";
import {loadingReducer} from "./loading";
import {chartInfo} from "./dashboard/chartInfo";
import {loginReducer} from "./registration/registeration";
import {districtReducer} from "./district/district";
import {jobReducer} from "./jobs/jobs";
import {alertReducer} from "./notification";
import {notificationReducer} from "./notification/notification"
import {messageReducer} from "./message/messgae";
import {prizeReducer} from "./prize/prize";
import {userReducer} from "./user/user";
import {userStatusReducer} from "./user/statusUser";
import {cvReducer} from "./cv/cv";
import {activityReducer} from "./activity/activity";

export const RootReducer=combineReducers({
    notificationReducer,
    alertReducer,
    messageReducer,
    userReducer,
    activityReducer,
    prizeReducer,
    cvReducer,
    userStatusReducer,
    adminDashboard: chartInfo,
    loginReducer,
    jobReducer,
    districtReducer,
    loadingReducer,
});
