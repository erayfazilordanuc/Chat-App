package chat.Common.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
  private String message;
  private String room;
  private String sender;
}
