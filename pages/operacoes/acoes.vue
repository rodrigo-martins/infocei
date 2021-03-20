<template>
  <b-container fluid>
    <b-row class="my-4">
      <b-col>
        <h3>Operações Comuns / Day-Trade</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <TablesOperacoes />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import "moment/locale/pt-br";
import TablesOperacoes from "../../components/TablesOperacoes";
export default {
  components: {
    TablesOperacoes,
  },
};
</script>
