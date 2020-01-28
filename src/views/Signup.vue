<template>
	<div class="ion-page">
		<ion-header>
		<ion-toolbar mode="ios">
      		<ion-buttons slot="start">
				<div class="back-icon">
        			<i class="ion-md-arrow-round-back" type="button" v-on:click="eventChange()"></i>
				</div>
      		</ion-buttons>
      		<ion-title>Sign Up</ion-title>
    	</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<!-- Sign up form-->
			<!--h1 class="error-heading">{{errMessage}}</h1-->
			<form @submit="signup">
				<ion-item>
					<ion-label position="floating">Name</ion-label>
					<ion-input :value="name" @input="name = $event.target.value" type="text" name="name" maxlength=12>
					</ion-input>
				</ion-item>
				<ion-item>
					<ion-label position="floating">Email</ion-label>
					<ion-input :value="email" @input="email = $event.target.value" type="email" name="email">
					</ion-input>
				</ion-item>
				<ion-item>
					<ion-label position="floating">Password</ion-label>
					<ion-input :value="password" @input="password = $event.target.value" type="password"
						name="password"></ion-input>
				</ion-item>
				<ion-button mode="md" color="dark" type="submit" onclick="location.href='#/'" expand="block">Continue</ion-button>
				<!--ion-button color="dark" expand="block">Sign up with Google</ion-button-->
				<ion-button mode="md" color="medium" expand="block" fill="outline" onclick="location.href='#/'">Cancel</ion-button>
			</form>
		</ion-content>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import firebase from '@/firebase.config'
	import DenyModal from "@/components/DenyModal.vue";
	import EmailConfirmModal from "@/components/EmailConfirmModal.vue";
	​
	@Component

	export default class Signup extends Vue {
		// All User fields
		name: string = "";
		balance: number = 0;
		bio: string = "Add desciption!";
		email: string = "";
		password: string = "";
		profilePhoto: string = "";
		eventTickets: string[] = [];
		friends: string[] = [];
		todayDate: string = "";
		startDate: string = "";
		graphSpec: number = 10;

		errMessage: string = "";

		cardColorChoices: string[] = [];
		profileLinks: string[] = [];

		created() {
			this.getDate();
			this.initChoices();
		}
		getDate() {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();
			this.todayDate = mm + '/' + dd + '/' + yyyy;
		}
		initChoices() {
			var colorList = firebase.photosCollection.doc('colorList')
				colorList.get().then(doc => {
					this.cardColorChoices = doc.data().colors
			})
			var photoList = firebase.photosCollection.doc('photoList')
			photoList.get().then(doc => {
				this.profileLinks = doc.data().urls
			})
		}
		// User condition -- sign up
		signup(e: Event) {
			/*var colorList = firebase.photosCollection.doc('colorList')
			colorList.get().then(doc => {
				this.cardColorChoices = doc.data().colors
			})
			firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
				
				// Set up Firebase User calling
				var newUser = firebase.usersCollection.doc(user.user.uid);
				// Profile image array
				var profileChoices = ["https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileOne.jpg?alt=media&token=d0e7524d-9e7b-43e5-b4ca-e0150a8a0544",
									"https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileTwo.jpg?alt=media&token=f58c01a6-68dc-42ad-9a2f-f7da1aafa3a5",
									"https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileThree.jpg?alt=media&token=967d4034-126d-44d1-b604-29930fe14e6d",
									"https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileFour.jpg?alt=media&token=102b0ce2-69f0-4bd8-ac3f-ce15479277c1"
									];
				// Set new user display name
				user.user.updateProfile({
					displayName: this.name
				});
				//console.log(this.unreadNotif)
				//console.log(this.transactions)
				// Set new user fields
				newUser.set({
					name: this.name,
					signOnDate: this.todayDate,
					bio: this.bio,
					profilePhoto: profileChoices[Math.floor(Math.random()*profileChoices.length)],
					eventTickets: this.eventTickets,
					unreadNotif: [{date:this.todayDate, type:'welcome_message', sentfrom:'admin', description:"Welcome to LAcoin!"}],
					transactions: [{date:this.todayDate, amount:250, description:"Welcome to LAcoin!", sender_id: 'admin'}],
					//balance: this.balance,
					friends: this.friends,
					graphSpec: this.graphSpec,
					isSelected: false,
					seenSelectedNotif: false,
					winRate: 0,
					cardColor: this.cardColorChoices[0]
				})
				// Send data to new page
				this.$router.push('/account');
			}).catch(err => {
				this.errMessage = err.message
				return this.$ionic.modalController
					.create({
					component: DenyModal
					}).then(
					m => m.present()
				)
			})
			// Cleanup
			e.preventDefault();*/
			firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
​
			user.user.sendEmailVerification().then(() => {

				var newUser = firebase.usersCollection.doc(user.user.uid);
				// Set new user display name
				user.user.updateProfile({
					displayName: this.name
				});
				//console.log(this.unreadNotif)
				//console.log(this.transactions)
				// Set new user fields
				newUser.set({
					name: this.name,
					signOnDate: this.todayDate,
					bio: this.bio,
					profilePhoto: this.profileLinks[Math.floor(Math.random()*this.profileLinks.length)],
					eventTickets: this.eventTickets,
					unreadNotif: [{date:this.todayDate, type:'welcome_message', sentfrom:'admin', description:"Welcome to LAcoin!"}],
					transactions: [{date:this.todayDate, amount:250, description:"Welcome to LAcoin!", sender_id: 'admin'}],
					//balance: this.balance,
					friends: this.friends,
					graphSpec: this.graphSpec,
					isSelected: false,
					seenSelectedNotif: false,
					winRate: 0,
					cardColor: this.cardColorChoices[0]
				})
				
				return this.$ionic.modalController
					.create({
					component: EmailConfirmModal
					}).then(
					m => m.present()
				)
				// Send data to new page
				this.$router.push('/');

			}).catch(error => {
				alert(error.message);
				return this.$ionic.modalController
					.create({
					component: DenyModal
					}).then(
					m => m.present()
				)
			});
		​
			}).catch(error => {
				alert(error.message);
				return this.$ionic.modalController
					.create({
					component: DenyModal
					}).then(
					m => m.present()
				)
			})
			e.preventDefault();
		}
		
		// Finish account setup
		googleSignup() {
		}
		eventChange() {
			console.log('confirm')
            this.$router.push('/')
        }
	}
</script>

<style scoped>
ion-title {
	font-family: 'Nunito', sans-serif;
	font-weight: normal;
	text-align: center;
	color: rgb(27, 27, 27);
	font-size: 7.5vw;
	margin-right: 13vw;
	width: 100vw;
}
.back-icon {
	margin-left: 5vw;
	width: 8vw;
	font-size: 7.5vw;
}
ion-content {
	font-family: 'Nunito', sans-serif;
}
.error-heading {
	color: darkred;
	text-align: center;
	font-size: 5vw;
}
</style>