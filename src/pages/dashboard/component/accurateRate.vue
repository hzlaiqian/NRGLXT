<template>
  <div class="chartBody">
    <div class="chatr-one">
      打开率2%以上
      <div class="chatr-bottom">
        <div class="chatr-bar">
          <span>100</span>
        </div>
      </div>
    </div>
    <div class="chatr-one">
      打开率1%～2%以上
      <div class="chatr-bottom">
        <div class="chatr-bar">
          <span>100</span>
        </div>
      </div>
    </div>
    <div class="chatr-one">
      打开率1%以下
      <div class="chatr-bottom">
        <div class="chatr-bar">
          <span>100</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "accurateRate"
}
</script>

<style scoped lang="scss">
.chartBody {
  height: calc(100% - 50px);
  width: 100%;
  margin-top: 30px;
  .chatr-one{
    height: 25%;
    font-size: 12px;
    font-weight: 400;
    color: #2F343D;
    line-height: 18px;
  }
  .chatr-bottom{
    margin-top: 10px;
    width: 90%;
    height: 14px;
    background: #F0F4F7;
    border-radius: 8px;
    .chatr-bar{
      height: 14px;
      background: #81ADFF;
      border-radius: 8px;
      text-align: right;
      width: 90%;
      text-indent: 1em;
      span{
        font-weight: 400;
        color: #FFFFFF;
        line-height: 14px;
        font-size: 12px;
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
}



</style>
