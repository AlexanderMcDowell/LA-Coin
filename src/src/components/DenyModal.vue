<template>
    <ion-card>
        <h1>DENIED</h1>
        <h2>Action is illegal / a user error. Try again.</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/>
        <ion-button fill="outline" @click="exit()">Exit</ion-button>
    </ion-card>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
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
export default class DenyModal extends Vue {
    imageUrl: string = "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"
    exit() {
        this.$ionic.modalController.dismiss()
    }
}
</script>