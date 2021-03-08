<template>
    <div class="top">
        <div class="left"></div>
        <div class="right">
            <h1 style="margin-left: 45px;">{{$route.name}}</h1>
            <div style="margin-right: 30px">
                <Dropdown @on-click="menuClick">
                    {{UserInfo.name}}
                    <a href="javascript:void(0)">
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="logout">退出登录</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'TopBar',
    data(){
      return {
          username: ''
      }
    },
    computed:{
        ...mapState(['UserInfo']),
    },
    methods:{
        menuClick(name){
            this[name]();
        },
        logout(){
            this.$api.userLogout().then(res=>{
                if (res.status == 200){
                    sessionStorage.setItem('token',null)
                    this.$store.commit('Logout')
                    this.$router.push({
                        path: "login",
                    })
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .top{
        height: 70px;
        width: 100%;
        display: flex;
        .left{
            background-color: #363e4f;
            width: 240px;
            height: 100%;
        }
        .right{
            height: 100%;
            width: calc(100% - 240px);
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            align-items: center;
            background: white;
            justify-content: space-between;
        }
    }
</style>
