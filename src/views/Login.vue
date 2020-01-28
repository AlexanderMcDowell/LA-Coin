<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from '@/firebase.config'
import DenyModal from "@/components/DenyModal.vue";

@Component

export default class Login extends Vue {
	email: string = "";
	password: string = "";
	errMessage: string = "";

	login(e: Event) {
		firebase.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
			if (user.user.emailVerified == true) {
				this.$router.push('/account');
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
		e.preventDefault();
	}
	eventChange() {
      this.$router.push('/')
  }
}
</script>

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
				<ion-button mode="md" color="dark" type="submit" expand="block">Login</ion-button>
				<ion-button mode="md" color="medium" expand="block" fill="outline" onclick="location.href='#/'">Cancel</ion-button>
			</form>
		</ion-content>
	</div>
</template>

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
.error-heading {
	color: darkred;
	text-align: center;
	font-size: 5vw;
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