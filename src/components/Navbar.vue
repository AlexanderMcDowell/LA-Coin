<template>
    <div class="button-container">
        <div class="button-div" :style="accountStyle">
            <i class="ion-md-contact" type="button" @click="accountChange()"></i>
            <h6>Account</h6>
        </div>
        <!--ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='#/account'">Account</ion-button-->
        <div class="button-div" :style="peopleStyle">
            <i class="ion-md-contacts" type="button" @click="peopleChange()"></i>
            <h6>People</h6>
        </div>
        <!--ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='#/people'">People</ion-button-->
        <div class="button-div" :style="eventStyle">
            <i class="ion-md-ribbon" type="button" @click="eventChange()"></i>
            <h6>Events</h6>
        </div>
        <!--ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='#/events'">Events</ion-button-->
        <div class="button-div" :style="settingStyle">
            <i class="ion-ios-cog" type="button" @click="settingChange()"></i>
            <h6>Settings</h6>
        </div>
        <!--ion-button color="primary" shape="round" fill="outline" strong="true" onclick="location.href='#/editprofile'">Settings</ion-button-->
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import firebase from "@/firebase.config";
    @Component
    export default class Navbar extends Vue {
        currentPath: string = window.location.href;
        accountStyle: any = {
            color: "gray"
        }
        peopleStyle: any = {
            color: "gray"
        }
        eventStyle: any = {
            color: "gray"
        }
        settingStyle: any = {
            color: "gray"
        }
        created() {
            // Note -- the current path start index is denoted at 24. This may change
            if (this.currentPath.slice(this.currentPath.length-7, this.currentPath.length) == 'account') {
                this.accountStyle.color = 'navy'
            }
            else if (this.currentPath.slice(this.currentPath.length-6, this.currentPath.length) == 'people') {
                this.peopleStyle.color = 'navy'
            }
            else if (this.currentPath.slice(this.currentPath.length-6, this.currentPath.length) == 'events') {
                this.eventStyle.color = 'navy'
            }
            else if (this.currentPath.slice(this.currentPath.length-11, this.currentPath.length) == 'editprofile') {
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
.button-container {
    padding-top: 2vw;
    padding-bottom: 2vw;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    /*background-color: rgb(250, 250, 250);*/
}
.button-div {
    display: inline-block;
    /*border: solid 2px red;*/
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