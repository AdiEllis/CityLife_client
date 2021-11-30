import React from "react";
import {deleteStreet} from "../../microservices/streets/streets";


const DeleteStreet = props => {
    const {oid} = props.match.params;
    if (oid < 0) {
        props.history.push('/streets')
    } else {
        deleteStreet({oid, deleted: true}).then((res) => {
            props.history.push('/streets')
        }).catch((e) => {
            props.history.push('/streets')
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteStreet