import React from "react";
import {deleteUser} from "../../microservices/users/users";

const DeleteUser = props => {
    const {oid} = props.match.params;
    if (oid < 0) {
        props.history.push('/users')
    } else {
        deleteUser({oid, deleted: true}).then((res) => {
            props.history.push('/users')
        }).catch((e) => {
            props.history.push('/users')
            console.log("hii")
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteUser