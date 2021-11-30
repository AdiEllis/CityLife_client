import React from "react"
import {Link} from "react-router-dom"
import {toDateView} from "../../helpers/api_helper";


const residenceRow = () => [
    // {
    //     text: "מזהה",
    //     dataField: "oid",
    //     sort: true,
    // },
    {
        text: "ת.ז",
        dataField: "id",
        sort: true,
    },
    {
        text: "שם מלא",
        dataField: "name",
        sort: true,
        formatter: (cellContent, residence) => (
            <>
                {residence.firstName + ' ' + residence.lastName}
            </>
        ),
    },
    {
        dataField: "phone",
        text: "מספר טלפון",
        sort: true,
        formatter: (cellContent, residence) => (
            <>
                {residence.phone}
            </>
        ),
    },
    {
        dataField: "address",
        text: "כתובת מגורים",
        sort: true,
        formatter: (cellContent, residence) => (
            <>
                {residence.colonyName + " - " +  residence.streetName + " " + residence.houseNumber}
            </>
        ),
    },
    {
        dataField: "birthDate",
        text: "תאריך לידה",
        sort: true,
        formatter: (cellContent, residence) => (
            <>
                {toDateView(residence.birthDate)}
            </>
        ),
    },
    {
        dataField: "deleted",
        text: "מצב חשבון",
        sort: true,
        formatter: (cellContent, residence) => (
            <>
                {residence.deleted ? 'לא פעיל' : 'פעיל'}
            </>
        ),
    },
    {
        dataField: "menu",
        isDummyField: true,
        text: "פעולות",
        formatter: (cellContent, residence) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/residence/edit/" + residence.oid} className="px-2 text-primary"><i
                        className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/residence/delete/" + residence.oid} className="px-2 text-danger"><i
                        className="uil uil-trash-alt font-size-18"></i></Link>
                </li>

            </ul>
        ),
    },
]

export default residenceRow
