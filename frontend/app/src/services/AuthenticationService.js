import api from "./AxiosService";

class AuthenticationService {
  async loginRequest(username, email, password) {
    const response = await api.post("/api/auth/login", {
      username: username,
      email: email,
      password: password,
    });

    return response;
  }

  async registerRequest(username, email, password) {
    const response = await api.post("/api/auth/register", {
      username: username,
      email: email,
      password: password,
    });

    return response;
  }
}

export const authenticationService = new AuthenticationService();
