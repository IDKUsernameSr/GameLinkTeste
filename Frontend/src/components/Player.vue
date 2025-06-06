<template>
    <audio ref="player" controls>
      <source :src="src" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </template>
  
  <script setup>
  const props = defineProps({ src: String })
  </script>