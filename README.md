# codurance-2025-ai-hackathon-ecommerce

Starter repository for the ecommerce challenge based on a fictitious fashion company as part of the Codurance AI Hackathon

# StyleDen

## Context

StyleDen is an ambitious fashion startup that curates affordable, stylish clothing for Gen Z and young millennial shoppers.  
They've been operating through social media and online marketplaces but are now ready to launch their own direct-to-consumer e-commerce platform.

As part of this launch, StyleDen wants to build a **minimal viable product (MVP)** for their e-commerce website.  
They're looking for a prototype that demonstrates:

- How customers can browse the clothing catalogue
- View individual product details
- Add items to a shopping cart

The company is open to using any technology stack or framework (React, Vue, Django, Flask, Spring Boot, etc.).  
The only restriction: **no low-code or no-code tools** may be used.

The **UI/UX is completely up to you**.  
StyleDen encourages creativity and wants to see how you'd approach designing a modern, user-friendly fashion e-commerce experience from scratch.

They've suggested a public dataset from Kaggle to seed your product catalogue:  
🔗 [Fashion Product Images Dataset](https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-small)

---

## Required Features

### 🛍️ Product Catalogue Page

- Display a list of fashion items (from the dataset) including **name, image, price, and category**.
- Include **basic filtering** (e.g., by category or season) and **sorting**.

### 🔍 Product Detail Page

- When a product is clicked, navigate to a detail page showing additional information such as **brand**, **year**, and **season**.

### 🛒 Shopping Cart

- Allow users to **add items** to a cart and **view a summary** of the selected items.
- Users should be able to **change quantities** and **remove items**.

### 🛠️ Backend API

- Build a backend API that:
  - **Serves the product data**
  - **Manages the shopping cart logic**
- The backend should source product data from the Kaggle dataset (loaded into a local database or kept in memory).

### 🎨 Basic UI Styling

- Include enough styling to demonstrate thoughtful **UI/UX design** for a fashion-focused brand.
- You may use any design library (e.g., **Tailwind**, **Bootstrap**, **Material UI**) or custom CSS.

### 💾 Persisted Cart State

- Persist the shopping cart state locally (e.g., in **localStorage** or in the backend) so the cart survives a page refresh.

---

## Additional Information

- Please **fork** the following GitHub repository: `Codurance-2025-ai-hackathon-ecommerce` and commit your solution there.
- There is **no requirement to build a CI/CD pipeline**.
- You do **not need to deploy** the application — running locally is perfectly fine.
- **Code quality is important** to StyleDen.  
  Your solution should be **well-designed** and **written in a test-driven manner**.

## Thoughts afterwards

The code quickly became unmaintainable. But it was really quick to get a POC, I have never got to a POC that quickly before.

## Screenshot

![StyleDen E-commerce Application](Screen%20Shot%202025-04-26%20at%2013.06.30.png)
