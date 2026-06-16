# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get User Profile
```http
GET /auth/profile
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

### Update User Profile
```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "password": "newpassword123"  // Optional
}
```

## Product Endpoints

### Get All Products
```http
GET /products
GET /products?category=Electronics
GET /products?search=laptop
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "description": "Premium noise-canceling headphones",
    "price": 149.99,
    "category": "Electronics",
    "image": "https://example.com/image.jpg",
    "stock": 50,
    "rating": 4.5,
    "numReviews": 128,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Get Single Product
```http
GET /products/:id
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Wireless Headphones",
  "description": "Premium noise-canceling headphones with 30-hour battery",
  "price": 149.99,
  "category": "Electronics",
  "image": "https://example.com/image.jpg",
  "stock": 50,
  "rating": 4.5,
  "numReviews": 128,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "image": "https://example.com/image.jpg",
  "stock": 100
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "image": "https://example.com/image.jpg",
  "stock": 100,
  "rating": 0,
  "numReviews": 0,
  "createdAt": "2024-01-20T10:30:00.000Z"
}
```

### Update Product (Admin Only)
```http
PUT /products/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 129.99,
  "stock": 75
}
```

### Delete Product (Admin Only)
```http
DELETE /products/:id
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
{
  "message": "Product removed"
}
```

## Order Endpoints

### Create Order
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "quantity": 2,
      "price": 149.99,
      "image": "https://example.com/image.jpg"
    }
  ],
  "shippingAddress": {
    "address": "123 Main Street",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA"
  },
  "totalPrice": 329.98
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "user": "507f1f77bcf86cd799439011",
  "orderItems": [...],
  "shippingAddress": {...},
  "totalPrice": 329.98,
  "isPaid": false,
  "isDelivered": false,
  "orderStatus": "pending",
  "createdAt": "2024-01-20T10:30:00.000Z"
}
```

### Get User Orders
```http
GET /orders/myorders
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "user": "507f1f77bcf86cd799439011",
    "orderItems": [
      {
        "product": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Wireless Headphones",
          "image": "https://example.com/image.jpg"
        },
        "name": "Wireless Headphones",
        "quantity": 2,
        "price": 149.99
      }
    ],
    "shippingAddress": {
      "address": "123 Main Street",
      "city": "New York",
      "postalCode": "10001",
      "country": "USA"
    },
    "totalPrice": 329.98,
    "isPaid": false,
    "isDelivered": false,
    "orderStatus": "pending",
    "createdAt": "2024-01-20T10:30:00.000Z"
  }
]
```

### Get Order by ID
```http
GET /orders/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "orderItems": [...],
  "shippingAddress": {...},
  "totalPrice": 329.98,
  "isPaid": false,
  "isDelivered": false,
  "orderStatus": "pending",
  "createdAt": "2024-01-20T10:30:00.000Z"
}
```

### Update Order Status
```http
PUT /orders/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "shipped"
}
```

**Available statuses:** pending, processing, shipped, delivered, cancelled

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid user data"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, token failed"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error message"
}
```

## Testing with cURL

### Login Example
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Products Example
```bash
curl http://localhost:5000/api/products
```

### Create Order Example
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "orderItems": [{
      "product": "PRODUCT_ID",
      "name": "Product Name",
      "quantity": 1,
      "price": 99.99,
      "image": "image_url"
    }],
    "shippingAddress": {
      "address": "123 Main St",
      "city": "New York",
      "postalCode": "10001",
      "country": "USA"
    },
    "totalPrice": 109.99
  }'
```

## Rate Limiting

Currently, there are no rate limits implemented. Consider adding rate limiting for production use.

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer {your_jwt_token}
```

Tokens expire after 30 days.
