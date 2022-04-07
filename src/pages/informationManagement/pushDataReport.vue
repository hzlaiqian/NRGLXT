<template>
  <div class="pushDataReport">
    <div class="topContent">
      <div class="pushTagWrap">
        <div class="pushTag" @click="selectTag(1)" :class="selected === 1 ? 'pushTagSelect' : ''">全部推送</div>
        <div class="pushTag" @click="selectTag(2)" :class="selected === 2 ? 'pushTagSelect' : ''">APP推送</div>
        <div class="pushTag" @click="selectTag(3)" :class="selected === 3 ? 'pushTagSelect' : ''">APP弹窗推送</div>
        <div class="pushTag" @click="selectTag(4)" :class="selected === 4 ? 'pushTagSelect' : ''">短信推送</div>
      </div>
      <div class="operator" v-if="selected !== 1" @click="viewDetail(selected)">查看详细推送</div>
    </div>

    <div class="pushContent">
      <allPushData v-if="selected === 1"></allPushData>
      <appPushData v-if="selected === 2"></appPushData>
      <appAndMessagePushData v-if="selected === 3"></appAndMessagePushData>
      <messagePushData v-if="selected === 4"></messagePushData>
    </div>
  </div>
</template>

<script>
import allPushData from "./pushDataCompontents/allPushData";
import appPushData from "./pushDataCompontents/appPushData";
import appAndMessagePushData from "./pushDataCompontents/appAndMessagePushData";
import messagePushData from "./pushDataCompontents/messagePushData";

export default {
  name: 'pushDataReport',
  components: {
    allPushData,
    appPushData,
    appAndMessagePushData,
    messagePushData,
  },
  data(){
    return{
      selected:1,
    }
  },
  methods: {
    selectTag(tagNum){
      this.selected = tagNum
    },
    viewDetail(id){
      this.$router.push({
        path: id === 2 ? '/appDataDetails' : id === 3 ? 'appAndMessageDataDetails' : 'messageDataDetails',
        query:{
          selectId:id,
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
.pushDataReport{
  .topContent{
    display: flex;
    justify-content: space-between;
    .pushTagWrap{
      display: flex;
      justify-content: left;
      .pushTag{
        cursor: pointer;
        font-size: 14px;
        padding: 6px 16px;
        background: #fff;
        border-radius: 4px;
        margin-right: 10px;
        border: 1px solid transparent;
      }
      .pushTagSelect{
        cursor: pointer;
        background: #2a79ee1c;
        color: #2A79EE;
        border-color: #2A79EE;
      }
    }
    .operator{
      cursor: pointer;
      font-size: 14px;
      padding: 6px 16px;
      background: #2A79EE;
      border-radius: 4px;
      margin-right: 10px;
      border: 1px solid transparent;
      color: #fff;
    }
  }

}
</style>
