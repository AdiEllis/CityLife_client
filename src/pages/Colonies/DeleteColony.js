import React from "react";
import {deleteStreet} from "../../microservices/streets/streets";
import {deleteResidence} from "../../microservices/residence/residence";
import {deleteColony} from "../../microservices/colonies/colonies";


const DeleteColony = props => {
    const {oid} = props.match.params;
    if (oid < 0) {
        props.history.push('/colonies')
    } else {
        deleteColony({oid, deleted: true}).then((res) => {
            props.history.push('/colonies')
        }).catch((e) => {
            props.history.push('/colonies')
        })
    }
    return (
        <React.Fragment>

        </React.Fragment>
    )
}
export default DeleteColony