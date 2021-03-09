<template>
  <b-container fluid>
    <b-tabs pills card vertical>
      <b-tab v-for="mes in meses" :key="mes" :title="mes" active>
        <TablesOperacoes />
      </b-tab>
    </b-tabs>
  </b-container>
</template>
<script>
import moment from "moment";
import "moment/locale/pt-br";
import TablesOperacoes from "../../components/TablesOperacoes";
export default {
  components: {
    TablesOperacoes,
  },
  data() {
    return {
      meses: moment.monthsShort(),
    };
  },
};
</script>
