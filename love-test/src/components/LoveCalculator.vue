<template>
    <div class="flex flex-col justify-center items-center h-screen w-full">
        <h1 class="text-4xl font-bold mb-8 text-pink-400">Love Calculator</h1>
        <div class="flex flex-col w-96">
            <div class="relative mt-5 z-0">
                <input type="text" id="floating_outlined"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-red-300  focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                    placeholder=" " v-model="name1" />
                <label for="floating_outlined"
                    class="absolute text-sm text-pink-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">your
                    name</label>
            </div>
            <div class="relative mt-5 z-0">
                <input type="text" id="floating_outlined2"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                    placeholder=" " v-model="name2" />
                <label for="floating_outlined2"
                    class="absolute text-sm text-pink-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">you
                    know who's name</label>
            </div>
            <SparkButton class="mt-7" @click="calculate"></SparkButton>
        </div>
        <div v-if="loveResponse !== null"
            class="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex flex-col gap-4 items-center justify-center bg-black z-100">
            <h2 class="text-2xl text-white font-bold mb-2">{{ loveResponse.percentage }}</h2>
            <div class="heart-container text-white">
                {{ loveResponse.result }}
            </div>
            <button type="button text-red mt-7" @click="startAgain">again.</button>
        </div>
        <heart class="z-50" v-if="loading"></heart>


    </div>
</template>

<script setup>
import heart from './heart.vue'
import SparkButton from './SparkButton.vue'
import axios from 'axios'
import { ref } from 'vue';

const name1 = ref('');
const name2 = ref('');
const loading = ref(false);
const loveResponse = ref(null);

const url = 'https://love-calculator.p.rapidapi.com/getPercentage'
const headers = {
    'X-RapidAPI-Key': 'a502d8d0ebmshff360bcfca0e335p123814jsnadab29996476',
    'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function calculate() {
    if (name1.value.includes('yigithan') || name2.value.includes('yigithan')) {
        loading.value = true
        await sleep(10000);
        loveResponse.value = {}
        loveResponse.value.percentage = 100
        loveResponse.value.result = 'just yigithan effect...'
        loading.value = false
    } else if (name1.value == '' || name2.value == '') {
        alert('write the damn names...')
    } else {
        loading.value = true;
        var fname = name1.value
        var sname = name2.value
        await sleep(12000);
        axios.get(url, { params: { fname, sname }, headers })
            .then(response => {
                console.log(response.data);
                loveResponse.value = response.data;
                loading.value = false;
            })
            .catch(error => {
                console.error(error);
                loading.value = false;
            });
    }
}

function startAgain() {
    loveResponse.value = null;
    name1.value = '';
    name2.value = '';
}
</script>