import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import AuthHandler from "./AuthHandler";
import Config from "./Config";

class APIHandler {
    async checkLogin() {
        try {
            if (AuthHandler.checkTokenExpiry()) {
                var response = await axios.post(Config.refreshApiUrl, { refresh: AuthHandler.getRefreshToken() });

                reactLocalStorage.set("token", response.data.access)

            }
        }
        catch (error) {
            AuthHandler.logOutUser();
            window.location = "/";
            // console.log(error)
        }
    }

    async saveCompanyData(name, license_no, address, contact_no, email, description) {
        await this.checkLogin();
        var response = await axios.post(Config.companyApiUrl, { name: name, license_no: license_no, address: address, contact_no: contact_no, email: email, description: description }, { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } });
        return response
        // console.log(response)

    }

    async fetchAllCompany() {
        await this.checkLogin();

        var response = await axios.get(Config.companyApiUrl, { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } })
        return response
    }

}

export default APIHandler;