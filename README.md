# PageTurner: Online Book Store (React + Spring Boot + MySQL)

> **Web Technologies Assignment — Lab 07 (Question 7)**  
> **Topic:** Responsive Website for an Online Book Store using **React**, **Spring Boot**, and **MySQL**, featuring:
> 1) Home Page
> 2) Login Page
> 3) Catalogue Page
> 4) Registration Page (Database Connected)  
> **MySQL Password:** `S@ber06`

---

## 📌 Problem Statement

> *"7. Design and develop a responsive website for an online book store using REACT, Spring boot and MySQL/ MongoDB/Oracle having:*  
> *1) Home Page*  
> *2) Login Page*  
> *3) Catalogue Page*  
> *4) Registration Page: (database)*  
> *use mysql for database and password is S@ber06"*

---

## 🌟 Architecture & Tech Stack

```
+-------------------------------------------------------------+
|                     REACT FRONTEND                         |
|   Vite + React 19 + Lucide Icons + Responsive CSS Grid      |
|  (Home, Catalogue, Login, Registration, Shopping Cart)      |
+-------------------------------------------------------------+
                              |
                     RESTful JSON APIs (CORS)
                              |
+-------------------------------------------------------------+
|                  SPRING BOOT BACKEND                        |
|   Java 27 | Spring Boot 4.x / 3.x | Spring Data JPA         |
|   Tomcat Web Server (Port 8080) | Hibernate ORM 7           |
+-------------------------------------------------------------+
                              |
                    JDBC Connection (HikariCP)
                              |
+-------------------------------------------------------------+
|                   MySQL DATABASE (Port 3306)                |
|   Database: online_bookstore_db                             |
|   Tables: users, books, orders, order_items                 |
|   Credentials: user=root, password=S@ber06                  |
+-------------------------------------------------------------+
```

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend UI** | **React** (Vite) | Responsive component-driven architecture, React Router v7, React Context for Authentication & Cart state, mobile navigation drawer, and modern CSS custom properties. |
| **Backend API** | **Spring Boot** | RESTful Controllers, Services, JPA Repositories, Bean Validation (`@Valid`), CORS Configuration, and Auto-seeding `CommandLineRunner`. |
| **Database** | **MySQL 8.0** | Relational storage for users, books catalog, and placed orders. Auto-creates schema with `update` DDL mode. |
| **Icons** | **Lucide-React** | Clean, accessible vector icons for books, ratings, search, shopping cart, and user profiles. |

---

## 📑 Required Pages Implementation

### 1. 🏠 Home Page (`/`)
- **Hero Banner:** Catchy headline, call-to-action buttons, search bar shortcut, and statistical trust badges (10,000+ books sold, 4.9 rating, 100% authentic).
- **Popular Categories Grid:** Interactive cards for *Computer Science*, *Fiction*, *Self Help*, *Business*, *Science & History*, and *Literature*.
- **Curated Books Showcase:** Dynamic book cards featuring cover art, live ratings, authors, prices, and 1-click Quick View modal or Add to Cart.
- **Academic Discount Banner:** Special 20% discount offer for VIT Pune students and faculty.
- **Value Propositions & Footer:** Highlights free shipping, guaranteed genuine publisher editions, 14-day return guarantee, and 24/7 student support.

### 2. 🔐 Login Page (`/login`)
- **Clean Responsive Form:** Email and password fields with iconography and validation hints.
- **Spring Boot Verification:** Calls `POST /api/auth/login` to authenticate credentials against MySQL.
- **Auth State Persistence:** Retains user profile in `AuthContext` and `localStorage`.
- **Error Handling:** Displays descriptive alert banners for non-existent users or mismatched passwords.
- **Demo Fill Shortcut:** One-click button to pre-fill pre-seeded MySQL credentials (`demo@bookstore.com` / `password123`) for rapid testing.

### 3. 📚 Catalogue Page (`/catalogue`)
- **Search & Live Filtering:** Search by book title, author, or ISBN.
- **Category Filter Pills:** Switch across departments (*Computer Science*, *Fiction*, *Business*, etc.).
- **Price Range Slider:** Interactive slider filtering titles between \$10 and \$120.
- **Dynamic Sorting:** Sort by Featured, Price (Low to High), Price (High to Low), Highest Rated, or Alphabetical (A-Z).
- **Responsive Layout:** Responsive sidebar on desktop; converts to a collapsible filter drawer on mobile devices.
- **Book Quick View Modal:** Detailed view showing high-res cover, full description, ISBN, stock quantity, and quantity selector before adding to cart.

### 4. 📝 Registration Page (`/register` - Database Connected)
- **User Input Fields:** Full Name, Email, Phone Number, Shipping Address, Password, and Confirm Password.
- **Client & Server Validation:** Validates required fields, email format, minimum 6-character passwords, and matching confirmation.
- **MySQL Database Persistence:** Calls `POST /api/auth/register` to insert a new entity into the `users` table via Spring Data JPA.
- **Duplicate Prevention:** Prevents duplicate accounts with existing email addresses.
- **Automated Redirect:** On success, displays a confirmation badge and seamlessly navigates the user to the Login page.

### 🛍️ Bonus Feature: Shopping Cart & Checkout (`/cart`)
- Shopping cart with quantity adjustment, item removal, free shipping calculator (orders > \$35), and order placement endpoint (`POST /api/orders`) linked to MySQL.

---

## 🗄️ MySQL Database Schema

The database is named `online_bookstore_db` and uses the specified root password `S@ber06`:

```sql
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
```

---

## 🌐 REST API Endpoints

### Authentication APIs (`/api/auth`)
| Method | Endpoint | Description | Sample Request / Response |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user in MySQL | `{"fullName": "...", "email": "...", "password": "..."}` |
| `POST` | `/api/auth/login` | Authenticate user against MySQL | `{"email": "...", "password": "..."}` |
| `GET` | `/api/auth/profile?email=...` | Retrieve user profile | Returns User DTO |

### Book Catalogue APIs (`/api/books`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books` | Get all books with optional search, category, minPrice, maxPrice, sortBy |
| `GET` | `/api/books/{id}` | Get individual book details by ID |
| `GET` | `/api/books/featured` | Fetch editor-curated featured books |
| `GET` | `/api/books/categories` | Fetch distinct list of available categories |

### Order APIs (`/api/orders`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/orders` | Place order and save items to MySQL |
| `GET` | `/api/orders?email=...` | List order history for a user |

---

## 🚀 How to Run the Application

### Option A: One-Click Runner (Recommended)
Double click `run_all.bat` or run in command line:
```cmd
.\run_all.bat
```
This automatically launches:
1. The **Spring Boot** backend on `http://localhost:8080`
2. The **React** frontend on `http://localhost:5173` (or `5174`)

---

### Option B: Individual Launchers

#### 1. Start Backend:
```powershell
.\run_backend.bat
```
*(or `cd backend; .\mvnw.cmd spring-boot:run`)*

#### 2. Start Frontend:
```powershell
.\run_frontend.bat
```
*(or `cd frontend; npm run dev`)*

---

## 🧪 Automated Test Verification

Run the included automated verification script in PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File .\test_api.ps1
```

### Verification Results:
```text
=====================================================================
  Online Book Store - Automated Verification Test Suite
=====================================================================

[Test 1] Fetch Catalogue Books (GET /api/books)... [PASS]
   -> Received 12 books in catalogue

[Test 2] Fetch Categories (GET /api/books/categories)... [PASS]
   -> Categories: Business, Computer Science, Fiction, Literature, Science & History, Self Help

[Test 3] Filter Books by Category 'Computer Science'... [PASS]
   -> Computer Science books found: 4

[Test 4] User Login with Demo Account (POST /api/auth/login)... [PASS]
   -> Logged in as: Saber Mulla (demo@bookstore.com)

[Test 5] Register New User in MySQL (POST /api/auth/register)... [PASS]
   -> User registered with ID: 3

[Test 6] Login Newly Registered User (POST /api/auth/login)... [PASS]
   -> Verified login for: Test Engineer

[Test 7] Prevent Duplicate Email Registration... [PASS]

[Test 8] Place Order in MySQL (POST /api/orders)... [PASS]
   -> Order Number: ORD-8BCA6FEF, Total Amount: $104.98

=====================================================================
  Test Summary: 8 / 8 Passed
=====================================================================
```

---

## 👨‍💻 Project Information
- **Course:** Web Technologies Lab (WT)
- **Assignment:** Lab 07 (Question 7)
- **Student Name:** Saber Mulla
- **Institution:** Vishwakarma Institute of Technology (VIT), Pune
