const API_BASE_URL = 'http://localhost:8080/api';

// Fallback books data in case the backend is booting up
export const FALLBACK_BOOKS = [
  {
    id: 1,
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Computer Science',
    price: 49.99,
    rating: 4.8,
    isbn: '978-0132350884',
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=600&q=80',
    stock: 40,
    featured: true
  },
  {
    id: 2,
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    category: 'Computer Science',
    price: 89.50,
    rating: 4.9,
    isbn: '978-0262033848',
    description: 'A comprehensive textbook covering modern algorithms, data structures, and graph theory.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    stock: 25,
    featured: true
  },
  {
    id: 3,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Computer Science',
    price: 54.99,
    rating: 4.9,
    isbn: '978-1449373320',
    description: 'The definitive guide to data systems, replication, partitioning, and distributed architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    stock: 30,
    featured: true
  },
  {
    id: 4,
    title: 'Spring in Action (6th Edition)',
    author: 'Craig Walls',
    category: 'Computer Science',
    price: 44.99,
    rating: 4.7,
    isbn: '978-1617297571',
    description: 'Comprehensive guide to building modern enterprise web applications and reactive microservices with Spring Boot.',
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    stock: 35,
    featured: false
  },
  {
    id: 5,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    price: 14.99,
    rating: 4.8,
    isbn: '978-0060935467',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    stock: 50,
    featured: true
  },
  {
    id: 6,
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    price: 12.99,
    rating: 4.7,
    isbn: '978-0451524935',
    description: 'A dystopian masterpiece examining surveillance, totalitarian power, thought control, and human resistance.',
    imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    stock: 60,
    featured: false
  },
  {
    id: 7,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self Help',
    price: 21.99,
    rating: 4.9,
    isbn: '978-0735211292',
    description: 'An easy and proven way to build good habits and break bad ones. Learn the tiny changes that lead to remarkable results.',
    imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80',
    stock: 80,
    featured: true
  },
  {
    id: 8,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'Science & History',
    price: 24.50,
    rating: 4.7,
    isbn: '978-0062316097',
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution.",
    imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80',
    stock: 45,
    featured: false
  }
];

export const authApi = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      return data;
    } catch (err) {
      throw err;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      return data;
    } catch (err) {
      throw err;
    }
  },

  getProfile: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Profile fetch failed');
      return data.data;
    } catch (err) {
      throw err;
    }
  }
};

export const bookApi = {
  getBooks: async (params = {}) => {
    try {
      const query = new URLSearchParams();
      if (params.search) query.append('search', params.search);
      if (params.category && params.category !== 'All') query.append('category', params.category);
      if (params.minPrice) query.append('minPrice', params.minPrice);
      if (params.maxPrice) query.append('maxPrice', params.maxPrice);
      if (params.sortBy) query.append('sortBy', params.sortBy);

      const response = await fetch(`${API_BASE_URL}/books?${query.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      return data.data || [];
    } catch (err) {
      console.warn('Backend books API unreachable, falling back to local dataset:', err.message);
      // Fallback filter
      let list = [...FALLBACK_BOOKS];
      if (params.category && params.category !== 'All') {
        list = list.filter(b => b.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        list = list.filter(b => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s));
      }
      return list;
    }
  },

  getBookById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`);
      if (!response.ok) throw new Error('Book not found');
      const data = await response.json();
      return data.data;
    } catch (err) {
      return FALLBACK_BOOKS.find(b => b.id === Number(id)) || null;
    }
  },

  getFeatured: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/featured`);
      if (!response.ok) throw new Error('Failed to fetch featured books');
      const data = await response.json();
      return data.data || [];
    } catch (err) {
      return FALLBACK_BOOKS.filter(b => b.featured);
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      return data.data || [];
    } catch (err) {
      return ['Computer Science', 'Fiction', 'Self Help', 'Science & History', 'Business', 'Literature'];
    }
  }
};

export const orderApi = {
  placeOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Order failed');
      return data;
    } catch (err) {
      throw err;
    }
  }
};
