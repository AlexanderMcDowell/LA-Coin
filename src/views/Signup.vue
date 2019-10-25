<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-title>Sign Up</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<form @submit="signup">
				<ion-item>
					<ion-label position="floating">Name</ion-label>
					<ion-input :value="name" @input="name = $event.target.value" type="text" name="name">
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
		balance: number = 0
		bio: string = "Bio Here!"
				
		signup(e: Event) {
			firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0');
				var yyyy = today.getFullYear();
				var sign_on_date = mm + '/' + dd + '/' + yyyy;
				
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
</style>
