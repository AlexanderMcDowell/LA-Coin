<template>
  <div class="ion-page">
      <ion-header>
      <ion-toolbar>
        <Navbar />
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>
      <ion-content class="ion-padding">
          <p>Hi</p>
      </ion-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Navbar
  }
})
export default class Events extends Vue {

}
</script>

<style scoped>
</style>