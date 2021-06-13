import React from "react";
import {Link, withRouter} from "react-router-dom";
import {AdminRoute, RouteMatchAdmin} from "../../../containers/adminRoutes";
import RouteMatch from "./routeMatch";

const Breadcrumbs = props => {


    const {
        location: {pathname},
    } = props;

    const path = pathname.split("/").filter(x => x);

    const match = () => {
        return RouteMatchAdmin.map(route => {
            const match = RouteMatch(`/${route.path}`)
            if (match) {
                return route.breadCrumb
            }
        }).filter(x=>x);
    }

    return (
        <div className="breadcrumb-wrapper text-white">
            {path.length === 2 && path[1] === "dashboard" && (
                <span  className="user-select-none breadcrumb__item">
                    داشبورد
                </span>
            )}

            {path[1] !== "dashboard" && path.length > 1 && (
                <>
                    <Link to={"/adminPanel/dashboard"} className="text-white breadcrumb__link">داشبورد</Link>
                    <span className="separator">/</span>
                </>
            )}

            {path.slice(1).map((name, index) => {
                const routeTo = `/${path.slice(1, index + 2).join("/")}`;

                const isLast = (index === path.length - 2);


                const breadCrumbText = AdminRoute.map(route => {
                    if (`/${route.path}` === routeTo) {
                        return route.breadCrumb
                    }
                }).filter(x => x)[0];

                if (breadCrumbText) {
                    if (isLast) {
                        return <span key={breadCrumbText} className="last-breadCrumb breadcrumb__item" aria-current="page">
                        {breadCrumbText}
                    </span>
                    } else {
                        return (
                            <div key={breadCrumbText} style={{display:"inline-block"}}>
                                <Link  to={`/adminPanel${routeTo}`} className="text-white breadcrumb__link" aria-current="page">
                                    {breadCrumbText}
                                </Link>
                                <span className="separator">/</span>
                            </div>
                        )
                    }
                }
            })}

            {<span className="breadcrumb__item user-select-none"> {match()} </span>}

        </div>
    );
}
;

export default withRouter(Breadcrumbs);
