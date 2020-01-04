<template>
    <div class="button-container">
        <div class="button-div">
            <i class="ion-md-contact" style="font-size: 20vw" type="button" onclick="location.href='#/account'"></i>
            <h6>Account</h6>
        </div>
        <!--ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='#/account'">Account</ion-button-->
        <div class="button-div">
            <i class="ion-md-contacts" style="font-size: 20vw" type="button" onclick="location.href='#/people'"></i>
            <h6>People</h6>
        </div>
        <!--ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='#/people'">People</ion-button-->
        <div class="button-div">
            <i class="ion-md-ribbon" style="font-size: 20vw" type="button" onclick="location.href='#/events'"></i>
            <h6>Events</h6>
        </div>
        <!--ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='#/events'">Events</ion-button-->
        <div class="button-div">
            <i class="ion-ios-cog" style="font-size: 20vw" type="button" onclick="location.href='#/editprofile'"></i>
            <h6>Settings</h6>
        </div>
        <!--ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='#/editprofile'">Settings</ion-button-->
    </div>
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
.button-container {
    padding-top: 2vw;
    padding-bottom: 2vw;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    /*background-color: rgb(250, 250, 250);*/
}
.button-div {
    display: inline-block;
}
.button-div h6 {
    font-family: 'Nunito', sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 4vw;
}
</style>