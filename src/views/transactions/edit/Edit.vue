<template>
  <div>
    <pagoda-nav-bar title="设置分类" left-arrow>
      <pagoda-icon name="success" slot="right" @click="handleSave"/>
    </pagoda-nav-bar>
    <pagoda-cell-group>
      <pagoda-cell title="类型">
        <pagoda-radio-group v-model="status">
          <pagoda-radio name="expense">支出</pagoda-radio>
          <pagoda-radio name="income">收入</pagoda-radio>
        </pagoda-radio-group>
      </pagoda-cell>
      <pagoda-cell
          title="分类"
          :value="currentCategory.categoryName"
          @click="showCategoryList=true"
          :arrow-direction="showCategoryList?'up':'down'"
      />
      <pagoda-cell
          title="日期"
          :value="dateText"
          @click="showDate=true"
          :arrow-direction="showDate?'up':'down'"
      />
      <pagoda-field
          label="金额"
          :required="true"
          input-align="right"
          :value="amount"
          @blur="handleAmountBlur"
          @input="handleChange('amount', $event)"
          :error-message="getErrorMessage('amount')"
      />
      <pagoda-field
          label="备注"
          input-align="right"
          :value="remark"
          type="textarea"
          show-counter
          maxlength="200"
          autosize
          placeholder="请输入备注，最多200字"
          @input="handleChange('remark', $event)"
          :error-message="getErrorMessage('amount')"
      />
    </pagoda-cell-group>
    <pagoda-popup
        position="bottom"
        v-model="showCategoryList"
    >
      <pagoda-picker
          show-toolbar
          :columns="categories"
          :default-index="defaultIndex"
          @cancel="showCategoryList=false"
          @confirm="pickCategory"
      />
    </pagoda-popup>

    <pagoda-popup
        position="bottom"
        v-model="showDate"
    >
      <pagoda-datetime-picker
          type="date"
          :value="date"
          @confirm="confirmDate"
          @cancel="this.showDate = false"
      />
    </pagoda-popup>

  </div>
</template>

<script lang="ts">
import {get, map, findIndex, find, indexOf, head, toString, toNumber, isNaN, set, delay, every} from 'lodash';
import {Vue, Component, Watch} from 'vue-property-decorator';
import {categories, transactions} from '@/api';
import {modelAdd} from '@/views/transactions/edit/validate-schema';

@Component
export default class Edit extends Vue {
  status = 'income';
  categoryList = [];
  validateErrors = {};
  amount = '';
  showDate = false;
  date = new Date();
  currentCategoryCode = 0;
  showCategoryList = false;
  remark = '';

  created() {
    if (this.isAmend) {
      this.editInit(this.code);
    }
  }

  get dateText() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const date = this.date.getDate();
    return `${year}/${month}/${date}`;
  }

  get mode() {
    return get(this.$route, 'params.mode');
  }

  get isAdd() {
    return this.mode === 'add';
  }

  get isAmend() {
    return this.mode === 'amend';
  }

  get query() {
    return get(this.$route, 'query');
  }

  get code() {
    return toNumber(get(this.query, 'code'));
  }

  get categories() {
    return map(this.categoryList, category => get(category, 'categoryName'));
  }

  get currentCategory() {
    return find(this.categoryList, category => get(category, 'categoryCode') === this.currentCategoryCode) || {};
  }

  get defaultIndex() {
    return findIndex(this.categoryList, category => get(category, 'categoryCode') === get(this.currentCategory, 'categoryCode'));
  }

  async editInit(code: number) {
    const res = await transactions.getTransactionDetail(code);
    const data = get(res, 'data', {});
    this.status = get(data, 'isExpense') ? 'expense' : 'income';
    this.currentCategoryCode = get(data, 'categoryCode');
    this.date = new Date(get(data, 'date'));
    this.remark = get(data, 'remark');
  }

  confirmDate(val: Date) {
    this.date = val;
  }

  getParams() {
    return {
      'amount': toNumber(this.amount),
      'categoryCode': this.currentCategoryCode,
      'date': this.dateText,
      'remark': this.remark,
    };
  }

  checkParams() {
    this.validateErrors = modelAdd.check({
      amount: toNumber(this.amount),
      remark: this.remark,
    });
    return this.hasValidateError();
  }

  hasValidateError() {
    const errorItem = find(this.validateErrors, entry => get(entry, 'hasError'));
    if (errorItem) {
      this.$toast(get(errorItem, 'errorMessage'));
      return true;
    } else {
      return false;
    }
  }


  async handleSave() {
    if (this.checkParams()) return;
    try {
      if (this.isAdd) {
        await transactions.addTransaction(this.getParams());
      } else {
        await transactions.amendTransaction(this.code, this.getParams());
      }
      this.$toast.success('操作成功');
      delay(() => this.$router.back(), 500);
    } catch (e) {
      console.error(e);
      this.$toast.fail(get(e, 'message') || '操作失败');
    }
  }

  async getCategoryList(status: string) {
    const res = await categories.getList({type: status});
    this.categoryList = get(res, 'data.list');
  }

  handleAmountBlur(value: string) {
    const amount = toNumber(value);
    if (isNaN(amount)) return;
    this.amount = amount.toFixed(2);
  }

  isCurrentInTheList(list: any[]) {
    return indexOf(map(list, item => item.categoryCode), this.currentCategoryCode) >= 0;
  }

  handleChange(key: string, value: string) {
    set(this, key, value);
    this.validateField(key, value);
  }

  validateField(key: string, data: any) {
    const validateResult = get(modelAdd.check(data), key);
    this.validateErrors = {
      ...this.validateErrors,
      [key]: validateResult,
    };
  }

  pickCategory(value: string, index: number) {
    this.currentCategoryCode = get(this.categoryList, `[${index}].categoryCode`);
  }

  getErrorMessage(key: string) {
    return get(this.validateErrors, `${key}.errorMessage`);
  }

  @Watch('status', {immediate: true})
  async onStatusChange(val: string) {
    await this.getCategoryList(val);
    if (!this.isCurrentInTheList(this.categoryList)) {
      this.currentCategoryCode = get(head(this.categoryList), 'categoryCode') as unknown as number;
    }
  }

}
</script>

<style lang="stylus">

</style>
