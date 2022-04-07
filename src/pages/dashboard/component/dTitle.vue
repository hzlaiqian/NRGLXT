<template>
  <div>
    <div class='fineConfigTitle'>
      <img src="../../../assets/img/mark.png" class="fineConfigTitle-img" alt=""> {{title}}
      <span class="ri" v-if="type=='ri'">日</span>
      <span class="zhou" v-if="type=='zhou'">周</span>
    </div>
  </div>

</template>

<script>
export default {
  name: "dTitle",
  props:['title','type']
}
</script>

<style scoped lang="scss">
.fineConfigTitle {
  padding:0 0 15px;
  height: 20px;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  color: #2F343D;
  font-family: PingFangSC-Medium, PingFang SC;
  position: relative;
  border-bottom: 1px solid #EAEDF7;

  .fineConfigTitle-img {
    display: inline-block;
    vertical-align: middle;
  }
  .ri{
    position: absolute;
    right: 10px;
    display: inline-block;
    width: 28px;
    height: 28px;
    background: #e5effd;
    border-radius: 2px;

    font-weight: 400;
    color: #2A79EE;
    line-height: 28px;
    font-size: 14px;
    text-align: center;
  }
  .zhou{
    position: absolute;
    right: 10px;
    display: inline-block;
    width: 28px;
    height: 28px;
    background: #fef7f7;
    border-radius: 2px;

    font-weight: 400;
    color: #F74E4E;
    line-height: 28px;
    font-size: 14px;
    text-align: center;
  }


  .fineConfig-icon {
    font-size: 12px;
    color: #2A79EE;
    float: right;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
