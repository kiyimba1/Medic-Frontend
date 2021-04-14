class Config {
    loginUrl = "http://127.0.0.1:8000/api/gettoken/";
    homeUrl = "/home"
    logoutPageUrl = "logout"


    static sidebarItem = [
        { "index": 0, "title": "Home", "url": "/home", "icon": "home" },
        { "index": 1, "title": "Company", "url": "/company", "icon": "assessment" },
    ]
}

export default Config;

