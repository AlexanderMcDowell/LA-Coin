<template>
    <ion-card mode="md" id="graph-container">
        <ion-card-header>
            <ion-card-title>Your Balance By Day</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <area-chart :data="chartData.slice(chartData.length - graphSpec, chartData.length)" height="75vw"></area-chart>
            <ion-list id="transaction-container">
                <ion-item v-for="transaction in transactions" v-bind:key="transaction">
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
            this.transactions = this.transactions.reverse()
        }
        graphData() {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            user.get().then(doc => {
                this.transactions = doc.data().transactions
                this.graphSpec = doc.data().graphSpec

                if (this.transactions.length >= 50 && this.transactions[49].type == 'Closing') {
                    this.transactions[49].amount = this.transactions[49].amount + this.transactions[48].amount
                    this.transactions[48] = this.transactions[49]
                    this.transactions.pop()
                    user.update({
                        transactions: this.transactions
                    })
                }
                else if (this.transactions.length >= 50) {
                    this.transactions[49].type = 'Closing'
                    this.transactions[49].sentfrom = 'admin'
                    this.transactions[49].description = 'No further transactions are available! Sorry for the inconvenience.'
                    user.update({
                        transactions: this.transactions
                    })
                }
                if (this.graphSpec >= this.transactions.length) {
                    this.graphSpec = this.transactions.length;
                }

                this.transactions = this.transactions.slice(0, this.graphSpec)

                var compiledBalance = 0;
                for (var i = 0; i < this.transactions.length; i++) {
                    var transaction = this.transactions.reverse()[i];
                    var date = transaction.date;
                    compiledBalance = compiledBalance + transaction.amount;
                    this.chartData.push([date, compiledBalance])
                }
            });
        }
    }
</script>

<style scoped>
#graph-container {
    font-family: 'Nunito', sans-serif;
    height: 100vw;
    overflow: auto;
    overflow-y: scroll;
}
ion-card-title {
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
    font-size: 6vw;
}
area-chart {
    margin: 0;
    padding: 0;
}
ion-label, #transaction-description{
    font-family: 'Nunito', sans-serif;
}
#transaction-description {
    color: gray;
}
</style>