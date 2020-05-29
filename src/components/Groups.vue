<template>
  <div class="tab">
    <div class="tab--select">Choose Group</div>
    <div class="tab--buttonGroup">
      <button
        :class="[button === selectedButton ? 'active--button' : '']"
        v-for="button in array"
        :key="button"
        :value="button"
        @click="emit(button)"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Groups",
  data() {
    return {
      selectedButton: "VueJs",
      length: 3,
      text: "Lorem ipsum dolor sit amet",
      array: ["VueJs", "Angular", "Javascript", "CSS"]
    };
  },
  methods: {
    emit(event) {
      if (event !== this.selectedButton) {
        this.$emit("changeGroup", event);
        this.selectedButton = event;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/* Style the tab */
.tab {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
  &--select {
    background-color: black;
    color: white;
    padding: 10px;
    width: 100%;
    font-size: 2rem;
    @media screen and (max-width: 600px) {
      padding: 15px 16px;
      font-size: 15px;
    }
  }
  &--buttonGroup {
    width: 100%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
      flex-direction: row;
    }
  }
}

/* Style the buttons that are used to open the tab content */
.tab button {
  display: block;
  text-align: center;
  background-color: white;
  color: black;

  width: 100%;
  border: 1px solid #42b983;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  font-size: 2rem;
  transition: 0.3s;
  padding: 20px 10px;
  @media only screen and (max-width: 400px) {
    padding: 15px 5px;
    font-size: 15px;
  }
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #42b983;
  border: 1px solid white;
}

/* Create an active/current "tab button" class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  float: left;
  padding: 0px 12px;
  border: 1px solid #ccc;
  width: 70%;
  border-left: none;
  height: 300px;
}
.active--button {
  background-color: #26a69a !important;
  color: white !important;
  cursor: default !important;
  border: none !important;
}
</style>
