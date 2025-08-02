# Docker Setup Anleitung für ITKeller Website

## Dateien-Übersicht

- **`.env`** - Ihre echten Konfigurationswerte (nicht in Git, wird vom Docker Container gelesen)
- **`.env.example`** - Vorlage für andere Entwickler (gehört ins Git Repository)
- **`.gitignore`** - Stellt sicher, dass `.env` nicht ins Git Repository kommt

## Voraussetzungen
- Docker Desktop installiert und gestartet
- Nginx Proxy Manager läuft bereits

## Setup Schritte

### 1. Docker Desktop starten
Stellen Sie sicher, dass Docker Desktop läuft. Falls nicht:
- Windows: Docker Desktop aus dem Startmenü starten
- Warten bis der Docker-Service vollständig geladen ist

### 2. Environment-Datei konfigurieren
Bearbeiten Sie die `.env` Datei und setzen Sie Ihre Email-Konfiguration:
```env
SMTP_USER=ihre-email@gmail.com
SMTP_PASS=ihr-app-passwort
CONTACT_EMAIL=kontakt@ihre-domain.com
```

### 3. Container starten
```bash
# Container bauen und starten
docker-compose up -d

# Logs anschauen
docker-compose logs -f

# Container stoppen
docker-compose down
```

### 4. Nginx Proxy Manager konfigurieren
1. Öffnen Sie Nginx Proxy Manager UI
2. Erstellen Sie einen neuen Proxy Host:
   - **Domain Names**: ihre-domain.com
   - **Scheme**: http
   - **Forward Hostname/IP**: localhost (oder die IP Ihres Servers)
   - **Forward Port**: 3000
3. SSL-Zertifikat aktivieren (Let's Encrypt)

### 5. Testen
Besuchen Sie: `http://ihre-domain.com/api/health`

## Troubleshooting

### Scrolling Icons zeigen keine Bilder
✅ **Behoben!** Die SVG-Icons werden jetzt korrekt über dynamische Imports geladen.

### Docker Fehler
```bash
# Prüfen ob Docker läuft
docker --version

# Docker Desktop neu starten falls nötig
# Windows: Docker Desktop beenden und neu starten
```

### Container-Probleme
```bash
# Container-Status prüfen
docker ps

# Logs anzeigen
docker-compose logs itkeller-web

# Container neu starten
docker-compose restart
```

## Email-Setup (Gmail)
1. Google Konto → Sicherheit → 2-Faktor-Authentifizierung aktivieren
2. App-Passwörter → Neues App-Passwort generieren
3. Dieses Passwort in `.env` als `SMTP_PASS` verwenden

## Assets und Images
- ✅ **SVG-Icons**: Werden korrekt gebundelt und geladen
- ✅ **Bilder**: Werden in `assets/images/` organisiert
- ✅ **Vite-Konfiguration**: Optimiert für Asset-Handling
