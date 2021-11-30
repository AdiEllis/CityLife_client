import PropTypes from "prop-types"
import React, {useCallback, useEffect, useRef, useState} from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import {withRouter} from "react-router-dom"
import {Link} from "react-router-dom"

//i18n
import {withTranslation} from "react-i18next"

const SidebarContent = props => {
    const ref = useRef();
    const [userPermission, setUserPermission] = useState(0)

    const activateParentDropdown = useCallback((item) => {
        item.classList.add("active")
        const parent = item.parentElement
        const parent2El = parent.childNodes[1]
        if (parent2El && parent2El.id !== "side-menu") {
            parent2El.classList.add("mm-show")
        }

        if (parent) {
            parent.classList.add("mm-active")
            const parent2 = parent.parentElement

            if (parent2) {
                parent2.classList.add("mm-show") // ul tag

                const parent3 = parent2.parentElement // li tag

                if (parent3) {
                    parent3.classList.add("mm-active") // li
                    parent3.childNodes[0].classList.add("mm-active") //a
                    const parent4 = parent3.parentElement // ul
                    if (parent4) {
                        parent4.classList.add("mm-show") // ul
                        const parent5 = parent4.parentElement
                        if (parent5) {
                            parent5.classList.add("mm-show") // li
                            parent5.childNodes[0].classList.add("mm-active") // a tag
                        }
                    }
                }
            }
            scrollElement(item);
            return false
        }
        scrollElement(item);
        return false
    }, []);

    // Use ComponentDidMount and ComponentDidUpdate method symultaniously
    useEffect(() => {
        const pathName = props.location.pathname
        new MetisMenu("#side-menu")
        let matchingMenuItem = null
        const ul = document.getElementById("side-menu")
        const items = ul.getElementsByTagName("a")
        for (let i = 0; i < items.length; ++i) {
            if (pathName === items[i].pathname) {
                matchingMenuItem = items[i]
                break
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }

    }, [props.location.pathname, activateParentDropdown])

    useEffect(() => {
        ref.current.recalculate()
    })

    function scrollElement(item) {
        if (item) {
            const currentPosition = item.offsetTop
            if (currentPosition > window.innerHeight) {
                ref.current.getScrollElement().scrollTop = currentPosition - 300
            }
        }
    }

    const menu = [{
        moduleName: 'ניהול תושבים',
        moduleIcon: 'fas fa-users',
        moduleLink: '/residence',
        permission: "true"
    }, {
        moduleName: 'ניהול כספים',
        moduleIcon: 'fas fa-shekel-sign',
        moduleLink: '/transactions',
        permission: "true"
    }, {
        moduleName: 'ניהול רחובות',
        moduleIcon: 'fas fa-address-book',
        moduleLink: '/streets',
        permission: "true"
    }, {
        moduleName: 'ניהול יישובים',
        moduleIcon: 'fas fa-house-user',
        moduleLink: '/colonies',
        permission: localStorage.getItem("authUserIsAdmin")
    }, {
        moduleName: 'ניהול משתמשים',
        moduleIcon: ' fas fa-user-plus',
        moduleLink: '/users',
        permission: localStorage.getItem("authUserIsAdmin")

    }
    ]

    return (
        <React.Fragment>
            <SimpleBar style={{maxHeight: "100%"}} ref={ref} data-simplebar className="sidebar-menu-scroll">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">תפריט</li>
                        <li>
                            <Link to="/#" className="waves-effect">
                                <i className="uil-home-alt"></i>
                                <span>עמוד ראשי</span>
                            </Link>
                        </li>
                        <li className="menu-title">מודלים</li>
                        {
                            menu.map((item, index) =>
                                (
                                    <li  key={index}>
                                        {
                                            item.permission == "true" &&
                                            <Link to={item.moduleLink} className=" waves-effect">
                                                <i className={item.moduleIcon}></i>
                                                <span>{item.moduleName}</span>
                                            </Link>
                                        }

                                    </li>
                                )
                            )

                        }
                    </ul>
                </div>
            </SimpleBar>
        </React.Fragment>
    )
}

SidebarContent.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))