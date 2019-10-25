<template>
    <ion-list>
        <ion-card>
            <ion-card-header>
                <ion-card-title>Your LaCoin Transactions!</ion-card-title>
            </ion-card-header>
        </ion-card>
        <ion-card v-for="transaction in transactions">
            <ion-card-content>
                <ion-label v-if="transaction.amount > 0" color="success">
                    +{{ transaction.amount }}
                </ion-label>
                <ion-label v-if="transaction.amount < 0" color="danger">
                    -{{ transaction.amount }}
                </ion-label>
                    {{ transaction.description }}
            </ion-card-content>
        </ion-card>
    </ion-list>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
    export default class Transactions extends Vue {
        
        transactions: Object[] = []
        created() {
            const currentUser = firebase.auth.currentUser.uid;
            const transactionsDoc = firebase.usersCollection.doc(currentUser).collection("transactions");
            transactionsDoc.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.transactions.push(doc.data());
                });
            });
        }
    }
</script>

<style scoped>
ion-card {
    padding-left: 0;
    margin-left:10%;
    width: 80%;
    height:auto;
}
</style>
