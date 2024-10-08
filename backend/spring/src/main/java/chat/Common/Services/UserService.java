package chat.Common.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import chat.Common.DTOs.UserDTO;
import chat.Common.Entities.User;
import chat.Common.Mappers.UserMapper;
import chat.Common.Repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserMapper userMapper;

  public User updateUser(UserDTO newUserDTO, User user) {
    User updatedUser = userMapper.DTOToEntity(newUserDTO, user);

    userRepository.save(updatedUser);

    return updatedUser;
  }

  public String deleteUser(User user) {
    userRepository.delete(user);

    return "User " + user.getId() + " has been deleted";
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    try {
      return userRepository.findByUsername(username);
    } catch (Exception e) {
      throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
    }
  }

}
