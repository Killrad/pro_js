<template>
    <div class="convert">
        <div class="converter-body">
		<h1 class="converter-title">Converter</h1>
		<input @keyup="Result" type="text" placeholder="Input" id="input">
		<span c>=</span>
		<label id="result">{{result}}</label>
		<Chooser :key="left_selected" class="selectors" @optionChanged="lch" :items="options" v-bind:value="value(left_selected)" />
		<Chooser :key="right_selected" class="selectors Rselector" @optionChanged="rch" v-bind:items="right_option" v-bind:value="value(right_selected)" />
        <button type="button" class="btn" @click="Result"> Convert </button>
	</div>
    </div>
</template>
<script>
import Chooser from './UIelems/Chooser.vue';
export default{
    components:{
    Chooser
  },
    data(){
        return {
            left_selected: 0,
            right_selected: 0,
            result:"Result",
            lasttype: 0,
            options: [
                {id:0, name: "Метры", type:0}, 
                {id:1, name: "Километры", type:0}, 
                {id:2, name: "Сантиметры", type:0}, 
                {id:3, name: "Дюймы", type:0}, 
                {id:4, name: "Мили", type:0},

                {id:5, name: "Часы", type:1}, 
                {id:6, name: "Минуты", type:1}, 
                {id:7, name: "Секунды", type:1}, 
                {id:8, name: "Дни", type:1}, 

                {id:9, name: "Градусы", type:2}, 
                {id:10, name: "Радианы", type:2}, 
                {id:11, name: "Угловые секунды", type:2}, 
                {id:12, name: "Угловые минуты", type:2}, 

                {id:13, name: "Градус Цельсия", type:3}, 
                {id:14, name: "Градус Кельвина", type:3}, 
                {id:15, name: "Градус Фаренгейта", type:3}, 
            ],
            rules: [
                //Расстояние
                {l:0, r:0, val: x => { return x}},
                {l:0, r:1, val: x => { return x/1000}},
                {l:0, r:2, val: x => { return x*1000}},
                {l:0, r:3, val: x => { return x*39.37}},
                {l:0, r:4, val: x => { return x*0.00062137}},
                
                {l:1, r:0, val: x => { return x*1000}},
                {l:1, r:1, val: x => { return x}},
                {l:1, r:2, val: x => { return x*1000*1000}},
                {l:1, r:3, val: x => { return x*39370.08}},
                {l:1, r:4, val: x => { return x*0.62137}},
                
                {l:2, r:0, val: x => { return x/1000}},
                {l:2, r:1, val: x => { return x/1000000}},
                {l:2, r:2, val: x => { return x}},
                {l:2, r:3, val: x => { return x*0.03937}},
                {l:2, r:4, val: x => { return x*0.00000062137}},

                {l:3, r:0, val: x => { return x*0.025}},
                {l:3, r:1, val: x => { return x*0.000025}},
                {l:3, r:2, val: x => { return x*2.54}},
                {l:3, r:3, val: x => { return x}},
                {l:3, r:4, val: x => { return x*0.000016}},

                {l:4, r:0, val: x => { return x*1610}},
                {l:4, r:1, val: x => { return x*1.61}},
                {l:4, r:2, val: x => { return x*1610000}},
                {l:4, r:3, val: x => { return x*63360}},
                {l:4, r:4, val: x => { return x}},
                //Время
                {l:5, r:5, val: x => { return x}},
                {l:5, r:6, val: x => { return x*60}},
                {l:5, r:7, val: x => { return x*60*60}},
                {l:5, r:8, val: x => { return x/24}},
                
                {l:6, r:5, val: x => { return x/60}},
                {l:6, r:6, val: x => { return x}},
                {l:6, r:7, val: x => { return x*60}},
                {l:6, r:8, val: x => { return x/(60*24)}},

                {l:7, r:5, val: x => { return x/(60*60)}},
                {l:7, r:6, val: x => { return x/60}},
                {l:7, r:7, val: x => { return x}},
                {l:7, r:8, val: x => { return x/(60*60*24)}},

                {l:8, r:5, val: x => { return x*24}},
                {l:8, r:6, val: x => { return x*24*60}},
                {l:8, r:7, val: x => { return x*60*24*60}},
                {l:8, r:8, val: x => { return x}},
                //Углы
                {l:9, r:9, val: x => { return x}},
                {l:9, r:10, val: x => { return x*3.1415/180}},
                {l:9, r:11, val: x => { return x*60*60}},
                {l:9, r:12, val: x => { return x*60}},

                {l:10, r:9, val: x => { return x*180/3.14}},
                {l:10, r:10, val: x => { return x}},
                {l:10, r:11, val: x => { return x*180/3.14*60*60}},
                {l:10, r:12, val: x => { return x*180/3.14*60}},

                {l:11, r:9, val: x => { return x/60/60}},
                {l:11, r:10, val: x => { return x/60/60*3.1415/180}},
                {l:11, r:11, val: x => { return x}},
                {l:11, r:12, val: x => { return x/60}},

                {l:12, r:9, val: x => { return x/60}},
                {l:12, r:10, val: x => { return x/60*3.1415/180}},
                {l:12, r:11, val: x => { return x*60}},
                {l:12, r:12, val: x => { return x}},

                //Температура
                {l:13, r:13, val: x => { return x}},
                {l:13, r:14, val: x => { return x-273}},
                {l:13, r:15, val: x => { return x*9/5+32}},

                {l:14, r:13, val: x => { return x+273}},
                {l:14, r:14, val: x => { return x}},
                {l:14, r:15, val: x => { return (x+273)*9/5+32}},
                
                {l:15, r:13, val: x => { return (x-32)*5/9}},
                {l:15, r:14, val: x => { return (x-32)*5/9-273}},
                {l:15, r:15, val: x => { return x}}  
            ]
        }
    },
    methods:{
        rch(opt){
            this.right_selected=this.getid(opt);
            this.Result();
        },
        lch(opt){
            this.left_selected=this.getid(opt);
            let newtype = this.options[this.left_selected].type;
            if (this.lasttype != newtype){
               this.lasttype=newtype;
               this.right_selected=this.getrfid(newtype); 
            }
            this.Result();
        },
        value(index){
            return this.options[index].name;
        },
        getid(name){
            return this.options.filter(x => x.name == name)[0].id;
        },
        getrfid(newtype){
            return this.options.filter(x => x.type == newtype)[0].id;
        },
        Result(){
            let rule = this.get_rule(this.left_selected, this.right_selected);
            let res = rule[0].val(document.getElementById('input').value);
            this.result = Math.floor(res * 100) / 100;
        },
        get_rule(l, r){
            return this.rules.filter(x => (x.l == l && x.r ==r));
        }
    },
    computed:{
        right_option(){
            return this.options.filter(x => x.type == this.lasttype);
        }
    }
}
</script>
<style>
.convert{
    color:white;
}
span{
    margin-left: 10px;
}
.converter-body{
	width: 675px;
	height: 280px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	box-shadow: 0px 0px 2px 1px #cacaca;
}

.converter-title{
	text-align: center;
	margin: 13px 0px;
	font-size: 40px;
}
.btn{
    margin-left: -175px;
    position: absolute;
    margin-top: 150px;
    width: 300px;
    background: #fff;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    border:none;
    outline: none;
    padding: 12px 20px;
    border-radius: 10px; 
    z-index: 0;
}
.btn:hover{
    background: #62baea;
    color: #fff;
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
#input{
	margin-left: 25px;
}
#result{
    position: absolute;
    padding-top: 0px;
	margin-left: 100px;
    font-size: 40px;
}
.selectors{
    margin-top: 25px;
    position: absolute;
	margin-left: 25px;
    z-index: 1;
}
.Rselector{
	margin-left: 350px;
}
</style>