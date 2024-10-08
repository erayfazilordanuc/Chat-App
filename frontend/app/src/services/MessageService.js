import api from "./AxiosService";

class MessageService {
  async saveMessage(accessToken, message, room, username) {
    const requestBody = {
      message: message,
      room: room,
      sender: username,
    };

    await api.post(`/api/message`, requestBody, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }
}

export const messageService = new MessageService();
