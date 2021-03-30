import { authenticationService } from "@/_services";

export const authHeader = () => {
    // Return authorization header with token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return {
            Authorization: `Bearer ${currentUser.token}`
        };
    }
    return {};
}
