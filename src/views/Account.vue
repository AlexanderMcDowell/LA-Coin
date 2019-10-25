<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <Navbar />
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card class="profile-card">
        <ion-card-header>
          <router-link :to="{name: 'profile', params: { UserID: {balance: balance, name: name, bio: bio, sign_on_date: sign_on_date}}}">
          <ion-card-title>Welcome Back, {{ name }}!</ion-card-title>
          </router-link>
        </ion-card-header>
        <ion-card-content>
          <img id="profile-icon" src="https://www.chccw.org/wp-content/uploads/profile-icon-IMG-2-300x300.png">
          <p id="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </ion-card-content>
      </ion-card>
      
      <Graph />
      <Transactions />
      <QRModal />
    </ion-content>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import firebase from "@/firebase.config";

import QRModal from "@/components/QRModal/QRModal.vue";
import Transactions from "@/components/Transactions.vue";
import Graph from "@/components/Graph.vue";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    QRModal,
    Transactions,
    Graph,
    Navbar
  }
})
export default class Account extends Vue {
  name: string = "";
  balance: string = "";
  bio: string = "";
  sign_on_date: string = "";
  //transactions: Object[] = [];

  getInfo() {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);

    user.get().then(doc => {
      this.name = doc.data().name;
      this.balance = doc.data().balance;
      this.bio = doc.data().bio;
      this.sign_on_date = doc.data().sign_on_date;
    });
  }

  created() {
    const currentUser = firebase.auth.currentUser.uid;
    /*const transactionsDoc = firebase.usersCollection.doc(currentUser).collection("transactions");
    transactionsDoc.get().then(snapshot => {
        snapshot.forEach(doc => {
            this.transactions.push(doc.data());
                });
            });
    this.transactions = this.transactions[0]*/
    /*<h2 id="update-balance" v-if="transactions.amount > 0" color="success">Your budget: {{ balance }} LaCoin</h2>
      <h2 id="update-balance" v-if="transactions.amount > 0" color="success">Your budget: {{ balance }} LaCoin</h2>*/
    this.name = firebase.auth.currentUser.displayName;
    this.getInfo();
  }
}
</script>

<style scoped>
ion-card {
    padding-left: 0;
    margin-left:10%;
    --div-width: 80%;
	  width: var(--div-width);
	  height: calc(var(--div-width) * 0.9 / 3);
}
.profile-card {
    background-image: linear-gradient(to bottom right, navy, blue);
  }
ion-card-content{
    margin-left:-2%;
    display:flex;
  }
ion-card-title {
  text-transform: uppercase;
  color: white;
  margin-bottom: 1vh;
}
#profile-icon {
    margin-top: -3vh;
    width: calc(var(--div-width) * 1 / 3);
    height: calc(var(--div-width) * 1 / 3);
    border-radius:50%;
  }
#bio {
  margin-top: -3vh;
  color: white;
  font-size: 1.5vh;
  text-align: justify;
  padding-left: 5%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.profile-card a {
  text-decoration: none;
}
#update-balance {
  text-align: center;
  font-weight: bold;
}
</style>
