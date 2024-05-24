package com.example.server.dto;

import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.UniqueElements;


@Data
public class RegisterDto {
    @NotEmpty(message = "FirstName is required!")
    @Pattern(regexp="^[A-Za-z]*$",message = "Use alphabet characters only!")
    private String firstName;
    @Pattern(regexp="^[A-Za-z]*$",message = "Use alphabet characters only!")
    @NotEmpty(message = "LastName is required!")
    private String  lastName;
    @NotEmpty(message = "Username is required!")
    private String username;
    @NotEmpty(message = "Email is required!")
    @Email(message = "Please respect the email format!")
    private String  email;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{5,}$" ,message = "Password is not secure enough (at least: 5 characters, 1 special character, 1 uppercase letter, 1 number)")
    private String password;

}
