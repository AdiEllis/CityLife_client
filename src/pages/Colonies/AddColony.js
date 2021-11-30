import React, {useState} from "react";
import {Alert, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {addColony} from "../../microservices/colonies/colonies";
import ColonyForm from "./ColonyForm";

const AddColony = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const handleSubmitForm = (data) => {
        addColony(data).then((res) => {
            if (res.errorCode === 0 && res.errorName === null) {
                props.history.push('/colonies')
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
                    <Breadcrumbs title="CityLife" breadcrumbItem="ניהול יישובים"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">הוסף יישוב</CardTitle>
                                    {errorMsg !== '' &&
                                    <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    <ColonyForm
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

export default AddColony