<template>
	<div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>Profile</ion-title>
                <Navbar />
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <!-- Profile Icon & Name -->
            <div id="profile">
                <!-- Change this image with the actual user icon -->
                <img id="profile-icon" src="https://www.chccw.org/wp-content/uploads/profile-icon-IMG-2-300x300.png">
                <h1 id="profile-username"><span class="rank"><strong>RANK</strong></span>{{ UserData.data.name }}</h1>
            </div>

            <!-- Profile Overview -->
            <div class="info-block">
                <h1 id="balance">💰 {{ UserData.data.balance }}.00</h1>
                <span class="vertical-line"></span>
                <div id="info-content">
                <b>Bio:</b><br>
                <i>{{ UserData.data.bio }}</i>
                <br><br><b>User Since</b><br>
                <i>{{ UserData.data.sign_on_date }}</i>
                </div>
            </div>
            <br>

            <!-- Friends List -->
            <div v-if="UserData.data.friends.length == 0" class="info-block"
                style="
                    background: rgb(48,140,53);
                    background: linear-gradient(135deg, rgba(48,140,53,1) 0%, rgba(55,143,88,1) 9%, rgba(39,221,115,1) 92%);">
                No Friends Yet!
                <br>
                <br>
            </div>
            <div v-else class="info-block"
                style="
                    background: rgb(48,140,53);
                    background: linear-gradient(135deg, rgba(48,140,53,1) 0%, rgba(55,143,88,1) 9%, rgba(39,221,115,1) 92%);">
                <ion-label v-for="friend in UserData.data.friends">
                    <h6>{{friend}}</h6>
                </ion-label>
            </div>
            <ion-button id="friend" @click="friend(UserData.data.name)" v-if="UserData.data.name != name && UserData.data.friends.includes(name) == false">Friend?</ion-button>
            <ion-button id="transfer" v-if="UserData.data.name != name">Transfer</ion-button>
        </ion-content>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'
import Navbar from "@/components/Navbar.vue";
@Component({
  components: {
    Navbar
  }
})
export default class Profile extends Vue {
    UserData: {};
    name: string = "";
    friends: string[] = [];

    getUserInfo() {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);
    user.get().then(doc => {
        this.name = doc.data().name;
      });
    }

    friend(e: Event, name:string) {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        user.get().then(doc => {
            this.friends = doc.data().friends;
        });
        this.friends.push(name)
        user.update({
            friends: this.friends
        });
        e.preventDefault();
    }

    created() {
        this.getUserInfo();
        this.UserData = this.$route.params;
        console.log(this.UserData)
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    ion-content {
        font-family: 'Roboto Slab', serif;
    }
    #profile-icon {
        width: 7.5em;
        height: 7.5em;
        background-color: aquamarine;
        border-radius: 45%;
        display: inherit;
        margin-left: inherit;
        margin-right: inherit;
        box-shadow: 0px 0.25em 0.25em #16161611;
    }
    #profile-username {
        display: inherit;
        margin-left: inherit;
        margin-right: inherit;
        text-align: center;
        vertical-align: top;
        /*font-family: 'Roboto Slab', serif;*/
    }
    #profile {
        padding-top: 2em;
        top: auto;
        bottom: auto;
        margin-left: auto;
        margin-right: auto;
    }
    .info-block {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 95%;
        overflow: hidden;
        background: rgb(67,76,170);
        background: linear-gradient(347deg, rgba(67,76,170,1) 0%, rgba(93,110,201,1) 9%, rgba(0,212,255,1) 92%);
        border-radius: 1em;
        box-shadow: 0px 1em 2em #16161633;
    }
    #balance {
        padding-left: 0.25em;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        border: center;
        float: left;
        font-size: 3em;
        /*font-family: 'Roboto Slab', serif;*/
        color: rgb(243, 229, 229);
        text-shadow: 0px 0.01em 0.2em rgba(29, 28, 28, 0.103);
    }
    #info-content {
        padding-left: 2em;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        border: center;
        float: left;
        font-size: 1em;
        /*font-family: 'Roboto Slab', serif;*/
        color: rgb(245, 246, 248);
    }
    .rank {
        text-align: inherit;
        background-color: blueviolet;
        border-radius: 0.5em;
        color: white;
        border-width: 10em;
        font-size: 0.5em;
        padding: 0.25em;
        height: 100%;
    }
    .vertical-line {
        background-color: rgba(151, 146, 146, 0.267);
        width: 0.1em;
        height: 8.5em;
        margin-left: 3em;
        float: left;
        display: block;
    }
</style>
