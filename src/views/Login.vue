<template>
	<div class="ion-page">
		<ion-header>
		<ion-toolbar mode="ios">
      <ion-buttons slot="start">
				<div class="back-icon">
        	<i class="ion-md-arrow-round-back" type="button" v-on:click="eventChange()"></i>
				</div>
      </ion-buttons>
      <ion-title>Login</ion-title>
    </ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<!--h1 class="error-heading">{{errMessage}}</h1-->
			<form @submit="loginWithPersistence">
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
				<ion-button mode="md" color="dark" type="submit" expand="block">Login</ion-button>
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
import EmailConfirmModal from "@/components/DenyModal.vue";

@Component

export default class Login extends Vue {
	email: string = "";
	password: string = "";
	errMessage: string = "";
	isLockedOut: boolean;
	created() {
	}

	loginWithPersistence(e: Event) {
		e.preventDefault();
		firebase.auth.setPersistence(firebase.Authentication.Auth.Persistence.LOCAL)
		this.login()
	}
	login() {
		firebase.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
			var checkUser = firebase.usersCollection.doc(user.user.uid)
			/* If isLockedOut is true, the administrator sign out function was toggled.
			On a case by case basis, users must sign back in */
			checkUser.get().then(doc => {
				this.isLockedOut = doc.data().isLockedOut
				if (user.user.emailVerified == true && this.isLockedOut == false) {
					this.$router.push('/account');
				}
				else if (user.user.emailVerified == false && this.isLockedOut == true) {
					alert('Re-Authenticate your Account. Check Email.');
					//Email and unset verification status
					user.user.sendEmailVerification().then(() => {
						checkUser.update({
							isLockedOut: false
						})
					})
					return this.$ionic.modalController
						.create({
						component: EmailConfirmModal
						}).then(
						m => m.present()
					)
					this.$router.push('/');
				}
				else {
					return this.$ionic.modalController
						.create({
							component: DenyModal
						}).then(
							m => m.present()
					)
				}
			}).catch(error => {
				alert(error.message);
				return this.$ionic.modalController
					.create({
						component: DenyModal
					}).then(
						m => m.present()
				)
			})
		})
	}
	eventChange() {
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
@media screen and (orientation:landscape) {
	ion-button {
		display: inline-block;
	}
}
</style>