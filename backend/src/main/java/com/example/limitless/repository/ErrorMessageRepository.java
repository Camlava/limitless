package com.example.limitless.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.limitless.entity.ErrorMessages;

public interface ErrorMessageRepository extends JpaRepository<ErrorMessages, Integer> {

    Optional<ErrorMessages> findByErrorCode(String errorCode);
}
