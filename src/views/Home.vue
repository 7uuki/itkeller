<template>
  <div>

    <HeroSection />
    <ScrollingIcons :show-title="false" />
    <AboutSection />
    <AcademicSection />

    <ContactSection />  
  </div>
</template>

<script setup lang="ts">
import HeroSection from './HeroSection.vue'
import AboutSection from './AboutSection.vue'
import AcademicSection from './AcademicSection.vue'
import ContactSection from './ContactSection.vue'
import ScrollingIcons from '../components/ScrollingIcons.vue'
</script>
