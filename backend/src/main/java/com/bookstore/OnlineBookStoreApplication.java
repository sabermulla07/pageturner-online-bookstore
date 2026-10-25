package com.bookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineBookStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineBookStoreApplication.class, args);
        System.out.println("==================================================================");
        System.out.println(" Online Book Store Backend running on: http://localhost:8080");
        System.out.println(" Database: MySQL (online_bookstore_db) on localhost:3306");
        System.out.println(" REST API available at: http://localhost:8080/api/books");
        System.out.println("==================================================================");
    }
}
