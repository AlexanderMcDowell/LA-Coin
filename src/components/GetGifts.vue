<template>
    <ion-card mode="md">
        <ion-card-header>
            <ion-toolbar mode="ios">
                <ion-buttons slot="start">
                    <div id="back-icon">
                        <i class="ion-md-arrow-round-back" type="button" v-on:click="exit()"></i>
                    </div>
                </ion-buttons>
                <ion-card-title v-if="isSelected == true">Request Gift!</ion-card-title>
                <ion-card-title v-if="isSelected == false">Check out gifts!</ion-card-title>
            </ion-toolbar>
        </ion-card-header>
        <ion-card-content mode="md">
            <!--h1 v-if="isSelected == true">Click Gift Image to Select</h1-->
            <div class="form-container">
                <div class="product-choice-div" v-for="product in products" v-bind:key="product">
                    <h3>{{product.data.name}}</h3>
                    <div class="description-container">
                        <img v-if="isSelected == false" class="choice-img" v-bind:src="product.data.photo">
                        <img v-if="isSelected == true" class="choice-img" v-bind:src="product.data.photo" @click="select(product.data.name, product.data.popularity, product.id)"/>
                        <div class="description-tags">
                            <p v-if="isSelected == true">{{product.data.description}}</p>
                            <p v-if="isSelected == false">Win to get access to gifts!</p>
                        </div>
                    </div>
                    <h4 v-if="isSelected == true">Click image to select</h4>
                    <!--v-if="isSelected == true"-->
                    <!--ion-button mode="md" class="form-button" fill="outline" @click="select(product.data.name, product.data.popularity, product.id)">Select this Product?</ion-button-->
                </div>
            </div>
            <i id="bottom-icon" class="ion-ios-close-circle-outline" type="button" v-if="isSelected == false || isSelected == true" @click="exit()"></i>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    import EmailConfirmModal from "@/components/EmailConfirmModal.vue";

    @Component({
        components: {
            EmailConfirmModal
        }
    })

    export default class GetGifts extends Vue {
        products: Array<any> = [];
        userDataList: Array<any> = [];
        todayDate: string = "";

        name: string = "";
        balance: number = 0;
        unreadNotif: Array<any> = [];
        transactions:Array<any>;
        isSelected: boolean;
        
        adminUnreadNotif: Array<any> = [];

        inputEmail: string = "";

        created() {
            this.getUserAdminData(); // Get User data, Admin notifictions
            this.getDate(); // Get today's date
            this.getProducts(); // Get list of all products
            this.getUsers();
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
        getUsers() {
            var userList = firebase.usersCollection;
            userList.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.userDataList.push({id: doc.id, data: doc.data()});
                })
            })
        }
        getUserAdminData() {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            var admin = firebase.usersCollection.doc('admin');
            user.get().then(doc => {
                //this.name = doc.data().name;
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
            // Express balance as a sum of all transactions
            console.log(transactionDoc)
            var startBalance = 0;
            for (var i = 0; i < transactionDoc.length; i++) {
                var transaction = transactionDoc[i];
                startBalance = startBalance + transaction.amount;
            }
            return startBalance;
        }
        select(productName: string, productPopularity: string, productId: string) {
            var userId = firebase.auth.currentUser.uid;
            var userEmail = firebase.auth.currentUser.email;
            var user = firebase.usersCollection.doc(userId);
            var admin = firebase.usersCollection.doc('admin');
            var slectedProduct = firebase.productsCollection.doc(productId);
            // User loses 25% of budget
            this.giftLoss()

            // Set up User and Admin-style notifications
            var giftReq = {
                date:this.todayDate, 
                type:'Gift', 
                sentfrom: userEmail,
                description: productName
            };
            var userUpdate = {
                date:this.todayDate, 
                type:'Gift', 
                sentfrom:'admin', 
                description: "Your purchase has been confirmed! Check email for more info."
            };

            //Add notifications to both user and admin
            this.adminUnreadNotif.unshift(giftReq);
            this.unreadNotif.unshift(userUpdate);

            admin.update({
                unreadNotif: this.adminUnreadNotif
            });

            // Reset user settings
            user.update({
                unreadNotif: this.unreadNotif,
                isSelected: false,
                seenSelectedNotif: false
            });

            // Update gift's popularity
            slectedProduct.update({
                popularity: productPopularity + 1
            })

            // Unclear why only this page transition works
            location.href='#/account'
            this.exit()
            return this.$ionic.modalController
                .create({
                    component: EmailConfirmModal
                }).then(
                    m => m.present()
            )
        }
        giftLoss() {
            var userId = firebase.auth.currentUser.uid;
            var user = firebase.usersCollection.doc(userId);
            // Take away 1/4 of user's lacoin
            var percentOfTotalCoin = (0.25*this.balance)/(250*(this.userDataList.length-2))
            this.transactions.unshift({
                date:this.todayDate,
                amount: -1*Math.round(0.25*this.balance),
                description: 'Gift cashed in!',
                fromId: "admin", 
                toId: userId,
                type: 'Gift deduction'
            })
            user.update({
                transactions: this.transactions
            })
            
            // Ierate through users, take out certain balance amt to keep lacoin total constant
            //Redistribution, heck yeaa
            //console.log(this.userDataList)
            for (var i=0;i<this.userDataList.length;i++){
                console.log(this.userDataList[i])
                var userData = this.userDataList[i]
                if (userData.id != userId && userData.id != 'admin') {
                    //console.log(i)
                    console.log(userData.data)
                    var userBalance = this.getBalance(userData.data.transactions);
                    var addBalance = Math.round(userBalance*percentOfTotalCoin);

                    userData.data.transactions.unshift({
                        date: this.todayDate,
                        amount: addBalance,
                        description: 'A user cashed in a gift!',
                        fromId: "admin", 
                        toId: userData.id,
                        type: 'Gift addition'
                        })
                    var outsideUser = firebase.usersCollection.doc(userData.id);
                    outsideUser.update({
                        transactions: userData.data.transactions
                    });
                }
            }
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
h4 {
    font-family: 'Nunito', sans-serif;
    text-align: center;
    color: rgb(200, 200, 200);
    font-size: 4vw;
    margin: 1em;
}
.product-choice-div {
    margin-bottom: 1em;
}
.form-container {
    display: inline-block;
}
ion-input {
    margin-right: 2em;
    margin-left: 2em;
    width: calc(100% - 4em);
    border-bottom: solid 1px;
}
.description-container {
    /*width: auto;*/
    display: flex;
}
.description-tags {
    font-family: 'Nunito', sans-serif;
    padding: 1em;
    color: gray;
    text-align: left;
    float: right;
    margin: 1em 0 1em 0;
    background-color: rgb(250, 250, 250);
    width: auto;
    height: auto;
}
.choice-img {
    margin: 1em;
    float: left;
    width: 8em;
    height: 8em;
    border: solid 2px gray;
    background: aquamarine;
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
#back-icon {
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