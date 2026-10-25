package com.bookstore.service;

import com.bookstore.entity.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public List<Book> getFeaturedBooks() {
        return bookRepository.findByFeaturedTrue();
    }

    public List<String> getCategories() {
        return bookRepository.findDistinctCategories();
    }

    public List<Book> searchAndFilterBooks(String search, String category, Double minPrice, Double maxPrice, String sortBy) {
        List<Book> books = bookRepository.findAll();

        return books.stream()
                .filter(b -> {
                    if (search == null || search.isBlank()) return true;
                    String q = search.trim().toLowerCase();
                    return (b.getTitle() != null && b.getTitle().toLowerCase().contains(q)) ||
                           (b.getAuthor() != null && b.getAuthor().toLowerCase().contains(q)) ||
                           (b.getDescription() != null && b.getDescription().toLowerCase().contains(q)) ||
                           (b.getCategory() != null && b.getCategory().toLowerCase().contains(q));
                })
                .filter(b -> {
                    if (category == null || category.isBlank() || category.equalsIgnoreCase("All")) return true;
                    return b.getCategory() != null && b.getCategory().equalsIgnoreCase(category.trim());
                })
                .filter(b -> {
                    if (minPrice != null && b.getPrice() < minPrice) return false;
                    if (maxPrice != null && b.getPrice() > maxPrice) return false;
                    return true;
                })
                .sorted((b1, b2) -> {
                    if ("price_asc".equalsIgnoreCase(sortBy)) {
                        return Double.compare(b1.getPrice(), b2.getPrice());
                    } else if ("price_desc".equalsIgnoreCase(sortBy)) {
                        return Double.compare(b2.getPrice(), b1.getPrice());
                    } else if ("rating_desc".equalsIgnoreCase(sortBy)) {
                        return Double.compare(b2.getRating(), b1.getRating());
                    } else if ("title_asc".equalsIgnoreCase(sortBy)) {
                        return b1.getTitle().compareToIgnoreCase(b2.getTitle());
                    }
                    return Long.compare(b1.getId(), b2.getId());
                })
                .collect(Collectors.toList());
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
}
