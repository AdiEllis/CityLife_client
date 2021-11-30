import React from "react"
import {Link} from "react-router-dom"
import {getPermissionTitle} from "../../helpers/definitions"
import {getTransactions} from "../../microservices/transactions/transactions";
import {toDateView} from "../../helpers/api_helper";


const TransactionsRow = () => [
    {
        text: "מזהה",
        dataField: "oid",
        sort: true,
    },
    {
        text: "תאריך",
        dataField: "date",
        sort: true,
        formatter: (cellContent, transaction) => (
            <>
                {toDateView(transaction.date)}
            </>
        ),
    },
    {
        text: "סוג הפעולה",
        dataField: "typeAction",
        sort: true,
        formatter: (cellContent, transaction) => (
            <>
                {transaction.typeAction}
            </>
        ),
    },
    {
        text: "תיאור הפעולה התקציבית",
        dataField: "descriptionAction",
        sort: true,
        formatter: (cellContent, transaction) => (
            <>
                {transaction.descriptionAction}
            </>
        ),
    },
    {
        text: "סכום",
        dataField: "total",
        sort: true,
        formatter: (cellContent, transaction) => (
            <>
                {transaction.total}
            </>
        ),
    },
    {
        text: "שם היישוב",
        dataField: "colonyName",
        sort: true,
        formatter: (cellContent, transaction) => (
            <>
                {transaction.colonyName}
            </>
        ),
    },

    {
        dataField: "deleted",
        text: "מצב",
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
        formatter: (cellContent, transaction) => (
            <ul className="list-inline font-size-20 contact-links mb-0">
                <li className="list-inline-item">
                    <Link to={"/transactions/edit/" + transaction.oid} className="px-2 text-primary"><i
                        className="uil uil-pen font-size-18"></i></Link>
                </li>
                <li className="list-inline-item">
                    <Link to={"/transactions/delete/" + transaction.oid} className="px-2 text-danger"><i
                        className="uil uil-trash-alt font-size-18"></i></Link>
                </li>

            </ul>
        ),
    },
]

export default TransactionsRow