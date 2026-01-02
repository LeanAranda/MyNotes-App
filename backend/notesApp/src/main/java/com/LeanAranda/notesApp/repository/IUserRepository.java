package com.LeanAranda.notesApp.repository;

import com.LeanAranda.notesApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);

    //login
    //find by username and active
    //save
}
