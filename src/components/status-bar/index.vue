<template>
	<view :style="{height: height + 'px', backgroundColor: bgColor}"></view>
</template>

<script>
	export default {
		name: '',
		props: {
			height: Number,
			bgColor: {
				type: String,
				default: '#fff'
			}
		},
		data(){
			return {};
		}
	}
</script>

<style>
</style>