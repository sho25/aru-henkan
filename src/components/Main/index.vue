<template>
    <v-app id='main'>
        <h1>ある変換</h1>
        <div v-if="!buildSuccess">
            {{ initialMessage }}
        </div>
        <div v-else>
            <!-- <MsgDisplayer :message="aruGyakuHenkan"/> -->
            <v-text-field v-model="userInput"/>
            <MsgDisplayer :message="aruHenkan"/>
        </div>
    </v-app>
</template>

<script lang='ts' src='./index.ts'>