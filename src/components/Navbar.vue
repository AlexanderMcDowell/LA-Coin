<!-- Navigation Bar denoting all app pages -->

<template>
    <div id="button-container">
        <div class="button-div" :style="accountStyle">
            <i class="ion-md-contact" type="button" @click="accountChange()"></i>
            <h6>Account</h6>
        </div>
        <div class="button-div" :style="peopleStyle">
            <i class="ion-md-contacts" type="button" @click="peopleChange()"></i>
            <h6>People</h6>
        </div>
        <div class="button-div" :style="eventStyle">
            <i class="ion-md-ribbon" type="button" @click="eventChange()"></i>
            <h6>Events</h6>
        </div>
        <div class="button-div" :style="settingStyle">
            <i class="ion-ios-cog" type="button" @click="settingChange()"></i>
            <h6>Settings</h6>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";

    @Component

    export default class Navbar extends Vue {
        currentPath: string = window.location.href;

        accountStyle: any = {color: "gray"}
        peopleStyle: any = {color: "gray"}
        eventStyle: any = {color: "gray"}
        settingStyle: any = {color: "gray"}
        
        created() {
            if (this.currentPath.includes('account')) {
                this.accountStyle.color = 'navy'
            }
            else if (this.currentPath.includes('people')) {
                this.peopleStyle.color = 'navy'
            }
            else if (this.currentPath.includes('events')) {
                this.eventStyle.color = 'navy'
            }
            else if (this.currentPath.includes('editprofile')) {
                this.settingStyle.color = 'navy';
            }
            else {
                this.peopleStyle.color = 'navy'
            }
        }
        accountChange() {
            this.$router.push('/account');
        }
        peopleChange() {
            this.$router.push('/people');
        }
        eventChange() {
            this.$router.push('/events');
        }
        settingChange() {
            this.$router.push('/editprofile');
        }
    }
</script>

<style scoped>
#button-container {
    padding-top: 2vw;
    padding-bottom: 2vw;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
}
.button-div {
    display: inline-block;
}
.button-div h6 {
    font-family: 'Nunito', sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 4vw;
}
.button-div i {
    font-size: 18.5vw;
}
</style>