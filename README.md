# ITKeller Portfolio Website

A professional portfolio website built with Vue 3, TypeScript, and Node.js backend with Docker deployment.

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite
- **Backend**: Node.js, Express
- **Deployment**: Docker, Docker Compose

## Setup

### Prerequisites
- Docker Desktop
- Git

### Quick Start
```bash
git clone https://github.com/7uuki/itkeller.git
cd itkeller

# Configure environment
cp .env.example .env
# Edit .env with your SMTP settings

# Start with Docker
docker-compose up -d

# Access at http://localhost:3000
```

### Local Development
```bash
npm install
npm run dev
```

## Docker Commands

```bash
docker-compose up -d        # Start containers
docker-compose logs -f      # View logs  
docker-compose down         # Stop containers
```

## Project Structure

```
src/
├── components/             # Vue components
├── views/                  # Page views
├── composables/           # Composition functions
├── assets/                # Static assets
└── styles/                # CSS files

server/                    # Backend API
guides/                    # Documentation
```

## License

MIT License - see [LICENSE](LICENSE) file for details.
