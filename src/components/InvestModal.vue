<template>
    <form @submit="submit_invest">
        <ion-item >
            <ion-label position="floating">Value</ion-label>
            <ion-input :value="investAmount" @input="investAmount = $event.target.value" type="text" name="investAmount" placeholder="Enter an amount">
            </ion-input>
        </ion-item>
        <ion-button color="dark" type="submit" expand="block" onclick="location.href='#/people'">Invest</ion-button>
    </form>
</template>

<script lang="ts">
import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
    export default class InvestModal extends Vue {
        transactions: Array<any> = [];
        balance: number = 0;
        investAmount: number = 0;
        todayDate: string = "";
        name: string = "";

        userDataList: Array<any> = [];

        created() {
            this.getUsers()
            this.getDate()
            this.get_userinfo()
            console.log('completed')
        }
        getDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            this.todayDate = mm + '/' + dd + '/' + yyyy;
        }
        get_userinfo() {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);

            user.get().then(doc => {
                this.name = doc.data().name;
                this.transactions = doc.data().transactions;
                this.balance = this.getBalance(doc.data().transactions);
                })
        }

        getUsers(){
            var users = firebase.usersCollection
            users.get().then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.data().name)
                    this.userDataList.push({id: doc.id, data: doc.data()})
                    //console.log('append ' + this.userDataList)
                })
            })
        }

        getBalance(transactionDoc: Array<any>) {
            var startBalance = 0;
            console.log('transactions: ' + transactionDoc)
                for (var i = 0; i < transactionDoc.length; i++) {
                    var transaction = transactionDoc[i];
                    console.log('Balance')
                    console.log(transaction)
                    startBalance = startBalance + transaction.amount;
            }
            return startBalance;
        }
        submit_invest(e: Event) {
            console.log('balance ' + this.balance)
            var users = firebase.usersCollection
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);

            var investReturn = this.randfunc(this.investAmount)
            //console.log(investReturn)
            var percentOfTotalCoin = (investReturn)/(250*(this.userDataList.length-1))
            var recordTotalAmtRetracted = 0; //Track how much money has been retracted from the system

            // THIS IS A TO BE CLOUD FUNCTION
            if (this.investAmount <= this.balance) {

                for (var i=0;i<this.userDataList.length;i++){
                    var userData = this.userDataList[i]

                    var userBalance = this.getBalance(userData.data.transactions);
                    var subtractBalance = Math.round(userBalance*percentOfTotalCoin);
                    recordTotalAmtRetracted = recordTotalAmtRetracted + subtractBalance;

                    if (userData.id != userId) {
                        userData.data.transactions.unshift({date: this.todayDate,
                        amount: -1*subtractBalance,
                        description: "A user invested",
                        fromId: "admin", //admin means you take from everyone elses
                        toId: userData.id})
                        var outside_user = firebase.usersCollection.doc(userData.id);
                        outside_user.update({
                            transactions: userData.data.transactions
                        });
                    }
                }

                investReturn = recordTotalAmtRetracted;

                this.transactions.unshift({date: this.todayDate,
                            amount: investReturn,
                            description: "Investment",
                            fromId: "admin", //admin means you take from everyone elses
                            toId: userId})
                user.update({
                    transactions: this.transactions
                });
            }
            else {
                this.$ionic.modalController.dismiss()
                e.preventDefault();
            }
            //this.confirmInvest(investReturn);
            console.log(investReturn)
            this.$ionic.modalController.dismiss()
            e.preventDefault();
        }
        randfunc(investment: number) {
            return Math.round((Math.random()-0.5)*investment);
        }
        confirmInvest(investReturn: number) {
            console.log(investReturn)
        }
    }
</script>