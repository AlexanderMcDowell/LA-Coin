<template>
  <div class="ion-page">
	  <ion-header v-if="notSignedIn == true">
      <ion-toolbar mode="ios">
		<ion-title>Welcome!</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">

			<!-- Welcome icon and description -->
			<div id="home-container">
				<h1>LAcoin</h1>
				<h2>Points System for Los Altos Eagles</h2>
				<img id="lacoin-logo" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
				<h3 v-if="notSignedIn == true">Tutorial on App Store!<br>Get Started Below</h3>
			</div>
		</ion-content>

		<!-- Log in, Sign in Buttons -->
		<ion-footer class="ion-padding">
			<ion-list>
				<ion-button v-if="notSignedIn == true" mode="md" expand="block" color="dark" fill="outline" onclick="location.href='#/signup'">Get Started!</ion-button>
				<ion-button v-if="notSignedIn == true" mode="md" expand="block" color="dark" onclick="location.href='#/login'">Login</ion-button>
			</ion-list>
		</ion-footer>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import firebase from '@/firebase.config'
	import Navbar from "@/components/Navbar.vue";

	@Component({
		components: {
			Navbar
		}
	})

	export default class Home extends Vue{
		notSignedIn: boolean = false;
		created() {
			var self = this
			firebase.auth.onAuthStateChanged(function(user) {
				if (user && user.emailVerified == true) {
					self.$router.push('/account');
				} else {
					console.log('HI')
					self.notSignedIn = true;
					console.log(self.notSignedIn)
					// No user is signed in.
				}
			});
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
}
ion-content {
  font-family: 'Nunito', sans-serif;
}
ion-footer {
	--padding-top: 0;
	--padding-bottom: 0;
}
#home-container {
	width: 100%;
	display: inline-block;
}
#home-container h1 {
	font-size: 6vh;
	font-weight: bold;
	text-align: center;
}
#home-container h2 {
	color: gray;
	text-align: center;
	font-size: 2.5vh;
	font-style: italic;
}
#lacoin-logo {
	display: block;
	border: 4px solid;
	border-radius: 50%;
	border-color: rgb(185, 143, 2);
	width: 16em;
	height: 16em;
	margin-left: calc(50% - 8em);
	background-color: rgb(255, 214, 80);
}
#home-container h3 {
	color: gray;
	text-align: center;
	font-size: 3vh;
}
</style>