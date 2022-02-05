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
  <router-view />
</template>
<script>

export default {
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
  mounted() {
  },
  methods: {
    menu_select(index){
      this.menuItems.forEach(it =>
        it.isActive = false);
      this.menuItems[index].isActive = true;
      if (this.menuItems[index].id == 1){
        this.$router.push('/');
      }
      else{
        this.$router.push('/' + this.menuItems[index].name.toLowerCase());
      }
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
