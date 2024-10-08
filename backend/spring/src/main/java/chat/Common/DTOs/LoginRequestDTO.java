package chat.Common.DTOs;

import chat.Common.Validation.Login.ValidLoginRequestDTO;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ValidLoginRequestDTO(username = "username", email = "email")
public class LoginRequestDTO {
  
  private String username;

  private String email;

  @NotEmpty
  private String password;
}
