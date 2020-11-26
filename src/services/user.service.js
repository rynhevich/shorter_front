import axios from 'axios';
import AuthService from './auth.service.js'

function authHeader() {
    const user =  AuthService.getCurrentUser();

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken};
    }
    else {
        return {};
    }
}

class UserService {
    getPublicContent() {
        return axios.get('/');
    }

    getNotPublicContent() {
        return axios.get('/', { headers: authHeader() });
    }

}

export default new UserService();