import Cookies from "js-cookie";

export function getToKen() {
    return Cookies.get("token")
}

export function setToKen(token) {
    return Cookies.set("token", token, { expires: 7 })
}

export function removeToKen() {
    return Cookies.remove("token")
}