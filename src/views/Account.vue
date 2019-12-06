<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Welcome Back!</h1>
      <ion-card class="profile-card">
        <ion-card-header>
          <!--router-link :to="{name: 'profile', params: { UserID: {balance: balance, name: name, bio: bio, sign_on_date: sign_on_date}}}"-->
          <div id="greeting-div">
            <ion-card-title v-if="name.length < 10">Hello, {{ name }}</ion-card-title>
            <ion-card-title v-else>Hi {{ name }}</ion-card-title>
          </div>
          <div id="icons">
            <p>⬜️ ⬜️</p>
          </div>
          <!--/router-link-->
        </ion-card-header>
        <ion-card-content>
          <div class="top-info">
            <div class="icon-div">
              <img v-bind:src="profile_photo">
              <p>User Since {{ sign_on_date }}!</p>
            </div>
            <h2 id="balance-label"> 💰 {{balance}}.00</h2>
          </div>
          <div id="invest-button-modal">
            <InvestCard v-if="invested_today == false" />
          </div>
        </ion-card-content>
      </ion-card>
      <Graph />
      <Notifications />
      <!--Transactions /-->
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <Navbar />
      </ion-toolbar>
    </ion-footer>
  </div>
</template>
<script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>

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
  name: string = "";
  sign_on_date: string = "";
  profile_photo: string = "";
  transactions: object[] = [];
  balance: number = 0;
  todayDate: string = "";
  invested_today: boolean = true;

  created() {
    this.getDate();
    this.getInfo();
  }

  verify_invest(transactions: Array<any>) {
    console.log('verifying')
    console.log(transactions.length)
    //Check to see if transaction based on gamble already made
    for (var i = 0; i < transactions.length; i++) {
      var transaction = transactions[i];
			if (transaction.description == "Investment" && transaction.date == this.todayDate) {
        this.invested_today = true
        console.log('confirmed')
        return this.invested_today
      }
    }​
    console.log('rejected')
    this.invested_today = false
    return this.invested_today
    
    // verify date
  }

  getDate() {
    var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();
    this.todayDate = mm + '/' + dd + '/' + yyyy;
  }

  getInfo() {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);

    user.get().then(doc => {
      //console.log(doc.data())
      this.name = doc.data().name;
      this.transactions = doc.data().transactions;
      this.sign_on_date = doc.data().sign_on_date;
      this.profile_photo = doc.data().profile_photo;
      this.balance = this.getBalance(doc.data().transactions);
      this.invested_today = this.verify_invest(doc.data().transactions)
    });
  }

  getBalance(transactionDoc: Array<any>) {
    var startBalance = 0;
    console.log('transactions: ' + transactionDoc)
		for (var i = 0; i < transactionDoc.length; i++) {
      var transaction = transactionDoc[i];
      console.log('Balance')
      //console.log(transaction)
			startBalance = startBalance + transaction.amount;
    }
    return startBalance;
  }
  invest(e: Event) {
    if (this.invested_today == true) {
      return false;
    }

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
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
ion-title {
  text-align: center;
  margin-left: 0;
  font-weight: bold;
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
  /*background-image: linear-gradient(to bottom right, skyblue, aquamarine); //In the Green */
  /*background-image: linear-gradient(to bottom right, skyblue, violet);*/
  /*background-image: linear-gradient(to bottom right, orange, crimson); //In the Red*/
  background:
      linear-gradient(217deg, rgba(97, 255, 215, 0.8), rgba(0, 81, 255, 0) 70.71%),
      linear-gradient(127deg, rgba(101, 206, 255, 0.8), rgba(0, 255, 157, 0) 70.71%),
      linear-gradient(336deg, rgba(250, 136, 244, 0.8), rgba(0,0,255,0) 70.71%);
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
ion-card-header #greeting-div {
  /*border: 2px solid;*/
  float: left;
  padding:0;
  width: 55vw;
}
ion-card-header #icons {
  /*border: 2px solid;*/
  display: flex;
  position: absolute;
  left: 65vw;
}
#icons p {
  margin-top: 0;
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
#balance-label {
  margin-top: -2.5vw;
  margin-left: -3vw;
  font-size: 9vw;
  overflow: hidden;
}
#balance-label, .icon-div p, ion-card-title {
  font-weight: bold;
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  text-shadow:
		/*-1px -1px 0 rgb(228, 232, 255),
		1px -1px 0 rgb(228, 232, 255),*/
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
  top: 7.5vw;
}
ion-icon {
  border:2px solid;
  border-color: red;
}
</style>
