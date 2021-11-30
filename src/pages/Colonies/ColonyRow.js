import React from "react"
import {Link} from "react-router-dom"
import {getPermissionTitle} from "../../helpers/definitions"


const colonyRow = () => [
    {
        text: "מזהה",
        dataField: "oid",
        sort: true,
    },
    {
        text: "שם היישוב",
        dataField: "heColonyName",
        sort: true,
        formatter: (cellContent, colony) => (
            <>
                {colony.heColonyName}
            </>
        ),
    },
    {
        text: "",
        dataField: "enColonyName",
        sort: true,
        formatter: (cellContent, colony) => (
            <>
                {colony.enColonyName}
            </>
        ),
    },
    {
        dataField: "deleted",
        text: "סטטוס",
        sort: true,
        formatter: (cellContent, colony) => (
            <>
                {colony.deleted ? 'לא פעיל' : 'פעיל'}
            </>
        ),
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "פעולות",
        formatter: (cellContent, colony) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/colonies/edit/"+ colony.oid} className="px-2 text-primary"><i
                        className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/colonies/delete/" + colony.oid} className="px-2 text-danger"><i
                        className="uil uil-trash-alt font-size-18"></i></Link>
                </li>

            </ul>
        ),
    },
]

export default colonyRow
