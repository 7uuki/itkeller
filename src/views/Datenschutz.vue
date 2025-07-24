<template>
  <div class="legal-page">
    <div class="legal-container">
      <h1>Datenschutzerklärung</h1>
      
      <section class="legal-section">
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
          Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit 
          denen Sie persönlich identifiziert werden können.
        </p>
      </section>

      <section class="legal-section">
        <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
          Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
          sowie dieser Datenschutzerklärung.
        </p>
        <p>
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. 
          Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
        </p>
      </section>

      <section class="legal-section">
        <h2>3. Datenerfassung auf dieser Website</h2>
        <h3>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
          können Sie dem Impressum dieser Website entnehmen.
        </p>
        
        <h3>Wie erfassen wir Ihre Daten?</h3>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
          z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
        </p>
        <p>
          Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
          IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem 
          oder Uhrzeit des Seitenaufrufs).
        </p>
      </section>

      <section class="legal-section">
        <h2>4. Hosting</h2>
        <p>
          Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst 
          werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. 
          um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, 
          Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
        </p>
      </section>

      <section class="legal-section">
        <h2>5. Kontaktformular</h2>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
          Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der 
          Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// This is a legal page component
</script>

<style scoped>
.legal-page {
  min-height: calc(100vh - 120px);
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: 4rem 2rem 2rem;
}

.legal-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--bg-accent);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 8px 25px var(--shadow);
}

.legal-container h1 {
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.legal-section {
  margin-bottom: 2rem;
}

.legal-section h2 {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--button-bg);
  padding-bottom: 0.5rem;
}

.legal-section h3 {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.5rem 0 0.8rem 0;
}

.legal-section p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.legal-section a {
  color: var(--button-bg);
  text-decoration: none;
  transition: color 0.3s ease;
}

.legal-section a:hover {
  color: var(--accent-primary);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .legal-page {
    padding: 6rem 1rem 1rem; /* Increased top padding for navbar */
  }
  
  .legal-container {
    padding: 1.5rem;
  }
  
  .legal-container h1 {
    font-size: 1.8rem;
    word-break: break-word;
    hyphens: auto;
  }
  
  .legal-section h2 {
    font-size: 1.2rem;
    word-break: break-word;
    hyphens: auto;
  }
  
  .legal-section h3 {
    font-size: 1.05rem;
    word-break: break-word;
    hyphens: auto;
  }
}

@media (max-width: 480px) {
  .legal-page {
    padding: 5.5rem 0.5rem 1rem; /* Increased top padding for navbar */
  }
  
  .legal-container {
    padding: 1rem;
    border-radius: 8px;
  }
  
  .legal-container h1 {
    font-size: 1.5rem;
    word-break: break-word;
    hyphens: auto;
  }
  
  .legal-section h2 {
    font-size: 1.1rem;
    word-break: break-word;
    hyphens: auto;
  }
  
  .legal-section h3 {
    font-size: 1rem;
    word-break: break-word;
    hyphens: auto;
  }
  
  .legal-section p {
    font-size: 0.9rem;
  }
}
</style>
