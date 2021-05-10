import { BehaviorSubject } from 'rxjs';
import { urlServer } from '_services';
import { getUserFromToken, handleResponse } from '_helpers';
import axios from "axios";
import authHeader from "_helpers/auth-header";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    sendResetLink,
    currentUser: currentUserSubject.asObservable(),
    get UserInformation() {
        return getUserFromToken(currentUserSubject.value);
    },
    get currentUserValue() {
        return currentUserSubject.value;
    }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${urlServer}/auths/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // Store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function getHttp() {
    return axios.create({
        baseURL: (urlServer + "/pagu"),
        headers: authHeader()
    });
}

function sendResetLink(data) {
    return getHttp().post("/sendResetLink",data);
}