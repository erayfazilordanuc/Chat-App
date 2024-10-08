package chat.Common.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chat.Common.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  public User findByUsername(String username);

  public User findByEmail(String email);
}
