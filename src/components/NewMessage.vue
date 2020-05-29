<template>
  <div class="row">
    <div
      class="editable"
      v-on:keyup.enter.exact="addMessage()"
      contenteditable="true"
    ></div>
    <button class="send--button" @click="addMessage()">
      <i class="material-icons ">send</i>
    </button>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "NewMessage",
  props: ["name", "groupName"],
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },

  methods: {
    addMessage() {
      this.newMessage = document.querySelector(".editable").innerText.trim();
      if (this.newMessage) {
        db.collection(this.groupName)
          .add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        document.querySelector(".editable").innerText = null;
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  margin: 0;
}
.editable {
  word-break: break-word;
  font-size: 15px;
  font-weight: normal;
  max-height: 100px;
  min-height: 20px;
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 1;
  text-align: start;
  border: 1px solid #26a69a;
  padding: 9px 12px 11px 12px;
  margin: 5px 10px;
  width: 80%;
  flex-grow: 1;
  border-radius: 10px;
  background-color: white;

  &::-webkit-scrollbar {
    width: 5px;
    height: auto;
    padding: 10px 0;
  }

  &::-webkit-scrollbar-track {
    // width:3px;
    background: #fff;
    &:hover {
      cursor: pointer;
    }
  }
  &::-webkit-scrollbar-thumb {
    // width:3px;
    background: #04dc6aa3;
  }
}
.send--button {
  color: white;
  border-radius: 50%;
  padding: 5px;
  align-self: center;
  background-color: #26a69a;
  border: 2px solid #26a69a;
  height: 5rem;
  width: 5rem;
  &:active {
    transform: translateY(2px);
  }
}
</style>
