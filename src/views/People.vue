<!-- Page containing all Users -->

<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>People</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">
      <!-- Instructions Card -->
      <ion-card id="intro-card" mode="md" type="button" @click="moreInfo()">
          <ion-card-header>
            <ion-card-title>Welcome to the LAcoin Community!</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img id="lacoin-logo" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
            <p>Click on any user's name to reach out, make a transaction, and more!</p>
            <p><b>Click here for LAcoin Tutorial</b></p>
          </ion-card-content>
        </ion-card>
        <!-- LAcoin Admin Card -->
        <ion-card id="admin-info-card" mode="md" type="button" @click="requestGift()">
            <ion-card-header>
                <ion-card-title>{{ adminInfo.data.name }}</ion-card-title>
            </ion-card-header>
            <ion-card-content mode="md">
              <img class="profile-icon" v-if="isSelected == false" v-bind:src="adminInfo.data.profilePhoto">
              <img class="profile-icon" v-else v-bind:src="adminInfo.data.selectedProfilePhoto">
              <div>
                <p class="admin-bio" v-if="isSelected == false">{{ adminInfo.data.bio }}</p>
                <p class="admin-bio" v-else>{{ adminInfo.data.selectedBio }}</p>
              </div>
            </ion-card-content>
        </ion-card> 
      <!-- Toggle between Friends and All Users -->
      <ion-buttons id="button-container">
        <ion-button class="select-user-opt-button" mode="md" color="primary" v-if="checkFriends == true" @click="checkFriends = false" fill="solid" expand="block">All Users</ion-button>
        <ion-button class="select-user-opt-button" mode="md" color="success" v-else fill="solid" expand="block">All Users</ion-button>
        <ion-button class="select-user-opt-button" mode="md" color="primary" v-if="checkFriends == false" @click="checkFriends = true" fill="solid" expand="block">Friends</ion-button>
        <ion-button class="select-user-opt-button" mode="md" color="success" v-else fill="solid" expand="block">Friends</ion-button>
      </ion-buttons>
      <!-- List of your Friends-->
      <ion-list style="padding: 0;" v-if="friends.length > 0 && checkFriends == true">
        <h1>Your friends</h1>
        <ion-card class="friend-info-card" mode="md" v-for="friend in friends" v-bind:key="friend">
          <ion-card-header>
            <router-link :to="{name: 'profile', params: friend}">
              <ion-card-title>{{ friend.data.name }}</ion-card-title>
            </router-link>
          </ion-card-header>
          <router-link :to="{name: 'profile', params: friend}">
          <ion-card-content mode="md">
            <img class="profile-icon" v-bind:src="friend.data.profilePhoto">
            <div class="card-description">
              <p class="bio">{{ friend.data.bio }}</p>
              <p class="balance" v-if="friend.data.balance < 1000">{{friend.data.balance}}.00</p>
              <p class="long-balance" v-if="friend.data.balance > 999">{{friend.data.balance}}.00</p>
            </div>
          </ion-card-content>
          </router-link>
        </ion-card>
      </ion-list>
      <ion-list v-if="checkFriends == false">
        <h1>Users</h1>
        <!-- Searchbar -->
        <ion-item>
          <ion-input mode="md" :v-model="searchName" @input="searchName = $event.target.value" placeholder="Search User (Blank for All), Click Arrow" ></ion-input>
          <i id="search-icon" class="ion-ios-arrow-dropright" v-on:click="searchUsers"></i>
        </ion-item>
        <ion-card v-if="selectedPeople.length == 0" class="info-card" mode="md">
          <ion-card-header>
            <ion-card-title>Sorry!</ion-card-title>
          </ion-card-header>
          <ion-card-content mode="md">
            <img class="profile-icon" v-bind:src="adminInfo.data.profilePhoto">
            <div class="card-description">
              <p class="admin-bio">No users showed up in this search.</p>
            </div>
          </ion-card-content>
        </ion-card> 
        <!-- List of all users-->
        <ion-card class="info-card" mode="md" v-for="person in selectedPeople" v-bind:key="person">
          <ion-card-header>
            <router-link :to="{name: 'profile', params: person}">
              <ion-card-title>{{ person.data.name }}</ion-card-title>
            </router-link>
          </ion-card-header>
          <router-link :to="{name: 'profile', params: person}">
          <ion-card-content mode="md">
            <img class="profile-icon" v-bind:src="person.data.profilePhoto">
            <div class="card-description">
              <p class="bio">{{ person.data.bio }}</p>
              <p class="balance" v-if="person.data.balance < 1000">{{person.data.balance}}.00</p>
              <p class="long-balance" v-if="person.data.balance > 999">{{person.data.balance}}.00</p>
            </div>
          </ion-card-content>
          </router-link>
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
  import GetGifts from "@/components/GetGifts.vue";
  import MoreInfo from "@/components/MoreInfo.vue";

  @Component({
    components: {
      Navbar,
      GetGifts,
      MoreInfo
    }
  })

  export default class People extends Vue {
    // Define people as object list
    people: Array<any> = [];
    selectedPeople: Array<any> = [];
    IDsOfFriends: string[] = [];
    adminInfo: object = [];

    friends: object[] =[];
    isSelected: boolean;

    searchName: string = "";
    checkFriends: boolean = false;

    created() {
      this.getPeople();
    }

    getPeople() {
        var userList = firebase.usersCollection
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        user.get().then(doc => {
            this.IDsOfFriends = doc.data().friends;
            this.isSelected = doc.data().isSelected;
        });
        // List and categorize users
        userList.get().then(snapshot => {
            snapshot.forEach(doc => {
                var userInfo = {id: doc.id, data: {balance: 0, bio: doc.data().bio, transactions: doc.data().transactions, profilePhoto: doc.data().profilePhoto, name: doc.data().name, signOnDate: doc.data().signOnDate, friends: doc.data().friends}};
                if (userInfo.id == 'admin') {
                  this.adminInfo = userInfo;
                }
                else if (userInfo.id != 'admin') {
                  this.people.push(userInfo);
                  this.selectedPeople.push(userInfo)
                  userInfo.data.balance = this.getBalance(userInfo.data.transactions);
                }
                if (this.IDsOfFriends.includes(userInfo.id)){
                  this.friends.push(userInfo)
                }
            })
          })
    }

    getBalance(transactionDoc: Array<any>) {
      var startBalance = 0;
      for (var i = 0; i < transactionDoc.length; i++) {
        var transaction = transactionDoc[i];
        startBalance = startBalance + transaction.amount;
      }
      return startBalance;
    }

    requestGift(e: Event) {
      return this.$ionic.modalController
        .create({
          component: GetGifts
        }).then(
          m => m.present()
      )
      e.preventDefault();
    }

    moreInfo(e: Event) {
      return this.$ionic.modalController
        .create({
          component: MoreInfo
        }).then(
          m => m.present()
      )
    }
    
    searchUsers(e: Event) {
      // Take searchbar input and sort through all users
      e.preventDefault()
      this.selectedPeople = []
      if (this.searchName == '') {
        this.selectedPeople = this.people
      }
      else if (this.searchName != '' ||  (this.searchName.match(/ /g)||[]).length != this.searchName.length) {
        for (var i=0;i<this.people.length;i++) {
          if (this.people[i].data.name.toLowerCase().includes(this.searchName.toLowerCase())) {
            this.selectedPeople.push(this.people[i])
          }
        }
      }
      /*this.selectedPeople = this.selectedPeople.sort(function(a, b) {
        return a.data.name.toLowerCase - b.data.name.toLowerCase;
      })*/
      e.preventDefault()
    }
  }
</script>

<style scoped>
ion-title {
  font-family: 'Nunito', sans-serif;
  font-weight: normal;
  margin-left: 0;
  text-align: center;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
ion-content {
  font-family: 'Nunito', sans-serif;
}
h1 {
  font-family: 'Nunito', sans-serif;
}
.select-user-opt-button {
  margin: 0.5em;
  width: calc(50% - 1em);
}
.info-card, .friend-info-card, #admin-info-card {
  display: inline-block;
  border-radius: 0.75em;
  width: 75vw;
  height: 45vw;
}
.info-card {
    background:
      linear-gradient(217deg, rgba(235, 236, 238, 0.8), rgba(245, 251, 255, 0) 80%),
      linear-gradient(127deg, rgba(252, 252, 252, 0.8), rgba(226, 226, 226, 0) 80%),
      linear-gradient(336deg, rgba(188, 205, 231, 0.8), rgba(215, 231, 255, 0) 80%);
}
.friend-info-card {
    padding-bottom: 1em;
    background:
      linear-gradient(217deg, rgba(255, 219, 165, 0.8), rgba(255, 219, 165, 0) 80%),
      linear-gradient(127deg, rgba(255, 223, 176, 0.8), rgba(255, 223, 176, 0) 80%),
      linear-gradient(336deg, rgba(241, 215, 208, 0.8), rgba(241, 215, 208, 0) 80%);
}
#admin-info-card {
  background: rgb(235, 235, 235);
}
 #admin-info-card ion-card-content, .friend-info-card ion-card-content, .info-card ion-card-content {
    font-family: 'Nunito', sans-serif;
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
  font-weight: normal;
  font-size: 7vw;
}
#intro-card ion-card-title {
  font-family: 'Nunito', sans-serif;
}
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
.profile-icon {
  width: 6.5em;
  height: 6.5em;
  background-color: aquamarine;
  border: solid 1px rgb(194, 194, 194);
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
  width: auto;
  height: 20vw;
  padding-left: 2.5vw;
  padding-right: 1vw;
}
.bio {
  height: 3em;
  color: rgb(47, 69, 79);
  overflow: auto;
}
.admin-bio {
  width: 40vw; 
  padding-left: 1em;
  height: 3em;
  color: rgb(47, 69, 79);
}
.balance, .long-balance {
  color: rgb(47, 69, 79);
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
}
.balance {
  font-size: 8vw;
}
.long-balance {
  font-size: 6vw;
  overflow: auto;
}
.info-card a, .friend-info-card a, #admin-info-card a {
  text-decoration: none;
}
#intro-card {
  text-align: center;
}
#intro-card ion-card-content {
  display: inline-block;
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
#search-icon {
  font-size: 8vw; 
  color: gray;
}
</style>