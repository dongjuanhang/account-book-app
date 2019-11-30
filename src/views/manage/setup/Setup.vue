<template>
  <div class="set-up">
    <pagoda-nav-bar title="设置分类" left-arrow>
      <pagoda-icon name="plus" slot="right" @click="addCategory"/>
    </pagoda-nav-bar>

    <pagoda-loading size="24px" vertical v-if="!list">加载中...</pagoda-loading>

    <pagoda-result-page type="data-empty" v-else-if="!!list && !list.length"></pagoda-result-page>

    <div class="content" v-else>
      <pagoda-panel
          v-for="(item, index) in list"
          :key="`category-item-${index}`"
      >
        <div
            slot="header"
            class="category-cell-header pagoda-hairline--bottom">
          <pagoda-field v-model="item.categoryName" placeholder="请输入6个字以内分类名称

"/>
        </div>
        <pagoda-cell>
          <template>
            <pagoda-radio-group v-model="item.status">
              <pagoda-radio name="expense">支出</pagoda-radio>
              <pagoda-radio name="income">收入</pagoda-radio>
            </pagoda-radio-group>
          </template>
        </pagoda-cell>

        <div slot="footer" class="category-cell-footer">
          <pagoda-button @click="handleDelete(item.categoryCode)" size="small" type="danger">删除</pagoda-button>
          <pagoda-button @click="handleEdit(item.categoryCode)" size="small" v-if="!item.isEdit">编辑</pagoda-button>
          <pagoda-button @click="handleSave(item.categoryCode)" size="small" type="primary" v-else>保存</pagoda-button>
        </div>
      </pagoda-panel>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {categories} from '@/api/index';
import {get, map} from 'lodash';

@Component
export default class Setup extends Vue {
    public test = '1';
    private list: object[] | null = null;

    private mounted() {
        this.requestData();
    }

    private async requestData() {
        try {
            const res = await categories.getList();
            this.list = map(get(res, 'data.list'), category => {
                return {
                    categoryCode: category.categoryCode,
                    categoryName: category.categoryName,
                    status: category.isExpense ? 'expense' : 'income',
                    isEdit: false,
                };
            }) || [];
        } catch (error) {
            this.list = [];
            this.$toast(get(error, 'message') || '请求出错');
        }
    }

    private addCategory() {
        this.list!.unshift(this.getNewCategory());
    }

    private getNewCategory() {
        return {
            categoryName: '',
            status: 'expense',
            isEdit: true,
        };
    }

    private handleDelete(code: number) {
        this.$dialog.confirm({
                title: '提示',
                message: '确认删除吗？',
            })
            .then(() => {
                this.confirmDelete(code);
            })
            .catch(error => {});
    }

    private async handleEdit(code: number) {

    }

    private handleSave(code?: number) {

    }

    private async confirmDelete(code: number) {
        try {
            await categories.remove(code);
            this.$toast('删除成功')
        } catch (e) {
            this.$toast(get(e, 'message'));
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

  .category-cell-header
    font-size 16px

  .category-cell-footer
    display flex
    justify-content flex-end

    button
      margin-right 8px

  .pagoda-panel
    margin-bottom 16px
</style>
