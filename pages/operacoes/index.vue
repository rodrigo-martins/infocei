<template>
  <b-container fluid>
    <b-row class="my-4">
      <b-col>
        <h3>Operações</h3>
      </b-col>
      <b-col cols="4">
        <div class="input-group">
          <div class="custom-file">
            <input
              type="file"
              @change="onChange"
              id="upload"
              placeholder="Upload"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <label class="custom-file-label" for="upload">Upload InfoCEI</label>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          :fields="operacoes.fields"
          :items="operacoes.items"
          head-variant="light"
          responsive="sm"
          small
          hover
        >
          <template #cell(data_negocio)="data">
            {{ data.value | momentFormat("DD/MM/YYYY") }}
          </template>
          <template #cell(prazo)="data">
            {{ data.value | momentFormat("DD/MM/YYYY") }}
          </template>
          <template #cell(preco)="data">
            <p class="text-right">
              {{ data.value | currency }}
            </p>
          </template>
          <template #cell(valor_total)="data">
            <p class="text-right">
              {{ data.value | currency }}
            </p>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      operacoes: {
        fields: [
          { key: "key", label: "ID" },
          { key: "data_negocio", label: "Data Negócio" },
          { key: "compra_venda", label: "C/V", class: "text-center" },
          { key: "mercado", label: "Mercado" },
          { key: "prazo", label: "Prazo" },
          { key: "codigo", label: "Código" },
          { key: "especificacao_do_ativo", label: "Especificação do Ativo" },
          { key: "quantidade", label: "Quantidade", class: "text-center" },
          { key: "preco", label: "Preço (R$)", class: "text-center" },
          { key: "valor_total", label: "Valor Total (R$)", class: "text-center" },
        ],
        items: [],
      },
    };
  },
  methods: {
    async onChange(e) {
      let json = await this.$xlsx.cei_json(e);
      for (let i in json) {
        this.$db.operacoes.add(json[i]);
      }
      this.operacoes.items = await this.$db.operacoes.getAll();
    },
  },
  async mounted() {
    this.operacoes.items = await this.$db.operacoes.getAll();
  },
};
</script>
