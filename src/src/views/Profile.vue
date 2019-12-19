<!-- Later: add a custom note bubble to send with your notif-->

<template>
	<div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>Profile</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <!-- Profile Icon & Name -->
            <div id="profile">
                <img id="profile-icon" v-bind:src="UserData.data.profilePhoto">
                <h1 id="profile-username">{{ UserData.data.name }}</h1>
            </div>

            <!-- Profile Overview -->
            <div class="info-block">
                <!--span class="vertical-line"></span-->
                <div id="info-content">
                    <h1 id="balance">💰{{ UserData.data.balance }}.00</h1>
                    <br><i id="bio-field">{{ UserData.data.bio }}</i><br>
                    <div id="date-field">
                        <br><b>User Since</b><br>
                        <i>{{ UserData.data.signOnDate }}</i>
                    </div>
                </div>
                <!-- Friends List, if no friends -->
                <div id="friend-list" v-if="UserData.data.friends.length == 0">
                    <ion-label id="friend-title-label">No Friends Yet!</ion-label>
                </div>

                <!-- Friends List -->
                <div id="friend-list" v-else>
                    <ion-label id="friend-title-label"><b>Friends:</b></ion-label>
                    <ion-label id="friend-list-label" v-for="friend in UserData.data.friends" v-bind:key="friend">
                        <!--router-link :to="{name: 'profile', params: friend}"--><h6><i>{{friend.data.name}}</i></h6><!--/router-link-->
                    </ion-label>
                </div>
            </div>
            <br>

            <div id="profile-buttons" v-if="friends.includes(UserData.id) == false">
                    <!-- Friend Button -->
                    <ion-button id="friend" color="medium" fill="solid" @click="friend(UserData.id)" v-if="UserData.data.name != name && UserData.data.friends.includes(name) == false">Friend?</ion-button>

                    <!-- Transaction fillout-->
                    <form id="transfer-form" v-if="UserData.data.name != name" @submit="transfer">
                        <ion-button id="transfer" color="medium" fill="solid" type="submit" expand="block" >Transfer</ion-button>
                        <ion-item>
                            <ion-label position="floating">Transfer Amount</ion-label>
                            <ion-input id="transfer-amount" :value="transferAmount" @input="transferAmount = $event.target.value" name="transferAmount" placeholder="Transaction amount">
                            </ion-input>
                            <ion-label position="floating">Transfer Description</ion-label>
                            <ion-input id="transfer-description" :value="transferDescription" @input="transferDescription = $event.target.value" name="transferDescription" placeholder="Transaction Description" maxlength=20>
                            </ion-input>
                        </ion-item>
                    </form>
                </div>
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
import DenyModal from "@/components/DenyModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

@Component({
  components: {
    Navbar,
    DenyModal,
    ConfirmModal
  }
})

export default class Profile extends Vue {
    UserData: any = {};
    name: string = "";
    friends: string[] = [];

    unreadNotif: Array<any> = [];
    recipientUnreadNotif: Array<any> = []; // hah got eem
    
    todayDate: string = "";

    transferAmount: number = 0;
    transferDescription: string = "";

    userFriendsPlaceholder: Array<any> = [];

    created() {
        this.UserData = this.$route.params;
        console.log(this.UserData)
        this.UserData.data.friends = this.getProfileFriends(this.UserData.data.friends)

        this.getUserInfo();
        this.getDate();

        // Get the user's profile data from the router (button click)
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

    getProfileFriends(friend_ids: string[]){
        for (var i=0;i<friend_ids.length;i++) {
            var friend_id = friend_ids[i]
            var friend_user = firebase.usersCollection.doc(friend_id);
            friend_user.get().then(doc => {
                var friendInfo = {id:doc.id, data:doc.data()}
                friendInfo.data.balance = this.getBalance(friendInfo.data.transactions);
                this.userFriendsPlaceholder.push(friendInfo);
            });
            console.log(this.userFriendsPlaceholder)
        }
        return this.userFriendsPlaceholder
    }

    getDate() {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();
		this.todayDate = mm + '/' + dd + '/' + yyyy;
	}

    getUserInfo() {
        // Set up Firebase User calling
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);

        var recipient_user = firebase.usersCollection.doc(this.UserData.id);

        user.get().then(doc => {
            this.name = doc.data().name;
            this.friends = doc.data().friends;
            this.unreadNotif = doc.data().unreadNotif;
        });

        recipient_user.get().then(doc => {
            this.recipientUnreadNotif = doc.data().unreadNotif;
        });
    }

    //Make sure request has not previously been sent
    check_friend_req(userId: string, reqType: string) {
        console.log(this.recipientUnreadNotif.length)
        for (var i = 0; i < this.recipientUnreadNotif.length; i++) {
          var notif = this.recipientUnreadNotif[i];
          console.log(notif)
          if (notif.sentfrom == userId && notif.type == reqType) {
              return false;
          }
        }​
        return true;
    }

    send_req(reqType: string, userId: string, recipient_id:string) {
        var recipient_user = firebase.usersCollection.doc(recipient_id);
        console.log('infunc' + reqType)

        // If friend notif received, send without transfer amount
        if (reqType == 'friend') {
            var notifdescription = "Make " + this.name + " your friend?";
            var friend_req = {date:this.todayDate, type:reqType, 
                            sentfrom:userId, description:notifdescription
                            };
            console.log('friend req ' + friend_req)
            this.recipientUnreadNotif.unshift(friend_req);
            recipient_user.update({
            unreadNotif: this.recipientUnreadNotif
            });
        }

        // If transfer notif received, send with transfer amount
        if (reqType == 'transfer') {
            console.log('transfer')
            var notifdescription = this.name + " " + this.transferAmount + " LACoin request";
            if (this.transferDescription.length > 0) {
                notifdescription = notifdescription + ": " + this.transferDescription
            }
            console.log(typeof this.transferAmount)
            if (isNaN(this.transferAmount) == false) {
                console.log(this.transferAmount)
                this.transferAmount = Math.abs(this.transferAmount);
                var transferReq = {date:this.todayDate, type:reqType, 
                            sentfrom:userId, transferAmount: 
                            Math.round(this.transferAmount), description:notifdescription
                            };
                this.recipientUnreadNotif.unshift(transferReq);
                recipient_user.update({
                unreadNotif: this.recipientUnreadNotif
                });
            }
            else {
                return this.$ionic.modalController
                .create({
                    component: DenyModal
                }).then(
                    m => m.present()
                )
            }
        }
    }

    friend(recipient_id:string) {
        console.log('got in')
        console.log(recipient_id)
        var userId = firebase.auth.currentUser.uid;

        var reqType = 'friend';

        if (this.check_friend_req(userId, reqType) == true) {
            // Send the notification
            this.send_req(reqType, userId, recipient_id);
        }
        this.$router.push('/people');
    }

    transfer(e: Event) {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);

        var reqType = 'transfer'

        // Send the notification
        this.send_req(reqType, userId, this.UserData.id)
        this.$router.push('/people');
        e.preventDefault();
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    ion-title {
        font-family: 'Roboto', serif;
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
    #profile-icon {
        width: 15em;
        height: 15em;
        background-color: aquamarine;
        border-radius: 50%;
        display: inherit;
        margin-left: inherit;
        margin-right: inherit;
        border: solid 2px;
        border-color: lightslategray;
        box-shadow: 0px 0.25em 0.25em #16161611;
    }
    #profile-username {
        display: inherit;
        text-align: center;
        margin-left: inherit;
        margin-right: inherit;
        width: 95vw;
        vertical-align: top;
        background-color: blueviolet;
        border-radius: 0.5em;
        color: white;
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
        width: 95vw;
        overflow: hidden;
        background: rgb(67,76,170);
        background: linear-gradient(347deg, rgba(67,76,170,1) 0%, rgba(93,110,201,1) 9%, rgba(0,212,255,1) 92%);
        border-radius: 1em;
        box-shadow: 0px 1em 2em #16161633;
    }
    #balance {
        position:absolute;
        margin-top: 0;
        /*padding-left: 0.25em;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        border: center;*/
        float: left;
        font-size: 2.5em;
        /*font-family: 'Roboto Slab', serif;*/
        color: rgb(243, 229, 229);
        text-shadow: 0px 0.01em 0.2em rgba(29, 28, 28, 0.103);
    }
    #info-content {
        position:absolute;
        margin-top: 10vw;
        width: 65vw;
        padding-left: 2em;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        border: center;
        font-size: 1em;
        display: inline-block;
        /*font-family: 'Roboto Slab', serif;*/
        color: rgb(245, 246, 248);
    }
    #bio-field {
        position:absolute;
        margin-top: 10vw;
        float: left;
        text-overflow: auto;
    }
    #date-field {
        position:absolute;
        margin-top: 10vw;
        float: left;
    }
    #friend-list-label {
        color:rgb(238, 238, 238);
        text-transform: uppercase;
        text-decoration: none;
    }
    #friend-list {
        text-overflow: auto;
        color: white;
        margin-top: 10vw;
        border-left: solid 2px white;
        float:right;
        width: 35vw;
        padding-bottom: calc(60vw - 4em);
        margin-bottom: 2em;
    }
    #friend-list {
        padding-top: 1em;
        padding-left: 1em;
    }
    #friend, #transfer {
        margin-top: 5vw;
        margin-left: 8px;
        width: calc(100vw - 16px);
        height: 15vw;
        font-size: 5vw;
    }
    ion-item {
        margin: 0;
        position: absolute;
        float: left;
        width: 100vw;
        border: 2px transparent;
        border-radius: 10px;
    }
    router-link {
        text-decoration: none;
    }
    h6, ion-label, i {
        text-decoration: none;
    }
</style>