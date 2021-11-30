import React, {useEffect, useState} from "react"
import {Container, Row, Col} from "reactstrap"


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import MiniWidget from "./mini-widget"
import SalesAnalyticsChart from "./salesanalytics-chart"
import TopUser from "./topTransaction"
import RecentActivity from "./recent-activity"
import SocialSource from "./socialsource"
import {getColonies} from "../../microservices/colonies/colonies";
import {getNumberFamilies, getResidence} from "../../microservices/residence/residence";
import TopTransaction from "./topTransaction";
import {getUsers} from "../../microservices/users/users";


const series1 = [{
    data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
}]

const options1 = {
    fill: {
        colors: ['#5b73e8']
    },
    chart: {
        width: 70,
        sparkline: {
            enabled: !0
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        fixed: {
            enabled: !1
        },
        x: {
            show: !1
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: !1
        }
    }
};

const series2 = [70]

const options2 = {
    fill: {
        colors: ['#34c38f']
    },
    chart: {
        sparkline: {
            enabled: !0
        }
    },
    dataLabels: {
        enabled: !1
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '60%'
            },
            track: {
                margin: 0
            },
            dataLabels: {
                show: !1
            }
        }
    }
};

const series3 = [55]

const options3 = {
    fill: {
        colors: ['#5b73e8']
    },
    chart: {
        sparkline: {
            enabled: !0
        }
    },
    dataLabels: {
        enabled: !1
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '60%'
            },
            track: {
                margin: 0
            },
            dataLabels: {
                show: !1
            }
        }
    }
};

const series4 = [{
    data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
}]

const options4 = {

    fill: {
        colors: ['#f1b44c']
    },
    chart: {
        width: 70,
        sparkline: {
            enabled: !0
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        fixed: {
            enabled: !1
        },
        x: {
            show: !1
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: !1
        }
    }
};

const Dashboard = () => {
    const [residenceList, setResidenceList] = useState([{}])
    const [numberOfFamilies, setNumberOfFamilies] = useState(0)
    const [numberOfUsers, setNumberOfUsers] = useState(0)
    const [numberOfColonies, setNumberOfColonies] = useState(0)
    const [errorNum, setErrorNum] = useState('')
    const [errorMsg, setErrorMsg] = useState('')


    useEffect(() => {
        getResidence().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    //??
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

    useEffect(() => {
        getNumberFamilies().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    //??
                } else {
                    setErrorMsg(response.errorName)
                    setErrorNum(response.errorCode)
                }
            } else {
                setNumberOfFamilies(response.object.length)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })

    }, [])

    useEffect(() => {
        getUsers().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    //??
                } else {
                    setErrorMsg(response.errorName)
                    setErrorNum(response.errorCode)
                }
            } else {
                setNumberOfUsers(response.object.length)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })

    }, [])

    useEffect(() => {
        getColonies().then((response) => {
            if (response.errorCode !== null && response.errorName !== null) {
                if (response.errorCode === 999) { //invalid token so... logout please.
                    //??
                } else {
                    setErrorMsg(response.errorName)
                    setErrorNum(response.errorCode)
                }
            } else {
                setNumberOfColonies(response.object.length)
            }
        }).catch((e) => {
            setErrorMsg("אירעה שגיאה, אנא נסה מאוחר יותר.")
        })

    }, [])

    const reports = [
        {
            id: 2,
            // icon: "mdi mdi-arrow-down-bold",
            title: localStorage.getItem("authUserIsAdmin") == "true" ? "מספר לקוחות" : "מספר המשפחות",
            value: localStorage.getItem("authUserIsAdmin") == "true" ? numberOfUsers : numberOfFamilies,
            decimal: 0,
            charttype: "radialBar",
            chartheight: 45,
            chartwidth: 45,
            prefix: "",
            suffix: "",
            // badgeValue: "0.82%",
            // color: "danger",
            // desc: "since last week",
            series: series2,
            options: options2,
        },
        {
            id: 3,
            // icon: "mdi mdi-arrow-down-bold",
            title: localStorage.getItem("authUserIsAdmin") == "true" ? "מספר יישובים" : "תושבים",
            value: localStorage.getItem("authUserIsAdmin") == "true" ? numberOfColonies : residenceList.length,
            decimal: 0,
            prefix: "",
            suffix: "",
            charttype: "radialBar",
            chartheight: 45,
            chartwidth: 45,
            //  badgeValue: "6.24%",
            //  color: "danger",
            // desc: "since last week",
            series: series3,
            options: options3,
        },
    ];


    /*return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="StudentTracker" breadcrumbItem="עמוד ראשי"  />
                    <Row>
                        עמוד הבית - עוד לא מוכן.
                    </Row>
                </Container>
        </React.Fragment>
    )*/
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="CityLife" breadcrumbItem="עמוד ראשי"/>
                    <Row>
                        <MiniWidget reports={reports}/>
                    </Row>
                    {
                        localStorage.getItem("authUserIsAdmin") == "false" &&
                        <Row>
                            <Col xl={4}>
                                <TopTransaction/>
                            </Col>
                            {/*<Col xl={4}>*/}
                            {/*    <RecentActivity />*/}
                            {/*</Col>*/}
                            {/*<Col xl={4}>*/}
                            {/*    <SocialSource />*/}
                            {/*</Col>*/}
                        </Row>
                    }

                </Container>
            </div>
        </React.Fragment>
    )
}

export default Dashboard