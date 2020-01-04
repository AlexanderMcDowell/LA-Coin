<template>
  <div class="ion-page">
	  <ion-header>
      <ion-toolbar>
		<ion-title>Welcome!</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">

			<!-- Welcome icon and description -->
			<div class="home-container">
				<h1>LAcoin</h1>
				<h2>Points System for Los Altos Eagles</h2>
				<img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/gold-eagle.png?alt=media&token=055d7ec1-0a95-4836-97c4-015f29643363"/>
				<h3>Tutorial on App Store!<br>Get Started Below</h3>
			</div>
		</ion-content>

		<!-- Log in, Sign in Buttons -->
		<ion-footer class="ion-padding">
			<ion-list>
				<ion-button expand="block" color="dark" fill="outline" onclick="location.href='#/signup'">Get Started</ion-button>
				<ion-button expand="block" color="dark" onclick="location.href='#/login'">Login</ion-button>
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
}
</script>

<style scoped>


ion-title {
	font-family: 'Roboto', serif;
  text-align: center;
  margin-left: 0;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
ion-content {
  font-family: 'Roboto Slab', serif;
}
ion-footer {
	--padding-top: 0;
	--padding-bottom: 0;
	background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
.home-container {
	margin:0;
}
.home-container h1 {
	margin: 0;
	font-style: italic;
	font-size: 6vh;
	font-weight: bold;
	text-align: center;
}
.home-container h2 {
	margin-bottom: 20vh;
	padding: 0;
	color: gray;
	text-align: center;
	font-size: 2.5vh;
	font-style: italic;
}
.home-container img {
	margin-top: 0;
	border: 4px solid;
	border-radius: 50%;
	border-color: rgb(185, 143, 2);
	position: absolute;
	left: 50%;
	--img-size: 50%;
	height: var(--img-size);
	width: calc(var(--img-size) + 0);
	transform: translate(-50%, -50%);
	background-color: aquamarine;
}
.home-container h3 {
	margin-top: 40vh;
	color: gray;
	text-align: center;
	font-size: 3vh;
}
</style>