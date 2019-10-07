<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-title>Login</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<form @submit="login">
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
				<ion-button color="medium" type="submit" expand="block">Login</ion-button>
				<ion-button color="medium" expand="block" fill="outline" onclick="location.href='/#/'">Cancel</ion-button>
			</form>
		</ion-content>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'

@Component
export default class Login extends Vue {
	email: string = ""
	password: string = ""

	login(e: Event) {
		firebase.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
			this.$router.push('/account')
		})
		e.preventDefault();
	}
}
</script>

<style scoped>
@media screen and (orientation:landscape) {
	ion-button {
		display: inline-block;
	}
}
</style>
