package com.bookstore.config;

import com.bookstore.entity.Book;
import com.bookstore.entity.User;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public DataInitializer(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // Seed default demo user if not exists
        if (!userRepository.existsByEmail("demo@bookstore.com")) {
            User demoUser = new User();
            demoUser.setFullName("Saber Mulla");
            demoUser.setEmail("demo@bookstore.com");
            demoUser.setPassword("password123");
            demoUser.setPhone("+91 9876543210");
            demoUser.setAddress("VIT Pune Campus, Bibwewadi, Pune 411037");
            demoUser.setRole("CUSTOMER");
            userRepository.save(demoUser);
            System.out.println(">>> Demo user created: demo@bookstore.com / password123");
        }

        // Seed books if empty
        if (bookRepository.count() == 0) {
            List<Book> books = Arrays.asList(
                new Book(
                    "Clean Code: A Handbook of Agile Software Craftsmanship",
                    "Robert C. Martin",
                    "Computer Science",
                    49.99,
                    4.8,
                    "978-0132350884",
                    "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code.",
                    "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=600&q=80",
                    40,
                    true
                ),
                new Book(
                    "Introduction to Algorithms (CLRS)",
                    "Thomas H. Cormen, Charles E. Leiserson",
                    "Computer Science",
                    89.50,
                    4.9,
                    "978-0262033848",
                    "A comprehensive textbook covering modern algorithms, data structures, dynamic programming, graph theory, and algorithmic problem solving used globally in top universities.",
                    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
                    25,
                    true
                ),
                new Book(
                    "Designing Data-Intensive Applications",
                    "Martin Kleppmann",
                    "Computer Science",
                    54.99,
                    4.9,
                    "978-1449373320",
                    "The definitive guide to the architecture of data systems, replication, partitioning, transactions, and distributed computing patterns.",
                    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
                    30,
                    true
                ),
                new Book(
                    "Spring in Action (6th Edition)",
                    "Craig Walls",
                    "Computer Science",
                    44.99,
                    4.7,
                    "978-1617297571",
                    "Comprehensive guide to building modern enterprise web applications and reactive microservices with Spring Framework 6 and Spring Boot 3.",
                    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
                    35,
                    false
                ),
                new Book(
                    "To Kill a Mockingbird",
                    "Harper Lee",
                    "Fiction",
                    14.99,
                    4.8,
                    "978-0060935467",
                    "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, exploring compassion and justice.",
                    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
                    50,
                    true
                ),
                new Book(
                    "1984",
                    "George Orwell",
                    "Fiction",
                    12.99,
                    4.7,
                    "978-0451524935",
                    "A dystopian masterpiece examining surveillance, totalitarian power, thought control, and human resistance in Oceania under Big Brother.",
                    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
                    60,
                    false
                ),
                new Book(
                    "Atomic Habits",
                    "James Clear",
                    "Self Help",
                    21.99,
                    4.9,
                    "978-0735211292",
                    "An easy and proven way to build good habits and break bad ones. Learn the tiny changes that lead to remarkable, compounding results.",
                    "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
                    80,
                    true
                ),
                new Book(
                    "Sapiens: A Brief History of Humankind",
                    "Yuval Noah Harari",
                    "Science & History",
                    24.50,
                    4.7,
                    "978-0062316097",
                    "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution, exploring biology and history.",
                    "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80",
                    45,
                    false
                ),
                new Book(
                    "Zero to One: Notes on Startups",
                    "Peter Thiel, Blake Masters",
                    "Business",
                    19.99,
                    4.6,
                    "978-0804139297",
                    "The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. How to build companies that create new things.",
                    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
                    40,
                    false
                ),
                new Book(
                    "The Lean Startup",
                    "Eric Ries",
                    "Business",
                    22.00,
                    4.6,
                    "978-0307887894",
                    "How today's entrepreneurs use continuous innovation to create radically successful businesses with validated learning and rapid iteration.",
                    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
                    35,
                    false
                ),
                new Book(
                    "The Alchemist",
                    "Paulo Coelho",
                    "Literature",
                    15.50,
                    4.7,
                    "978-0062315007",
                    "A magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found.",
                    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
                    70,
                    true
                ),
                new Book(
                    "Deep Work: Rules for Focused Success",
                    "Cal Newport",
                    "Self Help",
                    20.00,
                    4.8,
                    "978-1455586691",
                    "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a superpower in our competitive twenty-first-century economy.",
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
                    50,
                    false
                )
            );

            bookRepository.saveAll(books);
            System.out.println(">>> Seeded " + books.size() + " books into MySQL bookstore database.");
        }
    }
}
