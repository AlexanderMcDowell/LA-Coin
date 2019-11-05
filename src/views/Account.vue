<!--script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script-->
<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
        <Navbar />
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Welcome Back!</h1>
      <ion-card class="profile-card">
        <ion-card-header>
          <router-link :to="{name: 'profile', params: { UserID: {balance: balance, name: name, bio: bio, sign_on_date: sign_on_date}}}">
          <ion-card-title v-if="name.length < 10">Hello, {{ name }}</ion-card-title>
          <ion-card-title v-else>Hi {{ name }}</ion-card-title>
          </router-link>
        </ion-card-header>
        <ion-card-content>
          <div id="icons">
            <p>⬜️ ⬜️</p>
          </div>
          <div class="top-info">
            <div class="icon-div">
              <img v-bind:src="profile_photo">
              <p>User Since {{ sign_on_date }}!</p>
            </div>
            <h2 id="balance"> 💰 {{balance}}.00</h2>
          </div>
        </ion-card-content>
      </ion-card>
      <Graph />
      <Transactions />
    </ion-content>
  </div>
</template>
<script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import firebase from "@/firebase.config";

import Transactions from "@/components/Transactions.vue";
import Graph from "@/components/Graph.vue";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Transactions,
    Navbar,
    Graph
  }
})
export default class Account extends Vue {
  name: string = "";
  balance: number
  sign_on_date: string = "";
  profile_photo: string = "";
  //transactions: Object[] = [];

  transferCoin() {
    var transaction = firebase.transfer({
      fromId: "bcqYpPVZWphSVyNK4c4g",
      toId: "pLt0jpah27BdIpjsoxRO",
      amount: 50,
      description: "Thanks for the merch"
    });

    transaction.then(res => {
      console.log(res)
    })
  }

  getInfo() {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);

    user.get().then(doc => {
      this.name = doc.data().name;
      this.balance = doc.data().balance;
      this.sign_on_date = doc.data().sign_on_date;
      this.profile_photo = doc.data().profile_photo;
    });
    /*const transactionsDoc = firebase.usersCollection.doc(userId).collection("transactions");
            transactionsDoc.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.transactions.push(doc.data());
                });
            });*/
  }

  created() {
    const currentUser = firebase.auth.currentUser.uid;
    this.name = firebase.auth.currentUser.displayName;
    this.getInfo();
    //this.transferCoin();
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
ion-content{
  font-family: 'Roboto', serif;
}
body {
  margin: 0;
  padding: 0;
}
.profile-card {
  /*background-image: linear-gradient(to bottom right, skyblue, aquamarine); //In the Green */
  background-image: linear-gradient(to bottom right, skyblue, violet);
  /*background-image: linear-gradient(to bottom right, orange, crimson); //In the Red*/
}
ion-card {
  width: 95%;
	height: 55vw;
  border-radius: 3vw;
}
ion-card-title {
  text-transform: uppercase;
  padding-bottom: 2.5vw;
  font-size: 6vw;
}
#icons {
  float: right;
  margin-top: -16.25vw;
}
#icons p {
  font-size: 7.5vw;
}
.top-info {
  display: flex;
}
.icon-div {
margin-top: -5vw; 
}
.icon-div img {
  width: 33vw;
  height: auto;
  border: 2px solid;
  border-radius: 50%;
  border-color: lightgray;
}
.icon-div p {
  width: 300%;
  font-size: 4vw;
}
#balance {
  margin-top: -2.5vw;
  margin-left: -7.5vw;
  font-size: 9vw;
  overflow: hidden;
}
#balance, .icon-div p, ion-card-title {
  font-weight: bold;
  color: white;
}
.profile-card a {
  text-decoration: none;
}
#update-balance {
  text-align: center;
  font-weight: bold;
}
ion-icon {
  border:2px solid;
  border-color: red;
}
</style>
