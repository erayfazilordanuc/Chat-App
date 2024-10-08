package chat.Common.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chat.Common.DTOs.MessageDTO;
import chat.Common.Entities.Message;
import chat.Common.Mappers.MessageMapper;
import chat.Common.Repositories.MessageRepository;

@Service
public class MessageService {
  
  @Autowired
  public MessageMapper messageMapper;

  @Autowired
  public MessageRepository messageRepository;
  
  public Message saveMessage(MessageDTO messageDTO){
    Message message = messageMapper.DTOToEntity(messageDTO);

    messageRepository.save(message);

    return message;
  }
}
