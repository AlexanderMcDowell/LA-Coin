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
				<img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/>
				<h3>Greed is good. <br> Get Started Below</h3>
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
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
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
	border: 2px solid;
	border-radius: 50%;
	border-color: navy;
	position: absolute;
	left: 50%;
	height: 50%;
	width: auto;
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