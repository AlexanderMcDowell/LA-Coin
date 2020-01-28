<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>People</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">

      <!-- Instructions -->

      <ion-card mode="md" class="intro-card" type="button" @click="moreInfo()">
          <ion-card-header>
            <ion-card-title>Welcome to the LAcoin Community!</ion-card-title>
          </ion-card-header>
          <ion-card-content id="content-text">
            <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
            <p>Click on any user's name to reach out, make a transaction, and more!</p>
            <p><b>Click here for more info!</b></p>
          </ion-card-content>
        </ion-card>
      <!-- Admin Card ADD v-if later!!!!!-->
      <ion-card mode="md" class="admin-info-card" type="button" @click="requestGift()">
          <ion-card-header>
              <ion-card-title>{{ adminInfo.data.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="basic-info">
              <img v-if="isSelected == false" class="profile-icon" v-bind:src="adminInfo.data.profilePhoto">
              <img v-else class="profile-icon" v-bind:src="adminInfo.data.selectedProfilePhoto">
            </div>
            <div class="card-description">
              <p v-if="isSelected == false">{{ adminInfo.data.bio }}</p>
              <p v-else>{{ adminInfo.data.selectedBio }}</p>
            </div>
          </ion-card-content>
        </ion-card>
      <!-- List of your Friends-->
      <div id="friends" v-if="friends.length > 0">
        <h1>Your friends</h1>
        <ion-card mode="md" class="friend-info-card" v-for="friend in friends" v-bind:key="friend">
          <ion-card-header>
            <router-link :to="{name: 'profile', params: friend}">
              <ion-card-title>{{ friend.data.name }}</ion-card-title>
            </router-link>
          </ion-card-header>
          <router-link :to="{name: 'profile', params: friend}">
          <ion-card-content>
            <div class="basic-info">
              <img class="profile-icon" v-bind:src="friend.data.profilePhoto">
            </div>
            <div class="card-description">
              <p class="bio">{{ friend.data.bio }}</p>
              <p class="balance" v-if="friend.data.balance < 1000">{{friend.data.balance}}.00</p>
              <p class="long-balance" v-if="friend.data.balance > 999">{{friend.data.balance}}.00</p>
            </div>
          </ion-card-content>
          </router-link>
        </ion-card>
      </div>

      <ion-list>
        <!-- List of all users, no friends yet-->

        <h1>All Users</h1>
        <ion-card mode="md" class="info-card" v-for="person in people" v-bind:key="person">
          <ion-card-header>
            <router-link :to="{name: 'profile', params: person}">
              <ion-card-title>{{ person.data.name }}</ion-card-title>
            </router-link>
          </ion-card-header>
          <router-link :to="{name: 'profile', params: person}">
          <ion-card-content>
            <div class="basic-info">
              <img class="profile-icon" v-bind:src="person.data.profilePhoto">
            </div>
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
    people: object[] = [];
    IDsOfFriends: string[] = [];
    adminInfo: object = [];

    friends: object[] =[];
    isSelected: boolean;

    created() {
      this.getPeople();
    }
    // Get data of all users
    getPeople() {
        var users = firebase.usersCollection
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        user.get().then(doc => {
            this.IDsOfFriends = doc.data().friends;
            this.isSelected = doc.data().isSelected;
        });
        users.get().then(snapshot => {
            snapshot.forEach(doc => {
                var userInfo = {id: doc.id, data: doc.data()};
                if (userInfo.id == 'admin') {
                  this.adminInfo = userInfo;
                }
                else if (userInfo.id != 'admin') {
                  this.people.push(userInfo);
                  userInfo.data.balance = this.getBalance(userInfo.data.transactions);
                }
                if (this.IDsOfFriends.includes(userInfo.id)){
                  this.friends.push(userInfo)
                }
            })
        })
        //console.log(this.people)
    }
    getBalance(transactionDoc: Array<any>) {
    var startBalance = 0;
    //console.log(transactionDoc)
		for (var i = 0; i < transactionDoc.length; i++) {
      var transaction = transactionDoc[i];
      //console.log(transaction)
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
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        // add reload
        //this.$router.go();
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
.info-card, .friend-info-card, .admin-info-card {
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
.admin-info-card {
  background: rgb(235, 235, 235);
}
ion-card-content{
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
.intro-card ion-card-title {
  font-family: 'Roboto', sans-serif;
}
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
.profile-icon {
  width: 25vw;
  height: 25vw;
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
  width: 100vw;
  height: 20vw;
  padding-left: 2.5vw;
  padding-right: 1vw;
}
.bio {
  height: 3em;
  color: rgb(47, 69, 79);
  overflow: auto;
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
.info-card a, .friend-info-card a, .admin-info-card a {
  text-decoration: none;
}
.intro-card {
  text-align: center;
}
#content-text {
  display: inline-block;
}
#content-text img {
  border: solid 2px;
  border-color: rgb(185, 143, 2);
  border-radius: 50%;
  background-color: rgb(255, 214, 80);
  margin-left: 25%;
  margin-bottom: 5vw;
  --img-size: 50%;
  width: var(--img-size);
  height: var(--img-size);
}
</style>