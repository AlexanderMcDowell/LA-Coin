<!-- Confirmation modal whenever action succeeds-->

<template>
    <ion-card>
        <h1>Success!</h1>
        <h2>Click below to continue.</h2>
        <img id="lacoin-logo" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
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
    height: 65vh;
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
#lacoin-logo {
    border: solid 2px;
    border-color: rgb(185, 143, 2);
    background-color: rgb(255, 214, 80);
    border-radius: 50%;
    margin-left: calc(50% - 7.5em);
    width: 15em;
    height: 15em;
    margin-bottom: 1em;
}
i {
    font-size: 18vw;
    color: rgb(90, 90, 90);
}
</style>