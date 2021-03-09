<template>
  <b-table :fields="fields" :items="items" head-variant="light" responsive="sm" small>
    <template #cell(comuns)="data">
      <b-form-input v-model="data.value"></b-form-input>
    </template>
    <template #cell(day_trade)="data">
      <b-form-input v-model="data.value"></b-form-input>
    </template>
  </b-table>
</template>
<script>
export default {
  props: ["fields", "items"],
};
</script>
