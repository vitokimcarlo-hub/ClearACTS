# CLEARActs - School Clearance System

A digital platform that streamlines the school clearance process—fast, secure, and hassle-free.

## Project Structure

```
clearacts/
├── index.html          # Main login page
├── styles.css          # Styling and responsive design
├── script.js           # Interactive functionality
└── README.md          # This file
```

## Design Features

- **Split-screen layout**: Branding on the left, login form on the right
- **Dark green theme**: Professional and institutional color scheme (#0a3d2c)
- **Bright green accent**: High-contrast CTAs and interactive elements (#00ff88)
- **Responsive design**: Adapts seamlessly to desktop, tablet, and mobile devices
- **Clean typography**: Inter font family for modern readability

## Key Components

### Left Section (Branding)
- School building background with overlay
- CLEARActs logo and tagline
- Platform description

### Right Section (Login Form)
- Institutional logos (ACTS Computer College & CLEARActs)
- Inspirational quote from Proverbs 4:13b
- Login form with:
  - Student ID/User ID input with user icon
  - Password input with lock icon and show/hide toggle
  - Remember me checkbox
  - Forgot password link
  - Sign In button

## How to Use

1. Open `index.html` in a web browser
2. The page displays the login interface
3. Enter Student ID or User ID
4. Enter password (click SHOW to reveal)
5. Optional: Check "Remember me"
6. Click "Sign In" button

## Customization

### Colors
The main colors can be adjusted in `styles.css`:
- Primary green: `#0a3d2c`
- Accent green: `#00ff88`

### Logos
Replace the placeholder logo images:
- `acts-logo.png` - ACTS Computer College logo
- `clearacts-logo.png` - CLEARActs logo

### Background Image
Update the background URL in `.left-section` CSS or add a local image file.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Next Steps

To make this functional:
1. Connect to backend authentication API
2. Add actual logo image files
3. Implement password reset functionality
4. Add form validation feedback
5. Create dashboard/home page after successful login

---

**Designed for ACTS Computer College**
