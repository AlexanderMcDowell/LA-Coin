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
                  <ion-card class="user-profile" v-for="person in people" v-bind:key="person">
                    <ion-card-header>
                      <router-link :to="{name: 'profile', params: { UserID: {balance: person.balance, name: person.name, bio: person.bio, sign_on_date: person.sign_on_date}}}">
                        <ion-card-title>{{ person.name }}</ion-card-title>
                      </router-link>
                    </ion-card-header>
                    <ion-card-content>
                      <div class="basic-info">
                        <img class="profile-icon" src="https://www.chccw.org/wp-content/uploads/profile-icon-IMG-2-300x300.png">
                        <p>Has: {{ person.balance }} LACoin </p>
                      </div>
                      <div class="bio">
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
                this.people.push({name:doc.data().name, balance:doc.data().balance, sign_on_date: doc.data().sign_on_date, bio: doc.data().bio})
            })
        })
    }
}
</script>

<style scoped>
.user-profile {
    display: inline-block;
    width: 75%;
    height: 40%;
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
.user-profile a {
  text-decoration: none;
}
</style>
