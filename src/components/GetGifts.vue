<template>
    <ion-card mode="md">
        <ion-card-header>
            <ion-toolbar mode="ios">
                <ion-buttons slot="start">
                    <div class="back-icon">
                        <i class="ion-md-arrow-round-back" type="button" v-on:click="exit()"></i>
                    </div>
                </ion-buttons>
                <ion-card-title v-if="isSelected == true">Request Gift!</ion-card-title>
                <ion-card-title v-if="isSelected == false" h1>Check out gifts!</ion-card-title>
            </ion-toolbar>
        </ion-card-header>
        <ion-card-content>
            <div id="form-container">
                <!--ion-label v-if="isSelected == true" position="floating">Enter valid email</ion-label>
                <ion-input v-if="isSelected == true" @input="inputEmail = $event.target.value" type="text" name="productAmt" placeholder="Email">
                </ion-input>
                <h2 v-if="emailError == true" style="color: darkred; font-size: 5vw;">Please Enter valid Email</h2-->
                <div class="choice" v-for="product in products" v-bind:key="product">
                    <h3>{{product.data.name}}</h3>
                    <div class="description-container">
                        <img id="choice-img" v-bind:src="product.data.photo"/>
                        <div class="description-tags">
                            <h6 v-if="isSelected == true">{{product.data.description}}</h6>
                            <h6 v-if="isSelected == false">Win to get access to gifts!</h6>
                        </div>
                    </div>
                    <ion-button mode="md" v-if="isSelected == true" class="form-button" fill="outline" @click="select(product.data.name, product.data.popularity, product.id)">Select this Product?</ion-button>
                </div>
            </div>
            <!--ion-button class="exit-button" mode="md" color="dark" expand="block" v-if="isSelected == false || isSelected == true" @click="exit()">Exit</ion-button-->
            <i id="bottom-icon" class="ion-ios-close-circle-outline" type="button" v-if="isSelected == false || isSelected == true" @click="exit()"></i>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    import ConfirmModal from "@/components/ConfirmModal.vue";

    @Component({
        components: {
            ConfirmModal
        }
    })

    export default class GetGifts extends Vue {
        products: Array<any> = [];
        todayDate: string = "";

        name: string = "";
        balance: number = 0;
        unreadNotif: Array<any> = [];
        transactions:Array<any>;
        isSelected: boolean;
        
        adminUnreadNotif: Array<any> = [];

        inputEmail: string = "";
        //emailError: boolean = false;

        created() {
            this.getUserAdminData();
            this.getDate()
            this.getProducts();
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
                this.isSelected = doc.data().isSelected;
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
        select(productName: string, productPopularity: string, productId: string) {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            var admin = firebase.usersCollection.doc('admin');
            var slectedProduct = firebase.productsCollection.doc(productId);

            var giftReq = {
                date:this.todayDate, 
                type:'Gift', 
                sentfrom:this.name,
                email: this.inputEmail,
                description: productName
            };
            var userUpdate = {
                date:this.todayDate, 
                type:'Gift', 
                sentfrom:'admin', 
                description: "Your purchase has been confirmed!"
            };

            this.adminUnreadNotif.unshift(giftReq);
            this.unreadNotif.unshift(userUpdate);

            if (this.unreadNotif.length > 20) {
                this.unreadNotif.pop()
            }

            admin.update({
                unreadNotif: this.adminUnreadNotif
            });
            user.update({
                unreadNotif: this.unreadNotif,
                isSelected: false,
                seenSelectedNotif: false
            });
            slectedProduct.update({
                popularity: productPopularity + 1
            })
            location.href='#/account'
            this.exit()
            return this.$ionic.modalController
                .create({
                    component: ConfirmModal
                }).then(
                    m => m.present()
            )
        }
        exit() {
            this.$ionic.modalController.dismiss()
        }
    }
</script>

<style scoped>
ion-card {
    font-family: 'Nunito', sans-serif;
    text-align: center;
    padding-bottom: 1em;
    height: 75vh;
    width: auto;
    overflow: scroll;
}
ion-card-title {
    font-family: 'Nunito', sans-serif;
    text-align: center;
    color: rgb(128, 128, 128);
    font-size: 7.5vw;
    font-weight: bold;
    margin-right: 13vw;
}
h3 {
    color: rgb(68, 68, 68);
    font-size: 7vw;
    font-weight: bold;
}
.choice {
    margin-bottom: 1em;
}
#form-container {
    display: inline-block;
}
ion-input {
    margin-right: 2em;
    margin-left: 2em;
    width: calc(100% - 4em);
    border-bottom: solid 1px;
}
.description-container {
    width: 100%;
    display: flex;
}
.description-tags {
    font-family: 'Nunito', sans-serif;
    padding: 1em;
    color: gray;
    text-align: left;
    float: right;
    margin: 1em 1em 1em 0;
    background-color: rgb(250, 250, 250);
    height: auto;
}
#choice-img {
    margin: 1em;
    float: left;
    width: 40vw;
    height: 40vw;
    border: solid 2px gray;
    border-radius: 50%;
}
.form-button {
    margin: 1em
}
.exit-button {
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vw;
}
.back-icon {
	margin-left: 5vw;
	width: 8vw;
	font-size: 7.5vw;
    color: rgb(128, 128, 128);
}
#bottom-icon {
    font-size: 18vw;
    color: rgb(90, 90, 90);
}
</style>