<template>
    <ion-card mode="md">
        <ion-card-header>
            <ion-toolbar mode="ios">
                <ion-buttons slot="start">
                    <div class="back-icon">
                        <i class="ion-md-arrow-round-back" type="button" v-on:click="exit()"></i>
                    </div>
                </ion-buttons>
                <ion-card-title>User Manual!</ion-card-title>
            </ion-toolbar>
        </ion-card-header>
        <ion-card-content>
            <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Gift.png?alt=media&token=b53fccbe-f5bf-4b9a-9f51-3393c8e345ee">
            <h1 style="color: gray;">Gift</h1>
            <p>Every week, one user gets a gift based on their share of LAcoin. The more LAcoin you have, the better your chances to get paid!</p>
            <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/RedEnvelope.png?alt=media&token=b1169843-707d-402f-a2ca-b6cbdda534dd">
            <h1 style="color: darkred;">Red Envelope</h1>
            <p>Every day each user receives a Red Envelope. Depending on the day, each user has their own special gift!</p>
            <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Social.png?alt=media&token=91725371-7ebc-4a4b-bcde-03bad199f5c9">
            <h1 style="color: skyblue">Friend</h1>
            <p>Friend anyone in the app for a slight boost in LACoin!</p>
            <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Connect.png?alt=media&token=fc2b5711-5c73-4773-b203-02728a7d1c66">
            <h1 style="color: green">Transfer</h1>
            <p>Ask any user or friend for some LAcoin. Type in a negative amount to give, positive to gain.</p>
            <!--ion-button class="exit-button" mode="md" color="dark" expand="block" @click="exit()">Exit</ion-button-->
            <i id="bottom-icon" class="ion-ios-close-circle-outline" type="button" @click="exit()"></i>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";

    @Component
    
    export default class MoreInfo extends Vue {
        exit() {
            this.$ionic.modalController.dismiss()
        }
    }
</script>

<style scoped>
ion-card {
    /*background-image: linear-gradient(to bottom right, rgb(85, 255, 241), rgb(151, 199, 255));*/ /*In the Red*/
    font-family: 'Nunito', sans-serif;
    text-align: center;
    padding-bottom: 1em;
    height: 75vh;
    width: auto;
    overflow: scroll;
}
ion-card-title {
    font-family: 'Nunito', sans-serif;
    text-align: center;
    color: rgb(128, 128, 128);
    font-size: 7.5vw;
    font-weight: bold;
    margin-right: 13vw;
}
h1 {
    font-size: 12vw;
}
h1, p {
    margin: 2vw;
    text-align: center;
}
img {
    margin-top: 2em;
    border: solid 2px;
    border-color: rgb(185, 143, 2);
    border-radius: 50%;
    margin-left: 25%;
    --img-size: 50%;
    width: var(--img-size);
    height: calc(var(--img-size) + 0);
}
.exit-button {
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vw;
}
.back-icon {
	margin-left: 5vw;
	width: 8vw;
	font-size: 7.5vw;
    color: rgb(128, 128, 128);
}
#bottom-icon {
    font-size: 18vw;
    color: rgb(90, 90, 90);
}
</style>