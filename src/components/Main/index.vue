<template>
    <v-app id='main'>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <v-toolbar-title class="mx-auto"><b>ある変換</b></v-toolbar-title>
        </v-app-bar>
        <v-container>
            <div v-if="!buildSuccess">
                <div :class="headline">loading.....</div>
                <vue-loading type="spin" :size="{ width: '50px', height: '50px' }"/>
            </div>
            <div v-else>
                <v-text-field 
                    class="user-input mx-auto"
                    v-model="userInput"
                    clearable
                    Solo
                    outlined
                />
                <p>↓ある変換</p>
                <AruDisplayer :aruHenkanMap="aruHenkanMap"/>
                <v-btn color="primary" @click="twitterShare">tweet</v-btn>
            </div>
        </v-container>
        <v-footer
            color="primary"
            app
        >
            <span class="white--text">&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script lang='ts' src='./index.ts'/>

<style scoped>
.v-text-field {
    width: 100%;
}
.container {
    align-items: center;
}
</style>