<template>
    <v-app id='main'>
        <h1>ある変換</h1>
        <v-container>
            <div v-if="!buildSuccess">
                {{ initialMessage }}
            </div>
            <div v-else>
                <!-- <MsgDisplayer :message="aruGyakuHenkan"/> -->
                <!-- <p>↑ある逆変換</p> -->
                <v-text-field 
                    class="user-input"
                    v-model="userInput"
                    clearable
                    Solo
                    outlined
                />
                <p>↓ある変換</p>
                <MsgDisplayer :message="aruHenkan"/>
                <button @click="twitterShare">tweet</button>
            </div>
        </v-container>
    </v-app>
</template>

<script lang='ts' src='./index.ts'/>

<style scoped>
.v-text-field {
    width: 100%;
    max-width: 300px;
}
.container {
    align-items: center;
}
</style>