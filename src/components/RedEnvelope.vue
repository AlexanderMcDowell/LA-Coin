<template>
    <ion-card>
        <h1>Extra Gift Waiting for you.</h1>
        <img id="envelope-logo" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/RedEnvelope.png?alt=media&token=b1169843-707d-402f-a2ca-b6cbdda534dd"/>
        <p>Red Envelope Transfer!</p>
        <!--ion-button mode="md" fill="outline" @click="exit()">Exit</ion-button-->
        <i class="ion-ios-close-circle-outline" type="button" @click="exit()"></i>
    </ion-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";

    @Component

    export default class RedEnvelope extends Vue {
        imageUrl: string = "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"
        exit() {
            this.$ionic.modalController.dismiss()
        }
    }
</script>

<style scoped>
ion-card {
    font-family: 'Nunito', sans-serif;
    text-align: center;
    height: 55vh;
    width: auto;
}
h1 {
    text-align: center;
}
#envelope-logo {
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
    margin-bottom: 5vh;
}
i {
    font-size: 18vw;
    color: rgb(90, 90, 90);
}
</style>