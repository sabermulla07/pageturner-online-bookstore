package com.bookstore.controller;

import com.bookstore.dto.ApiResponse;
import com.bookstore.entity.Book;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Book>>> getBooks(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false, defaultValue = "id") String sortBy) {

        List<Book> books = bookService.searchAndFilterBooks(search, category, minPrice, maxPrice, sortBy);
        return ResponseEntity.ok(ApiResponse.ok("Books fetched successfully", books));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Book>> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(book -> ResponseEntity.ok(ApiResponse.ok("Book details retrieved", book)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Book not found with ID: " + id)));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Book>>> getFeaturedBooks() {
        List<Book> books = bookService.getFeaturedBooks();
        return ResponseEntity.ok(ApiResponse.ok("Featured books fetched", books));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        List<String> categories = bookService.getCategories();
        return ResponseEntity.ok(ApiResponse.ok("Categories fetched", categories));
    }
}
