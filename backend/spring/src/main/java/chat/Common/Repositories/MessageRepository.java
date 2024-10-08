package chat.Common.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chat.Common.Entities.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{}
