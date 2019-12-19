<script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>

<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">

      <!-- Sumbit code -->
      <div id="intro-div">
      <ion-card id="intro-card">
        <ion-card-header>
          <ion-card-title>Event Signups Here!</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/>
          <p>Easy way to get free coin! Click any games to register. Once registered, find the game code at the event and enter it below.</p>
          <form id="code-form" @submit="sumbit_code">
            <ion-item lines="none">
              <ion-input :value="inputCode" @input="inputCode = $event.target.value" type="text" name="inputCode" placeholder="Enter Game Code" maxlength=12>
              </ion-input>
            </ion-item>
            <ion-button color="dark" type="submit" expand="block" onclick="location.href='#/people'">Continue</ion-button>
          </form>
        </ion-card-content>
      </ion-card>
      </div>

      <!-- List events-->
      <ion-list>
        <ion-card class="event-card" v-for="event in events" v-bind:key="event">
          <ion-card-header>
            <ion-card-title>{{ event.data.name }}</ion-card-title>
            <ion-card-subtitle>{{ event.data.date }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div id="basic-info">
              <img class="game-icon" v-bind:src="event.data.type">
            </div>
            <div class="card-description">
              <p>{{ event.data.description }}</p>
            </div>
            <ion-button class="register-button" shape="round" fill="outline" v-if="eventTickets.includes(event.data.gameCode) == false && event.data.userAttendance.includes(confirmId) == false" @click="register(event.data.gameCode, event.data.date)">Register?</ion-button>
            <ion-button class="register-button" shape="round" fill="outline" v-if="eventTickets.includes(event.data.gameCode) == true && event.data.userAttendance.includes(confirmId) == false" @click="unregister(event.data.gameCode)" color="success">Unregister?</ion-button>
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

<script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'
import Navbar from "@/components/Navbar.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import DenyModal from "@/components/DenyModal.vue";

@Component({
  components: {
    Navbar,
    ConfirmModal
  }
})
export default class Events extends Vue {
    events: Array<any> = [];
    eventTickets: string[] = [];
    inputCode: string = "";
    gameCode: string = "";
    confirmId: string = "";
    todayDate: string = "";
    unreadNotif: Array<any> = [];
    transactions: Array<any> = [];
    userDataList: Array<any> = [];
    sportImgKey: { [key: string]: string; } = {soccer: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/soccer.png?alt=media&token=a511464b-7c20-4ce4-96a5-0f996015c53b",
                  softball: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Softball.png?alt=media&token=35638d6f-49e5-4767-99fb-aeb3089f2e41",
                  volleyball: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Volleyball.png?alt=media&token=6457b077-748b-4a0c-9344-da71b7a1aa70",
                  brokenBox: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Theater.png?alt=media&token=d336686b-b031-4e48-ba97-9f5d9f40e51e"
                  }
    created() {
      this.confirmId = firebase.auth.currentUser.uid;
      this.getUsers();
      this.getDate();
      this.getEvents();
      this.getUserTickets();
    }
    getDate() {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();
			this.todayDate = mm + '/' + dd + '/' + yyyy;
    }
    getUsers() {
      var users = firebase.usersCollection
      users.get().then(snapshot => {
        snapshot.forEach(doc => {
        //console.log(doc.data().name)
        this.userDataList.push({id: doc.id, data: doc.data()})
        //console.log('append ' + this.userDataList)
        })
      })
    }
    
    getUserTickets() {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      user.get().then(doc => {
        this.eventTickets = doc.data().eventTickets;
        this.unreadNotif = doc.data().unreadNotif;
        this.transactions = doc.data().transactions;
      });
    }
    getEvents() {
      var eventdocs = firebase.db.collection('events');
       eventdocs.get().then(snapshot => {
            snapshot.forEach(doc => {
                var Images = this.sportImgKey;
                var sportImg = Images[String(doc.data().type)];
                //console.log(doc.data());
                var eventDoc = {id: doc.id, data: doc.data()}
                eventDoc.data.type = sportImg
                if (eventDoc.data.isActive == true) {
                  this.events.push(eventDoc);
                }
            })
        })
    }
    // Open modal to confirm registration
    register(gameCode: string, eventdate: string) {
      //console.log('game code ' + gameCode)
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      this.eventTickets.push(gameCode)
      var notifdescription = "Event scheduled for " + eventdate + "!"
      var eventNotif = {date:this.todayDate, type:'game_message', sentfrom:'admin', description:notifdescription}
      this.unreadNotif.unshift(eventNotif)
      user.update({
        eventTickets: this.eventTickets,
        unreadNotif: this.unreadNotif
      });
			return this.$ionic.modalController
				.create({
					component: ConfirmModal
				}).then(
          m => m.present()
				)
    }
    unregister(gameCode: string) {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      var index = this.eventTickets.indexOf(gameCode);
      this.eventTickets.splice(index, 1);
      user.update({
        eventTickets: this.eventTickets
      });
    }
    sumbit_code(e: Event) {
      var eventdocs = firebase.db.collection('events');
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      //console.log('list ' + this.userDataList)
      //console.log('len ' + this.userDataList.length)
        //6afh12
      for (var i=0; i<this.events.length;i++) {
        var event = this.events[i]
        //console.log('event ' + event)
        //console.log('user code ' + this.inputCode)
        //console.log('game code ' + event.data.gameCode)
        if (this.inputCode == event.data.gameCode && this.eventTickets.includes(this.inputCode) == true && event.data.userAttendance.includes(userId) == false) {
          //console.log('accept ' + this.inputCode)
            // THIS IS A TO BE CLOUD FUNCTION
            //console.log('return ' + Math.round(-1*event.data.coin_return/this.userDataList.length))
            //console.log('return ' + (event.data.coin_return/this.userDataList.length));
            //console.log('return ' + event.data.coin_return)
          for (var i=0;i<this.userDataList.length;i++){
            var userData = this.userDataList[i]
            //console.log(userData.id)
            if (userData.id != userId && userData.id != 'admin') {
              userData.data.transactions.unshift({date: this.todayDate,
                amount: Math.round(-1*event.data.coinReturn/this.userDataList.length),
                description: "Other User Attendance",
                fromId: "admin", //admin means you take from everyone elses
                toId: userData.id})
              var outsideUser = firebase.usersCollection.doc(userData.id);
                outsideUser.update({
                  transactions: userData.data.transactions
                });
            }
          }
          var realreturn = Math.round(Number(event.data.coinReturn)/this.userDataList.length)*this.userDataList.length;
          if (Number(realreturn) < 5) {
            realreturn = 5;
          }
          //console.log(Number(realreturn))
              
          this.transactions.unshift({date: this.todayDate,
            amount: Number(realreturn),
            description: "Game Attended",
            fromId: "admin", //admin means you take from everyone elses
            toId: userId
          })
          user.update({
            transactions: this.transactions
          });
          //console.log(event.id)
          var updateGame = firebase.db.collection('events').doc(event.id)
          event.data.userAttendance.push(userId)
          updateGame.update({
            userAttendance: event.data.userAttendance
          });
          this.unregister(this.inputCode);
          e.preventDefault();
          return this.$ionic.modalController
          .create({
            component: ConfirmModal
          }).then(
            m => m.present()
          )
          //this.$router.push('/account');
          e.preventDefault();
        }
      }
      e.preventDefault();
      return this.$ionic.modalController
        .create({
          component: DenyModal
        }).then(
           m => m.present()
        )
        //this.$router.push('/account');
        e.preventDefault();
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
ion-title {
  font-family: 'Roboto', serif;
  text-align: center;
  margin-left: 0;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
i {
  width: 50px;
  height: 50px;
  border: 2px solid;
  border-color: red;
}
ion-content {
  font-family: 'Roboto Slab', serif;
}
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
#intro-card ion-card-content {
  display:inline-block;
  margin: 0;
  padding: 1em;
}
.event-card {
    display: inline-block;
    width: 75vw;
    height: 50vw;
  }
.event-card ion-card-title {
  font-size: 6vw;
  width: 70vw;
}
.event-card ion-card-content {
  padding-top: 0;
  margin-left:-2%;
  display:flex;
}
ion-card-header {
  font-family: 'Roboto', serif;
  text-transform: uppercase;
  color: black;
}
ion-card-title {
  font-weight: normal;
  font-size: 7vw;
}
.game-icon {
  width: 12.5em;
  height: auto;
  background-color: aquamarine;
  border-radius:50%;
  box-shadow: 0px 0.25em 0.25em #16161611;
}
.card-description {
  width: 100vw;
  height: 20vw;
  padding-left: 2.5vw;
  padding-right: 2vw;
  overflow: auto;
}
.info-card a {
  text-decoration: none;
}
.register-button {
  margin-top: -5.5vw;
  margin-left: -2.5vw;
  font-size: 3vw;
  width: 22.5vw;
  height:22.5vw;
}
#scan-button {
  margin-left: 25vw;
  display: inline-block;
}
#scan-button h2{
  font-weight: bold;
  text-align: center;
  font-family: 'Roboto', serif;
  font-size: 7.5vw;
}
#scan-button img {
  margin-top: 5vw;
  width: 40vw;
  height: 40vw;
}
#intro-card ion-card-title{
  margin-left: 0;
  text-align: center;
}
#intro-card ion-card-content {
  display: inline-block;
}
#intro-card img {
  border: solid 2px;
  border-color: navy;
  border-radius: 50%;
  margin-left: 25%;
  margin-bottom: 5vw;
  width: 50%;
  height: auto;
}
#intro-card p {
  text-align: center;
}
#info-card form {
  width: 40%;
}
#code-form ion-item {
  text-align: center;
}
#code-form ion-button {
  text-align: center;
}
</style>