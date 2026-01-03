package com.LeanAranda.notesApp.mapper;

import com.LeanAranda.notesApp.dto.UserDto;
import com.LeanAranda.notesApp.model.User;

public class UserMapper {
    public static UserDto toDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());

        return userDto;
    }
}
