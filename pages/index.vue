<template>
  <div>
    <input
      class="btn"
      type="file"
      @change="onChange"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />

    <table class="table">
      <thead>
        <tr>
          <th>Data Negócio</th>
          <th>C/V</th>
          <th>Mercado</th>
          <th>Prazo</th>
          <th>Código</th>
          <th>Especificação do Ativo</th>
          <th>Quantidade</th>
          <th>Preço (R$)</th>
          <th>Valor Total (R$)</th>
        </tr>
      </thead>
      <tr v-for="operacao in operacoes" :key="operacao.id">
        <td>{{ operacao.data_negocio | momentFormat("DD/MM/YYYY") }}</td>
        <td>{{ operacao.compra_venda }}</td>
        <td>{{ operacao.mercado }}</td>
        <td>{{ operacao.prazo | momentFormat("DD/MM/YYYY") }}</td>
        <td>{{ operacao.codigo }}</td>
        <td>{{ operacao.especificacao_do_ativo }}</td>
        <td>{{ operacao.quantidade }}</td>
        <td>{{ operacao.preco | currency }}</td>
        <td>{{ operacao.valor_total | currency }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operacoes: [],
    }
  },
  methods: {
    async onChange(e) {
      let json = await this.$xlsx.cei_json(e);
      for (let i in json) {
        this.$db.operacoes.add(json[i]);
      }
      this.operacoes = await this.$db.operacoes.getAll();
    },
  },
  async mounted() {
    this.operacoes = await this.$db.operacoes.getAll();
  },
};
</script>
