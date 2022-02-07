<template lang="">
<div class="menu">
    <div class="navigation">
      <ul>
        <router-link :to="mItem.link"  v-for="(mItem) in menuItems" :key="mItem.id">
        <li class="list">
          <a href="#">
            <span class="icon">
              <ion-icon :name="mItem.icon"></ion-icon>
            </span>
            <span class="text">
            {{mItem.name}}
            </span>
          </a>
        </li>
        </router-link>
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
      menuItems: [
        {
          id: 1,
          name: "Converter",
          link: "/",
          icon: "calculator-outline",
        },
        {
          id: 2,
          name: "Summary",
          link: "/summary",
          icon: "create-outline",
        },
        {
          id: 3,
          name: "All Summary",
          link: "/all",
          icon: "albums-outline",
        },
      ],
    };
  },
  methods: {
    isHidden(id) {
      return !this.menuItems[id].isActive;
    },
  },
};
</script>
<style scope>
.menu {
  position: absolute;
  top: 60px;
  right: 20px;
  width: 290px;
}
.hidden {
  visibility: hidden;
}
</style>
