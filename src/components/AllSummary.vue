<template>
    <div class="lister">
        <div class="element" v-for="s in summarys" :key="s.id">
            <div class="delete">
                <button type="button" style="visibility:hidden; position:absolute; width:20px; height:20px;" @click="del(s.id)"/>
                <ion-icon name="trash-sharp" @click="del(s.id)"></ion-icon>
            </div>
            <div class="edit">
                <button type="button" style="visibility:hidden; position:absolute; width:20px; height:20px;" @click="edti(s.id)"/>
                <ion-icon name="pencil-sharp" @click="edit(s.id)"></ion-icon>
            </div>
            <div class="el" style="width:400px;">
                <label class="form__label">ФИО: {{s.name}}</label>
            </div>
            <div class="el" style="width:300px; margin-left:430px;">
                <label class="form__label">Город: {{s.city}}</label>
            </div>
            <div class="el2" style="width:150px;">
                <label class="form__label">Статус: {{s.status}}</label>
            </div>
            <div class="el2" style="width:200px; margin-left:170px;">
                <label class="form__label">Профессия: {{s.prof}}</label>
            </div>
            <div class="el2" style="width:300px; margin-left:400px;">
                <label class="form__label">Образование: {{s.edu}}</label>
            </div>
            
        </div>
    </div>
</template>

<script>
import request from './req'
export default {
    data(){
        return {
            summarys:[
            ]
        }
    },
    async mounted() {
        const ans = await request('http://localhost:5000/api/cv')
        this.summarys = ans;
    },
    methods:{
        
        edit(id){
            this.$router.push({name:'Summary', params:id});
        },
        async del(id){
            const ans = await request('http://localhost:5000/api/delete/'+id, 'DELETE');
            console.log(ans);
        }
    }
}
</script>

<style>
.el{
    position: absolute;
    margin-top:15px; 
    margin-left:15px; 
}
.el2{
    position: absolute;
    margin-top:50px; 
    margin-left:15px; 
}
.element{
    position: relative;
    margin-top:20px;
    border: 3px solid #cacaca;
    border-radius: 20px;
    margin-left: -2px;
    padding-left: 2px;
    height: 100px;
    width: 80%;
    display: flex;

}
.lister{
    position: relative;
    width: 1000px;
    margin: 0 auto;
    margin-top: 20px;
    color: #fff;
    padding: 30px 0;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
}
.form__label{
    color:#fff;
    font-size: 18px;
    display: block;
    width: 100%;
    position: relative;
}
.form__label._hide{
    display: none;
}
.form__label._error{
    color: red;
    text-align: center;
}
.delete{
    color: rgb(255, 0, 0);
    position: absolute;
    margin-top: 20px;
    margin-left: 760px;
    font-size: 22px;
    z-index: 10;
}
.edit{
    color: rgb(0, 151, 0);
    position: absolute;
    margin-top: 60px;
    margin-left: 760px;
    font-size: 22px;
    z-index: 10;
}
</style>