class Config {
    static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
    static refreshApiUrl = "http://127.0.0.1:8000/api/refresh_token/";
    static companyApiUrl = "http://127.0.0.1:8000/api/company/";
    static companyBankApiUrl = "http://127.0.0.1:8000/api/companybank/";
    static companyOnlyApiUrl = "http://127.0.0.1:8000/api/companyonly/";
    static medicineApiUrl = "http://127.0.0.1:8000/api/medicine/";
    static companyAccountApiUrl = "http://127.0.0.1:8000/api/companyaccount/";
    static employeeApiUrl = "http://127.0.0.1:8000/api/employee/";
    static employeeSalaryApiUrl = "http://127.0.0.1:8000/api/employee_salary_by_id/";
    static employeeBankApiUrl = "http://127.0.0.1:8000/api/employee_bank_by_id/";
    static AllEmployeeBankApiUrl = "http://127.0.0.1:8000/api/employee_all_bank/";
    static AllEmployeeSalaryApiUrl = "http://127.0.0.1:8000/api/employee_all_salary/";


    static homeUrl = "/home"
    static logoutPageUrl = "logout"


    static sidebarItem = [
        { "index": 0, "title": "Home", "url": "/home", "icon": "home" },
        { "index": 1, "title": "Company", "url": "/company", "icon": "assessment" },
        { "index": 2, "title": "Medicine", "url": "/addMedicine", "icon": "assessment" },
        { "index": 3, "title": "Manage Medicine", "url": "/manageMedicine", "icon": "assessment" },
        { "index": 4, "title": "Manage Company Account", "url": "/manageCompanyAccount", "icon": "assessment" },
        { "index": 5, "title": "Manage Employee", "url": "/manageEmployee", "icon": "assessment" },

    ]
}

export default Config;

