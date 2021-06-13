import React, {Suspense, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import BarChart from "../../chart/barChart/barChart";
import {GetAdminDashboardData} from "../../../redux/actions/dashboard/chartInfo";
import {titleInfo} from "../../../services/council";
import {DashboardChart} from "../../chart/barChart/dashboardChart/dashboardChart";

const Dashboard = () => {

    const [titles, seTitles] = useState({})
    const state = useSelector(state => state.adminDashboard);
    const dispatch = useDispatch();


    useEffect(() => {
        getInfoData()
        dispatch(GetAdminDashboardData())
    }, []);

    const getInfoData = async () => {
        const {data} = await titleInfo();
        seTitles(data.data)
    }


    const {dataRegister, optionsRegister} = DashboardChart(state)


    return (
        <>
            <div className="title-info">
                <div className="d-flex justify-content-between title-info__wrapper gap-3">
                    <Suspense fallback={<h1 className="text-white">...login</h1>}>
                        <div className="card">
                            <div className="card-body text-center">
                                <p>تعداد کاربران ثبت نام شده</p>
                                <span>{titles.countUser}</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <p>تعداد جوایز دریافتی کاربران</p>
                                <span>{titles.countPrize}</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <p>تعداد پیامک های ارسالی به کاربران</p>
                                <span>{titles.countMessage}</span>

                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <p>تعداد اطلاعیه ارسالی به کاربران</p>
                                <span>{titles.countNotify}</span>

                            </div>
                        </div>
                    </Suspense>
                </div>
            </div>
            <div className="card chart mt-4">
                <BarChart data={dataRegister} options={optionsRegister}/>
            </div>
        </>
    );
};


export default Dashboard;