import API from './api'
import { LOGIN } from './constants';

class Auth {
    constructor() {
        this.authenticated = false;
        //Add the Logic to verify using Cookies or access token here

        // let token = userTokens();
        // let session = userSession();
    };

    isAuthenticated() {
        // return this.authenticated
        // returning authorized to avoid automatic routing
        return true;
    };

    login = async (email, password) => {
        let credentials = {
            "email": email,
            "password": password
        }
        //make the API call to login here
        let response = await API.postAsync(`${LOGIN}`, credentials);
        if (response && response.status === 200) {
            //Set the cookies or access token to local or session storage here
        }
        return response;
    };

    logout = async () => {
        //Destroy the user session here clear the cookies and redirect user to login
        // userSession(true);
        // this.authenticated = false;
        // window.location.replace("the login page");
    };
};

export default new Auth();