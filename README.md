# IKEA-Style E-Commerce Platform

![image](https://github.com/user-attachments/assets/487c9a70-0512-4b2d-bcc6-d4c32ce5e98a)

A modern IKEA-inspired e-commerce platform featuring product catalog, shopping cart, and user authentication. Built with vanilla JavaScript and CSS.

## ✨ Features

- **Dynamic Product Catalog**
  - Paginated display with hover effects
  - Responsive grid layout
  - Multiple product images with carousel
- **Shopping Cart Management**
  - LocalStorage persistence
  - Quantity adjustments
  - Grouping by product rooms
- **Product Details Page**
  - Interactive image carousel
  - Technical specifications
  - Breadcrumb navigation
- **User Authentication**
  - Simple login flow
  - Session persistence
- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
- **IKEA-Styled UI**
  - Brand colors (blue/yellow theme)
  - Modern card components
  - Smooth animations

## 🛠 Tech Stack

**Frontend**  
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)

**Dependencies**  
- Font Awesome 6 (Icons)
- Google Fonts (Noto Sans)

**Backend**  
- LocalStorage (Client-side data persistence)


📖 Usage

    Browse Products

        Visit /catalogue.html to view all products
        Click "See More" for paginated loading
        Hover product images for alternate views

    Product Details

        Click any product card
        View technical specs and multiple images
        Use vertical carousel to switch images

    Shopping Cart

        Add products from catalogue/details pages
        Adjust quantities with +/- buttons
        Grouped by product rooms (living room, office, etc.)

    Checkout

        Note: Demo version only - no real payment processing
        Access cart via navbar icon

    Authentication

        Basic login flow (/login.html)
        Stores user data in localStorage


🔍 Key Implementation Details

    State Management
    Uses localStorage for:

        Cart items persistence
        User session data
        Product favorites

    Performance

        Lazy image loading
        CSS transitions for smooth animations
        Efficient DOM updates with template literals

    Accessibility

        Semantic HTML5
        ARIA labels
        Keyboard navigation support

🙏 Acknowledgements

    Product data and images adapted from IKEA.com
    UI inspired by IKEA's design system
    Font Awesome for icon system
    Unsplash for demo images
