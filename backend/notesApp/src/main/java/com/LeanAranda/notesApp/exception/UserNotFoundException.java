package com.LeanAranda.notesApp.exception;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException() {
    super("Username not found");
  }
}
