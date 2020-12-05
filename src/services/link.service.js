import axios from 'axios';
import AuthService from './auth.service.js'

function authHeader(user) {
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken};
    }
    else {
        return {};
    }
}

class LinkService {
    create(link, description, tags) {
        const user = AuthService.getCurrentUser();
        return axios
            .post ('/create', {
                link,
                description,
                tags,
                username: user.username,
                headers: authHeader(user)
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

    getLinksByUsername() {
        const user = AuthService.getCurrentUser()
        return axios
            .post ('/statistics', {
                username: user.username,
                headers: authHeader(user)
            })
    }
    
    getLinksByTag(tag) {
        return axios 
            .post ('/tag', {
                tag,
            })
    }
}

export default new LinkService();