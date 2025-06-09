# Milano Labs V6.0 - Modular Build

A comprehensive Product Operating Model (PdOM) dashboard application built with React and Tailwind CSS.

## 📁 Project Structure

```
milano-labs-v6/
├── index.html                 # Main layout and navigation
├── assets/
│   ├── css/
│   │   └── styles.css         # Custom styles and animations
│   └── js/
│       ├── components.js      # Shared React components
│       └── navigation.js      # Navigation utilities
├── pages/                     # Individual page components
│   ├── main.html             # User workflows (Main page)
│   ├── dashboard.html        # Dashboard with metrics
│   ├── teams.html           # Teams & Roles
│   ├── software.html        # The Software Way
│   ├── technology.html      # Technology management
│   ├── acquisitions.html    # Acquisitions processes
│   ├── ato.html            # ATO processes
│   ├── security.html       # Security protocols
│   └── assistant.html      # Virtual Assistant
├── package.json            # Project dependencies
├── server.js              # Simple local development server
└── README.md              # This file
```

## 🚀 Quick Start

1. **Download all files** from the artifacts and organize them according to the structure above.

2. **Create the pages directory** and add your individual page HTML files:
   ```bash
   mkdir pages
   ```

3. **Install dependencies** (optional, for development server):
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   # Option 1: Using Node.js server
   npm start
   
   # Option 2: Using Python (if you have Python installed)
   python -m http.server 8000
   
   # Option 3: Using any other local server
   # Just serve the files from the root directory
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

## 📄 Page Components

The application uses a modular architecture where each page is a separate HTML file in the `pages/` directory. Each page should contain:

- Page-specific content
- Consistent styling using Tailwind CSS classes
- Integration with shared components
- Virtual Assistant link at the bottom

### Example Page Structure

```html
<div class="page-content">
  <h2 class="text-xl font-medium mb-6 text-white">Page Title</h2>
  
  <!-- Page content goes here -->
  
  <!-- Virtual Assistant Link (using shared component) -->
  <div data-react-component="VirtualAssistantLink" 
       data-props='{"title":"Need help?","description":"Ask about this page"}'></div>
</div>
```

## 🧩 Shared Components

The application includes pre-built React components for consistency:

- **VirtualAssistantLink**: Standard help link at bottom of pages
- **MetricCard**: Display metrics with icons and colors
- **StatusBadge**: Show status with appropriate styling
- **ProgressBar**: Animated progress indicators
- **PhaseCard**: PdOM phase cards with numbers and descriptions
- **LoadingSpinner**: Loading states
- **DataTable**: Responsive data tables
- **Button**: Styled buttons with variants
- **Card**: Content cards with optional headers
- **Alert**: Alert messages with different types

### Using Components

```html
<!-- React component placeholder -->
<div data-react-component="MetricCard" 
     data-props='{"title":"Uptime","value":"99.8%","color":"green"}'></div>

<!-- Or use directly in JavaScript -->
<script>
  ReactDOM.render(
    React.createElement(window.MetricCard, {
      title: "Uptime",
      value: "99.8%",
      color: "green"
    }),
    document.getElementById('metric-container')
  );
</script>
```

## 🎨 Styling

The application uses:
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Styles**: Additional animations and effects in `assets/css/styles.css`
- **Dark Theme**: Consistent dark color scheme
- **Responsive Design**: Mobile-first approach

### Color Scheme

- **Primary**: Blue (#3b82f6)
- **Background**: Slate 900 (#0f172a)
- **Cards**: Gray 800 (#1f2937)
- **Text**: White/Gray variations
- **Accents**: Green, Purple, Orange for different phases

## 🔧 Customization

### Adding New Pages

1. Create new HTML file in `pages/` directory
2. Add navigation item to `index.html`:
   ```javascript
   { id: 'newpage', label: 'New Page', icon: '🆕', page: 'newpage.html' }
   ```

### Custom Components

Add new components to `assets/js/components.js`:

```javascript
window.MyComponent = ({ prop1, prop2 }) => {
  return React.createElement('div', {
    className: 'my-component'
  }, 'Content here');
};
```

### Custom Styles

Add styles to `assets/css/styles.css`:

```css
.my-custom-class {
  /* Your styles here */
}
```

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔄 Development Workflow

1. **Edit pages** in the `pages/` directory
2. **Add components** to `components.js`
3. **Style** with Tailwind classes or custom CSS
4. **Test** in development server
5. **Deploy** by uploading all files to web server

## 🐛 Troubleshooting

### Page Not Loading
- Check file exists in `pages/` directory
- Verify file name matches navigation configuration
- Check browser console for errors

### Components Not Rendering
- Ensure React scripts are loaded
- Check component name and props syntax
- Verify component is defined in `components.js`

### Styling Issues
- Check Tailwind CSS is loaded
- Verify custom CSS file is included
- Check for class name typos

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PdOM Framework Guide](pages/software.html)

## 📧 Support

For questions about the Milano Labs platform or PdOM implementation, use the Virtual Assistant feature or contact your team lead.

---

**Milano Labs V6.0** - Product Operating Model Dashboard
