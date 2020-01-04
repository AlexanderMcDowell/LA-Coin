<template>
    <ion-card>
        <h1>DENIED</h1>
        <h2>Invalid. Try again.</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
        <ion-button fill="outline" @click="exit()">Exit</ion-button>
    </ion-card>
</template>

<style scoped>

ion-card {
    font-family: 'Roboto', serif;
    text-align: center;
    height: 55vh;
    width: auto;
}
h1 {
    text-align: center;
    color: rgb(180, 0, 0);
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
    margin-bottom: 5vh;
}
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
export default class DenyModal extends Vue {
    imageUrl: string = "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"
    exit() {
        this.$ionic.modalController.dismiss()
    }
}
</script>