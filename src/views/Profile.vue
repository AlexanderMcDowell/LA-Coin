<template>
	<div class="ion-page">
        <ion-header>
        <ion-toolbar mode="ios">
      		<ion-buttons slot="start">
				<div class="back-icon">
        			<i class="ion-md-arrow-round-back" type="button" v-on:click="eventChange()"></i>
				</div>
      		</ion-buttons>
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
                        <h6><i>{{friend.data.name}}</i></h6>
                    </ion-label>
                </div>
            </div>
            <br>
            <div id="profile-buttons">
                <!-- Friend Button -->
                <ion-button mode="md" id="friend" color="success" fill="solid" @click="friend(UserData.id)" v-if="UserData.data.name != name && friends.includes(UserData.id) == false && userCanFriend == true">Friend {{UserData.data.name}}?</ion-button>
                <form id="transfer-form" v-if="UserData.data.name != name" @submit="transfer">
                    <ion-button mode="md" id="transfer" color="medium" fill="solid" type="submit" expand="block" >Transfer LAcoin to {{UserData.data.name}}?</ion-button>
                    <ion-grid>
                        <ion-row>
                            <ion-col class="input-col">
                                <ion-label mode="md" style="margin-left: 8px;"><b>Select amount</b></ion-label>
                                <ion-input mode="md" @input="transferAmount = $event.target.value" name="transferAmount" placeholder="Transaction amount"></ion-input>
                            </ion-col>
                            <ion-col class="input-col">
                                <ion-label mode="md" style="margin-left: 8px;"><b>Select message</b></ion-label>
                                <ion-select mode="md" style="margin-left: -8px;" :value="transferDescription">
                                    <ion-select-option mode="md" v-for="type in allTransferDescriptions" v-bind:key="type" :value="type">{{type}}</ion-select-option>
                                </ion-select>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                    <ion-button mode="md" class="red-envelope-set" v-if="lastRedEnvelope != todayDate && setRedEnvelope == false" color="danger" fill="solid" expand="block" @click="setRedEnvelope = true">Red Envelope?</ion-button>
                    <ion-button mode="md" class="red-envelope-set" v-if="lastRedEnvelope != todayDate && setRedEnvelope == true" color="success" fill="solid" expand="block" @click="setRedEnvelope = false">Reset Red Envelope?</ion-button>
                </form>
                
                <!-- Transaction fillout-->
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
        todayDate: string = "";

        name: string = "";
        friends: string[] = [];
        lastRedEnvelope: string = "";
        setRedEnvelope: boolean = false;
        unreadNotif: Array<any> = [];
        userCanFriend: boolean = false;
        isSelected: boolean = true;

        recipientUnreadNotif: Array<any> = []; // hah got eem
        allTransferDescriptions: string[] = [];
        
        transferAmount: number = 0;
        transferDescription: string = "[No Message]";
        userFriendsPlaceholder: Array<any> = [];

        created() {
            this.UserData = this.$route.params; // Get the user's profile data from the router (button click)
            this.UserData.data.friends = this.getProfileFriends(this.UserData.data.friends)
            this.getUserData();
            this.getDate();
        }
        getBalance(transactionDoc: Array<any>) {
            var startBalance = 0;
            for (var i = 0; i < transactionDoc.length; i++) {
                var transaction = transactionDoc[i];
                startBalance = startBalance + transaction.amount;
            }
            return startBalance;
        }
        getProfileFriends(friendIds: string[]){
            // Get friends for a weird reason
            for (var i=0;i<friendIds.length;i++) {
                var friendId = friendIds[i]
                var friendUser = firebase.usersCollection.doc(friendId);
                friendUser.get().then(doc => {
                    var friendInfo = {id:doc.id, data:doc.data()}
                    friendInfo.data.balance = this.getBalance(friendInfo.data.transactions);
                    this.userFriendsPlaceholder.push(friendInfo);
                });
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
        getUserData() {
            // Set up Firebase User calling
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            var recipientUser = firebase.usersCollection.doc(this.UserData.id);
            var descriptionsList = firebase.descriptionCollection.doc('allDescriptions');
            user.get().then(doc => {
                this.name = doc.data().name;
                this.friends = doc.data().friends;
                this.unreadNotif = doc.data().unreadNotif;
                this.lastRedEnvelope = doc.data().lastRedEnvelope;
                this.isSelected = doc.data().isSelected;
            });
            recipientUser.get().then(doc => {
                this.recipientUnreadNotif = doc.data().unreadNotif;
                this.verifyFriendReq(this.recipientUnreadNotif);
            });
            descriptionsList.get().then(doc => {
                this.allTransferDescriptions = doc.data().descriptionItems
                console.log(this.allTransferDescriptions)
            })

        }
        verifyFriendReq(recipientUnreadNotif: Array<any>) {
            var userId = firebase.auth.currentUser.uid;
            //Make sure request has not previously been sent
            for (var i = 0; i < recipientUnreadNotif.length; i++) {
                var notif = recipientUnreadNotif[i];
                if (notif.sentfrom == userId && notif.type == 'friend') {
                    this.userCanFriend = false
                    return
                }
            }​
            this.userCanFriend = true;
        }
        sendReq(reqType: string, userId: string, recipientId:string) {
            var recipientUser = firebase.usersCollection.doc(recipientId);
            // If friend notif received, send without transfer amount
            if (reqType == 'friend') {
                var notifdescription = "Make " + this.name + " your friend?";
                var friendReq = {
                    date:this.todayDate, 
                    type:reqType, 
                    sentfrom:userId, 
                    description:notifdescription
                };
                this.recipientUnreadNotif.unshift(friendReq);
                recipientUser.update({
                unreadNotif: this.recipientUnreadNotif
                });
                return this.$ionic.modalController
                    .create({
                        component: ConfirmModal
                    }).then(
                        m => m.present()
                )
            }
            // If transfer notif received, send with transfer amount
            if (reqType == 'transfer') {
                var notifdescription = this.name + " " + this.transferAmount + " LACoin Request";
                if (this.transferDescription != 'No Message') {
                    notifdescription = notifdescription + " - " + this.transferDescription
                }
                // Check if transfer amt is a number, send
                if (isNaN(this.transferAmount) == false && this.isSelected == false) {
                    if (this.setRedEnvelope == true) {
                        var transferReq = {date:this.todayDate, type:reqType, 
                            sentfrom:userId, 
                            transferAmount: Math.round(this.transferAmount), 
                            description: "(Red Envelope) " + notifdescription,
                            redEnvelope: Math.round(Math.random()*this.UserData.data.balance/4)
                        };
                        var userId = firebase.auth.currentUser.uid;
                        var user = firebase.usersCollection.doc(userId);
                        user.update({
                            lastRedEnvelope: this.todayDate
                        })
                    }
                    else {
                        var transferReq = {date:this.todayDate, type:reqType, 
                            sentfrom:userId, 
                            transferAmount: Math.round(this.transferAmount), 
                            description: notifdescription,
                            redEnvelope: 0
                        };
                    }
                    this.recipientUnreadNotif.unshift(transferReq);
                    recipientUser.update({
                    unreadNotif: this.recipientUnreadNotif
                    });
                    return this.$ionic.modalController
                    .create({
                        component: ConfirmModal
                    }).then(
                        m => m.present()
                    )
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
        friend(recipientId:string) {
            var userId = firebase.auth.currentUser.uid;
            var reqType = 'friend';
            this.sendReq(reqType, userId, recipientId);
            this.$router.push('/people');
        }
        transfer(e: Event) {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            var reqType = 'transfer'
            // Send the notification
            this.sendReq(reqType, userId, this.UserData.id)
            this.$router.push('/people');
            e.preventDefault();
        }
        eventChange() {
            this.$router.push('/people')
        }
    }
</script>

<style scoped>
    ion-title {
	font-family: 'Nunito', sans-serif;
	font-weight: normal;
	text-align: center;
	color: rgb(27, 27, 27);
	font-size: 7.5vw;
	margin-right: 13vw;
	width: 100vw;
    }
    .back-icon {
        margin-left: 5vw;
        width: 8vw;
        font-size: 7.5vw;
    }
    ion-content {
        font-family: 'Nunito', sans-serif;
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
        width: 50vw;
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
    #friend, #transfer, .red-envelope-set {
        margin-top: 5vw;
        margin-left: 8px;
        width: calc(100vw - 16px);
        height: 15vw;
        font-size: 5vw;
    }
    .padded-input {
        width: 50vw;
    }
    .input-col {
        margin: 0.5em; 
        border-radius: 5px; 
        background-color:lightgray;
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
    h6, ion-label {
        text-decoration: none;
    }
</style>