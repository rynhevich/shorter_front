import AuthService from './auth.service.js'

class RepresentationService {
    showNavbar() {
        const state = AuthService.getCurrentUser() ? 'preAuth' : 'postAuth';

        const nodeToRemove = document.getElementById(state);
        nodeToRemove.remove();
    }
}

export default new RepresentationService();