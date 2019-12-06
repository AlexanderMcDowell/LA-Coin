<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>People</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">

      <!-- Instructions -->

      <ion-card id="intro-card">
          <ion-card-header>
            <ion-card-title>Welcome to the Ateos Community!</ion-card-title>
          </ion-card-header>
          <ion-card-content id="content-text">
            <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/>
            <p>Click on a person / friend to reach out, make a transaction, and more!</p>
          </ion-card-content>
        </ion-card>
      
      <!-- List of your Friends-->
      <div id="friends" v-if="friends.length > 0">
        <h1>Your friends</h1>
        <ion-card id="friend-info-card" v-for="friend in friends" v-bind:key="friend">
          <ion-card-header>
            <router-link :to="{name: 'profile', params: friend}">
              <ion-card-title>{{ friend.data.name }}</ion-card-title>
            </router-link>
          </ion-card-header>
          <ion-card-content>
            <div class="basic-info">
              <img class="profile-icon" v-bind:src="friend.data.profile_photo">
              <p>{{ friend.data.balance }} Coin </p>
            </div>
            <div class="card-description">
              <p>{{ friend.data.bio }}</p>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <ion-list>
        <!-- List of all users, no friends yet-->

        <h1>All Users</h1>
        <ion-card id="info-card" v-for="person in people" v-bind:key="person">
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
    <ion-footer>
      <ion-toolbar>
        <Navbar />
      </ion-toolbar>
    </ion-footer>
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
    // Define people as object list
    people: object[] = [];
    ids_of_friends: string[] = [];
    friends: object[] =[];

    created() {
      this.getPeople();
    }

    // Get data of all users
    getPeople() {
        var users = firebase.usersCollection
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        user.get().then(doc => {
            this.ids_of_friends = doc.data().friends;
        });

        users.get().then(snapshot => {
            snapshot.forEach(doc => {
                var user_info = {id: doc.id, data: doc.data()};
                user_info.data.balance = this.getBalance(user_info.data.transactions);
                this.people.push(user_info);
                if (this.ids_of_friends.includes(user_info.id)){
                  this.friends.push(user_info)
                }
            })
        })
        console.log(this.people)
    }
    getBalance(transactionDoc: Array<any>) {
    var startBalance = 0;
    //console.log(transactionDoc)
		for (var i = 0; i < transactionDoc.length; i++) {
      var transaction = transactionDoc[i];
      //console.log(transaction)
			startBalance = startBalance + transaction.amount;
    }
    return startBalance;
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
ion-title {
  margin-left: 0;
  text-align: center;
  font-weight: bold;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
ion-content {
  font-family: 'Roboto Slab', serif;
}
#info-card {
    display: inline-block;
    width: 75vw;
    height: 43.42vw;
    background:
      linear-gradient(217deg, rgba(245, 251, 255, 0.8), rgba(0, 81, 255, 0) 70.71%),
      linear-gradient(127deg, rgba(226, 226, 226, 0.8), rgba(0, 255, 157, 0) 70.71%),
      linear-gradient(336deg, rgba(215, 231, 255, 0.8), rgba(0,0,255,0) 70.71%);
}
#friend-info-card {
    display: inline-block;
    width: 75vw;
    height: 43.42vw;
    background:
      linear-gradient(217deg, rgba(255, 219, 165, 0.8), rgba(0, 81, 255, 0) 70.71%),
      linear-gradient(127deg, rgba(255, 223, 176, 0.8), rgba(0, 255, 157, 0) 70.71%),
      linear-gradient(336deg, rgba(241, 215, 208, 0.8), rgba(0,0,255,0) 70.71%);
}
ion-card-content{
    margin-left:-2%;
    display:flex;
  }
ion-card-header {
      text-transform: uppercase;
      color: black;
  }
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
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
#info-card a, #friend-info-card a {
  text-decoration: none;
}
#intro-card {
  text-align: center;
}
#content-text {
  display: inline-block;
}
#content-text img {
  border: solid 2px;
  border-color: navy;
  border-radius: 50%;
  margin-left: 25%;
  margin-bottom: 5vw;
  width: 50%;
  height: auto;
}
</style>
