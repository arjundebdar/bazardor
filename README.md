# 🛒 বাজার দর | BazarDor

**BazarDor** is a responsive Bengali market price application that helps users explore essential products, check daily prices, compare price changes, and browse products by category.

## 🌟 Features

- **🏠 Home Page:** Browse products and explore daily price updates.
- **📈 Price Trends:** View products with increased or decreased prices.
- **🛍️ Product Details:** Explore product information and market-based prices.
- **📂 Category Filtering & Sorting:** Browse products by category and sort them by price.
- **🔐 Authentication:** Sign up, sign in, and social login using Better Auth.
- **👤 Profile Management:** View and update user information.
- **📱 Responsive Design:** Optimized for mobile, tablet, and desktop devices.
- **🔔 Toast Notifications:** Get feedback for authentication actions and errors.
- **⏳ Loading States:** Display loading indicators while fetching data.
- **🚫 Custom 404 Page:** Show a friendly message for unavailable pages.

## 🛠️ Technologies Used

- Next.js 16 — React framework
- React — UI development
- JavaScript — Application logic
- Tailwind CSS — Styling
- DaisyUI — UI components
- Better Auth — Authentication
- MongoDB — Database
- REST API — Product and category data
- Vercel — Deployment
- Git & GitHub — Version control

## 🔗 API

**Base URL:**

`https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Description |
|---|---|
| `/products` | Get all products |
| `/products?category=chal` | Filter products by category |
| `/products/1` | Get a single product |
| `/categories` | Get all categories |
| `/categories/chal` | Get a single category |

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/arjundebdar/bazardor.git
```

### 2. Navigate to the project

```bash
cd bazardor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by your application.

For example:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_DATABASE_URL=your_mongodb_connection_string
```

Add Google and GitHub OAuth credentials if you use social authentication. Never commit real secrets to GitHub.



### 6. Build for production

```bash
npm run build
```

## 🌐 Live Demo

**Live Website:** https://bazardor-seven.vercel.app/

**GitHub Repository:** [arjundebdar/bazardor](https://github.com/arjundebdar/bazardor)

## 👨‍💻 Author

**Arjun Deb Nath**

GitHub: [@arjundebdar](https://github.com/arjundebdar)

---

