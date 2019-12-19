<template>
    <ion-card>
        <h1>Request Gift!</h1>
        <h2 v-if="fundError == true">Error! Too many purchases.</h2>
        <!-- List with annotations, firebase-->
        <form @submit="submitPurchases">
			    <ion-item>
                    <div id="choice" v-for="product in products" v-bind:key="product">
                        <div class="description-container">
                            <img id="choice-img" v-bind:src="product.data.photo"/>
                            <div class="description-tags">
                                <h6>{{product.data.name}}</h6>
                                <h6>{{product.data.price}} coin required</h6>
                                <h6>{{product.data.stock}} left in stock</h6>
                            </div>
                        </div>
                        <ion-label position="floating">How Many?</ion-label>
                        <ion-input :value="number" @input="productAmts.push({name:product.data.name, amt: Math.round($event.target.value), price: product.data.price, stock: product.data.stock})" type="text" name="productAmt" placeholder="0" maxlength=1>
                        </ion-input>
                    </div>
				</ion-item>
            <div id="button-div">
                <ion-button class="form-button" fill="outline" type="submit">Submit</ion-button>
                <ion-button class="form-button" fill="outline" @click="exit()">Exit</ion-button>
            </div>
		</form>
    </ion-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
export default class GetGifts extends Vue {
    products: Array<any> = [];
    productAmts: Array<any> = [];
    fundError: boolean = false;
    todayDate: string = "";

    name: string = "";
    balance: number = 0;
    transactions:Array<any>;
    unreadNotif: Array<any> = [];

    adminUnreadNotif: Array<any> = [];

    created(){
        this.getDate()
        this.getProducts();
        this.getUserAdminData();
    }
    getDate() {
        var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();
        this.todayDate = mm + '/' + dd + '/' + yyyy;
    }
    getProducts() {
        var productList = firebase.db.collection('products');
        productList.get().then(snapshot => {
            snapshot.forEach(doc => {
                var product = {id: doc.id, data: doc.data()}
                this.products.push(product);
            })
        })
    }
    getUserAdminData() {
        var userId = firebase.auth.currentUser.uid;
        var user = firebase.usersCollection.doc(userId);

        var admin = firebase.usersCollection.doc('admin');
        user.get().then(doc => {
            this.name = doc.data().name;
            this.transactions = doc.data().transactions;
            this.balance = this.getBalance(doc.data().transactions);
            this.unreadNotif = doc.data().unreadNotif;
        })
        admin.get().then(doc => {
            this.adminUnreadNotif = doc.data().unreadNotif;
        })
    }
    getBalance(transactionDoc: Array<any>) {
        var startBalance = 0;
        // Express balance as a sum of all transactions
        for (var i = 0; i < transactionDoc.length; i++) {
            var transaction = transactionDoc[i];
            startBalance = startBalance + transaction.amount;
        }
        return startBalance;
    }
    submitPurchases(e: Event) {
        console.log('begin purchase' + this.productAmts)
        if (this.productAmts.length == 0) {
            e.preventDefault();
            this.exit();
        }
        var totalPrice = 0;
        for (var i=0; i<this.productAmts.length;i++) {
            if (isNaN(this.productAmts[i].amt) == false) {
                if (this.productAmts[i].amt > this.productAmts[i].stock) {
                    this.productAmts[i].amt = this.productAmts[i].stock
                }
            totalPrice = totalPrice + (this.productAmts[i].amt*this.products[i].data.price)
            }
        }
        console.log(this.productAmts)
        console.log('total price' + totalPrice)
        if (totalPrice > this.balance) {
            this.fundError = true;
        }
        else if (totalPrice == 0) {
            e.preventDefault();
            this.exit()
        }
        else {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            var admin = firebase.usersCollection.doc('admin');

            //Send mutual notifications

            var codeLetters = "abcdefghijklmnopqrstuvwxyz0123456789";
            var newCode = ""
            for (var i=0; i<6;i++) {
                newCode += codeLetters[Math.round(Math.random()*codeLetters.length)]
            }

            var giftReq = {date:this.todayDate, type:'Gift', 
                sentfrom:this.name, description:this.productAmts, purchaseCode: newCode
                };
            var detailedDescription = "Your purchases were recorded! Confirm Code: " + newCode;
            var userUpdate = {date:this.todayDate, type:'Gift', 
                sentfrom:'admin', description: detailedDescription
                };
            var subTransaction = {date: this.todayDate,
                amount: -1*totalPrice,
                description: "Your purchases were recorded!",
                fromId: 'admin', //admin means you take from everyone elses
                toId: userId}
            this.adminUnreadNotif.unshift(giftReq);
            this.unreadNotif.unshift(userUpdate);
            this.transactions.unshift(subTransaction);
            admin.update({
                unreadNotif: this.adminUnreadNotif
            });
            user.update({
                unreadNotif: this.unreadNotif,
                transactions: this.transactions
            });

            for (var i=0; i<this.products.length;i++) {
                var product = firebase.db.collection('products').doc(this.products[i].id);
                product.update({
                    stock: this.products[i].data.stock - this.productAmts[i].amt
                });
            }

            e.preventDefault()
            this.exit()
            //Lower stock
        }
        e.preventDefault()
    }
    exit() {
        this.$ionic.modalController.dismiss()
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
ion-card {
    font-family: 'Roboto', serif;
    text-align: center;
    height: 55vh;
    width: auto;
    overflow: auto;
}
h1 {
    text-align: center;
    color: rgb(128, 128, 128);
}
h2 {
    color: darkred;
}
.description-container {
    width: 80vw;
    display: flex;
}
.description-tags {
    font-family: 'Roboto', serif;
    color: gray;
    text-align: right;
    float: right;
}
#choice-img {
    float: left;
    width: 40vw;
    height: 40vw;
    border: solid 2px gray;
    border-radius: 50%;
}
#button-div {
    display: flex;
}
.form-button {
    width: 50vw;
}
</style>