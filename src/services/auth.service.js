import axios from 'axios';

class AuthService {
    login(username, password) {
        return axios 
            .post('/', {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user')
    }

    regester(username, password) {
        return axios
            .post ('/regestration', {
                username,
                password
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }


}

export default new AuthService();