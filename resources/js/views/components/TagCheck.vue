<template>
    <div>
        <CheckboxGroup v-model="tagIds" @on-change="passVal">
            <Checkbox :label="tag.id"
                      v-for="(tag,index) in tags"
                      :key="index">
                <span>{{tag.name}}</span>
            </Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
    export default {
        props:{
            checkedTags:null,
        },
        name: "tagCheck",
        data(){
            return {
                tags:[],
                tagIds:[],
            }
        },
        methods:{
            passVal(){
                this.$emit('getTagIds', this.tagIds)
            }
        },
        mounted() {
            this.tags = this.$store.state.Tags
        },
        watch:{
            checkedTags(value){
                this.tagIds = value
            }
        }
    }
</script>

<style scoped>

</style>
