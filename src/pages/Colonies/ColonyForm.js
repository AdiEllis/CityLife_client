import React, {useEffect, useState} from "react"
import {
    Row,
    Button, Col
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"


const ColonyForm = (props) => {
    const {colonyObject = {}} = props // if not exist default value = {}
    const [innerColony, setInnerColony] = useState({})
    useEffect(() => {
        if (Object.keys(colonyObject).length > 0) // if exists update the state.
        {
            setInnerColony(colonyObject)
            console.log(colonyObject)
        }
    }, [colonyObject])
    const handleValidSubmit = (event, values) => {
        props.handleSubmitForm(innerColony)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                {
                    innerColony.oid !== undefined &&

                    <Row className="mb-2">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            מזהה המשתמש
                        </label>
                        <div className="col-md-10">
                            <AvField
                                name="id"
                                placeholder="מזהה"
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={innerColony.oid}
                            />
                        </div>
                    </Row>
                }

                <Row className="mb-2">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        פרטי היישוב
                    </label>
                    <div className="col-md-2">
                        <AvField
                            name="colonyName"
                            placeholder="שם בעברית"
                            type="text"
                            errorMessage="אנא הזן קלט תקין"
                            className="form-control"
                            validate={{required: {value: true}}}
                            id="validationCustom05"
                            value={innerColony.heColonyName}
                            onChange={(e) => {
                                setInnerColony({
                                    ...innerColony,
                                    heColonyName: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <AvField
                            name="colonyName"
                            placeholder="שם באנגלית"
                            type="text"
                            errorMessage="אנא הזן קלט תקין"
                            className="form-control"
                            validate={{required: {value: true}}}
                            id="validationCustom05"
                            value={innerColony.enColonyName}
                            onChange={(e) => {
                                setInnerColony({
                                    ...innerColony,
                                    enColonyName: e.target.value
                                })
                            }}
                        />
                    </div>
                </Row>
                {
                    innerColony.oid !== undefined &&
                    <Row className="mb-3">
                        <label className="col-md-2 col-form-label">סטטוס יישוב</label>
                        <div className="col-md-5">
                            <select
                                value={innerColony.deleted}
                                className="form-control"
                                onChange={(e) => {
                                    setInnerColony({
                                        ...innerColony,
                                        deleted: e.target.value
                                    })
                                }}
                            >
                                <option disabled={true}>סטטוס יישוב</option>
                                <option value={false}>פעיל</option>
                                <option value={true}>לא פעיל</option>
                            </select>
                        </div>
                    </Row>
                }
                <Row className="mb-2">
                    <Button color="primary" type="submit">
                        {
                            innerColony.oid !== undefined
                                ? 'עדכן יישוב' : 'הוסף יישוב'
                        }
                    </Button>
                </Row>
            </AvForm>

        </React.Fragment>
    )
}
export default ColonyForm
