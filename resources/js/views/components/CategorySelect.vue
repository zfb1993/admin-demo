<template>
    <div>
        <Select v-model="category" style="width:200px;" @on-change="passVal">
            <Option v-for="(item,index) in categories"
                    :value="item.id"
                    :key="index"
            >
                {{ item.name }}
            </Option>
        </Select>
    </div>
</template>

<script>
    export default {
        props:{
            checkedId:null
        },
        name: "categorySelect",
        data(){
            return {
                categories: [],
                category: null,
            }
        },
        methods:{
            passVal(){
                this.$emit('getCategory', this.category)
            }
        },
        mounted() {
            console.log(this.$store.state.Categories)
            this.categories = this.$store.state.Categories
        },
        watch:{
            checkedId(value){
                this.category = value
            }
        }
    }
</script>

<style >
    .ivu-select-dropdown{
        z-index: 999999 !important;
    }
</style>
