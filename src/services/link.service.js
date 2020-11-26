import axios from 'axios';
import AuthService from './auth.service.js'

const user = AuthService.getCurrentUser();

function authHeader() {
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken};
    }
    else {
        return {};
    }
}

class LinkService {
    create(link, description, tags) {
        return axios
            .post ('/create', {
                link,
                description,
                tags,
                username: user.username,
                headers: authHeader()
            });
    }

    getLink(id) {
        return axios
            .post ('/t', {
                id,
            });
    }

    counterUpdate(id) {
        return axios
            .put ('/t', {
                id,
            })
    }

    check(original) {
        return (original.slice(0, 4) === 'http') ? original : 'http://' + original;
    } 

}

export default new LinkService();