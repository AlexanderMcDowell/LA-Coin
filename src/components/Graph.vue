<template>
    <ion-card id="graph-container">
        <ion-card-header>
            <ion-card-title>Your Balance By Day</ion-card-title>
        </ion-card-header>
            <ion-card-content>
                <area-chart :data="chartData.slice(chartData.length - graphSpec, chartData.length)" height="75vw"></area-chart>
                <ion-list id="transaction-container" v-if="transactions.length > 0">
                    <ion-item v-for="transaction in truncatedTransactions" v-bind:key="transaction">
                        <ion-label v-if="transaction.amount > 0" color="success">
                            +{{ transaction.amount }}
                        </ion-label>
                        <ion-label v-else color="danger">
                            {{ transaction.amount }}
                        </ion-label>
                        <h6 id="transaction-description">
                            {{ transaction.description }}
                        </h6>
                    </ion-item>
                </ion-list>
                <ion-item v-if="transactions.length == 0">
                    <ion-label>No Transactions Yet!</ion-label>
                </ion-item>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Chartkick from 'vue-chartkick'
    import Chart from 'chart.js'
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    Vue.use(Chartkick.use(Chart))

    @Component
    export default class Graph extends Vue {
        transactions: Array<any> = [];
        truncatedTransactions: Array<any> = [];
        chartData: object[] = [];
        graphSpec: number = 8;

        created() {
            this.graphData();
        }
        graphData() {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            user.get().then(doc => {
                console.log("transactionsdoc " + doc.data().transactions.reverse())
                this.transactions = doc.data().transactions;
                this.graphSpec = doc.data().graphSpec;
                this.truncatedTransactions = this.transactions.slice(0, this.graphSpec)
                if (this.graphSpec >= doc.data().transactions.length) {
                    this.graphSpec = doc.data().transactions.length;
                }

                //Record chart data

                var compiledBalance = 0;
                for (var i = 0; i < doc.data().transactions.length; i++) {
                    var transaction = doc.data().transactions.reverse()[i];
                    var date = transaction.date;
                    compiledBalance = compiledBalance + transaction.amount;
                    console.log(date)
                    this.chartData.push([date, compiledBalance])
                }
                console.log("chartdata " + this.chartData)
                //this.chartData = this.chartData.slice(this.chartData.length-this.graphSpec, this.chartData.length);
            });
        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
#graph-container {
    font-family: 'Roboto', serif;
    height: 100vw;
    overflow: auto;
    overflow-y: scroll;
}
ion-card-title {
    font-family: 'Roboto', serif;
    font-weight: normal;
    font-size: 6vw;
}
area-chart {
    margin: 0;
    padding: 0;
}
ion-label, #transaction-description{
    font-family: 'Roboto', serif;
}
#transaction-description {
    color: gray;
}
</style>