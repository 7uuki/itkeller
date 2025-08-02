export interface Translation {
  // Navigation
  nav: {
    home: string
    about: string
    academic: string
    services: string
    portfolio: string
    contact: string
    impressum: string
    datenschutz: string
    goBackHome: string
  }
  
  // Hero Section
  hero: {
    greeting: string
    name: string
    title: string
    subtitle: string
    description: string
    getInTouch: string
    viewPortfolio: string
    emailTitle: string
    githubTitle: string
    linkedinTitle: string
  }
  
  // About Section
  about: {
    title: string
    subtitle: string
    description: string
    skills: {
      softwareEngineering: {
        name: string
        description: string
      }
      backend: {
        name: string
        description: string
      }
      frontend: {
        name: string
        description: string
      }
      mathematics: {
        name: string
        description: string
      }
    }
    skillsTitle: string
    closing: string
  }
  
  // Academic Section
  academic: {
    title: string
    subtitle: string
    education: string
    experience: string
    degree: string
    institution: string
    period: string
    gpa: string
    thesis: string
    details: string
    showMore: string
    showLess: string
    keyCourses: string
    finalGrade: string
    institutions: {
      fhAachen: {
        name: string
        degree: string
        field: string
        description: string
        achievements: string[]
        conclusion: string[]
      }
      matse: {
        name: string
        degree: string
        field: string
        description: string
        achievements: string[]
        conclusion: string[]
      }
      gymnasium: {
        name: string
        degree: string
        field: string
        description: string
        achievements: string[]
        conclusion: string[]
      }
    }
  }
  
  // Services Section
  services: {
    title: string
    subtitle: string
    learnMore: string
    webDev: {
      title: string
      description: string
      features: string[]
    }
    mobileApp: {
      title: string
      description: string
      features: string[]
    }
    uiux: {
      title: string
      description: string
      features: string[]
    }
    performance: {
      title: string
      description: string
      features: string[]
    }
    maintenance: {
      title: string
      description: string
      features: string[]
    }
    cloud: {
      title: string
      description: string
      features: string[]
    }
  }
  
  // Portfolio Section
  portfolio: {
    title: string
    subtitle: string
    filters: {
      all: string
      webApps: string
      mobileApps: string
      uiux: string
      backend: string
    }
    viewProject: string
    sourceCode: string
    technologies: string
  }
  
  // Contact Section
  contact: {
    title: string
    subtitle: string
    form: {
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      subject: string
      subjectPlaceholder: string
      message: string
      messagePlaceholder: string
      send: string
      sending: string
      success: string
      successMessage: string
      close: string
      error: string
    }
    info: {
      email: string
      phone: string
      location: string
      availability: string
      responseTime: string
    }
  }
  
  // Footer Section
  footer: {
    brand: string
    quickLinks: string
    legal: string
    social: string
    copyright: string
  }
  
  // Loading
  loading: {
    text: string
  }
  
  // Theme
  theme: {
    toggle: string
  }
  
  // Language
  language: {
    toggle: string
    german: string
    english: string
  }
}

export const translations: Record<string, Translation> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      academic: "Academic",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Contact",
      impressum: "Imprint",
      datenschutz: "Privacy-Notice",
      goBackHome: "Go Back Home"
    },
    hero: {
      greeting: "Hello, I'm",
      name: "IT Keller",
      title: "Full Stack Developer",
      subtitle: "Computer Science Student",
      description: "Passionate about developing reliable software and tackling challenging problems with a strong foundation in computer science and mathematics.",
      getInTouch: "Get In Touch",
      viewPortfolio: "View Portfolio",
      emailTitle: "Write me an Email",
      githubTitle: "This is my GitHub",
      linkedinTitle: "Connect on LinkedIn"
    },
    about: {
      title: "About Me",
      subtitle: "Welcome, and thank you for visiting my website!",
      description: "a passionate student pursuing a dual Bachelor's degree in Computer Science and Mathematics at FH Aachen. Through this dual study program, I combine academic learning with hands-on professional experience, bridging the gap between theory and practice.",
      skills: {
        softwareEngineering: {
          name: "Software Engineering",
          description: "Building scalable systems and solving complex problems"
        },
        backend: {
          name: "Backend Services & API Development", 
          description: "Creating robust server-side solutions"
        },
        frontend: {
          name: "Frontend UI Development & Design",
          description: "Crafting intuitive user interfaces"
        },
        mathematics: {
          name: "Applied Mathematics",
          description: "Linear Algebra, Probability, Statistics, Calculus, Numerical Methods"
        }
      },
      skillsTitle: "Core Interests & Skills",
      closing: "I'm a curious problem-solver with a strong mathematical foundation and a \"can-learn-anything\" mindset. Whether it's building scalable systems or diving into complex algorithms, I enjoy challenges that help me grow."
    },
    academic: {
      title: "Academic Background",
      subtitle: "My educational journey",
      education: "Education",
      experience: "Experience",
      degree: "Degree",
      institution: "Institution",
      period: "Period",
      gpa: "GPA",
      thesis: "Thesis",
      details: "Details",
      showMore: "Show More",
      showLess: "Show Less",
      keyCourses: "Key Courses",
      finalGrade: "Final grade",
      institutions: {
        fhAachen: {
          name: "FH Aachen University",
          degree: "Bachelor of Science",
          field: "Angewandte Mathematik und Informatik",
          description: "Dual study program with integrated IHK degree as MATSE in 3 years. Combination of mathematics and computer science. Practice-oriented through close integration into the training company. Numerous electives and critical examination of topics such as data protection, AI and information security.",
          achievements: [
            "Analysis, Stochastics, Linear Algebra",
            "Numerics, Algorithms & Data Structures",
            "Java, C++, Cobol"
          ],
          conclusion: [
            "Final grade: TBD"
          ]
        },
        matse: {
          name: "Matse Ausbildung",
          degree: "IHK degree as MATSE (Mathematisch-technische/r Softwareentwicklerin und –entwickler)",
          field: "Vocational Training as a mathematical-technical software developer",
          description: "In-service training at Barmenia-Gothaer Insurance, parallel and integrated into the study program at FH-Aachen",
          achievements: [
            "Android App Development Project",
            "Software Project Management: Development+Presentation at trade fair"
          ],
          conclusion: []
        },
        gymnasium: {
          name: "Gymnasium Kreuzgasse",
          degree: "Abitur Nordrhein-Westfalen",
          field: "",
          description: "at Gymnasium Kreuzgasse in a bilingual class with a focus on French",
          achievements: [
            "Mathematics",
            "German",
            "Computer Science",
            "Social sciences"
          ],
          conclusion: [
            "Final grade: 1.2"
          ]
        }
      }
    },
    services: {
      title: "Services",
      subtitle: "What I can do for you",
      learnMore: "Learn More",
      webDev: {
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies",
        features: ["Responsive Design", "Performance Optimization", "SEO Friendly", "Modern Frameworks"]
      },
      mobileApp: {
        title: "Mobile Apps",
        description: "Cross-platform mobile applications for iOS and Android",
        features: ["Native Performance", "Offline Support", "Push Notifications", "App Store Ready"]
      },
      uiux: {
        title: "UI/UX Design",
        description: "Beautiful and intuitive user interfaces that enhance user experience",
        features: ["User Research", "Prototyping", "Design Systems", "Accessibility"]
      },
      performance: {
        title: "Performance",
        description: "Optimize your existing applications for speed and efficiency",
        features: ["Code Optimization", "Database Tuning", "Caching Strategies", "Monitoring"]
      },
      maintenance: {
        title: "Maintenance",
        description: "Ongoing support and maintenance for your web applications",
        features: ["Bug Fixes", "Security Updates", "Feature Updates", "24/7 Support"]
      },
      cloud: {
        title: "Cloud Services",
        description: "Deploy and manage your applications in the cloud",
        features: ["AWS/Azure", "Auto Scaling", "Load Balancing", "Monitoring"]
      }
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "My recent work",
      filters: {
        all: "All",
        webApps: "Web Apps",
        mobileApps: "Mobile Apps",
        uiux: "UI/UX",
        backend: "Backend"
      },
      viewProject: "View Project",
      sourceCode: "Source Code",
      technologies: "Technologies"
    },
    contact: {
      title: "Get In Touch",
      subtitle: "I'm always open to new opportunities, collaborations, or just a good conversation — don’t hesitate to reach out!",
      form: {
        name: "Name",
        namePlaceholder: "Your Name",
        email: "Email",
        emailPlaceholder: "your.email@example.com",
        subject: "Subject",
        subjectPlaceholder: "Project Discussion",
        message: "Message",
        messagePlaceholder: "Tell me about your project...",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        successMessage: "Thank you for your message! I'll get back to you soon.",
        close: "Close",
        error: "Failed to send message. Please try again."
      },
      info: {
        email: "Email",
        phone: "Phone",
        location: "Location",
        availability: "Availability",
        responseTime: "Response Time"
      }
    },
    footer: {
      brand: "ItKeller.com",
      quickLinks: "Quick Links",
      legal: "Legal",
      social: "Social Media",
      copyright: "All rights reserved."
    },
    loading: {
      text: "Loading..."
    },
    theme: {
      toggle: "Toggle theme"
    },
    language: {
      toggle: "Switch language",
      german: "German",
      english: "English"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      about: "Über mich",
      academic: "Akademisch",
      services: "Leistungen",
      portfolio: "Portfolio",
      contact: "Kontakt",
      impressum: "Impressum",
      datenschutz: "Datenschutz",
      goBackHome: "Zurück zur Startseite"
    },
    hero: {
      greeting: "Hallo, ich bin",
      name: "IT Keller",
      title: "Full Stack Entwickler",
      subtitle: "Informatik Student",
      description: "Leidenschaft für zuverlässige Softwareentwicklung und komplexe Problemstellungen – mit fundiertem Hintergrund in Informatik und Mathematik.",
      getInTouch: "Kontakt aufnehmen",
      viewPortfolio: "Portfolio ansehen",
      emailTitle: "Schreib mir eine E-Mail",
      githubTitle: "Das ist mein GitHub",
      linkedinTitle: "Auf LinkedIn vernetzen"
    },
    about: {
      title: "Über mich",
      subtitle: "Willkommen und vielen Dank für den Besuch meiner Website!",
      description: "ein leidenschaftlicher Student, der derzeit einen dualen Bachelor-Abschluss in Informatik und Mathematik an der FH Aachen verfolgt. Durch dieses duale Studienprogramm kombiniere ich akademisches Lernen mit praktischer Berufserfahrung und schlage die Brücke zwischen Theorie und Praxis.",
      skills: {
        softwareEngineering: {
          name: "Software Engineering",
          description: "Aufbau skalierbarer Systeme und Lösung komplexer Probleme"
        },
        backend: {
          name: "Backend Services & API Entwicklung",
          description: "Erstellung robuster serverseitiger Lösungen"
        },
        frontend: {
          name: "Frontend UI Entwicklung & Design",
          description: "Gestaltung intuitiver Benutzeroberflächen"
        },
        mathematics: {
          name: "Angewandte Mathematik",
          description: "Lineare Algebra, Wahrscheinlichkeit, Statistik, Analysis, Numerische Methoden"
        }
      },
      skillsTitle: "Kerninteressen & Fähigkeiten",
      closing: "Ich bin ein neugieriger Problemlöser mit einem starken mathematischen Fundament und einer \"Kann-alles-lernen\"-Mentalität. Ob es darum geht, skalierbare Systeme zu entwickeln oder in komplexe Algorithmen einzutauchen, ich mag Herausforderungen, die mir helfen zu wachsen."
    },
    academic: {
      title: "Akademischer Hintergrund",
      subtitle: "Mein Bildungsweg",
      education: "Bildung",
      experience: "Erfahrung",
      degree: "Abschluss",
      institution: "Institution",
      period: "Zeitraum",
      gpa: "Notendurchschnitt",
      thesis: "Abschlussarbeit",
      details: "Details",
      showMore: "Mehr anzeigen",
      showLess: "Weniger anzeigen",
      keyCourses: "Hauptfächer",
      finalGrade: "Abschlussnote",
      institutions: {
        fhAachen: {
          name: "FH Aachen Hochschule",
          degree: "Bachelor of Science",
          field: "Angewandte Mathematik und Informatik",
          description: "Duales Studium mit integriertem IHK-Abschluss als MATSE in 3 Jahren. Kombination aus Mathematik und Informatik. Praxisorientiert durch enge Einbindung in den Ausbildungsbetrieb. Zahlreiche Wahlpflichtfächer und kritische Auseinandersetzung mit Themen wie Datenschutz, KI und Informationssicherheit.",
          achievements: [
            "Analysis, Stochastik, Lineare Algebra",
            "Numerik, Algorithmen & Datenstrukturen",
            "Java, C++, Cobol"
          ],
          conclusion: [
            "Abschlussnote: Noch ausstehend"
          ]
        },
        matse: {
          name: "MATSE Ausbildung",
          degree: "IHK-Abschluss als MATSE (Mathematisch-technische/r Softwareentwicklerin und –entwickler)",
          field: "Berufsausbildung als mathematisch-technische/r Softwareentwickler/in",
          description: "Betriebliche Ausbildung bei Barmenia-Gothaer Versicherung, parallel und integriert in das Studium an der FH-Aachen",
          achievements: [
            "Android App Entwicklungsprojekt",
            "Software-Projektmanagement: Entwicklung+Präsentation auf Messe"
          ],
          conclusion: []
        },
        gymnasium: {
          name: "Gymnasium Kreuzgasse",
          degree: "Abitur Nordrhein-Westfalen",
          field: "",
          description: "am Gymnasium Kreuzgasse in einer bilingualen Klasse mit Schwerpunkt Französisch",
          achievements: [
            "Mathematik",
            "Deutsch",
            "Informatik",
            "Sozialwissenschaften"
          ],
          conclusion: [
            "Abschlussnote: 1,2"
          ]
        }
      }
    },
    services: {
      title: "Leistungen",
      subtitle: "Was ich für Sie tun kann",
      learnMore: "Mehr erfahren",
      webDev: {
        title: "Webentwicklung",
        description: "Maßgeschneiderte Websites und Webanwendungen mit modernen Technologien",
        features: ["Responsive Design", "Performance-Optimierung", "SEO-freundlich", "Moderne Frameworks"]
      },
      mobileApp: {
        title: "Mobile Apps",
        description: "Plattformübergreifende mobile Anwendungen für iOS und Android",
        features: ["Native Performance", "Offline-Unterstützung", "Push-Benachrichtigungen", "App Store bereit"]
      },
      uiux: {
        title: "UI/UX Design",
        description: "Schöne und intuitive Benutzeroberflächen für bessere Benutzererfahrung",
        features: ["Benutzerforschung", "Prototyping", "Design-Systeme", "Barrierefreiheit"]
      },
      performance: {
        title: "Performance",
        description: "Optimierung bestehender Anwendungen für Geschwindigkeit und Effizienz",
        features: ["Code-Optimierung", "Datenbank-Tuning", "Caching-Strategien", "Monitoring"]
      },
      maintenance: {
        title: "Wartung",
        description: "Laufende Unterstützung und Wartung für Ihre Webanwendungen",
        features: ["Fehlerbehebung", "Sicherheitsupdates", "Feature-Updates", "24/7 Support"]
      },
      cloud: {
        title: "Cloud-Services",
        description: "Bereitstellung und Verwaltung Ihrer Anwendungen in der Cloud",
        features: ["AWS/Azure", "Auto-Skalierung", "Load Balancing", "Monitoring"]
      }
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Meine neuesten Arbeiten",
      filters: {
        all: "Alle",
        webApps: "Web Apps",
        mobileApps: "Mobile Apps",
        uiux: "UI/UX",
        backend: "Backend"
      },
      viewProject: "Projekt ansehen",
      sourceCode: "Quellcode",
      technologies: "Technologien"
    },
    contact: {
      title: "Kontakt aufnehmen",
      subtitle: "Ich bin jederzeit offen für neue Möglichkeiten, spannende Kooperationen oder einfach ein gutes Gespräch – zögern Sie nicht, mich zu kontaktieren!",
      form: {
        name: "Name",
        namePlaceholder: "Ihr Name",
        email: "E-Mail",
        emailPlaceholder: "ihre.email@beispiel.com",
        subject: "Betreff",
        subjectPlaceholder: "Projektbesprechung",
        message: "Nachricht",
        messagePlaceholder: "Erzählen Sie mir von Ihrem Projekt...",
        send: "Nachricht senden",
        sending: "Wird gesendet...",
        success: "Nachricht erfolgreich gesendet!",
        successMessage: "Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.",
        close: "Schließen",
        error: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut."
      },
      info: {
        email: "E-Mail",
        phone: "Telefon",
        location: "Standort",
        availability: "Verfügbarkeit",
        responseTime: "Antwortzeit"
      }
    },
    footer: {
      brand: "ItKeller.com",
      quickLinks: "Schnelllinks",
      legal: "Rechtliches",
      social: "Soziale Medien",
      copyright: "Alle Rechte vorbehalten."
    },
    loading: {
      text: "Lädt..."
    },
    theme: {
      toggle: "Design wechseln"
    },
    language: {
      toggle: "Sprache wechseln",
      german: "Deutsch",
      english: "Englisch"
    }
  }
}

export const defaultLanguage = 'en'
export const availableLanguages = ['en', 'de'] as const
export type Language = typeof availableLanguages[number]
