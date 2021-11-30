import React from "react"
import {Redirect} from "react-router-dom"
// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
// Profile
import UserProfile from "../pages/Authentication/user-profile"
import Residence from "../pages/Residence/Residence";
import Transaction from "../pages/Transactions/Transaction";
import Street from "../pages/Streets/Street";
import Colony from "../pages/Colonies/Colony";
import User from "../pages/Users/User";
import AddUser from "../pages/Users/AddUser";
import AddColony from "../pages/Colonies/AddColony";
import AddTransaction from "../pages/Transactions/AddTransaction";
import AddResidence from "../pages/Residence/AddResidence";
import AddStreet from "../pages/Streets/AddStreet";
import EditUser from "../pages/Users/EditUser";
import EditColony from "../pages/Colonies/EditColony";
import EditResidence from "../pages/Residence/EditResidence";
import EditTransaction from "../pages/Transactions/EditTransaction";
import EditStreet from "../pages/Streets/EditStreet";
import DeleteUser from "../pages/Users/DeleteUser";
import DeleteTransaction from "../pages/Transactions/DeleteTransaction";
import DeleteStreet from "../pages/Streets/DeleteStreet";
import DeleteResidence from "../pages/Residence/DeleteResidence";
import DeleteColony from "../pages/Colonies/DeleteColony";
import EditUserPassword from "../pages/Users/EditUserPassword";
import AddExcelFileResidence from "../pages/Residence/AddExcelFileResidence";




const userRoutes = [
    {path: "/dashboard", component: Dashboard},
    {path: "/residence", component: Residence},
    {path: "/transactions", component: Transaction},
    {path: "/streets", component: Street},
    {path: "/colonies", component: Colony},
    {path: "/users", component: User},


    {path: "/users/add", component: AddUser},
    {path: "/colonies/add", component: AddColony},
    {path: "/transactions/add", component: AddTransaction},
    {path: "/residence/add", component: AddResidence},
    {path: "/streets/add", component: AddStreet},

    {path: "/users/edit/:oid", component: EditUser},
    {path: "/colonies/edit/:oid", component: EditColony},
    {path: "/residence/edit/:oid", component: EditResidence},
    {path: "/transactions/edit/:oid", component: EditTransaction},
    {path: "/streets/edit/:oid", component: EditStreet},

    {path: "/users/delete/:oid", component: DeleteUser},
    {path: "/transactions/delete/:oid", component: DeleteTransaction},
    {path: "/streets/delete/:oid", component: DeleteStreet},
    {path: "/residence/delete/:oid", component: DeleteResidence},
    {path: "/colonies/delete/:oid", component: DeleteColony},


    {path: "/users/editPassword/:oid", component: EditUserPassword},
    {path: "/residence/addExcelFile", component: AddExcelFileResidence},







    // //profile
    {path: "/profile", component: UserProfile},
    // this route should be at the end of all other routes
    {path: "/", exact: true, component: () => <Redirect to="/dashboard"/>},
]

const authRoutes = [
    {path: "/logout", component: Logout},
    {path: "/forgot-password", component: ForgetPwd},
    {path: "/login", component: Login},
]

export {userRoutes, authRoutes}