import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import Config from "./Config";

class AuthHandler {
    static login(username, password, callback) {
        axios.post("http://127.0.0.1:8000/api/gettoken", { username: username, password: password })
            .then((response) => {
                if (response.status === 200) {
                    reactLocalStorage.set("token", response.data.access)
                    reactLocalStorage.set("refresh", response.data.refresh)
                    callback({ error: false, message: "Login Successful......." })
                }
            })
            .catch((error) => {

                callback({ error: true, message: "Error during Login......." })
            }
            );
    }

    static loggedIn() {
        if (reactLocalStorage.get("token") && reactLocalStorage.get("refresh")) {
            return true;
        } else {
            return false;
        }
    }

    static getLoginToken() {
        return reactLocalStorage.get("token")
    }

    static getRefreshToken() {
        return reactLocalStorage.get("refresh")
    }

    static logOutUser() {
        reactLocalStorage.remove("token");
        reactLocalStorage.remove("refresh");
    }

    static checkTokenExpiry() {
        var expire = false
        var token = this.getLoginToken();
        var tokenArray = token.split(".")
        var jwt = JSON.parse(atob(tokenArray[1]));
        if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
            expire = jwt.exp * 1000;
        } else {
            return false;
        }

        if (!expire) {
            return false;
        }

        return Date.now() > expire;
    }
}

export default AuthHandler;