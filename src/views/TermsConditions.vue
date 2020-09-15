<!-- Page containing Terms to Agree -->

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
				<h1>Agreement</h1>
				<img id="lacoin-logo" src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/Terms.png?alt=media&token=e864f680-8fbf-4c8a-8bb3-55d353c43fcb"/>
                <p>By clicking, I affirm to use this App respectfully, 
                    honestly, and within the bounds of a healthy, inclusive 
                    and encouraging high school community. Acting irresponsibly
                    or maliciously means that my account will be terminated.</p>
			</div>
		</ion-content>
		<!-- Log in, Sign in Buttons -->
		<ion-footer class="ion-padding">
			<ion-list>
				<ion-button mode="md" expand="block" color="dark" fill="outline" @click="confirm()">I affirm</ion-button>
                <ion-button mode="md" color="medium" expand="block" fill="outline" onclick="location.href='#/'">Cancel</ion-button>
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

	export default class Home extends Vue {
        confirm() {
            firebase.auth.currentUser.reload()
            var self = this
			firebase.auth.onAuthStateChanged(function(user) {
				if (user && user.emailVerified == true) {
					var checkUser = firebase.usersCollection.doc(user.uid)
					checkUser.get().then(doc => {
						return self.$ionic.modalController
							.create({
							component: MoreInfo
							}).then(
							m => m.present()
						)
					})
					self.$router.push('/account');
				} else {
					alert('Please try again. Make sure account is verified')
				}
			})
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
#home-container p {
	color: gray;
	text-align: center;
	font-size: 2.5vh;
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