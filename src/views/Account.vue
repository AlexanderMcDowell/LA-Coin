<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Your Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            Welcome back,
            <br />
            {{ name }}.
          </ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Your Balance</ion-card-subtitle>
          <ion-card-title>${{ balance }}</ion-card-title>
        </ion-card-header>
      </ion-card>
      <Transactions />
      <Graph />
      <QRModal />
    </ion-content>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import firebase from "@/firebase.config";

import QRModal from "@/components/QRModal/QRModal.vue";
import Transactions from "@/components/Transactions.vue";
import Graph from "@/components/Graph.vue";

@Component({
  components: {
    QRModal,
    Transactions,
    Graph
  }
})
export default class Account extends Vue {
  name: string = "";
  balance: string = "";

  getBalance() {
    var userId = firebase.auth.currentUser.uid;
    var user = firebase.usersCollection.doc(userId);

    user.get().then(doc => {
      this.balance = doc.data().balance;
    });
  }

  created() {
    this.name = firebase.auth.currentUser.displayName;
    this.getBalance();
  }
}
</script>

<style scoped>
</style>
