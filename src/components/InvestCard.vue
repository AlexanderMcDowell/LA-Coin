<template>
    <button id="cool-invest-button" v-on:click="invest()">Click to invest</button>
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
#cool-invest-button {
    border: 2px transparent;
    margin-left: calc(10vw - 16px);
    width:80vw;
    height:80vw;
    padding: 0;
    
    color: gray;
    font-size: 10vw;

    border-radius: 50%;
    background:
    linear-gradient(217deg, rgba(177, 255, 236, 0.8), rgba(137, 174, 255, 0) 70.71%),
    linear-gradient(127deg, rgba(202, 208, 255, 0.8), rgba(0, 255, 157, 0) 70.71%),
    linear-gradient(336deg, rgba(255, 165, 220, 0.8), rgba(0,0,255,0) 70.71%);
}
</style>