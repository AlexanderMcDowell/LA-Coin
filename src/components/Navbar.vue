<!--script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script-->
<template>
    <ion-buttons slot="secondary">
        <ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='/#/account'">Account</ion-button>
        <ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='/#/people'">People</ion-button>
        <ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='/#/events'">Events</ion-button>
        <!--ion-icon type="button" @click="location.href='/#/notifications'" name="notifications"></ion-icon-->
        <ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='/#/editprofile'">Settings</ion-button>
    </ion-buttons>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
    export default class Navbar extends Vue {
    }
</script>

<style scoped>
ion-button {
    width: 50px;
    height: 50px;
    font-size: 8px;
    border-radius: 50%;
    color: primary;
}
</style>
