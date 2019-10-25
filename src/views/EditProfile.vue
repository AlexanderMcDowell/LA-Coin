<template>
	<div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <Navbar />
                <ion-title>Settings</ion-title>
            </ion-toolbar>
        </ion-header>
        <h2> hi </h2>
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
export default class EditProfile extends Vue {
  /*const ref = firebase.storage().ref();
  const file = document.querySelector('#photo').files[0]
  const name = (+new Date()) + '-' + file.name;
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file, metadata);
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {
      console.log(url);
      document.querySelector('#someImageTagID').src = url;
    })
    .catch(console.error);*/
}
</script>

<style scoped>
    
</style>