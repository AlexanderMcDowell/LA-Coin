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
                        <p>Has: {{ person.balance }} LACoin </p>
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
    width: 60%;
    height: 40%;
  }
  ion-card-content{
    margin-left:-2%;
  }
  ion-card-header {
      text-transform: uppercase;
      color: black;
  }
</style>