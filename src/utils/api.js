import axios from 'axios';

// Common API Class to handle our API calls
class API {
    //Checks if the Token is present or not (User Logged in or not)
    getHeaders = () => {
        //Add the logic to return your authorization headers from here
        return {
            'Authorization': `Bearer ${`your_access_token`}`,
        }
    };

    //Generic Method to make a GET API request
    getAsync = async (url) => {
        try {
            let response = await axios(url, {
                method: 'GET',
                headers: this.getHeaders(),
            });
            return response;
        } catch (err) {
            return this.handleErrors(err)
        }
    };

    //Generic Method to make a POST API request
    postAsync = async (url, data) => {
        try {
            let response = await axios(url, {
                method: 'POST',
                headers: this.getHeaders(),
                data: data
            });
            return response;
        } catch (err) {
            return this.handleErrors(err)
        }
    };

    //Generic Method to make a PUT API request
    putAsync = async (url, data) => {
        try {
            let response = await axios(url, {
                method: 'PUT',
                headers: this.getHeaders(),
                data: data
            });
            return response;
        } catch (err) {
            return this.handleErrors(err)
        }
    };

    //Generic Method to make a PUT API request
    patchAsync = async (url, data) => {
        try {
            let response = await axios(url, {
                method: 'PATCH',
                headers: this.getHeaders(),
                data: data
            });
            return response;
        } catch (err) {
            return this.handleErrors(err)
        }
    };

    //Generic Method to make a DELETE API request
    deleteAsync = async (url) => {
        try {
            let response = await axios(url, {
                method: 'DELETE',
                headers: this.getHeaders(),
            });
            return response;
        } catch (err) {
            return this.handleErrors(err)
        }
    };

    customCall = async (url, headers, method, data) => {
        try {
            let response = await axios(url, {
                method: method || 'GET',
                headers: headers || this.getHeaders(),
                data: data || {}
            });
            return response;
        } catch (err) {
            return this.handleErrors(err)
        }
    };

    handleErrors = async (err) => {
        if (err.response) {
            return err.response;
        } else if (err.request) {
            return err.request;
        } else {
            return err;
        }
    }
};

export default new API();