<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
        		<ion-title>Sign Up</ion-title>
      		</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<!-- Sign up form-->
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
				<ion-button color="dark" type="submit" expand="block">Continue</ion-button>
				<!--ion-button color="dark" expand="block">Sign up with Google</ion-button-->
				<ion-button color="medium" expand="block" fill="outline" onclick="location.href='/#/'">Cancel</ion-button>
			</form>
		</ion-content>
	</div>
</template>

<script lang="ts">
	//Imports
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import firebase from '@/firebase.config'
	import Navbar from "@/components/Navbar.vue";
	​
	//Define as Vue component
	@Component

	export default class Signup extends Vue {

		// All User fields
		name: string = "";
		balance: number = 0;
		bio: string = "Add desciption!";
		email: string = "";
		password: string = "";
		profile_photo: string = "";
		event_tickets: string[] = [];
		friends: string[] = [];
		todayDate: string = "";
		startDate: string = "";
		graphSpec: number = 10;

		// Initialize User transactions, notifications
		//transactions: object[] = [{date:this.todayDate, amount:250, description:"Welcome to LaCoin!", sender_id: 'admin'}];
		//unreadNotif: object[] = [{date:this.todayDate, type:'welcome_message', sentfrom:'admin', description:"Welcome to LaCoin!"}];

		// Get the date
		created() {
			this.getDate();
		}

		getDate() {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();
			this.todayDate = mm + '/' + dd + '/' + yyyy;
		}

		// User condition -- sign up
		signup(e: Event) {
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
					sign_on_date: this.todayDate,
					bio: this.bio,
					profile_photo: profileChoices[Math.floor(Math.random()*profileChoices.length)],
					event_tickets: this.event_tickets,
					unreadNotif: [{date:this.todayDate, type:'welcome_message', sentfrom:'admin', description:"Welcome to Ateos!"}],
					transactions: [{date:this.todayDate, amount:250, description:"Welcome to Ateos!", sender_id: 'admin'}],
					//balance: this.balance,
					friends: this.friends,
					graphSpec: this.graphSpec
				})

				// Send data to new page
				this.$router.push('/account');
			})

			// Cleanup
			e.preventDefault();
		}
		
		// Finish account setup
		googleSignup() {
		}
	}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
ion-title {
  text-align: center;
  margin-left: 0;
  font-weight: bold;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
ion-content {
  font-family: 'Roboto Slab', serif;
}
</style>
