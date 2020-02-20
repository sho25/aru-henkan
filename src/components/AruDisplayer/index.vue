<template>
    <div id='msg'>
        <span v-for="aruHenkan in aruHenkanMap" v-bind:key="aruHenkan['aruHenkan']" :class="colorClass(aruHenkan)">
            <b>{{ aruHenkan['aruHenkan'] }}</b>
        </span>
    </div>
</template>

<script lang='ts' src='./index.ts'/>

<style scoped>
#msg {
    padding: 10px;
}
</style>