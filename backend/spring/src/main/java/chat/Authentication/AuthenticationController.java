package chat.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chat.Authentication.Services.AuthenticationService;
import chat.Common.DTOs.LoginRequestDTO;
import chat.Common.DTOs.RegisterRequestDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/auth")
@Tags(value = @Tag(name = "Authentication Operations"))
public class AuthenticationController {

  @Autowired
  private AuthenticationService authenticationService;

  @PostMapping("/login")
  public String login(@Valid @RequestBody LoginRequestDTO requestDTO) {
    return authenticationService.login(requestDTO);
  }

  @PostMapping("/register")
  public String register(@Valid @RequestBody RegisterRequestDTO requestDTO) {
    return authenticationService.register(requestDTO);
  }
}
