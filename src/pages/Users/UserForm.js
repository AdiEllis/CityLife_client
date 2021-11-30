import React, {useEffect, useState} from "react"
import {
    Row,
    Button, Col
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import Select from "react-select";
import {getColonies} from "../../microservices/colonies/colonies";


const UserForm = (props) => {
    const {userObject = {}} = props // if not exist default value = {}
    const [innerUser, setInnerUser] = useState({})
    const [coloniesList, setColoniesList] = useState([])
    const [errorNum, setErrorNum] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        if (Object.keys(userObject).length > 0) // if exists update the state.
        {
            setInnerUser(userObject)
        }
    }, [userObject])

    useEffect(() => {
        getColonies().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    setErrorMsg(response.errorName)
                    setErrorNum(response.errorCode)
                }
            } else {
                setColoniesList(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })

    }, [])

    const handleValidSubmit = (event, values) => {
        props.handleSubmitForm(innerUser)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                {innerUser.oid !== undefined &&

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
                            value={innerUser.oid}
                        />
                    </div>
                </Row>
                }
                <Row className="mb-2">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                    >
                        פרטי משתמש
                    </label>
                    <div className="col-md-3">
                        <AvField
                            name="email"
                            placeholder="דואר אלקטרוני"
                            type="text"
                            errorMessage="אנא הזן דואר אלקטרוני תקין"
                            className="form-control"
                            validate={{
                                required: {value: true},
                                email: true
                            }}
                            id="validationCustom03"
                            value={innerUser.email}
                            onChange={(e) => {
                                setInnerUser({
                                    ...innerUser,
                                    email: e.target.value
                                })
                            }}
                        />
                    </div>
                </Row>
                {
                    innerUser.oid === undefined &&
                    (
                        <Row className="mb-2">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-2 col-form-label"
                            >
                            </label>
                            <div className="col-md-3">
                                <AvField
                                    name="password"
                                    placeholder="סיסמא"
                                    type="password"
                                    errorMessage="ערך חובה"
                                    className="form-control"
                                    validate={{
                                        required: {value: true},
                                        minLength: {value: 8, errorMessage: 'הסיסמא חייבת להיות ארוכה מ-8 תווים'},
                                    }}

                                    id="validationCustom03"
                                    value={innerUser.name}
                                    onChange={(e) => {
                                        setInnerUser({
                                            ...innerUser,
                                            password: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </Row>
                    )
                }
                <Row className="mb-2">
                    <Col md="2">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-6 col-form-label"
                        >
                            פרטים אישיים
                        </label>
                    </Col>
                    <Col md="2">
                        <div className="md-2">
                            <AvField
                                name="phone"
                                placeholder="מספר טלפון"
                                type="phone"
                                errorMessage="אנא הזן קלט תקין"
                                className="form-control"
                                validate={{required: {value: true}}}
                                value={innerUser.phone}
                                onChange={(e) => {
                                    setInnerUser({
                                        ...innerUser,
                                        phone: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="mb-2">
                            <Select
                                maxMenuHeight={150}
                                onChange={(selectedOption) => {
                                    setInnerUser({
                                        ...innerUser,
                                        colonyID: selectedOption.value
                                    });
                                }}
                                placeholder={"בחר יישוב"}
                                search={true}
                                options={
                                    coloniesList.map(colony => {
                                        return (
                                            {
                                                label: colony.heColonyName,
                                                value: colony.oid
                                            }
                                        )
                                    })
                                }
                            />
                        </div>
                    </Col>
                </Row>
                    <Row className="mb-2">
                        <Col md="2">
                            <label
                                htmlFor="example-text-input"
                                className="col-md-6 col-form-label"
                            >
                                סוג משתמש
                            </label>
                        </Col>
                        <Col md="2">
                            <div className="md-3">
                                <Select
                                    onChange={(selectedOption) => {
                                        setInnerUser({
                                            ...innerUser,
                                            isAdmin: selectedOption.value
                                        });
                                    }}
                                    search={false}
                                    placeholder={"בחר"}
                                    options={[
                                        {label: "מנהל", value: true},
                                        {label: "לקוח", value: false}
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                {
                    innerUser.oid !== undefined &&
                    <Row className="mb-2">
                        <label className="col-md-2 col-form-label">מצב תצוגה</label>
                        <div className="col-md-2">
                            <Select
                                onChange={(selectedOption) => {
                                    setInnerUser({
                                        ...innerUser,
                                        deleted: selectedOption.value
                                    });
                                }}
                                search={false}
                                placeholder={"בחר"}
                                options={[
                                    {label: "לא פעיל", value: true},
                                    {label: "פעיל", value: false}
                                ]}
                            />
                        </div>
                    </Row>

                }
                <Row className="mb-2">
                    <Button color="primary" type="submit">
                        {
                            innerUser.oid !== undefined
                                ? 'עדכן משתמש' : 'הוסף משתמש'
                        }
                    </Button>
                </Row>
            </AvForm>
        </React.Fragment>
    )
}
export default UserForm
