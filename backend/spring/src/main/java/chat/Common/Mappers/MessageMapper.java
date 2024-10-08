package chat.Common.Mappers;

import chat.Common.DTOs.MessageDTO;
import chat.Common.Entities.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {
  public Message DTOToEntity(MessageDTO messageDTO){
    Message message = new Message(null, messageDTO.getMessage(), messageDTO.getRoom(), messageDTO.getSender());
    return message;
  }
}
