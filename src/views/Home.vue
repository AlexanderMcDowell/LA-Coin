<!-- Page containing Welcome and User Registration Info -->

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
				<ion-button v-if="notSignedIn == true" mode="md" expand="block" color="dark" fill="outline" @click="confirm()">Confirm your account</ion-button>
				<ion-button v-if="notSignedIn == true && accountCreated == false" mode="md" expand="block" color="dark" fill="outline" onclick="location.href='#/signup'">Get Started!</ion-button>
				<ion-button v-if="notSignedIn == true && accountCreated == true" mode="md" expand="block" color="dark" onclick="location.href='#/login'">Login</ion-button>
			</ion-list>
		</ion-footer>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import firebase from '@/firebase.config'
	import Navbar from "@/components/Navbar.vue";
	import MoreInfo from "@/components/MoreInfo.vue";

	@Component({
		components: {
			Navbar
		}
	})

	export default class Home extends Vue{
		notSignedIn: boolean = false;
		accountCreated: boolean = false;
		shouldShowTutorial: boolean;

		hasStartedSignupProcess: boolean; //vuex data (this don't work)

		mounted() {
			this.hasStartedSignupProcess = this.$store.getters.returnIfStartedSignupProcess
		}

		created() {
			console.log('home created')
			console.log(this.$store.getters.returnIfStartedSignupProcess)
			//this.hasStartedSignupProcess = this.$store.getters.returnIfStartedSignupProcess
			this.$store.state.todayDate = this.getDate()
			var self = this
			
			firebase.auth.onAuthStateChanged(function(user) {
				if (user && user.emailVerified == true) {
					var checkUser = firebase.usersCollection.doc(user.uid)
					checkUser.get().then(doc => {
						self.shouldShowTutorial = doc.data().showTutorial
						if (self.shouldShowTutorial == true) {
							return self.$ionic.modalController
								.create({
								component: MoreInfo
								}).then(
								m => m.present()
							)
						}
					})
					self.$router.push('/account');
				} 
				else if (user && user.emailVerified == false) {
					self.notSignedIn = true;
					self.accountCreated == false;
				}
				else {
					self.notSignedIn = true;
					// No user is signed in.
				}
			});
		}

		confirm() {
			try {
				firebase.auth.currentUser.reload()
				this.$router.push('/termsConditions');
			} catch {
				alert('Account does not exist')
			}
		}

		getDate() {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();
			var todayDate = mm + '/' + dd + '/' + yyyy;
			return todayDate
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