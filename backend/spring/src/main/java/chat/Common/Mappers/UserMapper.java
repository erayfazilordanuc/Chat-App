package chat.Common.Mappers;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import chat.Common.DTOs.UserDTO;
import chat.Common.Entities.User;

@Component
public class UserMapper {

  PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public User DTOToEntity(UserDTO newUserDTO, User user) {
    User newUser = new User(user.getId(), newUserDTO.getUsername(), newUserDTO.getEmail(),
        passwordEncoder.encode(newUserDTO.getPassword()));

    return newUser;
  }
}
