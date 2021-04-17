class Config {
    static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
    static refreshApiUrl = "http://127.0.0.1:8000/api/refresh_token/";
    static companyApiUrl = "http://127.0.0.1:8000/api/company/";
    static companyBankApiUrl = "http://127.0.0.1:8000/api/companybank/";
    static companyOnlyApiUrl = "http://127.0.0.1:8000/api/companyonly/";
    static medicineApiUrl = "http://127.0.0.1:8000/api/medicine/";

    static homeUrl = "/home"
    static logoutPageUrl = "logout"


    static sidebarItem = [
        { "index": 0, "title": "Home", "url": "/home", "icon": "home" },
        { "index": 1, "title": "Company", "url": "/company", "icon": "assessment" },
        { "index": 2, "title": "Medicine", "url": "/addMedicine", "icon": "assessment" },
        { "index": 3, "title": "Manage Medicine", "url": "/manageMedicine", "icon": "assessment" },
        { "index": 4, "title": "Manage Company Account", "url": "/manageCompanyAccount", "icon": "assessment" },
    ]
}

export default Config;

