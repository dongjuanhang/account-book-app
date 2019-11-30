<template>
  <div class="set-up">
    <pagoda-nav-bar title="设置分类" left-arrow>
      <pagoda-icon name="plus" slot="right" />
      <pagoda-icon name="success" slot="right" />
    </pagoda-nav-bar>

    <pagoda-loading size="24px" vertical v-if="!list">加载中...</pagoda-loading>

    <pagoda-result-page type="data-empty" v-else-if="!!list && !list.length"></pagoda-result-page>
   
    <div class="content" v-else>
      <pagoda-swipe-cell v-for="(item, index) in list"
        :key="`category-item-${index}`">
        <pagoda-cell-group>
          <pagoda-cell>
            <template slot="title">
              <pagoda-field v-model="item.categoryName" :placeholder="item.categoryName" />
            </template>
          </pagoda-cell>
          <pagoda-cell>
            <template slot="title">
              <pagoda-radio-group>
                <pagoda-radio name="1">收入</pagoda-radio>
                <pagoda-radio name="2">支出</pagoda-radio>
              </pagoda-radio-group>
            </template>
          </pagoda-cell>
        </pagoda-cell-group>
        <template slot="right">
          <pagoda-button square type="danger" text="删除" style="height: 88px"/>
        </template>
      </pagoda-swipe-cell>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { categories} from "@/api/index";
import { get } from "lodash";

@Component
export default class Setup extends Vue {
  public test = "1";
  private list: object[] | null = null;

  private mounted() {
    this.requestData();
  }

  private async requestData() {
    try {
      const res = await categories.getList();
      this.list = get(res, "data.list") || [];
    } catch (error) {
      this.list = [];
      this.$toast(get(error, "message") || "请求出错");
    }
  }
}
</script>

<style lang="stylus">
  .set-up
    width 100%
    display flex
    flex-direction column
    .pagoda-nav-bar
      height 44px
      line-height 44px
      background-color #999999
      .pagoda-icon
        color #ffffff
        font-size 24px
      .pagoda-nav-bar__title
        color #ffffff
      .pagoda-icon-success
        margin-left 10px
    .content
      flex 1
      overflow-y auto
      .pagoda-radio-group
        display flex
        width 50%
        justify-content space-between
      .pagoda-cell--large
        padding 0 16px
        height 44px
        line-height 44px
      .pagoda-cell--large .pagoda-cell__title
        display flex
      .pagoda-cell:not(:last-child)::after
        left 0
</style> 