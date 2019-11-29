<template>
    <form @submit="submit_invest">
        <ion-item >
            <ion-label position="floating">Value</ion-label>
            <ion-input :value="invest_amount" @input="invest_amount = $event.target.value" type="text" name="invest_amount" placeholder="Enter an amount">
            </ion-input>
        </ion-item>
        <ion-button color="dark" type="submit" expand="block" onclick="location.href='/#/people'">Invest</ion-button>
    </form>
</template>

<script lang="ts">
import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
    export default class InvestModal extends Vue {
        transactions: object[] = [];
        balance: number = 0;
        invest_amount: number = 0;
        todayDate: string = "";
        name: string = "";

        user_data_list: object[] = [];

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
                    this.user_data_list.push({id: doc.id, data: doc.data()})
                    //console.log('append ' + this.user_data_list)
                })
            })
        }

        getBalance(transactionDoc: object[]) {
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

            var investReturn = this.randfunc(this.invest_amount)
            console.log(investReturn)

            // THIS IS A TO BE CLOUD FUNCTION
            if (this.invest_amount <= this.balance) {

                for (var i=0;i<this.user_data_list.length;i++){
                    var user_data = this.user_data_list[i]
                    if (user_data.id != userId) {
                        user_data.data.transactions.push({date: this.todayDate,
                        amount: Math.round(-1*investReturn/this.user_data_list.length),
                        description: "Some users friended",
                        fromId: "admin", //admin means you take from everyone elses
                        toId: user_data.id})
                        var outside_user = firebase.usersCollection.doc(user_data.id);
                        outside_user.update({
                            transactions: user_data.data.transactions
                        });
                    }
                }

                investReturn = Math.round(investReturn/this.user_data_list.length)*this.user_data_list.length;

                this.transactions.push({date: this.todayDate,
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