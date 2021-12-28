<template>
    <div class="dropdown" @click="openclose" v-bind:class="{active: IsActive}">
        <input text="text" class="textBox" v-bind:value="value"
        placeholder="Выберите:" readonly>
        <div class="option">
            <div v-for="item in items"  @click="show(item.name)" :key="item.name"> 
              <ion-icon v-if="item.icon != undefined" :name="item.icon"></ion-icon>
                {{item.name}} </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props:['value', 'items'],
    data(){
        return {
            IsActive: false,
        }
    },
    methods:{
       show(Option){           
           this.$emit('OptionChanged',Option);

       },
       openclose(){
           this.IsActive = !this.IsActive;
       }
    }
}
</script>
<style>
.dropdown
{
    position: relative;
    width: 300px;
    height: 50px;
    color:black;
}
.dropdown input 
{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: #fff;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    border:none;
    outline: none;
    padding: 12px 20px;
    border-radius: 10px;
}
.dropdown .option
{
    position: absolute;
    top: 70px;
    width: 100%;
    background: #fff;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    border-radius: 10px;
    overflow: hidden;
    display: none;
    z-index: 10;
}
.dropdown.active .option
{
    display: block;
}
.dropdown .option div
{
    padding: 12px 20px;
    cursor: pointer;  
}
.dropdown .option div:hover
{
    background: #62baea;
    color: #fff;
}
.dropdown .option div ion-icon
{
    position: relative;
    top: 4px;
    font-size: 1.2em;
}
.dropdown::before{
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid #333;
    right: 20px;
    top: 15px;
    z-index: 111;
    border-top: #fff;
    border-right: #fff;
    transform: rotate(-45deg);
    transition: 0.5s;
    pointer-events: none;
}
.dropdown.active::before{
    top: 22px;
    transform: rotate(-225deg);
}
</style>