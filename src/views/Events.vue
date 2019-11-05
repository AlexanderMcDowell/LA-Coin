<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Events</ion-title>
        <Navbar />
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">
      <ion-card id="scan-button" @click="openReadQR()">
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/QR-code.png?alt=media&token=b8e9edd9-ecf6-4ecb-9132-64721647cb0d">
        <h2>Scan QR Code</h2>
      </ion-card>
      <ion-list>
        <ion-card v-for="event in events" v-bind:key="event">
          <ion-card-header>
            <ion-card-title>{{ event.data.name }}</ion-card-title>
            <ion-card-subtitle>{{ event.data.date }}</ion-card-subtitle>
            <ion-button class="register-button" shape="round" fill="outline" v-if="event_tickets.includes(event.id) == false" @click="openModal(event.id)">Register?</ion-button>
            <ion-button class="register-button" shape="round" fill="outline" v-else @click="unregister(event.id)" color="success">Unregister?</ion-button>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'
import Navbar from "@/components/Navbar.vue";
import EventModal from "@/components/EventModal.vue";
import ReadQR from "@/components/ReadQR.vue";

@Component({
  components: {
    Navbar,
    EventModal
  }
})
export default class Events extends Vue {
    events: string[] = []
    event_tickets: string[] = []
    QRref: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/QR-code.png?alt=media&token=b8e9edd9-ecf6-4ecb-9132-64721647cb0d"

    sportImgKey = {
      soccer: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/soccer.png?alt=media&token=a511464b-7c20-4ce4-96a5-0f996015c53b",
      softball: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Softball.png?alt=media&token=35638d6f-49e5-4767-99fb-aeb3089f2e41",
      broken_box: "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Theater.png?alt=media&token=d336686b-b031-4e48-ba97-9f5d9f40e51e"
    }

    created() {
        this.getEvents()
        this.getUserTickets()
    }
    getUserTickets() {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      user.get().then(doc => {
        this.event_tickets = doc.data().event_tickets;
      });
    }
    getEvents() {
        var eventdocs = firebase.db.collection('events')

       eventdocs.get().then(snapshot => {
            snapshot.forEach(doc => {
                var dateString = String(doc.data().date.toDate()).split("GMT")[0]
                var Images = this.sportImgKey
                var sportImg = Images[String(doc.data().event_type)]
                console.log(doc.data())
                this.events.push({id: doc.id, data: {name:doc.data().name, date:dateString, description:doc.data().description, event_type:sportImg}})
            })
        })
    }
    openModal(eventId: string) {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      this.event_tickets.push(eventId)
      user.update({
        event_tickets: this.event_tickets
      });
			return this.$ionic.modalController
				.create({
					component: EventModal
				}).then(
          m => m.present()
				)
    }
    unregister(eventId: string) {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      var index = this.event_tickets.indexOf(userId);
      this.event_tickets.splice(index, 1);
      user.update({
        event_tickets: this.event_tickets
      });
    }
    openReadQR() {
      return this.$ionic.modalController
				.create({
					component: ReadQR
				}).then(
          m => m.present()
				)
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
ion-content {
  font-family: 'Roboto Slab', serif;
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
  width: 7.5em;
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
  margin-top: -20vw;
  margin-right: -5.5vw;
  font-size: 2.5vw;
  float: right;
  width: 20vw;
  height:20vw;
}
#scan-button {
  margin-right: 2.5vw;
  margin-left: 2.5vw;
  height: 50vw;
}
#scan-button h2 {
  float:right;
  margin-right: 15vw;
  font-size: 5vw;
  text-align: justify;
}
#scan-button img {
  float: left;
}
#scan-button img, #scan-button h2 {
  padding-top: 12.5vw;
  margin: 2.5vw;
  width: 25vw;
}
</style>
