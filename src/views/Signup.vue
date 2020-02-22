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
			e.preventDefault();
			if (this.email.includes('@mvla.net') == true) {
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
						unreadNotif: [{date:this.todayDate, type:'Welcome', sentfrom:'admin', description:"Welcome to LAcoin!"}],
						transactions: [{date:this.todayDate, amount:250, description:"Welcome to LAcoin!", sentfrom: 'admin'}],
						//balance: this.balance,
						friends: this.friends,
						graphSpec: this.graphSpec,
						isSelected: false,
						seenSelectedNotif: false,
						winRate: 0,
						cardColor: this.cardColorChoices[0],
						islockedOut: false
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
			}
			else {
				alert('Your email must be an MVLA account');
				return this.$ionic.modalController
					.create({
					component: DenyModal
					}).then(
					m => m.present()
				)
				e.preventDefault();
			}
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