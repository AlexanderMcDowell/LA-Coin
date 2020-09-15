<!-- Page containing all User Data -->

<template>
  <div class="ion-page">
    <!-- Page Header -->
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- Page Content -->
    <ion-content class="ion-padding">
      <h1>Welcome Back!</h1>
      <!--Card with user's name, photo, balance and sign on date-->
      <ion-card id="profile-card" mode="md" :style="{background: cardColor}" @click="changeColor">
        <ion-card-header>
          <!-- User name -->
          <div id="greeting-div">
            <ion-card-title v-if="name.length < 8">Hello, {{ name }}</ion-card-title>
            <ion-card-title id="longname-title" v-else>Hi, {{ name }}</ion-card-title>
          </div>
          <div id="icons">
            <p>⬜️ ⬜️</p>
          </div>
        </ion-card-header>
        <ion-card-content mode="md">
          <!-- User profile info -->
          <div id="top-info">
            <div id="icon-div">
              <img id v-bind:src="profilePhoto">
              <p>User Since {{ signOnDate }}!</p>
            </div>
            <h2 class="balance-label" v-if="isNaN(balance) == false && balance < 1000">{{balance}}.00</h2>
            <h2 class="long-balance-label" v-if="isNaN(balance) == false && balance > 999">{{balance}}.00</h2>
          </div>
        </ion-card-content>
      </ion-card>
      <h2 id="profile-card-caption">Click the card to change color!</h2>
      <!--User's balance over time-->
      <Graph />
      <!--User's unread notifications-->
      <Notifications />
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <Navbar />
      </ion-toolbar>
    </ion-footer>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import firebase from "@/firebase.config";
  import Notifications from "@/components/Notifications.vue";
  import Graph from "@/components/Graph.vue";
  import Navbar from "@/components/Navbar.vue";
  import SelectedModal from "@/components/SelectedModal.vue";

  @Component({
    components: {
      Navbar,
      Notifications,
      Graph,
      SelectedModal
    }
  })

  export default class Account extends Vue {
    todayDate: string = "";
    name: string = "";
    balance: number;
    signOnDate: string = "";
    profilePhoto: string = "";
    transactions: object[] = [];
    isSelected: boolean;
    seenSelectedNotif: boolean;

    cardColorChoices: string[] = [];
    cardColor: string = "";

    created() {
      this.getDate(); //Get today's date
      this.getUserData(); //Get all user data
    }

    getDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      this.todayDate = mm + '/' + dd + '/' + yyyy;
    }

    getUserData() {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      user.get().then(doc => {
        this.name = doc.data().name;
        this.transactions = doc.data().transactions;
        this.signOnDate = doc.data().signOnDate;
        this.profilePhoto = doc.data().profilePhoto;
        this.balance = this.getBalance(doc.data().transactions);
        this.seenSelectedNotif = doc.data().seenSelectedNotif;
        this.isSelected = doc.data().isSelected;
        this.cardColor = doc.data().cardColor;
        if (this.isSelected == true && this.seenSelectedNotif == false) {
        return this.$ionic.modalController
          .create({
            component: SelectedModal
          }).then(
            m => m.present()
          )
        }
      });
      var colorList = firebase.photosCollection.doc('colorList')
      colorList.get().then(doc => {
        this.cardColorChoices = doc.data().colors
      })
    }

    getBalance(transactionDoc: Array<any>) {
      var startBalance = 0;
      // Express balance as a sum of all transactions
      for (var i = 0; i < transactionDoc.length; i++) {
        var transaction = transactionDoc[i];
        startBalance = startBalance + transaction.amount;
      }
      return startBalance;
    }

    changeColor() {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      var startIndex = this.cardColorChoices.indexOf(this.cardColor)
      this.cardColor = this.cardColorChoices[(startIndex + 1)%(this.cardColorChoices.length)]
      user.update({
        cardColor: this.cardColor
      })
    }
  }
</script>

<style scoped>
ion-title {
  font-family: 'Nunito', sans-serif;
  font-weight: normal;
  text-align: center;
  margin-left: 0;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
ion-content{
  font-family: 'Nunito', sans-serif;
}
body {
  margin: 0;
  padding: 0;
}
h1 {
  font-family: 'Nunito', sans-serif;
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
#longname-title {
  font-size: 5.6vw;
}
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
ion-card-header {
  display: flex;
}
#greeting-div {
  /*border: 2px solid red;*/
  float: left;
  padding: 0;
  width: 55vw;
}
ion-card-header #icons {
  display: flex;
  position: absolute;
  left: 65vw;
  padding-bottom:0;
  margin-bottom:0;
}
#icons p {
  margin-top: 0;
  font-size: 7.5vw;
}
#top-info {
  position: absolute;
  top: -3vw;
  display: flex;
}
/*.icon-div {
  margin-top: -5vw; 
}*/
#icon-div img {
  width: 33vw;
  height: 33vw;
  border-radius: 50%;
  border: 2px solid lightgray;
  background-color: aquamarine;
}
#icon-div p { 
  width: 300%;
  font-size: 4vw;
  font-weight: bold;
  color: white;
  font-family: 'Nunito', sans-serif;
  /*text-shadow:
		-1px 1px 0 rgb(194, 199, 228),
		1px 1px 0 rgb(194, 199, 228);*/
}
.balance-label {
  margin-left: 0;
  /*font-size: 10vw;*/
  font-size: 9vw;
  overflow: hidden;
}
.long-balance-label {
  margin-left: 0;
  font-size: 7.5vw;
  overflow: auto;
}
.balance-label, .long-balance-label, ion-card-title {
  font-weight: bold;
  color: white;
  font-family: 'Nunito', sans-serif;
  text-shadow:
		-1px 1px 0 rgb(194, 199, 228),
		1px 1px 0 rgb(194, 199, 228);
}
#profile-card a {
  text-decoration: none;
}
#profile-card-caption {
  font-size: 4vw;
  color: gray;
}
#update-balance {
  text-align: center;
  font-weight: bold;
}
#invest-button-modal {
  position: absolute;
  left: 48.5vw;
  top: 8vw;
}
</style>