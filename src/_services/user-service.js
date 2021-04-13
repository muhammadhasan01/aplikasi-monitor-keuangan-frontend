import { authHeader, handleResponse } from "_helpers";
import { urlServer } from "_services";

export const userService = {
    getAll
};

function getAll() {
    const requestOption = { method: 'GET', headers: authHeader() }
    return fetch(`${urlServer}/accounts`, requestOption).then(handleResponse);
}

