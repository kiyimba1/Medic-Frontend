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

    async saveCompanyBankData(bank_account_no, ifsc_no, company_id) {
        await this.checkLogin();
        var response = await axios.post(Config.companyBankApiUrl, { bank_account_no: bank_account_no, ifsc_no: ifsc_no, company_id: company_id }, { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } });
        return response
        // console.log(response)

    }

    async editCompanyData(name, license_no, address, contact_no, email, description, id) {
        await this.checkLogin();
        var response = await axios.put(Config.companyApiUrl + "" + id + "/", { name: name, license_no: license_no, address: address, contact_no: contact_no, email: email, description: description }, { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } });
        return response
        // console.log(response)

    }

    async fetchAllCompany() {
        await this.checkLogin();

        var response = await axios.get(Config.companyApiUrl, { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } })
        return response
    }

    async fetchCompanyOnly() {
        await this.checkLogin();

        var response = await axios.get(Config.companyOnlyApiUrl, { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } })
        return response
    }

    async fetchCompanyDetails(id) {
        await this.checkLogin();

        var response = await axios.get(Config.companyApiUrl + "" + id, { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } })
        return response
    }

    async saveMedicineData(name, medical_type, buy_price, sell_price, c_gst, s_gst, batch_no, shelf_no, expire_date, mfg_date, company_id, description, in_stock_total, qty_in_strip, medicinedetails) {
        await this.checkLogin();
        var response = await axios.post(Config.medicineApiUrl, { name: name, medical_type: medical_type, buy_price: buy_price, sell_price: sell_price, c_gst: c_gst, s_gst: s_gst, batch_no: batch_no, shelf_no: shelf_no, expire_date: expire_date, mfg_date: mfg_date, description: description, in_stock_total: in_stock_total, qty_in_strip: qty_in_strip, company_id: company_id, medicinedetails: medicinedetails }, { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } });
        return response
        // console.log(response)

    }

}

export default APIHandler;