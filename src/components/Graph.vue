<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title> Your LaCoin! </ion-card-title>
        </ion-card-header>
            <ion-card-content>
                <div id="chart-container">
                    <fusioncharts
                    :type="type"
                    :width="width"
                    :height="height"
                    :dataformat="dataformat"
                    :datasource="datasource"
                    >
                    </fusioncharts>
                </div>
            </ion-card-content>
    </ion-card>
</template>
<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";

    import VueFusionCharts from 'vue-fusioncharts';
    import FusionCharts from 'fusioncharts';
    import Column2D from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);

    @Component
    export default class Graph extends Vue {
        transactions: number[] = []
        created() {
            const currentUser = firebase.auth.currentUser.uid;
            const user = firebase.usersCollection.doc(currentUser);
            const transactionsDoc = user.collection("transactions");
            transactionsDoc.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.transactions.push(doc.data().amount);
                });
            });
        }
        // Change this piece
        data() {
            return {
            "type": "column2d",
            "renderAt": "chart-container",
            "width": "550",
            "height": "350",
            "dataFormat": "json",
            "datasource": {
            "chart": {
            "caption": "Number of visitors in the last 3 days",
            "subCaption": "Bakersfield Central vs Los Angeles Topanga",
            "theme": "fusion"
            },
            "data": [{
            "label": "Mon",
            "value": "15123"
            }, {
            "label": "Tue",
            "value": "14233"
            }, {
            "label": "Wed",
            "value": "25507"
            }]
            }
            }
        }
    }
</script>
<style scoped>
</style>
