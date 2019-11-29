<template>
	<ion-card id="notif-container">
		<ion-card-header>
            <ion-card-title>Notifications</ion-card-title>
            <ion-card-subtitle>Click the notification to remove.</ion-card-subtitle>
		</ion-card-header>
		<ion-card-content v-if="unreadNotif.length > 0">
			<ion-item id="notif-block" v-for="notification in unreadNotif" v-bind:key="notification">
                <div id="notif-description">
                    <h2>{{notification.description}}</h2>
                </div>
                <div id="notif-button">
                    <h2 v-if="notification.sentfrom == 'admin'" @click="removeNotif(notification)">✅</h2>
                    <h2 v-if="notification.type == 'friend'" @click="approveFriend(notification)">✅</h2>
                    <h2 v-if="notification.type == 'friend'" @click="denyFriend(notification)">❎</h2>
                    <h2 v-if="notification.type == 'transfer'" @click="approveTransaction(notification)">✅</h2>
                    <h2 v-if="notification.type == 'transfer'" @click="denyTransaction(notification)">❎</h2>
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

@Component({
  components: {
    ConfirmModal
  }
})
export default class Notifications extends Vue {
    balance: number = 0;

    unreadNotif: object[] = [];
    senduserunreadNotif: object[] = [];

    friends: string[] = [];
    senduserfriends: string[] = [];

    transactions: object[] = [];
    sendusertransactions: object[] = [];

    name: string = "";
    sendusername: string = "";

    todayDate: string = "";
    friend_substring: string = "";

    user_data_list: object[] = [];

    created() {
        this.getDate();
        this.getUserData();
        this.getUsers();
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
        });
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

    getBalance(transactionDoc: object[]) {
    var startBalance = 0;
    console.log('transactions: ' + transactionDoc)
		for (var i = 0; i < transactionDoc.length; i++) {
      var transaction = transactionDoc[i];
      //console.log('Balance')
      //console.log(transaction)
			startBalance = startBalance + transaction.amount;
    }
    return startBalance;
  }

    approveFriend(Notification: object) {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        var senduser = firebase.usersCollection.doc(Notification.sentfrom);

        // THIS IS A TO BE CLOUD FUNCTION

        var friend_return = 10;
        
        console.log('list ' + this.user_data_list)
        console.log('len ' + this.user_data_list.length)
        for (var i=0;i<this.user_data_list.length;i++){
            var user_data = this.user_data_list[i]
            if (user_data.id == Notification.sentfrom) {
                this.senduserfriends = user_data.data.friends;
                this.sendusername = user_data.data.name;
                this.senduserunreadNotif = user_data.data.unreadNotif;
                this.sendusertransactions = user_data.data.transactions;
                this.friend_substring = user_data.data.name + " and " + this.name + " are friends!";
            }
            else if (user_data.id != userId) {
                //console.log('data ' + user_data)
                user_data.data.transactions.push({date: this.todayDate,
                    amount: Math.round(-2*friend_return/this.user_data_list.length),
                    description: "Some users friended",
                    fromId: "admin", //admin means you take from everyone elses
                    toId: user_data.id})
                var outside_user = firebase.usersCollection.doc(user_data.id);
                outside_user.update({
                    transactions: user_data.data.transactions
                });
            }
        }

        //Set up notif
        var friendNotif = {date:this.todayDate, type:'Friend', sentfrom:'admin', description: this.friend_substring}

        this.friends.push(Notification.sentfrom)
        this.senduserfriends.push(userId)

        this.unreadNotif.unshift(friendNotif)
        this.senduserunreadNotif.unshift(friendNotif)

        senduser.update({
            friends: this.senduserfriends,
            unreadNotif: this.senduserunreadNotif
        });
        user.update({
            friends: this.friends,
            unreadNotif: this.unreadNotif
        });

        friend_return = Math.round(10/this.user_data_list.length)*this.user_data_list.length;
        console.log(Math.round(10/this.user_data_list.length))
        console.log(this.user_data_list.length)
        //console.log(friend_return)

        //Give user 10 la coin
        var userDescription = "Friends with  " + this.sendusername
        this.transactions.push({date: this.todayDate,
            amount: friend_return,
            description: userDescription,
            fromId: "admin", //admin means you take from everyone elses
            toId: userId})
        user.update({
            transactions: this.transactions
        });
        //Give sender 10 la coin
        var senduserDescription = "Friends with  " + this.name
       this.sendusertransactions.push({date: this.todayDate,
            amount: friend_return,
            description: senduserDescription,
            fromId: "admin", //admin means you take from everyone elses
            toId: Notification.sentfrom})
        senduser.update({
            transactions: this.sendusertransactions
        });
        // Dip into other buckets


        this.removeNotif(Notification);
        this.modalConfirm();
    }
    denyFriend(Notification: object) {
        this.removeNotif(Notification);
    }
    approveTransaction(Notification: object) {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        
        var senduser = firebase.usersCollection.doc(Notification.sentfrom);
        for (var i=0;i<this.user_data_list.length;i++){
            var user_data = this.user_data_list[i]
            if (user_data.id == Notification.sentfrom) {
                this.sendusertransactions = user_data.data.transactions;
                break
            }
        }
        if (this.balance >= Number(Notification.transfer_amount)) {
            //Take away your account money
            this.transactions.push({date: this.todayDate,
                amount: Number(Notification.transfer_amount)*-1,
                description: "Exchange",
                fromId: Notification.sentfrom, //admin means you take from everyone elses
                toId: userId})
            user.update({
                transactions: this.transactions
            });
            //give user account money
        this.sendusertransactions.push({date: this.todayDate,
                amount: Number(Notification.transfer_amount),
                description: "Exchange",
                fromId: userId, //admin means you take from everyone elses
                toId: Notification.sentfrom})
            senduser.update({
                transactions: this.sendusertransactions
            });
        }

        this.removeNotif(Notification);

        this.modalConfirm();
    }
    denyTransaction(Notification: object) {
        this.removeNotif(Notification);
    }
    removeNotif(Notification: object) {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        var index = this.unreadNotif.indexOf(Notification);
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
}
</script>

<style scoped>
#notif-container {
    height: 50vw;
    overflow: auto;
}
#notif-block {
    display: flex;
    justify-content: space-evenly;
}
#notif-description {
    width: 60vw;
    float: left;
    text-overflow: auto;
}
#notif-button {
    display: flex;
    position: absolute;
    left: 60vw;
    width: 10vw;
}
</style>