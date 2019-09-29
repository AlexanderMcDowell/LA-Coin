<template>
<div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>Home</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-card v-for="transaction in transactions" :key="transaction">
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
        </ion-content>
    </div>
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
</style>
