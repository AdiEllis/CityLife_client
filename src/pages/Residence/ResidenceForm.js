import React, {useEffect, useState} from "react"
import {
    Row,
    Button, Col
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {getStreetByColonyId, getStreets} from "../../microservices/streets/streets";
import {getColonies} from "../../microservices/colonies/colonies";
import Select from 'react-select';
import {toDateView} from "../../helpers/api_helper";
import {getResidence} from "../../microservices/residence/residence";


const ResidenceForm = (props) => {
    const {residenceObject = {}} = props // if not exist default value = {}
    const [innerResidence, setInnerResidence] = useState({})
    const [residenceList, setResidenceList] = useState([{}])
    const [streetsList, setStreetsList] = useState([])
    const [errorNum, setErrorNum] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        if (Object.keys(residenceObject).length > 0) // if exists update the state.
        {
            setInnerResidence(residenceObject)
        }
    }, [residenceObject])

    useEffect(() => {
        getStreetByColonyId({colonyID: localStorage.getItem("authUserColonyID")}).then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    setErrorMsg(response.errorName)
                    setErrorNum(response.errorCode)
                }
            } else {
                setInnerResidence({
                    ...innerResidence,
                    colonyID: localStorage.getItem("authUserColonyID")
                })
                setStreetsList(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
    }, [])

    useEffect(() => {
        getResidence().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    setErrorMsg(response.errorName)
                    setErrorNum(response.errorCode)
                }
            } else {
                setResidenceList(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
    }, [])



    const handleValidSubmit = (event, values) => {
        props.handleSubmitForm(innerResidence)

    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                {innerResidence.oid !== undefined &&

                <Row className="mb-1">
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
                            value={innerResidence.oid}
                        />
                    </div>
                </Row>
                }
                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-6 col-form-label"
                            >
                                פרטים אישיים
                            </label>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="mb-3">
                            <AvField
                                name="uid"
                                placeholder="תעודת זהות"
                                type="text"
                                errorMessage="אנא הזן מספר תעודת זהות תקינה."
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom03"
                                value={innerResidence.id}
                                onChange={(e) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        id: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="mb-3">
                            <AvField
                                name="firstName"
                                placeholder="שם פרטי"
                                type="text"
                                errorMessage="אנא הזן קלט תקין"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom04"
                                value={innerResidence.firstName}
                                onChange={(e) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        firstName: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="mb-3">
                            <AvField
                                name="lastName"
                                placeholder="שם משפחה"
                                type="text"
                                errorMessage="אנא הזן קלט תקין"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom05"
                                value={innerResidence.lastName}
                                onChange={(e) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        lastName: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-6 col-form-label"
                            >
                            </label>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="mb-3">
                            <AvField
                                name="birthDate"
                                placeholder="תאריך לידה"
                                type="text"
                                errorMessage="אנא הזן תאריך תקין"
                                className="form-control"
                                id="validationCustom00"
                                onChange={(e) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        birthDate: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="mb-3">
                            <AvField
                                name="phone"
                                placeholder="מספר טלפון"
                                type="text"
                                errorMessage="אנא הזן קלט תקין"
                                className="form-control"
                                validate={{required: {value: true}}}
                                id="validationCustom04"
                                value={innerResidence.phone}
                                onChange={(e) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        phone: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-6 col-form-label"
                            >
                                כתובת מגורים
                            </label>
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="mb-3">
                            <Select
                                maxMenuHeight={150}
                                onChange={(selectedOption) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        streetID: selectedOption.value
                                    });
                                }}
                                placeholder={"בחר רחוב"}
                                search={true}
                                options={
                                    streetsList.map(street => {

                                        return (
                                            {
                                                label: street.name,
                                                value: street.oid
                                            }
                                        )
                                    })
                                }
                            />
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="mb-3">
                            <AvField
                                name="houseNumber"
                                placeholder="מס' בית"
                                type="text"
                                errorMessage="אנא הזן קלט תקין"
                                className="form-control"
                                id="validationCustom00"
                                value={innerResidence.houseNumber}
                                onChange={(e) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        houseNumber: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="2">
                        <div className="mb-4">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-6 col-form-label"
                            >
                                בית פרטי / יחידת דיור
                            </label>
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="mb-3">
                            <Select
                                onChange={(selectedOption) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        livesInHousingUnit: selectedOption.value
                                    });
                                }}
                                placeholder={"בחר"}
                                search={true}
                                options={
                                    [{label: "בית פרטי", value: false},
                                        {label: "יחידת דיור", value: true}
                                    ]
                                }
                            />
                        </div>
                    </Col>
                    {
                        innerResidence.livesInHousingUnit === true &&
                        <Col md="2">
                            <div className="mb-3">
                                <Select
                                    maxMenuHeight={150}
                                    size={"20"}
                                    onChange={(selectedOption) => {
                                        setInnerResidence({
                                            ...innerResidence,
                                            apartmentOwner: selectedOption.value
                                        });
                                    }}
                                    placeholder={"בחר בעל דירה"}
                                    search={true}
                                    options={
                                        residenceList.map(residence => {
                                            return (
                                                {
                                                    label: residence.firstName + " " + residence.lastName,
                                                    value: residence.oid
                                                }
                                            )
                                        })
                                    }
                                />
                            </div>
                        </Col>
                    }
                </Row>
                {
                    innerResidence.oid !== undefined &&
                    <Row className="mb-3">
                        <label className="col-md-2 col-form-label">סטטוס תושב</label>
                        <div className="col-md-5">
                            <select
                                value={innerResidence.deleted}
                                className="form-control"
                                onChange={(e) => {
                                    setInnerResidence({
                                        ...innerResidence,
                                        deleted: e.target.value
                                    })
                                }}
                            >
                                <option disabled={true}>סטטוס תושב</option>
                                <option value={false}>פעיל</option>
                                <option value={true}>לא פעיל</option>
                            </select>
                        </div>
                    </Row>

                }
                <Row className="mb-10">
                    <Button color="primary" type="submit">
                        {
                            innerResidence.oid !== undefined
                                ? 'עדכן תושב' : 'הוסף תושב'
                        }
                    </Button>
                </Row>
            </AvForm>

        </React.Fragment>
    )
}
export default ResidenceForm
