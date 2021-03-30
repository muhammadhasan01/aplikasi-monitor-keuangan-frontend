import config from 'config';
import { authHeader, handleResponse } from "@/_helpers";

export const userService = {
    getAll
};

function getAll() {
    const requestOption = { method: 'GET', headers: authHeader() }
    return fetch(`${config.apiUrl}/accounts`, requestOption).then(handleResponse);
}

