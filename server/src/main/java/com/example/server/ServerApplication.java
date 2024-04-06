package com.example.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@SpringBootApplication
public class ServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
    @RestController
    @RequestMapping(path="/JSON", produces="application/json")
    @CrossOrigin(origins="*")
    public class RestJsonResponse {

        @GetMapping("/data")
        public ArrayList<Integer> get() {

            ArrayList<Integer> arr = new ArrayList<>();
            arr.add(1);
            arr.add(2);
            return arr;
        }
    }
}
