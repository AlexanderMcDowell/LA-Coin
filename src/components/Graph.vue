<template>
    <ion-card id="graph-container" mode="md">
        <ion-card-header>
            <ion-card-title>Your Balance By Day</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <area-chart :data="chartData.slice(chartData.length - graphSpec, chartData.length)" height="75vw"></area-chart>
            <ion-list id="transaction-container">
                <ion-item v-for="transaction in showTransactions" v-bind:key="transaction">
                    <ion-label v-if="transaction.amount > 0" color="success">
                        +{{ transaction.amount }}
                    </ion-label>
                    <ion-label v-else color="danger">
                        {{ transaction.amount }}
                    </ion-label>
                    <h6 class="transaction-description">
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
        showTransactions: Array<any> = [];
        
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
                this.transactions = doc.data().transactions
                this.graphSpec = doc.data().graphSpec

                /* If the transaction list greater than or equal to 75 item, 
                shift info for the second-to-last transaction onto a "closing" cap transaction
                */
                if (this.transactions.length >= 76 && this.transactions[75].type == 'Closing') {
                    this.transactions[75].amount = this.transactions[75].amount + this.transactions[74].amount
                    this.transactions[75].date = this.transactions[74].date
                    this.transactions[74] = this.transactions[75]
                    this.transactions.pop()
                    user.update({
                        transactions: this.transactions
                    })
                }
                // If transaction list length reaches 75, create closing cap transaction
                else if (this.transactions.length >= 75) {
                    this.transactions[74].type = 'Closing'
                    this.transactions[74].sentfrom = 'admin'
                    this.transactions[74].description = 'No previous transactions are available! Sorry for the inconvenience.'
                    user.update({
                        transactions: this.transactions
                    })
                }

                // If amt of data pts user wants is greater than transaction list length, reset
                if (this.graphSpec >= this.transactions.length) {
                    this.graphSpec = this.transactions.length;
                }
                this.showTransactions = this.transactions.slice(0, this.graphSpec);
                this.transactions = this.transactions.reverse()

                // Get balance as sum of transactions
                var compiledBalance = 0;
                for (var i = 0; i < this.transactions.length; i++) {
                    var transaction = this.transactions[i];
                    var date = transaction.date;
                    compiledBalance = compiledBalance + transaction.amount;
                    this.chartData.push([date, compiledBalance])
                }
                this.chartData.slice(0, this.graphSpec)
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
ion-label, .transaction-description{
    font-family: 'Nunito', sans-serif;
}
.transaction-description {
    color: gray;
}
</style>