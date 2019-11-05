<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>People</ion-title>
        <Navbar />
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">
      <ion-list>
        <ion-card class="info-card" v-for="person in people" v-bind:key="person">
          <ion-card-header>
            <router-link :to="{name: 'profile', params: person}">
              <ion-card-title>{{ person.data.name }}</ion-card-title>
            </router-link>
          </ion-card-header>
          <ion-card-content>
            <div class="basic-info">
              <img class="profile-icon" v-bind:src="person.data.profile_photo">
              <p>{{ person.data.balance }} LACoin </p>
            </div>
            <div class="card-description">
              <p>{{ person.data.bio }}</p>
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
                this.people.push({id: doc.id, data: doc.data()})
            })
        })
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
ion-content {
  font-family: 'Roboto Slab', serif;
}
.info-card {
    display: inline-block;
    width: 75vw;
    height: 43.42vw;
    background-image: linear-gradient(to bottom right, rgb(233, 249, 255), rgb(238, 236, 255));
  }
ion-card-content{
    margin-left:-2%;
    display:flex;
  }
ion-card-header {
      text-transform: uppercase;
      color: black;
  }
.profile-icon {
  width: 20vw;
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
.card-description {
  width: 100vw;
  height: 20vw;
  padding-left: 2.5vw;
  padding-right: 1vw;
  overflow: auto;
}
.info-card a {
  text-decoration: none;
}
</style>
