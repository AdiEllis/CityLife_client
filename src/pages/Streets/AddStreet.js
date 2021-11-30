import React, {useState} from "react";
import {Alert, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {addStreet} from "../../microservices/streets/streets";
import StreetForm from "./StreetForm";

const AddStreet = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const handleSubmitForm = (data) => {
        addStreet(data).then((res) => {
            if (res.errorCode === 0 && res.errorName === null) {
                props.history.push('/streets')
            } else {
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
                    <Breadcrumbs title="CityLife" breadcrumbItem="ניהול רחובות"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">הוסף רחוב</CardTitle>
                                    {errorMsg !== '' &&
                                    <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    <StreetForm
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

export default AddStreet