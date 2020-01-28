<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">

      <!-- Sumbit code -->
    <div id="intro-div">
      <ion-card mode="md" class="intro-card">
        <ion-card-header>
          <ion-card-title>Event Signups Here!</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
          <p>Easy way to get free LAcoin! Click any games to register. Once registered, find the game code at the event and enter it below.</p>
          <form id="code-form" @submit="sumbit_code">
            <ion-item lines="none">
              <ion-input :value="inputCode" @input="inputCode = $event.target.value" type="text" name="inputCode" placeholder="Enter Event Code" maxlength=12>
              </ion-input>
            </ion-item>
            <ion-button mode="md" color="dark" type="submit" expand="block">Continue</ion-button>
          </form>
        </ion-card-content>
      </ion-card>
    </div>

    <!-- List events-->
    <h1>Events Coming Up</h1>
      <ion-list>
        <ion-card mode="md" class="event-card" v-for="event in events" v-bind:key="event">
          <ion-card-header>
            <ion-card-title>{{ event.data.name }}</ion-card-title>
            <ion-card-subtitle>{{ event.data.date }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div id="basic-info">
              <img class="game-icon" v-bind:src="event.data.imgType">
            </div>
            <div class="card-description">
              <p>{{ event.data.description }}</p>
            </div>
            <div class="register-button">
              <i class="ion-md-add-circle" style="color: rgb(125, 175, 255);" v-if="eventTickets.includes(event.data.gameCode) == false && event.data.userAttendance.includes(confirmId) == false" @click="register(event.data.gameCode, event.data.date)"></i>
              <i class="ion-md-close-circle" style="color: rgb(125, 225, 125);" v-if="eventTickets.includes(event.data.gameCode) == true && event.data.userAttendance.includes(confirmId) == false" @click="unregister(event.data.gameCode)" color="success"></i>
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
      todayDate: string = "";

      unreadNotif: Array<any> = [];
      transactions: Array<any> = [];
      
      userDataList: Array<any> = [];

      inputCode: string = "";
      gameCode: string = "";
      confirmId: string = "";
      
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
                  var eventDoc = {id: doc.id, data: doc.data()}
                  if (eventDoc.data.isActive == true) {
                    this.events.push(eventDoc);
                  }
              })
              this.events = this.events.sort(function(a, b) {
                return b.data.timestamp - a.data.timestamp
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

        if (this.unreadNotif.length > 20) {
          this.unreadNotif.pop()
        }

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
        for (var i=0; i<this.events.length;i++) {
          var event = this.events[i]
          if (this.inputCode == event.data.gameCode && this.eventTickets.includes(this.inputCode) == true && event.data.userAttendance.includes(userId) == false) {
            for (var i=0;i<this.userDataList.length;i++){
              var userData = this.userDataList[i]
              //console.log(userData.id)
              if (userData.id != userId && userData.id != 'admin') {
                userData.data.transactions.unshift({date: this.todayDate,
                  amount: Math.round(-1*event.data.coinReturn/this.userDataList.length),
                  description: "Other User Attendance",
                  fromId: "admin", //admin means you take from everyone elses
                  toId: userData.id,
                  type: 'deduction'})
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
              toId: userId,
              type: 'attendance'
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
            this.$router.push('/account');
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
ion-title {
  font-family: 'Nunito', sans-serif;
  font-weight: normal;
  text-align: center;
  margin-left: 0;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
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
h1 {
  font-family: 'Nunito', sans-serif;
}
.intro-card ion-card-content {
  font-family: 'Nunito', sans-serif;
  display:inline-block;
  margin: 0;
  padding: 1em;
}
.event-card {
    display: inline-block;
    width: 80vw;
    height: 55vw;
  }
.event-card ion-card-title {
  font-size: 5vw;
  width: 100%;
}
.event-card ion-card-content {
  padding-top: 0;
  margin-left:-2%;
  display:flex;
}
ion-card-header {
  font-family: 'Nunito', sans-serif;
  text-transform: uppercase;
  color: black;
}
ion-card-title {
  font-family: 'Nunito', sans-serif;
  font-weight: normal;
  font-size: 7vw;
}
.game-icon {
  width: 12.5em;
  border: 1px solid gray;
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
  margin-top: -1vh;
  float: right;
  font-size: 3em;
}
#scan-button {
  margin-left: 25vw;
  display: inline-block;
}
#scan-button h2{
  font-weight: bold;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  font-size: 7.5vw;
}
#scan-button img {
  margin-top: 5vw;
  width: 40vw;
  height: 40vw;
}
.intro-card ion-card-title{
  font-weight: normal;
  margin-left: 0;
  text-align: center;
}
.intro-card ion-card-content {
  display: inline-block;
}
.intro-card img {
  border: solid 2px;
  border-color: rgb(185, 143, 2);
  border-radius: 50%;
  background-color: rgb(255, 214, 80);
  margin-left: 25%;
  margin-bottom: 5vw;
  width: 50%;
  height: 50%;
}
.intro-card p {
  text-align: center;
}
.info-card form {
  width: 40%;
}
#code-form ion-item {
  text-align: center;
}
#code-form ion-button {
  text-align: center;
}
</style>