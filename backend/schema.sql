-- =====================================================================
-- Online Book Store Database Schema
-- Database: MySQL
-- Password used: S@ber06
-- =====================================================================

CREATE DATABASE IF NOT EXISTS online_bookstore_db;
USE online_bookstore_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    role VARCHAR(30) DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Books Table (Catalogue)
CREATE TABLE IF NOT EXISTS books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(60) NOT NULL,
    price DOUBLE NOT NULL,
    rating DOUBLE DEFAULT 4.5,
    isbn VARCHAR(30),
    description TEXT,
    image_url VARCHAR(1000),
    stock INT DEFAULT 50,
    featured BOOLEAN DEFAULT FALSE
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_email VARCHAR(100) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    total_amount DOUBLE NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'CONFIRMED',
    shipping_address VARCHAR(255)
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    book_id BIGINT,
    book_title VARCHAR(150) NOT NULL,
    price DOUBLE NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Sample Initial Data (If not populated by Spring Boot DataInitializer)
INSERT IGNORE INTO users (id, full_name, email, password, phone, address, role) VALUES
(1, 'Saber Mulla', 'demo@bookstore.com', 'password123', '+91 9876543210', 'VIT Pune Campus, Bibwewadi, Pune 411037', 'CUSTOMER');

INSERT IGNORE INTO books (id, title, author, category, price, rating, isbn, description, image_url, stock, featured) VALUES
(1, 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 'Computer Science', 49.99, 4.8, '978-0132350884', 'Even bad code can function. But if code isn''t clean, it can bring a development organization to its knees.', 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=600&q=80', 40, TRUE),
(2, 'Introduction to Algorithms (CLRS)', 'Thomas H. Cormen, Charles E. Leiserson', 'Computer Science', 89.50, 4.9, '978-0262033848', 'A comprehensive textbook covering modern algorithms, data structures, dynamic programming, and graph theory.', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80', 25, TRUE),
(3, 'Designing Data-Intensive Applications', 'Martin Kleppmann', 'Computer Science', 54.99, 4.9, '978-1449373320', 'The definitive guide to the architecture of data systems, replication, partitioning, and distributed computing patterns.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80', 30, TRUE),
(4, 'Spring in Action (6th Edition)', 'Craig Walls', 'Computer Science', 44.99, 4.7, '978-1617297571', 'Comprehensive guide to building modern enterprise web applications and reactive microservices with Spring Boot.', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80', 35, FALSE),
(5, 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', 14.99, 4.8, '978-0060935467', 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80', 50, TRUE),
(6, '1984', 'George Orwell', 'Fiction', 12.99, 4.7, '978-0451524935', 'A dystopian masterpiece examining surveillance, totalitarian power, thought control, and human resistance.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80', 60, FALSE),
(7, 'Atomic Habits', 'James Clear', 'Self Help', 21.99, 4.9, '978-0735211292', 'An easy and proven way to build good habits and break bad ones. Learn the tiny changes that lead to remarkable results.', 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80', 80, TRUE),
(8, 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'Science & History', 24.50, 4.7, '978-0062316097', 'From a renowned historian comes a groundbreaking narrative of humanity''s creation and evolution.', 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80', 45, FALSE),
(9, 'Zero to One: Notes on Startups', 'Peter Thiel, Blake Masters', 'Business', 19.99, 4.6, '978-0804139297', 'The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create.', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80', 40, FALSE),
(10, 'The Lean Startup', 'Eric Ries', 'Business', 22.00, 4.6, '978-0307887894', 'How today''s entrepreneurs use continuous innovation to create radically successful businesses with validated learning.', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80', 35, FALSE),
(11, 'The Alchemist', 'Paulo Coelho', 'Literature', 15.50, 4.7, '978-0062315007', 'A magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80', 70, TRUE),
(12, 'Deep Work: Rules for Focused Success', 'Cal Newport', 'Self Help', 20.00, 4.8, '978-1455586691', 'Deep work is the ability to focus without distraction on a cognitively demanding task.', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80', 50, FALSE);
