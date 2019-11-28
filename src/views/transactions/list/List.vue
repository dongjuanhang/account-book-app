<template>
  <div class="transactions">
    <div class="content">
      <div class="header">记账本</div>
    </div>
    <footer-tab></footer-tab>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FooterTab from "../../../components/footerTab";
@Component({
  components: { FooterTab },
})
export default class List extends Vue {}
</script>

<style lang="stylus" scoped>
  .transactions
    width 100%
    height 100%
    display flex
    flex-direction column
    .content
      flex 1
      .header
        width 100%
        height 44px
        line-height 44px
        text-align center
        background-color #999999
        color #ffffff
</style>   