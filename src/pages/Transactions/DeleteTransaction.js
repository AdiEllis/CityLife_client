import React from "react";
import {deleteUser} from "../../microservices/users/users";
import {deleteTransaction} from "../../microservices/transactions/transactions";

const DeleteTransaction = props => {
    const {oid} = props.match.params;
    if (oid < 0) {
        props.history.push('/transactions')
    } else {
        deleteTransaction({oid, deleted: true}).then((res) => {
            props.history.push('/transactions')
        }).catch((e) => {
            props.history.push('/transactions')
            console.log("hii")
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteTransaction