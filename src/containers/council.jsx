import React, {useEffect} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AddUser} from "../redux/actions/registration/registration"
import AdminPanel from "../components/layout/adminPanel";
import Logout from "../components/registration/logout/logOut";
import * as AsyncComponent from "./asyncComponent"
import _ from "lodash";


const Council = () => {


        const {username: user} = useSelector(state => state.loginReducer)


        const history = useHistory()
        const dispatch = useDispatch()

        useEffect(() => {
            const res = localStorage.getItem("user")
            dispatch(AddUser({username: res}));
            // if (res) {
            //     if (!history.location.pathname.startsWith("/adminPanel")) {
            //         history.goBack(1);
            //     }
            // } else {
            //     history.replace("/login")
            // }
        }, []);


        return (
            <React.Suspense fallback={<div>...loading</div>}>
                <Switch>
                    <Route path={"/adminPanel"}>
                        <AdminPanel>
                            <Switch>
                                <Route component={AsyncComponent.Activity} path={"/adminPanel/activity"}/>
                                <Route component={AsyncComponent.Users} path={"/adminPanel/users"}>
                                    <Route component={AsyncComponent.InfoUser} path={"/adminPanel/users/:id"}/>
                                    <Route component={AsyncComponent.Users} path={"/adminPanel/users"} exact/>
                                </Route>
                                <Route component={AsyncComponent.Notifications} path={"/adminPanel/notifications"}>
                                    <Route component={AsyncComponent.ShowReceiverCountNotification}
                                           path={"/adminPanel/notifications/:id"}/>
                                    <Route component={AsyncComponent.Notifications} path={"/adminPanel/notifications"}
                                           exact/>
                                </Route>
                                <Route component={AsyncComponent.Cv} path={"/adminPanel/cv"}/>
                                <Route component={AsyncComponent.Prize} path={"/adminPanel/prize"}>
                                    <Route component={AsyncComponent.InfoPrize} path={"/adminPanel/prize/:id"}/>
                                    <Route component={AsyncComponent.Prize} path={"/adminPanel/prize"} exact/>
                                </Route>
                                <Route component={AsyncComponent.Message} path={"/adminPanel/message"}>
                                    <Route component={AsyncComponent.ShowReceiverCountMessage}
                                           path={"/adminPanel/message/:id"}/>
                                    <Route component={AsyncComponent.Message} path={"/adminPanel/message"} exact/>
                                </Route>
                                <Route component={AsyncComponent.District} path={"/adminPanel/district"}/>
                                <Route component={AsyncComponent.Jobs} path={"/adminPanel/jobs"}/>
                                <Route render={() => _.isEmpty(user) ? <Redirect to={"/login"}/> : <Logout/>}
                                       path={"/adminPanel/logout"}/>
                                <Route component={AsyncComponent.Dashboard} path={"/adminPanel/dashboard"} exact/>
                                <Route component={AsyncComponent.Notfound}/>
                            </Switch>
                        </AdminPanel>
                    </Route>
                    <Route component={AsyncComponent.Test} path={"/test"}/>
                    <Route component={AsyncComponent.Login} path={"/login"} exact/>
                </Switch>
            </React.Suspense>
        )

    }
;
export default React.memo(Council)
