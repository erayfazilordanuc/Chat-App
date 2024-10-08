package chat.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chat.Common.DTOs.MessageDTO;
import chat.Common.Entities.Message;
import chat.Common.Entities.User;
import chat.Common.Services.MessageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;

@RestController
@RequestMapping("api/message")
@Tags(value = @Tag(name = "Message Operations"))
public class MessageController {

  @Autowired
  private MessageService messageService;

  @PostMapping
  public String saveMessage(@RequestBody MessageDTO messageDTO, @AuthenticationPrincipal User user){
    try {
      if(messageDTO.getSender().equals(user.getUsername())){
        Message message = messageService.saveMessage(messageDTO);
        return "Message " + message.getId() + " saved";
      }else {
        throw new Exception("Invalid token");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return "Error occurred while saving message.";
    }
  }
}
