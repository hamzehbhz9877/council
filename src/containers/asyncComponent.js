import React from 'react';
import AsyncLoading from "../components/utils/asyncLoading/asyncLoading";
import Loadable from "./loadable";


export const Test = Loadable(() => import(/* webpackChunkName:"test" */  "../components/test/test"))
export const Notfound = Loadable(() => import(/* webpackChunkName:"notfound" */  "../components/notfound"), {fallback: <AsyncLoading/>})
export const Message = Loadable(() => import(/* webpackChunkName:"message" */  "../components/adminPanel/message/message"), {fallback: <AsyncLoading/>})
export const Prize = Loadable(() => import(/* webpackChunkName:"prize" */  "../components/adminPanel/prize/prize"), {fallback: <AsyncLoading/>})
export const InfoPrize = Loadable(() => import(/* webpackChunkName:"prize" */  "../components/adminPanel/prize/infoPrize"), {fallback: <AsyncLoading/>})
export const Users = Loadable(() => import(/* webpackChunkName:"users" */  "../components/adminPanel/users/users"), {fallback: <AsyncLoading/>})
export const Cv = Loadable(() => import(/* webpackChunkName:"" */  "../components/adminPanel/cv/cv"), {fallback: <AsyncLoading/>})
export const Notifications = Loadable(() => import(/* webpackChunkName:"notifications" */  "../components/adminPanel/notifications/notifications"), {fallback: <AsyncLoading/>})
export const Login = Loadable(() => import(/* webpackChunkName:"login" */  "../components/registration/login/login"), {fallback: <AsyncLoading/>})
export const ShowReceiverCountNotification = Loadable(() => import(/* webpackChunkName:"showReceiverCount" */  "../components/adminPanel/notifications/showReceiverCount"), {fallback: <AsyncLoading/>})
export const ShowReceiverCountMessage = Loadable(() => import(/* webpackChunkName:"showReceiverCount" */  "../components/adminPanel/message/showReceiverCount"), {fallback: <AsyncLoading/>})
export const Dashboard = Loadable(() => import(/* webpackChunkName:"dashboard" */  "../components/adminPanel/dashboard/dashboard"), {fallback: <AsyncLoading/>})
export const Jobs = Loadable(() => import(/* webpackChunkName:"job" */  "../components/adminPanel/jobs/job"), {fallback: <AsyncLoading/>})
export const District = Loadable(() => import( /* webpackChunkName:"district" */ "../components/adminPanel/district/district"), {fallback: <AsyncLoading/>})
export const InfoUser = Loadable(() => import( /* webpackChunkName:"infoUser" */ "../components/adminPanel/users/infoUser"), {fallback: <AsyncLoading/>})
export const Activity = Loadable(() => import( /* webpackChunkName:"infoUser" */ "../components/adminPanel/activity/activity"), {fallback: <AsyncLoading/>})