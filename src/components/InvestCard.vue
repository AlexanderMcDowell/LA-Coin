<template>
        <button id="cool-invest-button" v-on:click="invest()">Invest?</button>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import firebase from "@/firebase.config";

import InvestModal from "@/components/InvestModal.vue";

@Component({
  components: {
      InvestModal
  }
})

export default class InvestCard extends Vue {
    invest(e: Event) {
        return this.$ionic.modalController
            .create({
                component: InvestModal
            }).then(
                m => m.present()
            )
        //this.$router.go();
        e.preventDefault();
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
#cool-invest-button {
    margin-left: calc(10vw - 16px);
    width:27.5vw;
    height:27.5vw;
    padding: 0;
    
    color: white;
    font-size: 7.5vw;
    font-weight: bold;
    font-family: 'Source Sans Pro', sans-serif;

    border: 10px solid;
    border-color: rgba(121, 117, 173, 0.5);
    border-radius: 50%;
    border-style: groove;
    background: linear-gradient(217deg, rgb(218, 140, 51), rgb(255, 226, 171) 70.71%);
}
</style>
