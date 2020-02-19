<template>
    <v-app id='main'>
        <v-container>
            <h1>ある変換</h1>
            <div v-if="!buildSuccess">
                {{ initialMessage }}
            </div>
            <div v-else>
                <!-- <MsgDisplayer :tokenizedMessage="aruGyakuHenkan"/> -->
                <!-- <p>↑ある逆変換</p> -->
                <v-text-field 
                    class="user-input"
                    v-model="userInput"
                    clearable
                    Solo
                    outlined
                />
                <p>↓ある変換</p>
                <MsgDisplayer :tokenizedMessage="aruHenkan"/>
            </div>
        </v-container>
    </v-app>
</template>

<script lang='ts' src='./index.ts'/>

<style scoped>
.v-text-field {
    width: 50%;
}
.v-input__slot {
    align-items: center;
}
</style>