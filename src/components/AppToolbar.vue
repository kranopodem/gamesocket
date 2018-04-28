<template>
  <v-toolbar color="orange darken-4" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">It Infinity</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <router-link to="/login">
        <v-btn flat>Link Three</v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>