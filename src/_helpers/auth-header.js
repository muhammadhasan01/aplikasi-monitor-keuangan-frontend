import { authenticationService } from "_services";

export default function authHeader() {
  // Return authorization header with token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return {
      "Content-type": "application/json",
      Authorization: `Bearer ${currentUser.token}`,
    };
  }
  return {};
}
