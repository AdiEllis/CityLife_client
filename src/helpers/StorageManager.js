export const storageManager = (details => {
    localStorage.setItem("authUser_permission", details.authUser_permission);
    localStorage.setItem("authUser_username", details.authUser_username);
})
export const setStorage = ({authUserId, authUserEmail, authUserToken,authUserColonyID,authUserIsAdmin}) => {
    localStorage.setItem("authUserId", authUserId);
    localStorage.setItem("authUserEmail", authUserEmail);
    localStorage.setItem("authUserToken", authUserToken);
    localStorage.setItem("authUserColonyID", authUserColonyID);
    localStorage.setItem("authUserIsAdmin", authUserIsAdmin);
}
export const clearStorage =  () => {
    localStorage.removeItem("authUserId")
    localStorage.removeItem("authUserEmail")
    localStorage.removeItem("authUserToken")
    localStorage.removeItem("authUserColonyID");
    localStorage.removeItem("authUserIsAdmin");
}
export const isLogged = () => {
    return (
        localStorage.getItem("authUserId") !== null &&
        localStorage.getItem("authUserEmail") !== null &&
        localStorage.getItem("authUserToken") !== null &&
        localStorage.getItem("authUserColonyID") !== null &&
        localStorage.getItem("authUserIsAdmin") !== null
    )
}