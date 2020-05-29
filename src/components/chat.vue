<template>
  <div class="grid">
    <Groups @changeGroup="changeGroup"></Groups>
    <div class="chat container">
      <h3 class="header">Let's Chat</h3>
      <div class="card">
        <div class="card-content" v-chat-scroll>
          <div class="messages" v-for="message in messages" :key="message.id">
            <div class="messages--list" v-if="!(name == message.name)">
              <span class="messages--list--name">{{ message.name }}</span>
              <span class="messages--list--content">{{ message.content }}</span>
              <span class="messages--list--time">{{ message.timestamp }}</span>
            </div>
            <div class="messages--list messages--list--localUser" v-else>
              <span class="messages--list--content">{{ message.content }}</span>
              <span class="messages--list--time">{{ message.timestamp }}</span>
            </div>
          </div>
        </div>
        <div class="card-action">
          <NewMessage :name="name" :groupName="groupName" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from "@/components/NewMessage";
import Groups from "./Groups";
import throttle from "lodash.throttle";
import db from "@/firebase/init";
import moment from "moment";
export default {
  name: "Chat",
  props: ["name"],
  components: {
    NewMessage,
    Groups
  },
  data() {
    return {
      messages: [],
      groupName: "VueJs",
      ref: ""
    };
  },
  methods: {
    deleteCollection() {
      ["Javascript", "CSS", "Angular", "VueJs"].forEach(element => {
        db.collection(element)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              db.collection(element)
                .doc(doc.id)
                .delete()
                .then(function() {
                  console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                  console.error("Error removing document: ", error);
                });
            });
          });
      });
    },
    changeGroup(name) {
      this.groupName = name;
      this.ref();
      this.fetchGroupData();
    },
    fetchGroupData() {
      this.messages = [];
      this.ref = db
        .collection(this.groupName)
        .orderBy("timestamp")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            // console.log(change);
            if (change.type == "added") {
              let doc = change.doc;
              this.messages.push({
                id: doc.id,
                name: doc.data().name,
                content: doc.data().content,
                timestamp: moment(doc.data().timestamp).calendar()
              });
            }
          });
        });
    }
  },

  created() {
    this.fetchGroupData();
  },
  destroyed() {
    // this.deleteCollection();
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  // height: calc(var(--vh, 1vh) * 100);
  @media screen and (max-width: 600px) {
    grid-template-rows: 1fr 5fr;
    grid-template-columns: auto;
    grid-gap: 10px;
  }
}
.container {
  grid-area: "chat";
  width: 100%;
  .card {
    margin: 0;
  }
  .card-action {
    border-top: 1px solid #26a69a;
    background-image: linear-gradient(to right, #26a69a, #42b983);
  }

  .card-content {
    min-height: calc(var(--vh, 1vh) * 75);
    max-height: calc(var(--vh, 1vh) * 75);
    overflow: auto;
    @media screen and (max-width: 600px) {
      min-height: calc(var(--vh, 1vh) * 60);
      max-height: calc(var(--vh, 1vh) * 60);
    }
    &::-webkit-scrollbar {
      width: 5px;
      height: auto;
      &:hover {
        cursor: pointer;
      }
    }
    &::-webkit-scrollbar-track {
      background: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background: #04dc6aa3;
    }
  }

  .messages {
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;

    &--list {
      display: flex;
      flex-direction: column;
      padding: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
      border-radius: 9px;
      width: 60%;
      align-items: flex-start;
      background-color: #04dc6aa3;
      word-break: break-word;

      &--name {
        color: white;
        font-size: 1.5rem;
      }
      &--content {
        text-align: left;
      }
      &--time {
        font-size: 1.1rem;
        align-self: flex-end;
      }
      &--localUser {
        align-self: flex-end;
      }
    }
  }
  .header {
    justify-content: center;
    display: flex;
    background-image: linear-gradient(to right, #26a69a, #42b983);
    margin: 0;
    padding: 10px;
    color: #fff;
  }
}
</style>
