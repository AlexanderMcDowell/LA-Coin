<template>
    <ion-card v-if="transactions.length > 0">
        <ion-card-header>
            <ion-card-title>Your LaCoin Transactions!</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-item v-for="transaction in transactions" v-bind:key="transaction">
                <ion-label v-if="transaction.amount > 0" color="success">
                    +{{ transaction.amount }}
                </ion-label>
                <ion-label v-if="transaction.amount < 0" color="danger">
                    {{ transaction.amount }}
                </ion-label>
                    {{ transaction.description }}
            </ion-item>
        </ion-card-content>
    </ion-card>
    <ion-card v-else>
        <ion-card-header>
            <ion-card-title>Your LaCoin Transactions!</ion-card-title>
        </ion-card-header>
    </ion-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
    export default class Transactions extends Vue {
        transactions: object[] = [];
        created() {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            user.get().then(doc => {
                this.transactions = doc.data().transactions;
            });
            /*const currentUser = firebase.auth.currentUser.uid;
            const transactionsDoc = firebase.usersCollection.doc(currentUser).collection("transactions");
            transactionsDoc.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.transactions.push(doc.data());
                    //console.log('transaction')
                    //console.log(doc.data())
                    //console.log('transaction')
                });
            });*/
        }
    }
</script>

<style scoped>
ion-card {
    padding-left: 0;
    margin-left:2.5%;
    width: 95%;
    height:auto;
}
</style>