<template>
	<div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <Navbar />
                <ion-title>Profile</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <pre>This page should do the following: 
                clicking on a profile card on the 
                people page should lead here, and a 
                profile for the user should be generated. 
                This can be a parameter or something.</pre>
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
export default class Profile extends Vue {
}
</script>

<style scoped>
</style>