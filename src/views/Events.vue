<template>
	<div class="ion-page">
        <ion-header>
      <ion-toolbar>
        <Navbar />
        <ion-title>People</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">
            <ion-list>
                <ion-card type="button" onclick="location.href='/#/profile'" v-for="person in people" v-bind:key="person">
                    <ion-card-header>
                        <ion-card-title>{{ person.name }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <div id="basic-info">
                        <img class="game-icon" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5">
                        <p>Has: {{ person.balance }} LACoin </p>
                      </div>
                      <div id="bio">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                      </div>
                    </ion-card-content>
                </ion-card>
            </ion-list>
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
export default class People extends Vue {
    people: string[] = []

    created() {
        this.getPeople()
    }

    getPeople() {
        var users = firebase.usersCollection

        users.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.people.push({name:doc.data().name, balance:doc.data().balance})
            })
        })
    }
}
</script>

<style scoped>
ion-card{
  display: inline-block;
  width: 75%;
  height: 40%;
}
ion-card-content {
  margin-left:-2%;
  display:flex;
}
ion-card-header {
  text-transform: uppercase;
  color: black;
}
.game-icon {
  width: 7.5em;
  height: auto;
  background-color: aquamarine;
  border-radius:50%;
  display: inherit;
  margin-left: inherit;
  margin-right: inherit;
  box-shadow: 0px 0.25em 0.25em #16161611;
}
.basic-info {
  width: 100%;
  height: auto;
}
</style>
