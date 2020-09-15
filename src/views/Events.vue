<!-- Page containing all Events -->

<template>
<!-- Page Header -->
	<div class="ion-page">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- Page Content -->
		<ion-content class="ion-padding">
    <!-- Informational Card with info on Events -->
      <div id="intro-div">
        <ion-card id="intro-card" mode="md">
          <ion-card-header>
            <ion-card-title>Event Signups Here!</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img id="lacoin-logo" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
            <p>Click any event button to register. Click title for the link (zoom, etc). Red is off campus, blue on-campus. Once registered, find the event code at the event and enter it below.</p>
            <!-- Submit code -->
            <form id="code-form" @submit="submitCode">
              <ion-item lines="none">
                <ion-input :value="inputCode" @input="inputCode = $event.target.value" type="text" name="inputCode" placeholder="Enter Event Code" maxlength=12>
                </ion-input>
              </ion-item>
              <ion-button mode="md" color="dark" type="submit" expand="block">Continue</ion-button>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
      <h1>Events Coming Up</h1>
      <!-- Toggle between registered and unregistered-->
      <ion-buttons id="button-container">
        <ion-button class="select-user-opt-button" mode="md" color="primary" v-if="showOnlyRegisteredEvents == true" @click="showOnlyRegisteredEvents = false" fill="solid" expand="block">All Events</ion-button>
        <ion-button class="select-user-opt-button" mode="md" color="success" v-else fill="solid" expand="block">All Events</ion-button>
        <ion-button class="select-user-opt-button" mode="md" color="primary" v-if="showOnlyRegisteredEvents == false" @click="showOnlyRegisteredEvents = true" fill="solid" expand="block">Registered</ion-button>
        <ion-button class="select-user-opt-button" mode="md" color="success" v-else fill="solid" expand="block">Registered</ion-button>
      </ion-buttons>
      <!-- Look up specific Events -->
      <ion-item>
        <ion-label mode="md">Event Type</ion-label>
        <ion-select mode="md" :value="selectedEventType" @ionChange="searchEvents($event.target.value)">
          <ion-select-option mode="md" value="All">All</ion-select-option>
          <ion-select-option mode="md" v-for="type in allAvailableEventTypes" v-bind:key="type" :value="type">{{type}}</ion-select-option>
        </ion-select>
      </ion-item>
      <!-- All Events -->
      <ion-list>
        <div v-for="event in selectedEvents" v-bind:key="event">
          <ion-card class="event-card" mode="md" v-if="showOnlyRegisteredEvents == false || (showOnlyRegisteredEvents == eventTickets.includes(event.data.gameCode))" :style="selectBackground(event.data.atLAHS)">
            <!-- Event Name -->
            <ion-card-header>
              <a v-if="event.data.link.length > 0" v-bind:href="event.data.link" style="text-decoration: none;"><ion-card-title>{{ event.data.name }}</ion-card-title></a>
              <ion-card-title v-else>{{ event.data.name }}</ion-card-title>
              <ion-card-subtitle>{{ event.data.date }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content mode="md">
              <!-- Event Photo -->
              <img class="game-icon" v-bind:src="event.data.imgType" v-if="event.data.imgType.length > 0">
              <!-- Event Info -->
              <div class="card-description">
                <p><b>Time: </b>{{ event.data.time }}</p>
                <p><b>Location: </b>{{ event.data.location }}</p>  
              </div>
              <!-- Register/Unregister Buttons -->
              <div class="register-button" v-if="event.data.userAttendance.includes(confirmId) == false">
                <i class="ion-md-add-circle" style="color: rgb(125, 175, 255);" v-if="eventTickets.includes(event.data.gameCode) == false && event.data.type != 'Broken Box' && event.data.type != 'Dances and Events'" @click="register(event.data.gameCode, event.data.date, event.data.timestamp, event.data.lowerVerificationLimit, event.data.upperVerificationLimit)"></i>
                <i class="ion-md-close-circle" style="color: rgb(125, 225, 125);" v-if="eventTickets.includes(event.data.gameCode) == true" @click="unregister(event.data.gameCode)" color="success"></i>
              </div>
            </ion-card-content>
            <!-- Full Event Description -->
            <ion-card-footer>
              <div class="info-footer">
                <p v-if="event.showInfo == true"><b>Info: </b>{{ event.data.description }}</p>
                <div class="info-buttons">
                  <i v-if="event.showInfo == false" class="ion-md-arrow-round-down" @click="event.showInfo = true" color="gray"></i>
                  <i v-else class="ion-md-arrow-round-up" @click="event.showInfo = false" color="gray"></i>
                </div>
              </div>
            </ion-card-footer>
          </ion-card>
        </div>
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
      selectedEvents: Array<any> = [];
      eventTickets: string[] = [];
      todayDate: string = "";
      todayTimestamp: number;
      hours: number;
      minutes: number;

      unreadNotif: Array<any> = [];
      transactions: Array<any> = [];
      
      userDataList: Array<any> = [];

      inputCode: string = "";
      gameCode: string = "";
      confirmId: string = "";

      allAvailableEventTypes: string[] = [];
      selectedEventType: string = "";

      currtTime: number

      showOnlyRegisteredEvents: boolean = false;
      
      created() {
        this.confirmId = firebase.auth.currentUser.uid;
        this.getUsers(); // Get all users
        this.getDate();
        this.getEvents();
        this.getUserData(); 
      }

      getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        this.todayDate = mm + '/' + dd + '/' + yyyy;
        this.todayTimestamp = (30*Number(mm)) + Number(dd) + (365*Number(String(yyyy).slice(2, 4)))
      }

      getUsers() {
        var users = firebase.usersCollection
        users.get().then(snapshot => {
          snapshot.forEach(doc => {
          this.userDataList.push({id: doc.id, data: doc.data()})
          })
        })
      }

      getUserData() {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        user.get().then(doc => {
          this.eventTickets = doc.data().eventTickets;
          this.unreadNotif = doc.data().unreadNotif;
          this.transactions = doc.data().transactions;
        });
      }

      getEvents() {
        var eventList = firebase.db.collection('events');
        eventList.get().then(snapshot => {
              snapshot.forEach(doc => {
                  var eventDoc = {id: doc.id, data: doc.data(), showInfo: false}
                  // Check if events are open and will be happening
                  if (eventDoc.data.isActive == true && this.todayTimestamp <= eventDoc.data.timestamp) {
                    this.events.push(eventDoc);
                    this.allAvailableEventTypes.push(doc.data().type)
                  }
              })
              this.events = this.events.sort(function(a, b) {
                return b.data.timestamp - a.data.timestamp
              })
              this.selectedEvents = this.events;
          })
      }

      searchEvents(eventType: string) {
        // Take searchbar input for events
        this.selectedEvents = []
        if (eventType == 'All') {
          this.selectedEvents = this.events
        }
        else {
          for (var i=0;i<this.events.length;i++) {
            if (eventType == this.events[i].data.type) {
              this.selectedEvents.push(this.events[i])
            }
          }
        }
      }

      register(gameCode: string, eventdate: string, eventTimestamp: number, lowerVerificationLimit: number, upperVerificationLimit: number) {
        var today = new Date();
        this.hours = today.getHours()
        this.minutes = today.getMinutes()
        var exactTime = (this.hours*60)+this.minutes

        if (exactTime >= lowerVerificationLimit && this.todayTimestamp >= eventTimestamp) {
          return this.$ionic.modalController
          .create({
            component: DenyModal
          }).then(
            m => m.present()
          )
        } else {
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

      submitCode(e: Event) {
        var today = new Date();
        this.hours = today.getHours()
        this.minutes = today.getMinutes()

        var exactTime = (this.hours*60)+this.minutes
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        for (var i=0; i<this.events.length;i++) {
          var event = this.events[i]
          // Check if user previously registered for event, and that code correct
          if (this.inputCode == event.data.gameCode && this.eventTickets.includes(this.inputCode) == true && event.data.userAttendance.includes(userId) == false && exactTime >= event.data.lowerVerificationLimit && exactTime <= event.data.upperVerificationLimit && this.todayTimestamp == event.data.timestamp) {
            for (var i=0;i<this.userDataList.length;i++){
              var userData = this.userDataList[i]
              if (userData.id != userId && userData.id != 'admin') {
                // 3rd party users receive a deduction
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
            // Failsafe if event price deflated
            var realreturn = Math.round(Number(event.data.coinReturn)/this.userDataList.length)*this.userDataList.length;
            if (Number(realreturn) < 5) {
              realreturn = 5;
            }
                
            this.transactions.unshift({date: this.todayDate,
              amount: Number(realreturn),
              description: "Event Attended",
              fromId: "admin", //admin means you take from everyone elses
              toId: userId,
              type: 'attendance'
            })
            user.update({
              transactions: this.transactions
            });

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

      selectBackground(atLAHS: boolean) {
        // If event on campus, set to default
        if (atLAHS == false) {
          return {
            border: "solid 2px pink"
          }
        }
        else {
          return {
            border: "solid 2px skyblue"
          }
        }
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
#intro-card ion-card-content {
  font-family: 'Nunito', sans-serif;
  display:inline-block;
  margin: 0;
  padding: 1em;
}
#button-container ion-button {
  min-width: 50%;
}
.event-card {
    display: inline-block;
    width: 80vw;
    height: auto; /*55vw*/
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
  width: 6em;
  height: 6em;
  border: 1px solid gray;
  background-color: aquamarine;
  border-radius: 50%;
  box-shadow: 0px 0.25em 0.25em #16161611;
}
.card-description {
  width: auto;
  max-height: 25vw;
  font-family: 'Nunito', sans-serif;
  font-size: 5vw;
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
.info-footer {
  padding: 0 1em 0.25em 1em;
  text-align: justify;
}
.info-footer p {
  max-height: 28vw;
  overflow: auto;
}
.info-buttons {
  text-align: center;
  font-size: 2em;
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
#intro-card ion-card-title{
  font-weight: normal;
  margin-left: 0;
  text-align: center;
}
#lacoin-logo {
  border: solid 2px;
  border-color: rgb(185, 143, 2);
  border-radius: 50%;
  background-color: rgb(255, 214, 80);
  margin-left: auto;
	margin-right: auto;
  margin-bottom: 5vw;
  width: 10em;
  height: 10em;
}
#intro-card p {
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