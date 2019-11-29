<template>
    <ion-card id="graph-container">
        <ion-card-header>
            <ion-card-title>Your LACoin Over Time</ion-card-title>
        </ion-card-header>
            <ion-card-content>
                <area-chart :data="chartData" height="75vw"></area-chart>
                <ion-list id="transaction-container" v-if="transactionsDoc.length > 0">
                    <ion-item v-for="transaction in transactionsDoc" v-bind:key="transaction">
                        <ion-label v-if="transaction.amount > 0" color="success">
                            +{{ transaction.amount }}
                        </ion-label>
                        <ion-label v-else color="danger">
                            {{ transaction.amount }}
                        </ion-label>
                            {{ transaction.description }}
                    </ion-item>
                </ion-list>
                <ion-item v-if="transactionsDoc.length == 0">
                    <ion-label>No Transactions Yet!</ion-label>
                </ion-item>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Chartkick from 'vue-chartkick';
    import Chart from 'chart.js';
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    Vue.use(Chartkick.use(Chart))

    @Component
    export default class Graph extends Vue {
        chartData: object[] = [];
        transactionsDoc: object[] = [];
        graphSpec: number = 10;

        created() {
            console.log(this.transactionsDoc)
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            user.get().then(doc => {
                this.transactionsDoc = doc.data().transactions;
                this.graphSpec = doc.data().graphSpec;
                //console.log(doc.data().transactions[0])
                var compiledBalance = 0;
                if (this.graphSpec >= doc.data().transactions.length) {
                    this.graphSpec = doc.data().transactions.length;
                }
                for (var i = 0; i < this.graphSpec; i++) {
                    var transaction = doc.data().transactions[i];
                    var date = transaction.date
                    var amount = transaction.amount
                    compiledBalance = compiledBalance + transaction.amount;
                    //console.log(transaction)
                    this.chartData.push([date, compiledBalance])
                }
            });
            console.log(this.chartData)
            /*this.chartData = {'1':'1', '2':'2'}
            console.log('shift')
            console.log(this.chartData)*/
        }
    }
        /* transactionsNum: number[] = []
        created() {
            const currentUser = firebase.auth.currentUser.uid;
            const user = firebase.usersCollection.doc(currentUser);
            const transactionsDoc = user.collection("transactions");
            transactionsDoc.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.transactionsNum.push(doc.data().amount);
                    this.transactionsDate.push(doc.data().date);
                });
            });
        }
        */
</script>

<style scoped>
#graph-container {
    height: 100vw;
    overflow: auto;
}
area-chart {
    margin: 0;
    padding: 0;
}
</style>
