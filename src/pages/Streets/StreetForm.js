import React, {useEffect, useState} from "react"
import {
    Row,
    Button, Col
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {getColonies} from "../../microservices/colonies/colonies";
import Select from "react-select";


const StreetForm = (props) => {
    const {streetObject = {}} = props // if not exist default value = {}
    const [innerStreet, setInnerStreet] = useState({})
    const [coloniesList, setColoniesList] = useState([])
    const [errorNum, setErrorNum] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    useEffect(() => {
        if (Object.keys(streetObject).length > 0) // if exists update the state.
        {
            setInnerStreet(streetObject)
        }
    }, [streetObject])

    useEffect(() => {
      setInnerStreet( {
          ...innerStreet,
          colonyID: localStorage.getItem("authUserColonyID")
      })
    }, [])

    const handleValidSubmit = (event, values) => {
        props.handleSubmitForm(innerStreet)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                {innerStreet.oid !== undefined &&

                <Row className="mb-2">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        מזהה המשתמש
                    </label>
                    <div className="col-md-10">
                        <AvField
                            name="oid"
                            placeholder="מזהה"
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={innerStreet.oid}
                        />
                    </div>
                </Row>
                }

                <Row>
                    <Row>
                        <Col md="2">
                            <div className="mb-1">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-6 col-form-label"
                                >
                                   שם הרחוב
                                </label>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="mb-2">
                                <AvField
                                    name="name"
                                    placeholder="שם הרחוב"
                                    type="text"
                                    errorMessage="ערך חובה"
                                    className="form-control"
                                    id="validationCustom03"
                                    value={innerStreet.name}
                                    onChange={(e) => {
                                        setInnerStreet({
                                            ...innerStreet,
                                            name: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    {
                        innerStreet.oid !== undefined &&
                        <Row className="mb-3">
                            <label className="col-md-2 col-form-label">מצב תצוגה</label>
                            <div className="col-md-3">
                                <select
                                    value={innerStreet.deleted}
                                    className="form-control"
                                    onChange={(e) => {
                                        setInnerStreet({
                                            ...innerStreet,
                                            deleted: e.target.value
                                        })
                                    }}
                                >
                                    <option disabled={true}>מצב</option>
                                    <option value={false}>פעיל</option>
                                    <option value={true}>לא פעיל</option>
                                </select>
                            </div>
                        </Row>
                    }
                </Row>
                <Row className="mb-3">
                    <Button color="primary" type="submit">
                        {
                            innerStreet.oid !== undefined
                                ? 'עדכן רחוב' : 'הוסף רחוב'
                        }
                    </Button>
                </Row>
            </AvForm>
        </React.Fragment>
    )
}
export default StreetForm
