<template>
    <ion-card id="graph-container">
        <ion-card-header>
            <ion-card-title>Your LACoin Over Time</ion-card-title>
        </ion-card-header>
            <ion-card-content>
                <area-chart :data="chartData" height="75vw"></area-chart>
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
        chartData: object[] = []
        balance: any

        created() {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            user.get().then(doc => {
                //console.log(doc.data().transactions[0])
                this.balance = doc.data().balance;
                var compiledBalance = this.balance;
                for (var i = 0; i < doc.data().transactions.length; i++) {
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
}
area-chart {
    margin: 0;
    padding: 0;
}
</style>
