<template>
    <ion-card>
        <h1>Success!</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/>
        <ion-button fill="outline" @click="exit()">Exit</ion-button>
    </ion-card>
</template>

<style scoped>
ion-card {
    height: 45vh;
    width: auto;
}
h1 {
    text-align: center;
}
img {
    margin-top: -10vw;
    border: solid 2px;
    border-color: navy;
    border-radius: 50%;
    margin-left: 25%;
    width: 50%;
    height: auto;
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
export default class EventModal extends Vue {
    imageUrl: string = "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"
    exit() {
        this.$ionic.modalController.dismiss()
    }
}
</script>