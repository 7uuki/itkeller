# ITKeller Portfolio Website

A modern, responsive portfolio website built with Vue 3, TypeScript, and Node.js backend, designed for professional presentation and containerized deployment.

## 🚀 Features

### Frontend
- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety
- **Vite** for lightning-fast development and optimized builds
- **Responsive Design** with mobile-first approach
- **Dark/Light Theme** toggle with system preference detection
- **Smooth Animations** and scroll-triggered reveals
- **Internationalization (i18n)** support (German/English)
- **Interactive Components**: 
  - Scrolling technology icons
  - Contact form with validation
  - Image modals
  - Terminal simulation
  - Custom cursor effects

### Backend
- **Node.js/Express** server
- **Email Contact Form** with SMTP integration
- **Rate Limiting** and security features
- **Health Check** endpoint
- **CORS** and security headers
- **Static File Serving** for SPA

### DevOps
- **Docker** containerization with multi-stage builds
- **Docker Compose** for easy deployment
- **Nginx Proxy Manager** compatible
- **Health Checks** and restart policies
- **Production-ready** configuration

## 🛠️ Tech Stack

**Frontend:**
- Vue 3 + TypeScript
- Vite
- Vue Router
- CSS3 with custom properties

**Backend:**
- Node.js + Express
- Nodemailer for email
- Helmet for security
- Compression middleware

**Infrastructure:**
- Docker & Docker Compose
- Node.js 20 Alpine
- Nginx Proxy Manager

**Assets:**
- SVG icons for technologies
- Optimized images
- Lottie animations

## 📋 Prerequisites

- **Docker Desktop** installed and running
- **Git** for version control
- **Node.js 20+** (for local development)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/7uuki/itkeller.git
cd itkeller
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# CONTACT_EMAIL=contact@yourdomain.com
```

### 3. Start with Docker
```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### 4. Access the Website
- **Website**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

### Backend Development
```bash
cd server
npm install
npm start
```

## 📧 Email Configuration (Gmail)

1. Enable 2-Factor Authentication in your Google Account
2. Generate an App Password:
   - Google Account → Security → 2-Step Verification → App Passwords
3. Use the generated password in your `.env` file as `SMTP_PASS`

## 🐳 Docker Commands

```bash
# Build and start
docker-compose up -d --build

# View container status
docker ps

# View logs
docker-compose logs -f itkeller-web

# Restart container
docker-compose restart

# Stop and remove
docker-compose down

# Clean up (remove images)
docker-compose down --rmi all
```

## 🌐 Production Deployment

### With Nginx Proxy Manager
1. Set up your domain in Nginx Proxy Manager
2. Configure proxy host:
   - **Forward Hostname/IP**: `itkeller-website` (container name)
   - **Forward Port**: `3000`
   - **Enable SSL** with Let's Encrypt

### Manual Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📁 Project Structure

```
itkeller/
├── 📄 README.md                    # Project documentation
├── 📄 package.json                 # Frontend dependencies
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 vite.config.ts              # Vite configuration  
├── 📄 docker-compose.yml          # Docker Compose setup
├── 📄 Dockerfile                  # Docker build instructions
├── 📄 .env.example                # Environment template
├── 📄 .gitignore                  # Git ignore rules
│
├── 📁 server/                      # Backend Node.js application
│   ├── 📄 package.json            # Backend dependencies
│   └── 📄 server.js               # Express server
│
├── 📁 src/                         # Frontend source code
│   ├── 📄 App.vue                 # Root component
│   ├── 📄 main.ts                 # Application entry point
│   │
│   ├── 📁 components/             # Reusable Vue components
│   ├── 📁 views/                  # Page components
│   ├── 📁 composables/            # Vue composition functions
│   ├── 📁 config/                 # Configuration files
│   ├── 📁 router/                 # Vue Router setup
│   ├── 📁 styles/                 # CSS stylesheets
│   └── 📁 assets/                 # Static assets
│
├── 📁 public/                      # Public assets
└── 📁 guides/                      # Development guides
```

## 🔧 Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Docker
npm run docker:build    # Build Docker image
npm run docker:up      # Start containers
npm run docker:down    # Stop containers
npm run docker:logs    # View logs
```

## 🎨 Customization

### Themes
The website supports multiple themes configured in `src/composables/useTheme.ts`:
- Light theme
- Dark theme  
- Custom themes can be added by extending CSS custom properties

### Languages
Internationalization is handled in `src/config/languages.ts`:
- German (default)
- English
- Additional languages can be added by extending the language configuration

### Content
- **Personal Info**: Update in respective Vue components
- **Technologies**: Modify icons in `src/components/ScrollingIcons.vue`
- **Projects**: Edit portfolio section components
- **Contact**: Configure SMTP settings in `.env`

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** on API endpoints
- **Input validation** on contact forms
- **Environment variables** for sensitive data
- **Non-root Docker user**

## 📱 Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile responsive** design
- **Progressive enhancement** approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**ITKeller**
- GitHub: [@7uuki](https://github.com/7uuki)
- Website: [itkeller.com](https://itkeller.com)

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Vite for the blazing fast build tool
- All contributors and the open source community

---

**Made with ❤️ and Vue.js**
