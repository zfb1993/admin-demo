<template>
    <div>
        <div class="m10">
            <Button type="primary" @click="getList">刷新</Button>
            <Button type="success" @click="addModalShow">新增</Button>
        </div>
        <Table border :columns="columns" :data="data" :loading="loading"></Table>
        <Modal
            v-model="modalShow"
            title="编辑"
            @on-ok="edit"
            @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="标签名">
                    <Input v-model="formItem.name" placeholder="请填写标签名"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
            v-model="addShow"
            title="新增"
            @on-ok="add"
            @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="标签名">
                    <Input v-model="formItem.name" placeholder="请填写标签名"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import api from '../../axios/http.js'
    export default {
        name: "categoryList",
        data () {
            return {
                loading: false,
                modalShow: false,
                modalTitle: '',
                addShow: false,
                formItem:{
                    name:''
                },
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                    },
                    {
                        title: '标签名',
                        key: 'name'
                    },
                    {
                        title: '创建时间',
                        key: 'created_at'
                    },
                    {
                        title: '修改时间',
                        key: 'updated_at'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            show (param) {
                this.modalShow = true
                this.formItem.id = param.row.id
                this.formItem.name = param.row.name
            },
            remove (param) {
                this.$Modal.confirm({
                    title: '删除',
                    content: '确定要删除么？',
                    onOk: () => {
                        let data = {id:param.row.id}
                        api.deleteTag(data).then(res=>{
                            if(res.data.state == 0){
                                this.$Message.success('删除成功');
                                this.getList()
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
            getList(){
                this.loading = true
                let data = {isPage:true}
                api.getTags(data).then(res=>{
                    this.data = res.data.data
                    this.loading = false
                    this.$Message.success('刷新成功');
                });
            },
            edit(){
                api.editTags(this.formItem).then(res=>{
                    if(res.data.state == 0){
                        this.$Message.success('编辑成功');
                        this.getList()
                    }
                })
            },
            add(){
                let data = {name:this.formItem.name}
                api.createTag(data).then(res=>{
                    if(res.data.state == 0){
                        this.$Message.success('新增成功');
                        this.getList()
                    }
                })
            },
            cancel(){

            },
            addModalShow(){
                this.addShow = true
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
    .m10{
        margin-bottom: 10px;
    }
</style>
