import React, {useEffect, useState} from "react"
import {Card, CardBody, Col, Container, Row, Alert, CardTitle} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ColonyForm from "./ColonyForm";
import {editColony, getColonyById} from "../../microservices/colonies/colonies";

const EditColony = props => {
    const {oid} = props.match.params;
    const [colony, setColony] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => { //act like componentDidMount
        getColonyById({oid}).then((response) => {
            setColony(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmitForm = (data) => {
        delete data.token
        editColony(data).then((res) => {
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
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="ניהול יישובים"/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">ערוך יישוב</CardTitle>
                                    {
                                        errorMsg !== '' &&
                                        <Alert color="danger">{errorMsg}</Alert>
                                    }
                                    {
                                        (colony.object !== null)
                                            ? (<ColonyForm
                                                colonyObject={colony.object}
                                                handleSubmitForm={handleSubmitForm}
                                                history={props.history}
                                            />)
                                            : (<Alert color="danger">{colony.errorName}</Alert>)
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

export default EditColony