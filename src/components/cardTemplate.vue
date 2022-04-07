<template>
  <div class="cardTemplate">
    <div class="title">
      <img src="../assets/img/mark.png" alt="">
      <div class="text">{{ titleName }}</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardTemplate",
  props: {
    titleName:{
      type:String,
      default:''
    }
  }
}
</script>

<style scoped lang="scss">
  .cardTemplate{
    .title{
      font-size: 16px;
      background: #fff;
      padding: 15px 14px;
      display: flex;
      justify-content: left;
      border: 1px solid #EAEDF7;
      border-radius: 4px 4px 0 0;
      font-weight: bold;
    }
    .content{
      background: #fff;
      border: 1px solid #EAEDF7;
      border-radius: 0 0 4px 4px;
      padding: 30px;
      overflow: hidden;
      border-top: none;
    }
  }
</style>
