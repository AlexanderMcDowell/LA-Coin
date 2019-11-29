<template>
  <div class="ion-page">
	  <ion-header>
      <ion-toolbar>
		<ion-title>Welcome!</ion-title>
      </ion-toolbar>
    </ion-header>
		<ion-content class="ion-padding">

			<!-- Welcome icon and description -->
			<div id="home-container">
				<h1>LACoin</h1>
				<img src="https://firebasestorage.googleapis.com/v0/b/wuffee-app.appspot.com/o/eagle.jpg?alt=media&token=da6e77ad-61d5-47b3-9ab3-a4fe860402a5"/>
				<h2>Greed is Good. <br> Get Started Below</h2>
			</div>
		</ion-content>
		<ion-footer class="ion-padding">
			<ion-list>
				<ion-button expand="block" color="dark" fill="outline" onclick="location.href='/#/signup'">Get Started</ion-button>
				<ion-button expand="block" color="dark" onclick="location.href='/#/login'">Login</ion-button>
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

<style>
#navbar {
	display: flex;
}
ion-title {
	font-size: 6vw;
	padding: 0;
	margin-left: 2.5vw;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
ion-title {
  margin-left: 0;
}
ion-content {
  font-family: 'Roboto Slab', serif;
}
ion-title {
	font-family: 'Roboto', serif;
}
ion-footer {
	--padding-top: 0;
	--padding-bottom: 0;
}
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
#home-container {
	margin:0;
}
#home-container h1 {
	margin: 0;
	margin-bottom: 20vh;
	padding: 0;
	font-style: italic;
	font-size: 6vh;
	font-weight: bold;
	text-align: center;
	}
#home-container img {
	margin-top: 0;
	border: 2px solid;
	border-radius: 50%;
	border-color: navy;
	position: absolute;
	left: 50%;
	height: 50%;
	width: auto;
	/* bring your own prefixes */
	transform: translate(-50%, -50%);
}
#home-container h2 {
		margin-top: 40vh;
		color: gray;
		text-align: center;
		font-size: 3vh;
	}
</style>
