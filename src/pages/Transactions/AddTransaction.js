import React, {useState} from "react";
import {Alert, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {addTransaction} from "../../microservices/transactions/transactions";
import TransactionForm from "./TransactionForm";

const AddTransaction = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const handleSubmitForm = (data) => {
        addTransaction(data).then((res) => {
            if (res.errorCode === 0 && res.errorName === null) {
                console.log(data)
                props.history.push('/transactions')
            } else {
                console.log(data)
                setErrorMsg(res.errorName)
            }
        }).catch(e => {
            setErrorMsg('אירעה שגיאה.')
        })
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="ניהול תקציבים"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">הוסף פעולה</CardTitle>
                                    {errorMsg !== '' &&
                                    <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    <TransactionForm
                                        handleSubmitForm={handleSubmitForm}
                                        history={props.history}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default AddTransaction