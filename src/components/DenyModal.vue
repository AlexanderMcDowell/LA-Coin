<template>
    <ion-card>
        <h1>DENIED</h1>
        <h2>Invalid. Try again.</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
        <!--ion-button mode="md" fill="outline" @click="exit()">Exit</ion-button-->
        <i class="ion-ios-close-circle-outline" type="button" @click="exit()"></i>
    </ion-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";

    @Component
    
    export default class DenyModal extends Vue {
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
    display: inline-block;
}
h1 {
    text-align: center;
    font-weight: bold;
    color: rgb(180, 0, 0);
}
h2 {
    margin: 0 0 1em 0;
    font-size: 5vw;
}
img {
    margin-bottom: 1em;
    border: solid 2px;
    border-color: rgb(185, 143, 2);
    border-radius: 50%;
    margin-left: 25%;
    --img-size: 50%;
    width: var(--img-size);
    height: calc(var(--img-size) + 0);
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