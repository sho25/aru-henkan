<template>
    <div id='main'>
        <div v-if="!buildSuccess">
            {{ initialMessage }}
        </div>
        <div v-else>

        </div>
    </div>
</template>

<script lang='ts' src='./Main.ts'>