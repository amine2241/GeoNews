package com.example.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import org.springframework.context.support.ResourceBundleMessageSource;
import java.util.Locale;

@SpringBootApplication
public class ServerApplication {
    public static void main(String[] args) {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("lang/messages");
        messageSource.setDefaultEncoding("UTF-8");
        System.out.println(messageSource.getMessage("hello",null,Locale.FRENCH));
        SpringApplication.run(ServerApplication.class, args);
    }
}
