class Config {
    static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
    static refreshApiUrl = "http://127.0.0.1:8000/api/refresh_token/";
    static companyApiUrl = "http://127.0.0.1:8000/api/company/";
    static companyBankApiUrl = "http://127.0.0.1:8000/api/companybank/"

    static homeUrl = "/home"
    static logoutPageUrl = "logout"


    static sidebarItem = [
        { "index": 0, "title": "Home", "url": "/home", "icon": "home" },
        { "index": 1, "title": "Company", "url": "/company", "icon": "assessment" },
        { "index": 2, "title": "Medicine", "url": "/addMedicine", "icon": "assessment" },

    ]
}

export default Config;

