package chat.Authentication.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import chat.Common.DTOs.LoginRequestDTO;
import chat.Common.DTOs.RegisterRequestDTO;
import chat.Common.Entities.User;
import chat.Common.Repositories.UserRepository;

@Service
public class AuthenticationService {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JWTService jwtService;

  @Autowired
  private UserRepository userRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;
  
  public String login(LoginRequestDTO requestDTO){
    requestDTO.setUsername((requestDTO.getUsername() == null) ? userRepo.findByEmail(requestDTO.getEmail()).getUsername() : requestDTO.getUsername());
    
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(requestDTO.getUsername(), requestDTO.getPassword())
    );

    if (authentication.isAuthenticated()) {
      String token = jwtService.generateToken(requestDTO.getUsername(), requestDTO.getPassword());

      return "Access Token : " + token;
    } else {
      throw new UsernameNotFoundException("Invalid username-email or password");
    }
  }

  public String register(RegisterRequestDTO requestDTO){
    try{
      User user = new User(null, requestDTO.getUsername(), requestDTO.getEmail(), passwordEncoder.encode(requestDTO.getPassword()));
      userRepo.save(user);

      String token = jwtService.generateToken(requestDTO.getUsername(), requestDTO.getPassword());
      
      return "Access Token : " + token;
    }catch(Exception e){
      throw e;
    }
  }
}
