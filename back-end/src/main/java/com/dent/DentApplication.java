package com.dent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@SpringBootApplication
public class DentApplication {

    public static void main(String[] args) {
        SpringApplication.run(DentApplication.class, args);
    }

}
