<template>
    <ion-card>
        <h1>Gift Request Received!</h1>
        <h2>Your request has been sent to us with your address.</h2>
        <img id="gift-logo" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Gift.png?alt=media&token=b53fccbe-f5bf-4b9a-9f51-3393c8e345ee"/>
        <!--ion-button mode="md" fill="outline" @click="exit()">Exit</ion-button-->
        <i class="ion-ios-close-circle-outline" type="button" @click="exit()"></i>
    </ion-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";

    @Component
    
    export default class EventModal extends Vue {
        exit() {
            this.$ionic.modalController.dismiss()
        }
    }
</script>

<style scoped>
ion-card {
    font-family: 'Nunito', sans-serif;
    text-align: center;
    height: 60vh;
    width: auto;
    display: inline-block;
}
h1 {
    text-align: center;
    color: rgb(185, 143, 2);
    font-weight: bold;
}
h2 {
    color: gray;
    margin: 0 0 1em 0;
    font-size: 5vw;
}
#gift-logo {
    border: solid 2px;
    border-color: rgb(185, 143, 2);
    background-color: rgb(255, 214, 80);
    border-radius: 50%;
    margin-left: calc(50% - 7.5em);
    width: 15em;
    height: 15em;
    margin-bottom: 1em;
}
ion-button {
    margin: 0 10% 4vh 10%;
    width: 80%;
}
i {
    font-size: 18vw;
    color: rgb(90, 90, 90);
}
</style>