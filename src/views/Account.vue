<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Welcome Back!</h1>

      <!--Card with user's name, photo, balance and sign on date-->
      <ion-card class="profile-card">
        <ion-card-header>
          <div class="greeting-div">
            <ion-card-title v-if="name.length < 8">Hello, {{ name }}</ion-card-title>
            <ion-card-title v-else>Hi, {{ name }}</ion-card-title>
          </div>
          <div id="icons">
            <p>⬜️ ⬜️</p>
          </div>
        </ion-card-header>
        <ion-card-content>
          <div class="top-info">
            <div class="icon-div">
              <img v-bind:src="profilePhoto">
              <p>User Since {{ signOnDate }}!</p>
            </div>
            <h2 id="balance-label"> ${{balance}}.00</h2>
          </div>
          <!--div id="invest-button-modal">
            <InvestCard v-if="investedToday == false" />
          </div-->
        </ion-card-content>
      </ion-card>
      <!--User's balance over time-->
      <Graph style="overflow: auto;"/>
      <!--User's unread notifications-->
      <Notifications style="overflow: auto;"/>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <Navbar />
      </ion-toolbar>
    </ion-footer>
  </div>
</template>

<!--script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script-->

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import firebase from "@/firebase.config";

import Transactions from "@/components/Transactions.vue";
import Notifications from "@/components/Notifications.vue";
import Graph from "@/components/Graph.vue";
import Navbar from "@/components/Navbar.vue";
import InvestCard from "@/components/InvestCard.vue";
import InvestModal from "@/components/InvestModal.vue";

@Component({
  components: {
    Transactions,
    Navbar,
    Notifications,
    Graph,
    InvestCard,
    InvestModal
  }
})
export default class Account extends Vue {
  //User attributes
  name: string = "";
  signOnDate: string = "";
  profilePhoto: string = "";
  transactions: object[] = [];
  balance: number = 0;
  investedToday: boolean = true;

  todayDate: string = "";

  created() {
    this.getDate(); //Get today's date
    this.getUserInfo(); //Get all user attributes
  }

  /*verifyInvest(transactions: Array<any>) {

    //Check to see if transaction based on gamble already made
    for (var i = 0; i < transactions.length; i++) {
      var transaction = transactions[i];
			if (transaction.description == "Investment" && transaction.date == this.todayDate) {
        this.investedToday = true
        return this.investedToday
      }
    }​

    this.investedToday = false
    return this.investedToday
  }*/

  getDate() {
    var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();
    this.todayDate = mm + '/' + dd + '/' + yyyy;
  }

  getUserInfo() {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);

    user.get().then(doc => {
      this.name = doc.data().name;
      this.transactions = doc.data().transactions;
      this.signOnDate = doc.data().signOnDate;
      this.profilePhoto = doc.data().profilePhoto;
      this.balance = this.getBalance(doc.data().transactions);
      //this.investedToday = this.verifyInvest(doc.data().transactions)
    });
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

  invest(e: Event) {
    if (this.investedToday == true) {
      return false;
    }

    // Open the investing window
    return this.$ionic.modalController
				.create({
					component: InvestModal
				}).then(
          m => m.present()
				)

      e.preventDefault();
    }
}
</script>

<style scoped>

ion-title {
  font-family: 'Roboto', serif;
  text-align: center;
  margin-left: 0;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
ion-content{
  font-family: 'Roboto', serif;
}
body {
  margin: 0;
  padding: 0;
}
.profile-card {
  background-image: linear-gradient(to bottom right, rgba(255, 166, 0, 0.25), rgba(220, 20, 60, 0.25)); /*In the Red*/
  /*background-image: linear-gradient(to bottom right, skyblue, aquamarine);*/ /*In the Green */
  /*background-image: linear-gradient(to bottom right, skyblue, violet);*/
  /*background:
      linear-gradient(217deg, rgba(97, 255, 215, 0.8), rgba(0, 81, 255, 0) 70.71%),
      linear-gradient(127deg, rgba(101, 206, 255, 0.8), rgba(0, 255, 157, 0) 70.71%),
      linear-gradient(336deg, rgba(250, 136, 244, 0.8), rgba(0,0,255,0) 70.71%);*/
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
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
ion-card-header {
  display: flex;
}
ion-card-header .greeting-div {
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
.top-info {
  position: absolute;
  top: -3vw;
  display: flex;
}
/*.icon-div {
  margin-top: -5vw; 
}*/
.icon-div img {
  width: 33vw;
  height: 33vw;
  border: 2px solid;
  border-radius: 50%;
  border-color: lightgray;
  background-color: aquamarine;
}
.icon-div p { 
  width: 300%;
  font-size: 4vw;
  font-weight: bold;
  color: white;
  font-family: 'Nunito', sans-serif;
  /*text-shadow:
		-1px 1px 0 rgb(194, 199, 228),
		1px 1px 0 rgb(194, 199, 228);*/
}
#balance-label {
  margin-left: -3vw;
  /*font-size: 9vw;*/
  font-size: 8vw;
  overflow: hidden;
}
#balance-label, ion-card-title {
  font-weight: bold;
  color: white;
  font-family: 'Nunito', sans-serif;
  text-shadow:
		-1px 1px 0 rgb(194, 199, 228),
		1px 1px 0 rgb(194, 199, 228);
}
.profile-card a {
  text-decoration: none;
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