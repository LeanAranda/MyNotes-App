package com.LeanAranda.notesApp.configuration;

import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.repository.IUserRepository;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final IUserService userService;

    public CustomUserDetailsService(IUserRepository userRepository, IUserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getByUsername(username);
        return new org.springframework.security.core.userdetails.User(
                // for now, all users have ROLE_USER, but roles can be added in future versions
                user.getUsername(),user.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
