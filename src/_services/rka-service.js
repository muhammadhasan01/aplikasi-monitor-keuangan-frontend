import { authHeader, handleResponse } from "_helpers";
import { urlServer } from "_services";

export const rkaService = {
    loadRKA
};

function loadRKA(){
    const requestOption = { 
        method: 'GET', 
        headers: authHeader() 
    }

    return fetch(`${urlServer}/rka`, requestOption).then(handleResponse);
 
    
}