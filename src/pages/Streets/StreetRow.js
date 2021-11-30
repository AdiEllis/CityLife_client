import React from "react"
import {Link} from "react-router-dom"
import {getPermissionTitle} from "../../helpers/definitions"


const StreetRow = () => [
    {
        text: "מזהה",
        dataField: "oid",
        sort: true,
    },
    {
        text: "שם הרחוב",
        dataField: "name",
        sort: true,
        formatter: (cellContent, street) => (
            <>
                {street.name}
            </>
        ),
    },
    {
        text: "שם היישוב",
        dataField: "name",
        sort: true,
        formatter: (cellContent, street) => (
            <>
                {street.colonyName}
            </>
        ),
    },

    {
        dataField: "deleted",
        text: "מצב",
        sort: true,
        formatter: (cellContent, street) => (
            <>
                {street.deleted ? 'לא פעיל' : 'פעיל'}
            </>
        ),
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "פעולות",
        formatter: (cellContent, street) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/streets/edit/" + street.oid} className="px-2 text-primary"><i
                        className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/streets/delete/" + street.oid} className="px-2 text-danger"><i
                        className="uil uil-trash-alt font-size-18"></i></Link>
                </li>

            </ul>
        ),
    },
]

export default StreetRow
