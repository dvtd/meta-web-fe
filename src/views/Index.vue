<template>
  <v-app>
    <meta-navigation />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  name: 'IndexPage',
  components: {
    'meta-navigation': Navigation
  }
}
</script>

<style></style>
