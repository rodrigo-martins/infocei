<template>
  <b-container fluid>
    <b-row>
      <b-col cols="1">
        <b-button-group vertical class="mt-3">
          <b-button block v-for="mes in meses" :key="mes">{{ mes }}</b-button>
        </b-button-group>
      </b-col>
      <b-col>
        <TablesOperacoes />
      </b-col>
    </b-row>
    <b-tabs pills card vertical> </b-tabs>
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
