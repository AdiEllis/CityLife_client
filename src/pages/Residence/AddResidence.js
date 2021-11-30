import React, {useState} from "react";
import {Alert, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {addResidence} from "../../microservices/residence/residence";
import ResidenceForm from "./ResidenceForm";

const AddResidence = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const handleSubmitForm = (data) => {
        addResidence(data).then((res) => {
            if (res.errorCode === 0 && res.errorName === null) {
                props.history.push('/residence')
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
                    <Breadcrumbs title="CityLife" breadcrumbItem="ניהול תושבים"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">הוסף תושב</CardTitle>
                                    {errorMsg !== '' &&
                                    <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    <ResidenceForm
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

export default AddResidence