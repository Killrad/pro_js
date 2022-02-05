<template>
    <form id="Summary_form">
        <h1 class="form__title">Форма для подачи резюме</h1>
            <div class="form__item">
                <label for="formProf" class="form__label">Профессия:</label>
                <input id="formProf" type="text" name="prof" class="form__input _req _name" 
                :value="summary.profession">
            </div>
            <div class="form__item left">
                <label for="formCity" class="form__label">Город:</label>
                <input id="formCity" type="text" name="city" class="form__input _req _name"
                :value="summary.city" list="Cities" @change="CityChange">
                <datalist id="Cities">
                    <option v-for="city in cities" :value="city.title" :key="city.id"/>
                </datalist>
            </div>
            <div class="form__item" style="width: 450px;">
                <label for="formName" class="form__label">ФИО*:</label>
                <input id="formName" type="text" name="name" class="form__input _req _name"
                :value="summary.FIO"/>
            </div>
            <div class="form__item left" style="margin-left:480px;">
                <label for="formStatus" class="form__label" style="z-index:1;">Статус:</label>
                <Chooser id="formStatus" @optionChanged="StatusChanged" :value="summary.status" :items="varStatus" style="width:145px"/> 
            </div>
            <div class="form__item" style="width: 625px;">
                <label for="formURL" class="form__label">URL Фото:</label>
                <input id="formURL" type="text" name="url" class="form__input _req _name"
                :value="summary.url" v-bind:class="{_error: errs.url}">
            </div>
            <div class="form__item">
                <label for="formEmail" class="form__label">E-mail*:</label>
                <input id="formEmail" type="text" name="email" class="form__input _req _email"
                :value="summary.email" v-bind:class="{_error: errs.email}">
            </div>
            <div class="form__item left">
                <label for="formPhone" class="form__label">Телефон*:</label>
                <input id="formPhone" type="text" name="phone" class="form__input _req _phone"
                :value="summary.phone"  v-bind:class="{_error: errs.phone}">
            </div>
            <div class="form__item">
                <label for="formBdate" class="form__label">Дата рождения:</label>
                <input id="formBdate" type="text" name="bdate" class="form__input _req _phone"
                :value="summary.bdate">
            </div>
            <div class="form__item left">
                <label for="formPay" class="form__label">Желаемая Зарплата:</label>
                <input id="formPay" type="text" name="paytion" class="form__input _req _phone"
                :value="summary.paytion">
            </div>
            <div class="form__item">
                <label for="formEdu" class="form__label" style="z-index:1;">Образование:</label>
                <Chooser id="formEdu" @optionChanged="EduChanged" :value="summary.education" :items="obr1"/> 
            </div>
            <button class="btns" type="button" style="margin-left:0px;" @click="AddNewYear" v-if="isEdu()"> Ещё образование </button>
            <div class="form__item left">
                <label for="formMessage" class="form__label">Ключевые навыки:</label>
                <textarea id="formMessage" name="message" class="form__input" :value="summary.skills"></textarea>
            </div>
            <div class="eduall" v-if="isEdu()">
                <div class="edu" v-for="ed in summary.edu" :key="ed.index">
                    <div class="del" v-if="ismanyEdu()">
                        <button type="button" style="visibility:hidden; position:absolute; width:20px; height:20px;" @click="deleteEdu(ed.index)"/>
                        <ion-icon name="close-circle-outline" @click="deleteEdu(ed.index)"></ion-icon>
                    </div>
                    <div class="form__item" style="width: 625px;">
                        <label for="formPay" class="form__label" style="margin-left:228px;">Учебное заведение</label>
                        <input id="formPay" type="text" name="paytion" class="form__input"
                        :value="ed.name" list="Unics">
                    </div>

                    <div class="form__item" style="width: 200px;">
                        <label for="formPay" class="form__label">Факультет:</label>
                        <input id="formPay" type="text" name="paytion" class="form__input"
                        :value="ed.faculty">
                    </div>

                    <div class="form__item left" style="width: 200px; margin-left:225px;">
                        <label for="formPay" class="form__label">Профиль:</label>
                        <input id="formPay" type="text" name="paytion" class="form__input"
                        :value="ed.profile">
                    </div>

                    <div class="form__item left" style="width: 175px; margin-left: 450px">
                        <label for="formPay" class="form__label">Год окончания:</label>
                        <input id="formPay" type="text" name="paytion" class="form__input"
                        :value="ed.year">
                    </div>
                </div>
            </div>
            <datalist id="Unics">
                    <option v-for="un in unic" :value="un.title" :key="un.id"/>
            </datalist>
            <div class="form__item" style="width:625px;">
                <label for="formMessage" class="form__label" >О себе:</label>
                <textarea id="formMessage" name="message" class="form__input" :value="summary.info"></textarea>
            </div>
            <div class="form__item">
                <label id="error_label" class="form__label _error" v-if="errs.total>0">Введены некоректные данные.</label>
            </div>
            <button class="btns" type="button" @click="SummarySubmit"> Отправить </button>
    </form>
</template>
<script>
import Chooser from './UIelems/Chooser.vue';
import vkApi from '../assets/VK_Api.json';
import fetchJsonp from "fetch-jsonp";
export default {
    components:{
    Chooser
  },
  data(){
      return{
          cities:[
                {title:"Липецк", id:1},
                {title:"Воркута", id:2},
                {title:"Белгород", id:3}
          ],
          unic:[
            {title:"ЛГТУ", id:1}
          ],
        items:[
            {name:"Доктор наук", icon:undefined},
            {name:"Кандидат наук", icon:undefined},
            {name:"Высшее образование", icon:undefined},
            {name:"Неполное высшее образование", icon:undefined},
            {name:"Средне специальное образование", icon:undefined},
            {name:"Среднее образование", icon:undefined},
            {name:"Учащийся школы", icon:undefined},
            {name:"Магистр", icon:undefined},
            {name:"Бакалавр", icon:undefined},
        ],
        obr1:[
            {name:"Среднее", icon:undefined},
            {name:"Среднее специальное", icon:undefined},
            {name:"Неоконченное высшее", icon:undefined},
            {name:"Высшее", icon:undefined}
        ],
        varStatus:[
            {name:"Новый", icon:undefined},
            {name:"Назначено собеседование", icon:undefined},
            {name:"Принят", icon:undefined},
            {name:"Отказ", icon:undefined},
        ],
        summary:{
            status:'Новый',
            profession: '',
            city:'',
            FIO:'',
            url:'',
            phone:'',
            email:'',
            bdate:'',
            education:'',
            edu:[
                {index:1, name:'', faculty:'', profile:'', year:''},
                ],
            paytion:'',
            skills:'',
            info:''
        },
        errs: {
            email: 0,
            phone:0,
            url: 0,
            total:0
        }
      }
  },
  mounted(){
      this.getCities();
  },
  methods:{
      ismanyEdu(){
          return (this.summary.edu.length > 1);
      },
      deleteEdu(index){
          console.log(index);
          let new_edu = [];
          this.summary.edu.forEach(x =>{
              if (x.index != index) new_edu.push(x)
          })
          this.summary.edu = new_edu;
      },
      async getCities(){
          let response = await fetchJsonp("https://api.vk.com/method/database.getCities?country_id=1&count=100&access_token="+vkApi.token+"&v=5.131")
          .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log("parsed json", json);
                return json.response.items;
            })
            .catch(function (ex) {
                console.log("parsing failed", ex);
            });
            this.cities = response;
      },
      async getUnic(city){
          let url = '';
          if (city != ''){
            let id = -1;
            this.cities.forEach(it =>{
                if (it.title == city) id = it.id;
            });
          
            url = "https://api.vk.com/method/database.getUniversities?country_id=1&city_id="+id+"&count=100&access_token="+vkApi.token+"&v=5.131";
          }
          this.summary.city = city;
          this.unic = await fetchJsonp(url)
          .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log("parsed json", json);
                return json.response.items;
                
            })
            .catch(function (ex) {
                console.log("parsing failed", ex);
            });
            //this.unic = response;
      },
      AddNewYear(){
          let cnt_edu = 0;
          this.summary.edu.forEach(x =>{
              if (x.index > cnt_edu) cnt_edu = x.index
          })
          let new_edu = {
              index:cnt_edu+1, name:'', faculty:'', profile:'', year:''
          };
          this.summary.edu.push(new_edu);
      },
      async CityChange(e){
        let city = e.target.value;
        console.log(city);
        await this.getUnic(city);
      },
      StatusChanged(opt){
        this.summary.status = opt;
      },
      EduChanged(opt){
          this.summary.education = opt;
      },
      SummarySubmit(){
        this.validate();
        console.log(this.summary.city);
        if (this.errs.total == 0){
            /*Сохранение данных */
        }
      },
      isEdu(){
          return (this.summary.education != 'Среднее' && 
                this.summary.education != '');
      },
      validate(){
        this.errs.email=0;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(this.summary.email)) this.errs.email=1; /*Валидация почты*/
        this.errs.phone=0;
        if (!/^[0-9]{13}$/.test(this.summary.phone)) this.errs.phone=1; /*Валидация телефона */
        this.errs.url=0;
        if (!/^http[s]?:\/\/[a-z0-9]*/.test(this.summary.url)) this.errs.url=1; /*Валидация URL ссылки */
        this.errs.total = this.errs.url+this.errs.email+this.errs.phone;
      }
  }
}
</script>
<style>
.edu{
    border: 3px solid #cacaca;
    border-radius: 20px;
    margin-left: -2px;
    padding-left: 2px;
    height: 200px;
    width: 635px;
}
.form{
    max-width: 625px;
    margin: 0 auto;
    margin-top: 20px;
    color: #fff;
    padding: 30px 0;
    justify-content: center;
    align-items: center;
    display: flex;
}
h1{
    color:#fff;
}
.form *{
    outline: none;
}

.form__title{
    font-size: 40px;
    font-weight: 700;
    margin: 0 0 30px 0;
    text-align: center;
}
.form__body{
    display: block;
    position: relative;
}
.form__body::after{
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease 0s;
}
.form__body._hide{
    display: none;
    transition: all 0.5s ease 0s;
}
.del{
    color: rgb(255, 0, 0);
    position: absolute;
    margin-top: 2px;
    margin-left: 590px;
    font-size: 22px;
    z-index: 10;
}
.form__input{
    height: 50px;
    padding: 0 20px;
    border-radius: 5px;
    width: 100%;
    font-size: 18px;
    transition: all 0.5s ease 0s;
}
.form__input:focus{
     box-shadow: 0 0 20px #62baea;
}
.form__input._error{
    box-shadow: 0 0 15px red;
}
textarea.form__input{
    min-height: 120px;
    resize: vertical;
    padding: 20px;
}
.form__item{
    position:relative;
    margin: 0 0 20px 0;
    width:300px;
}
.left{
    margin-left: 325px;
    margin-top: -101px;
}
.form__label{
    color:#fff;
    font-size: 18px;
    display: block;
    width: 100%;
    margin:0 0 10px 0;
}
.form__label._hide{
    display: none;
}
.form__label._error{
    color: red;
    text-align: center;
}
input{
    height: 50px;
    width: 300px;
    background: #fff;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    border:none;
    outline: none;
    padding: 12px 20px;
    border-radius: 10px;
}
.btns{
    margin-left: 150px;
    position: absolute;
    font-size: 18px;
    width: 300px;
    background: #fff;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    border:none;
    outline: none;
    padding: 12px 20px;
    border-radius: 10px; 
    z-index: 0;
}
.btns:hover{
    background: #62baea;
    color: #fff;
}
</style>