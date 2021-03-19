<template>
  <b-container fluid>
    <b-modal id="uploadInfoCEI" title="Upload InfoCEI" @ok="uploadInfoCEI()">
      <b-row>
        <b-col>
          <b-form-file
            v-model="infocei"
            :state="Boolean(infocei)"
            placeholder="Selecione seu arquivo InfoCEI.xls"
            drop-placeholder="Arraste o arquivo aqui..."
          ></b-form-file>
        </b-col>
      </b-row>
    </b-modal>
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
              reset-button
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
            reset-button
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
          <b-button @click="openOperacao()" size="sm">
            <b-icon-plus></b-icon-plus>
          </b-button>
        </h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2">
        <b-form-group id="data_inicial" label="Data Inicial" label-for="data_inicial">
          <b-form-datepicker
            id="data_inicial"
            v-model="data_inicial"
            locale="pt"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }"
            placeholder=""
            reset-button
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
      <b-col cols="2">
        <b-form-group id="data_final" label="Data Final" label-for="data_final">
          <b-form-datepicker
            id="data_final"
            v-model="data_final"
            locale="pt"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }"
            placeholder=""
            reset-button
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group id="pesquisa" label="Pesquisa" label-for="pesquisa">
          <b-form-input
            id="pesquisa"
            v-model="filter"
            type="search"
            placeholder="Pesquisa"
            :debounce="400"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-row>
          <b-col>
            <p>Resultados</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <p>
              {{ resultados.comum | currency }}
              <b-badge v-b-tooltip.hover title="Comum">C</b-badge>
            </p>
          </b-col>
          <b-col class="text-right">
            <p>
              {{ resultados.day_trade | currency }}
              <b-badge v-b-tooltip.hover title="Day-Trade">D</b-badge>
            </p>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="text-right">
        <b-form-group label=".">
          <b-button-group>
            <b-button v-b-modal.uploadInfoCEI>
              <b-icon-upload></b-icon-upload>
              CEI
            </b-button>
            <!-- <b-button disabled>
              <b-icon-upload></b-icon-upload>
              JSON
            </b-button>
            <b-button disabled>
              <b-icon-download></b-icon-download>
              JSON
            </b-button> -->
          </b-button-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="my-4">
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
              <b-badge
                v-if="data.item.operacao == 'Day-Trade'"
                v-b-tooltip.hover
                title="Day-Trade"
                >D</b-badge
              >
              <b-badge v-else v-b-tooltip.hover title="Comum">C</b-badge>
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
import moment from "moment";
import index from "@/mixins/index";
export default {
  mixins: [index],
  data() {
    return {
      operacoes: {
        fields: [
          { key: "key", label: "ID" },
          {
            key: "data_negocio",
            label: "Data",
            class: "text-center",
            sortable: true,
          },
          {
            key: "compra_venda",
            label: "C/V",
            class: "text-center",
            sortable: true,
          },
          { key: "mercado", label: "Mercado", sortable: true },
          {
            key: "prazo",
            label: "Prazo",
            class: "text-center",
            sortable: true,
          },
          { key: "codigo", label: "Código", sortable: true },
          {
            key: "especificacao_do_ativo",
            label: "Especificação",
            sortable: true,
          },
          {
            key: "quantidade",
            label: "Qtd",
            class: "text-center",
            sortable: true,
          },
          {
            key: "preco",
            label: "Preço",
            class: "text-center",
            sortable: true,
          },
          {
            key: "valor_total",
            label: "Total",
            class: "text-center",
            sortable: true,
          },
          {
            key: "lucro_prejuizo",
            label: "Lucro/Prejuízo",
            class: "text-center",
            sortable: true,
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
        data_negocio: moment(),
        compra_venda: "C",
        mercado: "",
        prazo: "",
        codigo: "",
        especificacao_do_ativo: "",
        quantidade: 0,
        preco: 0,
        valor_total: 0,
      },
      mercado: [
        "Mercado a Vista",
        "Merc. Fracionário",
        "Opção de Venda",
        "Opção de Compra",
      ],
      filter: null,
      filterOn: [],
      data_inicial: null,
      data_final: null,
      infocei: null,
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
    resultados() {
      let resultado = {
        comum: 0,
        day_trade: 0,
      };
      this.operacoes.items.forEach((o) => {
        if (o.operacao == "Comum") resultado.comum += o.lucro_prejuizo;
        else resultado.day_trade += o.lucro_prejuizo;
      });
      return resultado;
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
    async uploadInfoCEI() {
      let json = await this.$xlsx.cei_json(this.infocei);
      for (let i in json) {
        this.$db.operacoes.add(json[i]);
      }
      this.setItems();
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
      this.setItems();
    },
    async removeOperacao(operacao) {
      await this.$db.operacoes.remove(operacao.key);
      this.setItems();
    },
    emptyOperacao() {
      this.operacao = {
        key: null,
        data_negocio: moment(),
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
    filterByDate(operacoes) {
      let data_inicial = this.data_inicial ? this.data_inicial : "1900-01-01";
      let data_final = this.data_final ? this.data_final : undefined;
      return operacoes.filter((o) => {
        return moment(o.data_negocio).isBetween(
          data_inicial,
          data_final,
          undefined,
          "[]"
        );
      });
    },
    async setItems() {
      let operacoes = await this.$db.operacoes.getAll();
      operacoes = this.addCalculos(operacoes);
      operacoes = this.filterByDate(operacoes);
      operacoes = _.orderBy(operacoes, ["data_negocio", "key"], ["desc", "desc"]);
      this.operacoes.items = operacoes;
    },
  },
  watch: {
    data_inicial() {
      this.setItems();
    },
    data_final() {
      this.setItems();
    },
  },
  async mounted() {
    this.setItems();
  },
};
</script>
