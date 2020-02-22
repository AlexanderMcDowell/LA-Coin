<template>
	<div class="ion-page">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- Card to change photo of user-->
      <ion-card mode="md" v-if="changePhoto == true">
        <ion-card-header @click="changePhoto = false">Photos ❌</ion-card-header>
        <ion-card-content mode="md">
          <div class="image-row" v-for="row in profileLinks" v-bind:key="row">
            <img class="image-choice" v-bind:src="row[0]" @click="setNewPhoto(row[0])">
            <img class="image-choice" v-bind:src="row[1]" @click="setNewPhoto(row[1])">
          </div>
        </ion-card-content>
      </ion-card>
      <div id="profile-photo-container">
        <img @click="changePhoto = true" v-bind:src="profilePhoto">
        <h2>Click to Change Photo</h2>
      </div>

      <!--Form to change name, bio, graph settings-->
			<form @submit="changeProfile">
				<ion-item>
					<ion-label position="floating">Name</ion-label>
					<ion-input :value="name" @input="name = $event.target.value" type="text" name="newName" placeholder="Enter a New Name" maxlength=12>
					</ion-input>
          <ion-label position="floating">Description</ion-label>
					<ion-input :value="bio" @input="bio = $event.target.value" type="text" name="newBio" placeholder="Enter a brief description (50 Char Max)" maxlength=50>
					</ion-input>
          <ion-label position="floating">Balance Graph Data Points</ion-label>
          <ion-input :value="graphSpec" @input="graphSpec = $event.target.value" type="text" name="graphSpec" placeholder="Data pts in Balance Record? (Deft. 8)" maxlength=50>
					</ion-input>
				</ion-item>
        <ion-button mode="md" color="dark" type="submit" expand="block">Continue</ion-button>
			</form>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <Navbar />
      </ion-toolbar>
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
  
  export default class EditProfile extends Vue {
    // Old username and new username vars
    name: string = "";
    // Old bio and new bio vars
    bio: string = "";
    // New graph specifications
    graphSpec: number;
    // Old ppf and new ppf vars
    profilePhoto: string = "";
    // Check if photo changes
    changePhoto: boolean = false;
    //Links generated for prettier saves in firebase (attach ppf vars to urls here)
    profileLinks: Array<any> = []

    created() {
      this.getProfilePhotos() // Get all available profile photo options
      this.getUserData()
    }
    getProfilePhotos() {
      var photoList = firebase.photosCollection.doc('photoList')
      photoList.get().then(doc => {
        this.profileLinks = this.parseURLs(doc.data().urls)
      })
    }
    parseURLs(urlList: string[]) {
      // Reshape url list into a 2 column list
      var newUrlList = []
      if (urlList.length%2 != 0) {
        urlList = urlList.slice(0, urlList.length - 1)
      }

      for (var i=0;i<urlList.length;i+=2) {
        newUrlList.push([urlList[i], urlList[i+1]])
      }
      return newUrlList
    }
    getUserData() {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      user.get().then(doc => {
          this.name = doc.data().name;
          this.bio = doc.data().bio;
          this.profilePhoto = doc.data().profilePhoto;
          this.graphSpec = doc.data().graphSpec;
        });
    }
    changeProfile(e: Event) {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      console.log(this.name)
      // Check how many user attributes have been changed
      if (this.name.length > 0) {
        user.update({
          name: this.name
        });
      }
      if (this.bio.length > 0) {
        user.update({
          bio: this.bio
        });
      }
      if (this.graphSpec > 0) {
        user.update({
          graphSpec: this.graphSpec
        });
      }
      this.$router.push('/account')
      e.preventDefault();
    }
    setNewPhoto(link: string) {
      var userId = firebase.auth.currentUser.uid;
      var user = firebase.usersCollection.doc(userId);
      // Reset ppf
      this.profilePhoto = link
      user.update({
          profilePhoto: this.profilePhoto
        });
      this.changePhoto = false;
    }
  }
</script>

<style scoped>
ion-title {
  font-family: 'Nunito', sans-serif;
  font-weight: normal;
  text-align: center;
  margin-left: 0;
  color: rgb(27, 27, 27);
  font-size: 7.5vw;
}
ion-content {
  font-family: 'Roboto Slab', serif;
}
ion-card-header {
  text-transform: uppercase;
  color: black;
  text-align: center;
}
ion-footer {
  background-color: rgb(250, 250, 250);
}
ion-toolbar {
  background-color: rgb(250, 250, 250);
}
.image-row {
  display: flex;
  padding:0;
}
#image-col {
  padding:0;
  display: flex;
  border: 2px solid red;
}
.image-choice {
  display: flex;
  border: 2px solid;
  border-color: lightgray;
  border-radius: 50%;
  width: 9em;
  height: 9em;
  background-color: aquamarine;
  margin: calc((100% - 18em)/4);
}
#profile-photo-container h2 {
  color: gray;
  text-align: center;
  font-size: 3vw;
}
#profile-photo-container {
  width: 100%;
}
#profile-photo-container img {
  border: 2px solid;
  border-color: lightgray;
  border-radius: 50%;
  margin-left: calc(50% - 7em);
  width: 14em;
  height: 14em;
  background-color: aquamarine;
}
</style>