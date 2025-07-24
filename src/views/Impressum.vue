<template>
  <div class="legal-page">
    <div class="legal-container">
      <h1>Impressum</h1>
      
      <section class="legal-section">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Lukas Keller<br>
          ITKeller<br>
          [Ihre Adresse]<br>
          [PLZ Ort]<br>
          Deutschland
        </p>
      </section>

      <section class="legal-section">
        <h2>Kontakt</h2>
        <p>
          E-Mail: info@itkeller.com<br>
          Telefon: [Ihre Telefonnummer]
        </p>
      </section>

      <section class="legal-section">
        <h2>Redaktionell verantwortlich</h2>
        <p>
          Lukas Keller<br>
          [Ihre Adresse]<br>
          [PLZ Ort]
        </p>
      </section>

      <section class="legal-section">
        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a><br>
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </section>

      <section class="legal-section">
        <h2>Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
          Verbraucherschlichtungsstelle teilzunehmen.
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
  
  .legal-section p {
    font-size: 0.9rem;
  }
}
</style>
