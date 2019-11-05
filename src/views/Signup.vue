<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
                <ion-title>Sign Up</ion-title>
                <Navbar />
            </ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
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
				<ion-button color="dark" expand="block">Sign up with Google</ion-button>
				<ion-button color="medium" expand="block" fill="outline" onclick="location.href='/#/'">Cancel</ion-button>
			</form>
		</ion-content>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import firebase from '@/firebase.config'
	import Navbar from "@/components/Navbar.vue";
	​
	@Component
	export default class Signup extends Vue {
	​
		name: string = ""
		email: string = ""
		password: string = ""
		balance: number = 250
		bio: string = "Add desciption!"
		profile_photo: string = ""
		event_tickets: string[] = []
				
		signup(e: Event) {
			firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0');
				var yyyy = today.getFullYear();
				var sign_on_date = mm + '/' + dd + '/' + yyyy;

				var profileChoices = ["https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileOne.jpg?alt=media&token=d0e7524d-9e7b-43e5-b4ca-e0150a8a0544",
									"https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileTwo.jpg?alt=media&token=f58c01a6-68dc-42ad-9a2f-f7da1aafa3a5",
									"https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileThree.jpg?alt=media&token=967d4034-126d-44d1-b604-29930fe14e6d",
									"https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/ProfileFour.jpg?alt=media&token=102b0ce2-69f0-4bd8-ac3f-ce15479277c1"
				]
				
				var userDoc = firebase.usersCollection.doc(user.user.uid)
				
				user.user.updateProfile({
					displayName: this.name
				});
	​
				userDoc.set({
					name: this.name,
					balance: this.balance,
					sign_on_date: sign_on_date,
					bio: this.bio,
					profile_photo: profileChoices[Math.floor(Math.random()*profileChoices.length)],
					event_tickets: this.event_tickets,
					unreadNotif: {},
					transactions: [{date:'2017-01-01 00:00:00 -0800', amount:2, description:"Thanks!!"}, {date:'2017-01-01 00:01:00 -0800', amount:-5, description:"Thanks!!"}]
				})
	​
				this.$router.push('/account')
			})
			e.preventDefault();
		}
			
		googleSignup() {
		}
	}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
ion-content {
  font-family: 'Roboto Slab', serif;
}
</style>
