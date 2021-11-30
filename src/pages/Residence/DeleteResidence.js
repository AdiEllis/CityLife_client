import React from "react";
import {deleteStreet} from "../../microservices/streets/streets";
import {deleteResidence} from "../../microservices/residence/residence";


const DeleteResidence = props => {
    const {oid} = props.match.params;
    if (oid < 0) {
        props.history.push('/residence')
    } else {
        deleteResidence({oid, deleted: true}).then((res) => {
            props.history.push('/residence')
        }).catch((e) => {
            props.history.push('/residence')
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteResidence