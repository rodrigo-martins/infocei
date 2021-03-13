<template>
  <b-container fluid>
    <b-modal id="operacao" title="Operação" @ok="putOperacao">
      <div class="my-4">
        <b-row class="my-3">
          <b-col class="text-right">
            <label for="data_negocio">Data Negócio</label>
          </b-col>
          <b-col>
            <b-form-datepicker
              id="data_negocio"
              v-model="operacao.data_negocio"
              locale="pt"
              :date-format-options="{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }"
            ></b-form-datepicker>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col class="text-right">
            <label for="compra_venda">Compra / Venda</label>
          </b-col>
          <b-col>
            <b-form-group>
              <b-form-radio-group
                id="compra_venda"
                v-model="operacao.compra_venda"
                aria-describedby="Compra/Venda"
                name="compra_venda"
              >
                <b-form-radio value="C">Compra</b-form-radio>
                <b-form-radio value="V">Venda</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col class="text-right">
            <label for="mercado">Mercado</label>
          </b-col>
          <b-col>
            <b-form-select
              id="mercado"
              v-model="operacao.mercado"
              :options="mercado"
            ></b-form-select>
          </b-col>
        </b-row>
      </div>
      <b-row class="my-3">
        <b-col class="text-right">
          <label for="prazo">Prazo</label>
        </b-col>
        <b-col>
          <b-form-datepicker
            id="prazo"
            v-model="operacao.prazo"
            locale="pt"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }"
            reset-value
          ></b-form-datepicker>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col class="text-right">
          <label for="codigo">Código</label>
        </b-col>
        <b-col>
          <b-form-input
            id="codigo"
            v-model="operacao.codigo"
            type="text"
            placeholder="Ex.: ADBC11"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col class="text-right">
          <label for="codigo">Especificação</label>
        </b-col>
        <b-col>
          <b-form-input
            id="especificacao_do_ativo"
            v-model="operacao.especificacao_do_ativo"
            type="text"
            placeholder="Ex.: ABCD11 ON NM"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col class="text-right">
          <label for="quantidade">Quantidade</label>
        </b-col>
        <b-col>
          <b-form-input
            id="quantidade"
            v-model="operacao.quantidade"
            @input="operacao.valor_total = operacao.preco * operacao.quantidade"
            type="number"
            placeholder="Ex.: ABCD11 ON NM"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col class="text-right">
          <label for="preco">Preço</label>
        </b-col>
        <b-col>
          <b-form-input
            id="preco"
            v-model="operacao.preco"
            @input="operacao.valor_total = operacao.preco * operacao.quantidade"
            type="number"
            placeholder="Ex.: 5.8"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col class="text-right">
          <label for="valor_total">Valor Total</label>
        </b-col>
        <b-col>
          <b-form-input
            id="valor_total"
            v-model="operacao.valor_total"
            type="number"
            placeholder="Ex.: 5.8"
            disabled
          ></b-form-input>
        </b-col>
      </b-row>
    </b-modal>
    <b-row class="my-4">
      <b-col>
        <h3>
          Operações
          <b-button @click="openOperacao()">
            <b-icon-plus></b-icon-plus>
          </b-button>
        </h3>
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
    <b-row class="justify-content-center">
      <b-col cols="4" class="mb-4">
        <b-form-group label-size="sm">
          <b-input-group>
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Buscar"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                <b-icon-x></b-icon-x>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          :fields="operacoes.fields"
          :items="operacoes.items"
          :filter="filter"
          :filter-included-fields="filterOn"
          head-variant="light"
          responsive="sm"
          small
          hover
          show-empty
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
          <template #cell(lucro_prejuizo)="data">
            <p class="text-right">
              {{ data.value | currency }}
            </p>
          </template>
          <template #cell(actions)="row">
            <b-button-group>
              <b-button size="sm" @click="openOperacao(row.item)"
                ><b-icon-pencil></b-icon-pencil
              ></b-button>
              <b-button size="sm" @click="copyOperacao(row.item)"
                ><b-icon-files></b-icon-files
              ></b-button>
              <b-button size="sm" @click="removeOperacao(row.item)"
                ><b-icon-trash></b-icon-trash
              ></b-button>
            </b-button-group>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import index from "@/mixins/index";
export default {
  mixins: [index],
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
          {
            key: "valor_total",
            label: "Valor Total (R$)",
            class: "text-center",
          },
          { key: "operacao", label: "Operação", class: "text-center" },
          {
            key: "lucro_prejuizo",
            label: "Lucro/Prejuízo",
            class: "text-center",
          },
          {
            key: "actions",
            label: "Ações",
            class: "text-center",
          },
        ],
        items: [],
      },
      operacao: {
        key: null,
        data_negocio: new Date(),
        compra_venda: "C",
        mercado: "",
        prazo: "",
        codigo: "",
        especificacao_do_ativo: "",
        quantidade: 0,
        preco: 0,
        valor_total: 0,
      },
      mercado: ["Mercado a Vista", "Opção de Venda", "Opção de Compra"],
      filter: null,
      filterOn: [],
    };
  },
  computed: {
    "operacao.valor_total"() {
      let _operacao = this.operacao;
      return {
        ..._operacao,
        valor_total: this.operacao.quantidade * this.operacao.preco,
      };
    },
  },
  methods: {
    addCalculos(operacoes) {
      let calculos = this.calculos(operacoes);
      return operacoes.map((operacao) => {
        operacao.operacao = calculos[operacao.codigo].operacoes[operacao.key].operacao;
        operacao.lucro_prejuizo =
          calculos[operacao.codigo].operacoes[operacao.key].lucro_prejuizo;
        return operacao;
      });
    },
    async onChange(e) {
      let json = await this.$xlsx.cei_json(e);
      for (let i in json) {
        this.$db.operacoes.add(json[i]);
      }
      let operacoes = await this.$db.operacoes.getAll();
      this.operacoes.items = this.addCalculos(operacoes);
    },
    async putOperacao() {
      let operacao = { ...this.operacao };
      operacao.preco = Number(operacao.preco);
      operacao.quantidade = Number(operacao.quantidade);
      if (operacao.key) {
        let key = operacao.key;
        delete operacao.key;
        await this.$db.operacoes.put(operacao, key);
      } else {
        delete operacao.key;
        await this.$db.operacoes.put(operacao);
      }
      let operacoes = await this.$db.operacoes.getAll();
      this.operacoes.items = this.addCalculos(operacoes);
    },
    async removeOperacao(operacao) {
      await this.$db.operacoes.remove(operacao.key);
      let operacoes = await this.$db.operacoes.getAll();
      this.operacoes.items = this.addCalculos(operacoes);
    },
    emptyOperacao() {
      this.operacao = {
        key: null,
        data_negocio: new Date(),
        compra_venda: "C",
        mercado: "",
        prazo: "",
        codigo: "",
        especificacao_do_ativo: "",
        quantidade: 0,
        preco: 0,
        valor_total: 0,
      };
    },
    openOperacao(operacao) {
      operacao = { ...operacao };
      if (operacao && operacao.key) {
        delete operacao.operacao;
        delete operacao.lucro_prejuizo;
        this.operacao = operacao;
      } else {
        this.emptyOperacao();
      }
      this.$bvModal.show("operacao");
    },
    copyOperacao(operacao) {
      operacao = { ...operacao };
      delete operacao.key;
      this.operacao = operacao;
      this.$bvModal.show("operacao");
    },
  },
  async mounted() {
    let operacoes = await this.$db.operacoes.getAll();
    this.operacoes.items = this.addCalculos(operacoes);
  },
};
</script>
