<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
            <ion-title>Notifications</ion-title>
            <ion-subtitle>Click the notification to remove.</ion-subtitle>
            <Navbar />
            </ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-item type="button" @click="removeNotif(notification)" v-for="notification in unreadNotif" v-bind:key="notification">
                <h2 id="notif-description">{{notification}}</h2>
                <ion-icon type="button" name="thumbs-up" id="notif-button" v-if="notification.isTransaction == true" @click="approveTransaction()"></ion-icon>
                <ion-icon type="button" name="thumbs-down" id="notif-button" v-if="notification.isTransaction == true" @click="denyTransaction()"></ion-icon>
            </ion-item>
		</ion-content>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'

@Component
export default class Notifications extends Vue {
    unreadNotif: {}
    getNotifs() {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);
        user.get().then(doc => {
            this.unreadNotif = doc.data().unreadNotif;
        });
    }
}
</script>

<style scoped>
#notif-description {
    float:left
}
#notif-button {
    float:right
}
</style>