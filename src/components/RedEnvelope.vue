<template>
    <ion-card>
        <h1>Extra Gift Waiting for you.</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/RedEnvelope.png?alt=media&token=1cbf3c87-dc75-4b02-8e32-6da5bdfd7003"/>
        <p>Red Envelope Transfer!</p>
        <ion-button fill="outline" @click="exit()">Exit</ion-button>
    </ion-card>
    <!--https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5-->
    <!--https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363-->
</template>

<style scoped>

ion-card {
    font-family: 'Roboto', serif;
    text-align: center;
    height: 45vh;
    width: auto;
}
h1 {
    text-align: center;
}
img {
    margin-top: -5vw;
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
export default class RedEnvelope extends Vue {
    imageUrl: string = "https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"
    exit() {
        this.$ionic.modalController.dismiss()
    }
}
</script>