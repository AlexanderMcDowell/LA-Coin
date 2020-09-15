<!-- All of User's notifications that have not been read -->

<template>
	<ion-card mode="md" id="notif-card">
        <!-- Card Header -->
		<ion-card-header>
            <ion-card-title>Notifications</ion-card-title>
            <ion-card-subtitle>Click the notification to remove.</ion-card-subtitle>
		</ion-card-header>
        <!-- Card Content -->
		<ion-card-content mode="md" v-if="unreadNotif.length > 0">
            <!-- List of all User's Notifications -->
			<ion-item id="notif-block" v-for="notification in unreadNotif" v-bind:key="notification">
                <div id="notif-description">
                    <h2>{{notification.description}}</h2>
                </div>
                <!-- Accept/Delete Notification Buttons -->
                <div id="notif-button">
                    <i class="ion-md-checkmark-circle" v-if="notification.type != 'friend' && notification.type != 'transfer'" @click="removeNotif(notification)"></i>
                    <i class="ion-md-checkmark-circle" v-if="notification.type == 'friend'" @click="reward(notification, 'friend')"></i>
                    <i class="ion-md-close-circle-outline" v-if="notification.type == 'friend'" @click="denyFriend(notification)"></i>
                    <i class="ion-md-checkmark-circle" v-if="notification.type == 'transfer'" @click="approveTransaction(notification)"></i>
                    <i class="ion-md-close-circle-outline" v-if="notification.type == 'transfer'" @click="denyTransaction(notification)"></i>
                </div>
            </ion-item>
		</ion-card-content>
        <ion-card-content v-else>
            <h2 id="notif-description">No new notifications</h2>
        </ion-card-content>
	</ion-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import firebase from '@/firebase.config'
    import ConfirmModal from "@/components/ConfirmModal.vue";
    import DenyModal from "@/components/DenyModal.vue";
    import RedEnvelope from "@/components/RedEnvelope.vue";

    @Component({
        components: {
            ConfirmModal,
            DenyModal,
            RedEnvelope
        }
    })

    export default class Notifications extends Vue {
        todayDate: string = "";
        friendSubstring: string = "";
        userDataList: Array<any> = [];

        name: string = "";
        balance: number = 0;
        unreadNotif: Array<any> = [];
        friends: string[] = [];
        transactions: Array<any> = [];

        sendusername: string = "";
        senduserUnreadNotif: Array<any> = [];
        senduserFriends: string[] = [];
        senduserTransactions: Array<any> = [];
        
        created() {
            this.getDate(); // Get today's date
            this.getUserData();
            this.getUsers(); // Get list of all users
        }

        getDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            this.todayDate = mm + '/' + dd + '/' + yyyy;
        }

        getUserData() {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            user.get().then(doc => {
                this.name = doc.data().name;
                this.unreadNotif = doc.data().unreadNotif;
                this.friends = doc.data().friends;
                this.transactions = doc.data().transactions;
                this.balance = this.getBalance(doc.data().transactions);
                
                // Check if notif field length greater than 20; if so, archive the last message
                if (this.unreadNotif.length > 20) {
                    //this.archiveNotif(this.unreadNotif[20])
                    this.unreadNotif.pop()
                }
            });
        }

        getUsers() {
            var users = firebase.usersCollection
            users.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.userDataList.push({id: doc.id, data: doc.data()})
                })
            })
        }

        getBalance(transactionDoc: Array<any>) {
            // Express balance as sum of transactions
            var startBalance = 0;
                for (var i = 0; i < transactionDoc.length; i++) {
            var transaction = transactionDoc[i];
                startBalance = startBalance + transaction.amount;
            }
            return startBalance;
        }

        reward(Notification: any, type: string) {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            var senduser = firebase.usersCollection.doc(Notification.sentfrom);

            if (this.friends.includes(Notification.sentfrom) == false) {
                this.denyFriend(Notification)
                return
            }

           // Check whether or not the notification is a friend/red envelope request
            if (type == 'friend') {
                var friendReturn = 10;
            }
            else {
                var friendReturn = Number(Notification.redEnvelope);
            }

            // Set up info on share
            var percentOfTotalCoin = (2*friendReturn)/(250*(this.userDataList.length-3))
            var recordTotalAmtRetracted = 0; //Track how much money has been retracted from the system
            
            // Ierate through users, take out certain balance amt to keep lacoin total constant
            for (var i=0;i<this.userDataList.length;i++){
                var userData = this.userDataList[i]
                if (userData.id == Notification.sentfrom) {
                    // Get data of user where notif is to be sent
                    this.senduserFriends = userData.data.friends;
                    this.sendusername = userData.data.name;
                    this.senduserUnreadNotif = userData.data.unreadNotif;
                    this.senduserTransactions = userData.data.transactions;
                    if (type == 'friend') {
                        this.friendSubstring = userData.data.name + " and " + this.name + " are friends!";
                    }
                    else {
                        this.friendSubstring = "Red Envelope with " + userData.data.name + " and " + this.name + "!";
                    }
                }
                else if (userData.id != userId && userData.id != 'admin') {
                    // Other 3rd party user
                    if (type == 'friend') {
                        var outsideMessage = "Some users friended";
                    }
                    else {
                        var outsideMessage = "Red Envelope";
                    }
                    var userBalance = this.getBalance(userData.data.transactions);
                    var subtractBalance = Math.round(userBalance*percentOfTotalCoin);
                    recordTotalAmtRetracted = recordTotalAmtRetracted + subtractBalance;

                    userData.data.transactions.unshift({date: this.todayDate,
                        amount: -1*subtractBalance,
                        description: outsideMessage,
                        fromId: "admin", 
                        toId: userData.id,
                        type: 'deduction'
                        })
                    var outsideUser = firebase.usersCollection.doc(userData.id);
                    outsideUser.update({
                        transactions: userData.data.transactions
                    });
                }
            }
            //Set up notif
            if (type == 'friend') {
                var friendNotif = {date:this.todayDate, type:'Friend', sentfrom:'admin', description: this.friendSubstring}
                this.friends.push(Notification.sentfrom)
                this.senduserFriends.push(userId)
                this.unreadNotif.unshift(friendNotif)
                this.senduserUnreadNotif.unshift(friendNotif)

                senduser.update({
                    friends: this.senduserFriends,
                    unreadNotif: this.senduserUnreadNotif
                });
                user.update({
                    friends: this.friends,
                    unreadNotif: this.unreadNotif
                });
            }
            friendReturn = Math.round(recordTotalAmtRetracted/2);
            //console.log(friendReturn)
            //Give user 10 la coin
            if (type == 'friend') {
                var userDescription = "Friends with  " + this.sendusername
                var transactionType = 'friend'
            }
            else {
                var userDescription = "Red Envelope with  " + this.sendusername
                var transactionType = 'red envelope'
            }
            this.transactions.unshift({date: this.todayDate,
                amount: friendReturn,
                description: userDescription,
                fromId: "admin", //admin means you take from everyone elses
                toId: userId,
                type: transactionType
                })
            user.update({
                transactions: this.transactions
            });
            //Give sender 10 la coin
            if (type == 'friend') {
                var senduserDescription = "Friends with  " + this.name
                var transactionType = 'friend'
            }
            else {
                var senduserDescription = "Red Envelope with  " + this.name
                var transactionType = 'red envelope'
            }
            this.senduserTransactions.unshift({date: this.todayDate,
                amount: friendReturn,
                description: senduserDescription,
                fromId: "admin", //admin means you take from everyone elses
                toId: Notification.sentfrom,
                type: transactionType
                })
            senduser.update({
                transactions: this.senduserTransactions
            });
            // Dip into other buckets
            if (type == 'friend') {
                this.removeNotif(Notification);
                this.modalConfirm();
            }
        }

        denyFriend(Notification: object) {
            this.removeNotif(Notification);
        }

        approveTransaction(Notification: any) {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            
            var senduser = firebase.usersCollection.doc(Notification.sentfrom);

            for (var i=0;i<this.userDataList.length;i++){
                var userData = this.userDataList[i]
                if (userData.id == Notification.sentfrom) {
                    this.senduserTransactions = userData.data.transactions;
                    this.sendusername = userData.data.name;
                    break
                }
            }

            this.removeNotif(Notification);

            var senduserTransactionDescription = "Exchange with " + this.name;
            var userTransactionDescription = "Exchange with " + this.sendusername;

            if (this.balance >= Number(Notification.transferAmount)) {
                //Take away your account money
                this.transactions.unshift({date: this.todayDate,
                    amount: Number(Notification.transferAmount)*-1,
                    description: userTransactionDescription,
                    fromId: Notification.sentfrom, //admin means you take from everyone elses
                    toId: userId,
                    type: 'exchange'})
                user.update({
                    transactions: this.transactions
                });
                //give user account money
                this.senduserTransactions.unshift({date: this.todayDate,
                    amount: Number(Notification.transferAmount),
                    description: senduserTransactionDescription,
                    fromId: userId, //admin means you take from everyone elses
                    toId: Notification.sentfrom,
                    type: 'exchange'})
                senduser.update({
                    transactions: this.senduserTransactions
                });
                if (Notification.redEnvelope != 0) {
                    this.reward(Notification, 'redEnvelope')
                    this.modalRedEnvelope();
                }
                else {
                    this.modalConfirm();
                }
            }
            else {
                this.modalDeny();
            }
        }

        denyTransaction(Notification: object) {
            this.removeNotif(Notification);
        }

        removeNotif(Notification: object) {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            var index = this.unreadNotif.indexOf(Notification);
            //this.archiveNotif(Notification)
            this.unreadNotif.splice(index, 1);
            user.update({
                unreadNotif: this.unreadNotif
            });
        }

        modalConfirm() {
            return this.$ionic.modalController
                    .create({
                        component: ConfirmModal
                    }).then(
            m => m.present()
                    )
        }

        modalDeny() {
            return this.$ionic.modalController
                    .create({
                        component: DenyModal
                    }).then(
            m => m.present()
                    )
        }

        modalRedEnvelope() {
            return this.$ionic.modalController
                    .create({
                        component: RedEnvelope
                    }).then(
            m => m.present()
                    )
        }
    }
</script>

<style scoped>
ion-card-title {
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
    font-size: 5vw;
}
ion-card-content {
    height: 42.5vw;
    font-family: 'Nunito', sans-serif;
    overflow-y: scroll;
}
#notif-card {
    font-family: 'Nunito', sans-serif;
    height: 67.5vw;
}
#notif-block {
    display: flex;
    justify-content: space-evenly;
}
#notif-description {
    font-family: 'Nunito', sans-serif;
    width: 50vw;
    float: left;
    text-overflow: auto;
}
#notif-button {
    display: flex;
    position: absolute;
    left: 50vw;
    width: 50vw;
}
#notif-button i {
    margin-left: 0.5em;
    font-size: 1.75em;
}
</style>