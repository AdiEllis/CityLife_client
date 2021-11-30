import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert, CardTitle} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {editStreet, getStreetById} from "../../microservices/streets/streets";
import StreetForm from "./StreetForm";

const EditStreet = props => {
    const {oid} = props.match.params;
    const [street, setStreet] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => { //act like componentDidMount
        getStreetById({oid}).then((response) => {
            setStreet(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitForm = (data) => {
        delete data.token
        editStreet(data).then((res) => {
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
                                    <CardTitle className="h4">ערוך רחוב</CardTitle>
                                    {
                                        errorMsg !== '' &&
                                        <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    {
                                        (street.object !== null)
                                            ? (<StreetForm
                                                streetObject={street.object}
                                                handleSubmitForm={handleSubmitForm}
                                                history={props.history}
                                            />)
                                            : (<Alert color="danger">{street.errorName}</Alert>)
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default EditStreet