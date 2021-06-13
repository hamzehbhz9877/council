import axios from "axios"


//dashboard

export const titleInfo = () => axios.get("/Dashboard/GetTitleInfo");
export const dashboardWeaklyData = () => axios.get("Dashboard/GetChartInfo");

//district
export const getAllDistrict = (id, search) => axios.get(`District/GetAll/${id}/${search}`);
export const deleteDistrict = (id) => axios.get(`District/Delete/${id}`);
export const addNewDistrict = (data) => axios.post("District/Create", JSON.stringify(data))
export const editDistrict = (data, id) => axios.post(`District/Edit/${id}`, JSON.stringify(data));

//jobs
export const getAllJob = (id, search) => axios.get(`Job/GetAll/${id}/${search}`);
export const deleteJob = (id) => axios.get(`Job/Delete/${id}`);
export const addNewJob = (data) => axios.post("Job/Create", JSON.stringify(data))
export const editJob = (data, id) => axios.post(`Job/Edit/${id}`, JSON.stringify(data));

//notification
export const getAllNotification = (id, search) => axios.get(`Notification/GetAllForAdmin/${id}/${search}`);
export const deleteNotification = (id) => axios.get(`Notification/Delete/${id}`);
export const addNewNotification = (data) => axios.post("Notification/Create", JSON.stringify(data))
export const getSingleNotification = (id) => axios.get(`Notification/GetById/${id}`);
export const getReceiverNotification = (id) => axios.get(`Notification/GetAllReceiver/${id}`);

//page
export const getInfoRegister = () => axios.get(`Page/GetInfoRegister`);


//message
export const getAllMessage = (id, search) => axios.get(`Message/GetAll/${id}/${search}`);
export const deleteMessage = (id) => axios.get(`Message/Delete/${id}`);
export const addNewMessage = (data) => axios.post("Message/Create", JSON.stringify(data))
export const editMessage = (data, id) => axios.post(`Message/Edit/${id}`, JSON.stringify(data));
export const getSingleMessage = (id) => axios.get(`Message/GetById/${id}`);
export const getReceiverMessage = (id) => axios.get(`Message/GetAllReceiver/${id}`);

//prize
export const getAllPrize = (id, search) => axios.get(`Prize/GetAll/${id}/${search}`);
export const deletePrize = (id) => axios.get(`Prize/Delete/${id}`);
export const addNewPrize = (data) => axios.post("Prize/Create", JSON.stringify(data))
export const editPrize = (data, id) => axios.post(`Prize/Edit/${id}`, JSON.stringify(data));
export const getSinglePrize = (id) => axios.get(`Prize/GetById/${id}`);
export const getInfoPrize = (id) => axios.get(`Prize/GetAllReceiver/${id}`);
export const changeStatus = (userId,prizeId) => axios.get(`Prize/ChangeStatus/${userId}/${prizeId}`);


//user
export const getAllUser = (id, search) => axios.get(`User/GetAll/${id}/${search}`);
export const deleteUser = (id) => axios.get(`User/Delete/${id}`);
export const addNewUser = (data) => axios.post("User/Create", JSON.stringify(data))
export const editUser = (data, id) => axios.post(`User/Edit/${id}`, JSON.stringify(data));
export const getSingleUser = (id) => axios.get(`User/GetById/${id}`);
export const getInfoUser = (id) => axios.get(`User/Show/${id}`);


//cv
export const getAllCv = () => axios.get("Cv/GetCvInfo");
export const editCv = (data) => axios.post("Cv/CreateOrUpdate", JSON.stringify(data));

//activity
export const getAllActivity = (id, search) => axios.get(`Activity/GetAll/${id}/${search}`);
export const deleteActivity = (id) => axios.get(`Activity/Delete/${id}`);
export const addNewActivity = (data) => axios.post("Activity/Create", JSON.stringify(data))
export const editActivity = (data, id) => axios.post(`Activity/Edit/${id}`, JSON.stringify(data));
