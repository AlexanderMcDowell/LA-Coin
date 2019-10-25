<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Your LaCoin!</ion-card-title>
        </ion-card-header>
            <ion-card-content>
                <line-chart :data="{'2017-05-13': 2, '2017-05-14': 5}"></line-chart>
            </ion-card-content>
    </ion-card>
</template>
<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";

    import Chartkick from 'vue-chartkick'
    import Chart from 'chart.js'

    Vue.use(Chartkick.use(Chart))

    @Component
    export default class Graph extends Vue {
        transactionsNum: number[] = []
        transactionsDate: string[] = []
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
    }
</script>
<style scoped>
</style>
