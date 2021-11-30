import React, {useEffect, useState} from "react"
import {
    Row,
    Button, Col
} from "reactstrap"
import {AvField, AvForm} from "availity-reactstrap-validation"
import {toDateView} from "../../helpers/api_helper";
import Select from "react-select";


const TransactionForm = (props) => {
    const {transactionObject = {}} = props // if not exist default value = {}
    const [innerTransaction, setInnerTransaction] = useState({})
    const [coloniesList, setColoniesList] = useState([])
    const [errorNum, setErrorNum] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    useEffect(() => {
        if (Object.keys(transactionObject).length > 0) // if exists update the state.
        {
            setInnerTransaction(transactionObject)

        }
    }, [transactionObject])
    const handleValidSubmit = (event, values) => {
        props.handleSubmitForm(innerTransaction)
    }
    return (
        <React.Fragment>
            <AvForm
                onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                }}
            >
                {innerTransaction.oid !== undefined &&

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
                            value={innerTransaction.oid}
                        />
                    </div>
                </Row>
                }

                <Row>
                    <Row className="mb-3">
                        <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                        >
                            תאריך הפעולה
                        </label>
                        <div className="col-md-3">
                            <AvField
                                name="date"
                                placeholder="תאריך"
                                type="text"
                                errorMessage="אנא הזן תאריך תקין"
                                className="form-control"
                                onChange={(e) => {
                                    setInnerTransaction({
                                        ...innerTransaction,
                                        date: e.target.value,
                                        colonyID: localStorage.getItem("authUserColonyID")
                                    })
                                }}
                            />
                        </div>
                    </Row>
                    <Row>
                        <Col md="2">
                            <div>
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-6 col-form-label"
                                >
                                    פרטי הפעולה התקציבית
                                </label>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="mb-2">
                                <Select
                                    onChange={(selectedOption) => {
                                        setInnerTransaction({
                                            ...innerTransaction,
                                            typeAction: selectedOption.value
                                        });
                                    }}
                                    search={false}
                                    placeholder={"בחר"}
                                    options={[
                                        {label: "הוצאה", value: "הוצאה"},
                                        {label: "הכנסה", value: "הכנסה"}
                                    ]}
                                />
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="mb-2">
                                <AvField
                                    name="total"
                                    placeholder="סכום "
                                    type="number"
                                    className="form-control"
                                    id="validationCustom09"
                                    value={innerTransaction.total}
                                    onChange={(e) => {
                                        setInnerTransaction({
                                            ...innerTransaction,
                                            total: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md="5">
                            <div className="mb-3">
                                <AvField
                                    name="descriptionAction"
                                    placeholder="תיאור "
                                    type="textarea"
                                    errorMessage="אנא הזן קלט תקין"
                                    className="form-control"
                                    validate={{required: {value: true}}}
                                    id="validationCustom09"
                                    value={innerTransaction.descriptionAction}
                                    onChange={(e) => {
                                        setInnerTransaction({
                                            ...innerTransaction,
                                            descriptionAction: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    {
                        innerTransaction.oid !== undefined &&
                        <Row className="mb-3">
                            <label className="col-md-2 col-form-label">מצב תצוגה</label>
                            <div className="col-md-3">
                                <Select
                                    onChange={(selectedOption) => {
                                        setInnerTransaction({
                                            ...innerTransaction,
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

                    <Row className="mb-3">
                        <Button color="primary" type="submit">
                            {
                                innerTransaction.oid !== undefined
                                    ? 'עדכן פעולה' : 'הוסף פעולה'
                            }
                        </Button>
                    </Row>
                </Row>
            </AvForm>
        </React.Fragment>
    )
}
export default TransactionForm
