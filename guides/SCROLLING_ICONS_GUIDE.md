# ScrollingIcons Component Usage Guide

The `ScrollingIcons` component creates a smooth horizontal scrolling section that displays icons with titles. Perfect for showcasing technologies, partners, or any branded elements.

## Basic Usage

```vue
<template>
  <ScrollingIcons />
</template>

<script setup>
import ScrollingIcons from '../components/ScrollingIcons.vue'
</script>
```

## Custom Icons

```vue
<template>
  <ScrollingIcons :icons="customIcons" />
</template>

<script setup>
import ScrollingIcons from '../components/ScrollingIcons.vue'

const customIcons = [
  { src: '/icons/tech1.svg', title: 'Technology 1' },
  { src: '/icons/tech2.svg', title: 'Technology 2' },
  { src: '/assets/brand1.svg', title: 'Brand 1' },
  // Add more icons as needed
]
</script>
```

## Customization Options

```vue
<template>
  <ScrollingIcons 
    :icons="myIcons"
    :speed="30"
    height="100px"
  />
</template>
```

### Props

- **icons**: Array of icon objects with `src` and `title` properties
  - Default: Uses available SVG assets from your project
  
- **speed**: Scrolling speed in pixels per second
  - Default: 50
  - Lower values = slower scrolling
  
- **height**: Section height
  - Default: "80px"
  - Accepts any CSS height value

## Icon Object Structure

```typescript
interface IconItem {
  src: string    // Path to the icon/image
  title: string  // Display text below the icon
}
```

## Examples

### Fast Scrolling
```vue
<ScrollingIcons :speed="80" />
```

### Slow Scrolling
```vue
<ScrollingIcons :speed="20" />
```

### Taller Section
```vue
<ScrollingIcons height="120px" />
```

### Technology Stack Example
```vue
<template>
  <ScrollingIcons :icons="techStack" />
</template>

<script setup>
const techStack = [
  { src: '/assets/vue.svg', title: 'Vue.js' },
  { src: '/assets/typescript.svg', title: 'TypeScript' },
  { src: '/assets/node.svg', title: 'Node.js' },
  { src: '/assets/docker.svg', title: 'Docker' },
  { src: '/assets/aws.svg', title: 'AWS' },
]
</script>
```

## Adding New Icons

1. Place your SVG files in `/public/icons/` or `/src/assets/`
2. Add them to your icons array with the correct path
3. The component will handle the rest!

## Styling

The component uses your existing CSS variables from `style.css`:
- `--bg-secondary` for background
- `--border-color` for borders
- `--text-primary` and `--text-secondary` for text colors
- `--bg-accent` for hover effects

All styling automatically adapts to your theme system (light/dark/pink/cloudy/sunny).
