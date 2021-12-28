<template lang="">
<div class="menu">
    <div class="navigation">
      <ul>
        <li @click="menu_select(index)" class="list" v-bind:class="{active: mItem.isActive }" v-for="(mItem, index) in menuItems" :key="mItem.id">
          <a href="#">
            <span class="icon">
              <ion-icon :name="mItem.icon"></ion-icon>
            </span>
            <span class="text">
            {{mItem.name}}
            </span>
          </a>
        </li>
        <div class="indicator">
        </div>
      </ul>
    </div>
  </div>
  <Converter id="Converter"  v-bind:class="{hidden: isHidden(0)}"/>
  <Summary id="Summary" v-bind:class="{hidden: isHidden(1)}"/>
</template>
<script>
import Converter from './components/Converter.vue';
import Summary from './components/Summary.vue';
export default {
  components:{
    Converter, Summary
  },
  data() {
    return {
      menuItems : [
        {id:1, name: "Converter", icon: "calculator-outline", isActive: true },
        {id:2, name: "Summary", icon: "create-outline", isActive: false}
      ]
    }
  },
  created(){
  },
  methods: {
    menu_select(index){
      this.menuItems.forEach(it =>
        it.isActive = false);
      this.menuItems[index].isActive = true;
    },
    isHidden(id){
      return !this.menuItems[id].isActive;
    }
  },
}

</script>
<style scope>

.menu{
  position: absolute;
  top:60px;
  right:20px;
}
.hidden{
  visibility:hidden; 
}
</style>
