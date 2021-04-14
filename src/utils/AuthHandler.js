import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import Config from "./config";

class AuthHandler {
    static login(username, password, callback) {
        axios.post("http://127.0.0.1:8000/api/gettoken", { username: username, password: password })
            .then((response) => {
                if (response.status === 200) {
                    reactLocalStorage.set("token", response.data.access)
                    reactLocalStorage.set("refresh", response.data.refresh)
                    callback({error:false, message:"Login Successful......."})
                }
            })
            .catch((error) => {
            
                callback({error:true,message:"Error during Login......."})
            }
            );
    }
}

export default AuthHandler;