import { authHeader, handleResponse } from "_helpers";
import { urlServer } from "_services";
import { authenticationService } from "_services";

export const rkaService = {
    loadRKA
};

function loadRKA(){
    const requestOption = { 
        method: 'GET', 
        headers: authHeader() 
    }

    const currentUser = authenticationService.currentUserValue;
    const userInfo = getUserFromToken(currentUser);
    const { unit, subunit } = userInfo;

    return fetch(`${urlServer}/rka/${unit}/${subunit}`, requestOption).then(handleResponse);
    
}

