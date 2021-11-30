import React, {useEffect, useState} from "react"
import {Card, CardBody, Table} from "reactstrap"

//Simple bar
import SimpleBar from "simplebar-react"

import avatar4 from "../../assets/images/users/avatar-4.jpg"
import avatar5 from "../../assets/images/users/avatar-5.jpg"
import avatar6 from "../../assets/images/users/avatar-6.jpg"
import avatar7 from "../../assets/images/users/avatar-7.jpg"
import avatar8 from "../../assets/images/users/avatar-8.jpg"
import {getStreetByColonyId} from "../../microservices/streets/streets";
import {getTransactions, getTransactionsSorted} from "../../microservices/transactions/transactions";
import {toDateView} from "../../helpers/api_helper";


const TopTransaction = (props) => {
    const [transactionsList, setTransactionsList] = useState([{}])
    const [errorNum, setErrorNum] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        getTransactionsSorted().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    props.history.push('/logout')
                } else {
                    setErrorMsg(response.errorName)
                    setErrorNum(response.errorCode)
                }
            } else {
                setTransactionsList(response.object)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })
    }, [])
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <div className="float-end">
                            <span className="text-muted">אחרונים</span>
                        </div>
                        <h4 className="card-title mb-4">פעולות אחרונות</h4>
                        <SimpleBar style={{maxHeight: "336px"}}>
                            <div className="table-responsive">
                                <Table className="table-borderless table-centered table-nowrap">
                                    <tbody>
                                    {
                                        transactionsList.slice(0,5).map(item => {
                                            return (
                                                <tr>
                                                    {/*<td style={{width: "20px"}}><img src={avatar4} className="avatar-xs rounded-circle "*/}
                                                    {/*                                 alt="..."/></td>*/}
                                                    <td>
                                                        <h6 className="font-size-15 mb-1 fw-normal">{item.descriptionAction}</h6>
                                                        {/*<p className="text-muted font-size-13 mb-0">*/}
                                                        {/*    <i className="mdi mdi-map-marker"></i>{item.colonyName}</p>*/}
                                                    </td>
                                                    <td><span className= {item.typeAction == "הוצאה" ?
                                                        "badge bg-soft-danger font-size-12" : "badge bg-soft-primary font-size-12"}>
                                                        {item.typeAction}</span></td>
                                                    <td className="text-muted fw-semibold text-end">
                                                        {toDateView(item.date)}
                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }

                                    </tbody>
                                </Table>
                            </div>
                        </SimpleBar>
                    </CardBody>
                </Card>
            </React.Fragment>
        )

}

export default TopTransaction