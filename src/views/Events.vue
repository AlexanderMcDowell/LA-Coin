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
      <ion-card id="intro-card">
        <ion-card-header>
          <ion-card-title>Event Signups Here!</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/>
          <p>Easy way to get free coin! Click any games to register. Once registered, find the game code at the event and enter it below.</p>
        </ion-card-content>
      </ion-card>
      <div>
        <div id="top-cutoff" class="cutoff"></div>
        <div id="code-div">
          <form id="code-form" @submit="sumbit_code">
              <ion-item>
                <ion-input :value="input_code" @input="input_code = $event.target.value" type="text" name="input_code" placeholder="Enter Game Code" maxlength=12>
                </ion-input>
              </ion-item>
              <ion-button color="dark" type="submit" expand="block" onclick="location.href='/#/account'">Continue</ion-button>
          </form>
        </div>
        <div id="bottom-cutoff" class="cutoff"></div>
      </div>
      <!--div id="scan-button"-->
        <!--<img type="button" @click="openReadQR()" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/QR-code.png?alt=media&token=b8e9edd9-ecf6-4ecb-9132-64721647cb0d">
        <h2>Scan Code</h2>-->
        <!--ion-icon src="../icons/_ionicons_svg_md-wifi.svg"></ion-icon-->
      <!--/div-->
      <!-- List events-->
      <ion-list>
        <ion-card v-for="event in events" v-bind:key="event">
          <ion-card-header>
            <ion-card-title>{{ event.data.name }}</ion-card-title>
            <ion-card-subtitle>{{ event.data.date }}</ion-card-subtitle>
            <ion-button class="register-button" shape="round" fill="outline" v-if="event_tickets.includes(event.data.game_code) == false && event.data.user_attendance.includes(confirmId) == false" @click="register(event.data.game_code, event.data.date)">Register?</ion-button>
            <ion-button class="register-button" shape="round" fill="outline" v-if="event_tickets.includes(event.data.game_code) == true && event.data.user_attendance.includes(confirmId) == false" @click="unregister(event.data.game_code)" color="success">Unregister?</ion-button>
          </ion-card-header>
          <ion-card-content>
            <div id="basic-info">
              <img class="game-icon" v-bind:src="event.data.event_type">
            </div>
            <div class="card-description">
              <p>{{ event.data.description }}</p>
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

<script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'
import Navbar from "@/components/Navbar.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
//import ReadQR from "@/components/ReadQR.vue";

@Component({
  components: {
    Navbar,
    ConfirmModal
  }
})

export default class Events extends Vue {
    events: Array<any> = [];
    event_tickets: string[] = [];
    QRref: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/QR-code.png?alt=media&token=b8e9edd9-ecf6-4ecb-9132-64721647cb0d"
    input_code: string = "";
    todayDate: string = "";
    unreadNotif: Array<any> = [];
    confirmId: string = "";
    transactions: Array<any> = [];
    game_code: string = "";

    user_data_list: Array<any> = [];

    sportImgKey: { [key: string]: string; } = {soccer: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/soccer.png?alt=media&token=a511464b-7c20-4ce4-96a5-0f996015c53b",
                  softball: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Softball.png?alt=media&token=35638d6f-49e5-4767-99fb-aeb3089f2e41",
                  broken_box: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Theater.png?alt=media&token=d336686b-b031-4e48-ba97-9f5d9f40e51e"
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
        this.user_data_list.push({id: doc.id, data: doc.data()})
        //console.log('append ' + this.user_data_list)
        })
      })
    }
    
    getUserTickets() {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      user.get().then(doc => {
        this.event_tickets = doc.data().event_tickets;
        this.unreadNotif = doc.data().unreadNotif;
        this.transactions = doc.data().transactions;
      });
    }

    getEvents() {
      var eventdocs = firebase.db.collection('events');

       eventdocs.get().then(snapshot => {
            snapshot.forEach(doc => {
                var dateString = String(doc.data().date.toDate()).split("GMT")[0]
                var Images = this.sportImgKey;
                var sportImg = Images[String(doc.data().event_type)];
                //console.log(doc.data());
                var eventDoc = {id: doc.id, data: doc.data()}
                eventDoc.data.date = dateString
                eventDoc.data.event_type = sportImg
                this.events.push(eventDoc);
            })
        })
    }

    // Open modal to confirm registration
    register(game_code: string, eventdate: string) {
      //console.log('game code ' + game_code)

      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      this.event_tickets.push(game_code)

      var notifdescription = "Event scheduled for " + eventdate + "!"

      var eventNotif = {date:this.todayDate, type:'game_message', sentfrom:'admin', description:notifdescription}
      this.unreadNotif.unshift(eventNotif)
      console.log('tickets ' + this.event_tickets)
      user.update({
        event_tickets: this.event_tickets,
        unreadNotif: this.unreadNotif
      });
			return this.$ionic.modalController
				.create({
					component: ConfirmModal
				}).then(
          m => m.present()
				)
    }
    unregister(game_code: string) {
      console.log('I HAVE BEEN OBSERVED')
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      var index = this.event_tickets.indexOf(game_code);
      this.event_tickets.splice(index, 1);
      user.update({
        event_tickets: this.event_tickets
      });
    }
    sumbit_code(e: Event) {
      var eventdocs = firebase.db.collection('events');
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);

      //console.log('list ' + this.user_data_list)
      //console.log('len ' + this.user_data_list.length)

        //6afh12
      for (var i=0; i<this.events.length;i++) {
        var event = this.events[i]
        //console.log('event ' + event)
        //console.log('user code ' + this.input_code)
        //console.log('game code ' + event.data.game_code)
        if (this.input_code == event.data.game_code && this.event_tickets.includes(this.input_code) == true && event.data.user_attendance.includes(userId) == false) {
          //console.log('accept ' + this.input_code)
            // THIS IS A TO BE CLOUD FUNCTION

            //console.log('return ' + Math.round(-1*event.data.coin_return/this.user_data_list.length))
            //console.log('return ' + (event.data.coin_return/this.user_data_list.length));
            //console.log('return ' + event.data.coin_return)

          for (var i=0;i<this.user_data_list.length;i++){
            var user_data = this.user_data_list[i]
            //console.log(user_data.id)
            if (user_data.id != userId) {
              user_data.data.transactions.unshift({date: this.todayDate,
                amount: Math.round(-1*event.data.coin_return/this.user_data_list.length),
                description: "Other User Attendance",
                fromId: "admin", //admin means you take from everyone elses
                toId: user_data.id})
              var outside_user = firebase.usersCollection.doc(user_data.id);
                outside_user.update({
                  transactions: user_data.data.transactions
                });
            }
          }

          var realreturn = Math.round(Number(event.data.coin_return)/this.user_data_list.length)*this.user_data_list.length;
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
          event.data.user_attendance.push(userId)
          updateGame.update({
            user_attendance: event.data.user_attendance
          });
          this.unregister(this.input_code);
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
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
ion-title {
  text-align: center;
  margin-left: 0;
  font-weight: bold;
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
.event-card {
    display: inline-block;
    width: 75vw;
    height: 43.42vw;
  }
ion-card-content {
  margin-left:-2%;
  display:flex;
}
ion-card-header {
  text-transform: uppercase;
  color: black;
  width: 80vw;
}
.game-icon {
  width: 12.5em;
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
.info-card a {
  text-decoration: none;
}
.register-button {
  margin-top: 0vw;
  margin-right: -7.5vw;
  font-size: 2.5vw;
  float: right;
  width: 20vw;
  height:20vw;
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
  margin-left:10px;
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
#code-form {
  display:inline-block;
  margin-left: calc(10vw - 8px);
  margin-top: 25vw;
  width: 60vw;
  text-align: center;
}
#code-form ion-item {
  /*margin-left: -8px;*/
  text-align: center;
}
#code-div {
  border: 7px solid;
  margin-left: calc(10vw - 16px);
  width: 80vw;
  height: 80vw;
  border-radius: 50%;
}
.cutoff {
  position: absolute;
  left: calc(30vw - 8px);
  right: calc(30vw - 8px);
  width: calc(40vw  -16px);
  padding-bottom: 12.5vw;
  border: 2px transparent;
  border-radius: 30%;
  background-color: white;
}
#top-cutoff {
  --cutoff-vertical-shift: 80vw;
  top: calc(var(--cutoff-vertical-shift) + 8vw);
}
#bottom-cutoff {
  --cutoff-vertical-shift: 80vw;
  top: calc(var(--cutoff-vertical-shift) + 80vw);
}
</style>
