<div align="center">

# 🔥 Melt CSS

### Minimal, Scalable Design Framework

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/yourusername/melt-css)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CSS Size](https://img.shields.io/badge/CSS-~40KB-orange.svg)](assets/melt.css)
[![JS Size](https://img.shields.io/badge/JS-~15KB-yellow.svg)](assets/melt.js)

[Live Demo](https://expo.aiedrow.co.in/Melt) · [CSS Documentation](https://expo.aiedrow.co.in/Melt/documentation.php)· [JS Documentation](https://expo.aiedrow.co.in/Melt/jsdocumentation.php) · [Examples](https://expo.aiedrow.co.in/Melt/examples.php) · [Theme Builder](https://expo.aiedrow.co.in/Melt/creator.php)

</div>

---

## 🎯 Features

- 🎨 **7 Built-in Themes** - Default, Dark, Royal, Bootstrap, Material, Apple, Glass
- ⚡ **Zero Dependencies** - Pure CSS & vanilla JavaScript
- 📱 **Fully Responsive** - Mobile-first with comprehensive breakpoints
- 🎭 **Theme System** - Custom theme builder with all variables
- 🧩 **200+ Utility Classes** - Complete design system
- ⚙️ **jQuery-like API** - Familiar syntax, zero dependencies
- 🎪 **Premium Components** - Cards, forms, tables, alerts, modals
- 🌈 **Design System Principles** - Each theme follows its design language

---

## 🚀 Quick Start

### CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://expo.aiedrow.co.in/Melt/assets/melt.css">

<!-- JavaScript -->
<script src="https://expo.aiedrow.co.in/Melt/assets/melt.js"></script>
```

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="melt.css">
</head>
<body theme="dark">
  <div class="container">
    <div class="card">
      <h2 class="card-header">Hello Melt! 🔥</h2>
      <p class="card-body">Building beautiful interfaces faster</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
  
  <script src="melt.js"></script>
  <script>
    $('.btn').click(() => alert('Welcome to Melt CSS!'));
  </script>
</body>
</html>
```

---

## 🎨 Themes

Switch themes instantly with the `theme` attribute:

```html
<body theme="dark">
  <!-- default | dark | royal | bootstrap | material | apple | glass -->
</body>
```

### Theme Comparison

| Theme | Design System | Font Size | Border Radius | Special Features |
|-------|--------------|-----------|---------------|------------------|
| **Default** | Clean & Modern | 14px | 0.5rem | Balanced |
| **Dark** | High Contrast | 14px | 0.5rem | #111 Background |
| **Royal** | Luxury Purple | 14px | 0.75rem | Glow Effects |
| **Bootstrap** | Familiar | 14px | 0.375rem | Traditional |
| **Material** | Google MD3 | 13px | 0.25rem | Elevation, Underlined Inputs |
| **Apple** | iOS/macOS | 14px | 0.875rem | SF Pro Style |
| **Glass** | Glassmorphism | 14px | 1rem | Backdrop Blur |

[Create Custom Theme →](https://expo.aiedrow.co.in/Melt/creator.php)

---

## 📚 CSS Framework

### Components

```html
<!-- Buttons -->
<button class="btn">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>

<!-- Button Groups -->
<div class="btn-group">
  <button class="btn">Left</button>
  <button class="btn">Center</button>
  <button class="btn">Right</button>
</div>

<!-- Forms -->
<input type="text" class="form-item" placeholder="Input">
<input class="form-item placeholder-blue" placeholder="Blue placeholder">

<!-- Cards -->
<div class="card">
  <h3 class="card-header">Title</h3>
  <p class="card-body">Content</p>
</div>

<!-- Alerts -->
<div class="alert alert-success">Success message</div>
```

### Responsive Utilities

**Every utility works across all breakpoints:**

```html
<!-- Display -->
<div class="d-flex d-md-block">Flex on desktop, block on mobile</div>
<div class="hide-md">Hidden on tablets and mobile</div>

<!-- Grid -->
<div class="grid grid-3 grid-md-1">3 cols desktop, 1 col mobile</div>

<!-- Backdrop -->
<div class="backdrop-blur no-backdrop-md">Blur desktop only</div>
```

**Breakpoints:**
- `sm` - max-width: 576px
- `md` - max-width: 768px
- `lg` - max-width: 992px
- `xl` - max-width: 1200px

### Special Utilities

```html
<!-- Placeholder Colors -->
<input class="form-item placeholder-red placeholder-opacity-50">

<!-- Scrollbar -->
<div class="scrollbar-hidden">No scrollbar</div>
<div class="scrollbar-hidden-md">Hidden on mobile</div>

<!-- Backdrop Effects -->
<div class="glass">Glassmorphism</div>
<div class="backdrop-blur">Blur background</div>
```

---

## ⚡ JavaScript (Melt.js)

Zero-dependency jQuery-like library with all the essentials.

### Selectors & DOM

```javascript
// Selectors
$('.class')    // Select by class
$('#id')       // Select by ID

// DOM Manipulation
$('.card').html('<h3>Title</h3>');
$('.text').text('Hello');
$('input').val('value');

// Attributes
$('img').attr('src', 'photo.jpg');
$('.btn').addClass('active');
$('.menu').toggleClass('open');
```

### Events & Animations

```javascript
// Events
$('.btn').click(function() {
  alert('Clicked!');
});

$('#form').submit(function(e) {
  e.preventDefault();
});

// Animations
$('.modal').fadeIn(300);
$('.panel').slideToggle(400);

$('.box').animate({
  opacity: 0.5,
  left: '100px'
}, 500);
```

### AJAX

```javascript
// GET Request
$.get('/api/users', function(data) {
  console.log(data);
});

// POST Request
$.post('/api/save', {name: 'John'}, function(response) {
  alert('Saved!');
});
```

---

## 🎓 Examples

### Responsive Dashboard

```html
<div class="flex flex-md-col">
  <!-- Sidebar -->
  <nav class="hide-md" style="width:250px">
    <div class="card">
      <a href="#" class="d-block p-2 rounded-2 bg-primary text-white">Dashboard</a>
      <a href="#" class="d-block p-2 rounded-2 hover-bg">Analytics</a>
    </div>
  </nav>
  
  <!-- Main Content -->
  <main class="flex-1 p-4">
    <div class="grid grid-3 grid-md-1">
      <div class="card">
        <h4>Revenue</h4>
        <h2 class="text-primary">$12,450</h2>
      </div>
    </div>
  </main>
</div>
```

[View More Examples →](https://expo.aiedrow.co.in/Melt/examples.php)

---

## 🛠️ Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Safari | iOS 12+ |

---

## 📦 What's Included

```
melt/
├── assets/
│   ├── melt.css          # Main stylesheet (~40KB)
│   └── melt.js           # JavaScript library (~15KB)
└── README.md
```

---

## 🎯 Roadmap

- [x] 7 Built-in Themes
- [x] Complete Responsive System
- [x] jQuery-like JavaScript
- [x] Theme Builder
- [x] 200+ Utility Classes

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👥 Team

- **Ritesh Kushwaha** ([@aiedrow](https://github.com/aiedrow)) - Creator & Lead Developer
- **Vishnu Aryan** ([@altered-indian](https://github.com/altered-indian)) - UI/UX Designer
- **Pratham Vyas** - JavaScript Developer

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

## 📞 Connect

- Website: [meltcss.dev]([https://expo.aiedrow.co.in/Melt](https://expo.aiedrow.co.in/Melt)
- Documentation: [Full Docs]([https://expo.aiedrow.co.in/Melt/documentation.php)
- Examples: [Live Examples](https://expo.aiedrow.co.in/Melt/examples.php)

---

<div align="center">

Made with 🔥 by the Melt Team

</div>
