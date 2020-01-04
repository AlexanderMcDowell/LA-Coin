<template>
    <ion-card style="height: 50vh; overflow: auto;">
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/RedEnvelope.png?alt=media&token=1cbf3c87-dc75-4b02-8e32-6da5bdfd7003">
        <h1 style="color: darkred;">Red Envelope</h1>
        <p>Every day each user receives a Red Envelope. Depending on the day, each user has their own special gift!</p>
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Social.png?alt=media&token=91725371-7ebc-4a4b-bcde-03bad199f5c9">
        <h1 style="color: skyblue">Friend</h1>
        <p>Friend anyone in the app for a slight boost in LACoin!</p>
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Connect.png?alt=media&token=fc2b5711-5c73-4773-b203-02728a7d1c66">
        <h1 style="color: green">Transfer</h1>
        <p>Ask anny user or friend for some LAcoin. Type in a negative amount to give, positive to gain.</p>
        <ion-button fill="solid" color="light" @click="exit()">Exit</ion-button>
    </ion-card>
</template>

<style scoped>

ion-card {
    /*background-image: linear-gradient(to bottom right, rgb(85, 255, 241), rgb(151, 199, 255));*/ /*In the Red*/
    font-family: 'Roboto', serif;
    text-align: center;
    height: 45vh;
    width: auto;

}
h1 {
    font-size: 12vw;
}
h1, p {
    margin: 2vw;
    text-align: center;
}
img {
    margin-top: 0;
    border: solid 2px;
    border-color: rgb(185, 143, 2);
    border-radius: 50%;
    margin-left: 25%;
    --img-size: 50%;
    width: var(--img-size);
    height: calc(var(--img-size) + 0);
}
ion-button {
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vw;
    margin-bottom: 5vh;
}
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
export default class MoreInfo extends Vue {
    imageUrl: string = "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"
    exit() {
        this.$ionic.modalController.dismiss()
    }
}
</script>