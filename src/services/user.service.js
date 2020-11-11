import axios from 'sxios';

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

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