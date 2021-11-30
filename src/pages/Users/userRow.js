import React from "react"
import {Link} from "react-router-dom"
import { getPermissionTitle } from "../../helpers/definitions"



const userRow = () => [
    {
        text: "מזהה",
        dataField: "id",
        sort: true,
    },
    {
        text: "משתמש",
        dataField: "email",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.email}
            </>
        ),
    },

    {
        dataField: "phone",
        text: "מספר טלפון",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.phone}
            </>
        ),
    },
    {
        dataField: "colonyName",
        text: "שם היישוב",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.colonyID}
            </>
        ),
    },
    {
        dataField: "isAdmin",
        text: "סוג משתמש",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.isAdmin ? "מנהל" : "לקוח"}
            </>
        ),
    },
    {
        dataField: "deleted",
        text: " סטטוס ",
        sort: true,
        formatter: (cellContent, user) => (
            <>
                {user.deleted ? 'לא פעיל' : 'פעיל'}
            </>
        ),
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "פעולות",
        formatter: (cellContent, institute) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/users/edit/" + institute.oid} className="px-2 text-primary"><i
                        className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/users/editPassword/" + institute.oid} className="px-2 text-primary"><i
                        className="uil uil-unlock font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/users/delete/" + institute.oid} className="px-2 text-danger"><i
                        className="uil uil-trash-alt font-size-18"></i></Link>
                </li>

            </ul>
        ),
    },
]

export default userRow
