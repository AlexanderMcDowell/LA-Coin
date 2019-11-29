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
                <img id="profile-icon" v-bind:src="UserData.data.profile_photo">
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
                        <i>{{ UserData.data.sign_on_date }}</i>
                    </div>
                </div>
            </div>
            <br>

            <!-- Friends List, if no friends -->
            <div id="friend-list" v-if="UserData.data.friends.length == 0" class="info-block"
                style="
                    color: white;
                    background: rgb(48,140,53);
                    background: linear-gradient(135deg, rgba(48,140,53,1) 0%, rgba(55,143,88,1) 9%, rgba(39,221,115,1) 92%);">
                No Friends Yet!
                <br>
                <br>
            </div>

            <!-- Friends List -->
            <div v-else class="info-block"
                style="
                    color: white;
                    background: rgb(48,140,53);
                    background: linear-gradient(135deg, rgba(48,140,53,1) 0%, rgba(55,143,88,1) 9%, rgba(39,221,115,1) 92%);">
                <ion-label id="friend-list" v-for="friend in UserData.data.friends" v-bind:key="friend">
                    <h6>{{friend}}</h6>
                </ion-label>
            </div>
            <div id="profile-buttons">
                    <!-- Friend Button -->
                    <ion-button id="friend" color="medium" fill="solid" @click="friend(UserData.id)" v-if="UserData.data.name != name && UserData.data.friends.includes(name) == false">Friend?</ion-button>

                    <!-- Transaction fillout-->
                    <form id="transfer-form" v-if="UserData.data.name != name" @submit="transfer">
                        <ion-button id="transfer" color="medium" fill="solid" type="submit" expand="block" >Transfer</ion-button>
                        <ion-item>
                            <ion-label position="floating">Transfer Amount</ion-label>
                            <ion-input id="transfer-amount" :value="transfer_amount" @input="transfer_amount = $event.target.value" name="transfer_amount" placeholder="Transaction amount">
                            </ion-input>
                            <ion-label position="floating">Transfer Description</ion-label>
                            <ion-input id="transfer-description" :value="transfer_description" @input="transfer_description = $event.target.value" name="transfer_description" placeholder="Transaction Description" maxlength=20>
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

@Component({
  components: {
    Navbar
  }
})

export default class Profile extends Vue {
    UserData: {};
    name: string = "";
    friends: string[] = [];

    unreadNotif: object[] = [];
    recipient_unreadNotif: object[] = [];
    
    todayDate: string = "";

    transfer_amount: number = 0;
    transfer_description: string = "";

    created() {
        this.UserData = this.$route.params;
        console.log(this.UserData)
        this.UserData.data.friends = this.getProfileFriends(this.UserData.data.friends)

        this.getUserInfo();
        this.getDate();

        // Get the user's profile data from the router (button click)
    }

    getProfileFriends(friend_ids: string[]){
        var newFriendList = [];
        for (var i=0;i<friend_ids.length;i++) {
            var friend_id = friend_ids[i]
            var friend_user = firebase.usersCollection.doc(friend_id);
            friend_user.get().then(doc => {
                newFriendList.push(doc.data().name);
            });
        }
        return newFriendList
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
        this.recipient_unreadNotif = doc.data().unreadNotif;
      });
    }

    //Make sure request has not previously been sent
    check_friend_req(req: object[], userId: string, req_type: string) {
        for (var i = 0; i < req.length; i++) {
          var notif = req[i];
          if (notif.sentfrom == userId && notif.type == req_type) {
              return false;
          }
        }​
        return true;
    }

    send_req(req_type: string, userId: string, recipient_id:string) {
        var recipient_user = firebase.usersCollection.doc(recipient_id);
        console.log('infunc' + req_type)

        // If friend notif received, send without transfer amount
        if (req_type == 'friend') {
            var notifdescription = "Make " + this.name + " your friend?";
            var friend_req = {date:this.todayDate, type:req_type, 
                            sentfrom:userId, description:notifdescription
                            };
            console.log('friend req ' + friend_req)
            this.recipient_unreadNotif.unshift(friend_req);
            recipient_user.update({
            unreadNotif: this.recipient_unreadNotif
            });
        }

        // If transfer notif received, send with transfer amount
        if (req_type == 'transfer') {
            console.log('transfer')
            var notifdescription = this.name + " " + this.transfer_amount + " LACoin request";
            if (this.transfer_description.length > 0) {
                notifdescription = notifdescription + ": " + this.transfer_description
            }
            var transfer_req = {date:this.todayDate, type:req_type, 
                            sentfrom:userId, transfer_amount: 
                            this.transfer_amount, description:notifdescription
                            };
            this.recipient_unreadNotif.unshift(transfer_req);
            recipient_user.update({
            unreadNotif: this.recipient_unreadNotif
            });
        }
    }

    friend(recipient_id:string) {
        console.log('got in')
        console.log(recipient_id)
        var userId = firebase.auth.currentUser.uid;

        var req_type = 'friend';

        if (this.check_friend_req(this.unreadNotif, userId, req_type) == false) {
            return false;
        }

        // Send the notification
        this.send_req(req_type, userId, recipient_id);
        this.$router.push('/people');
    }

    transfer(e: Event) {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);

        var req_type = 'transfer'

        // Send the notification
        this.send_req(req_type, userId, this.UserData.id)
        this.$router.push('/people');
        e.preventDefault();
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    ion-title {
        margin-left: 0;
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
        padding-bottom: 60vw;
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
        float: left;
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
    #friend-list {
        padding-top: 1em;
        padding-left: 2em;
    }
    #friend-list h6 {
        padding-left: 2em;
        padding-bottom: 1em;
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
</style>
