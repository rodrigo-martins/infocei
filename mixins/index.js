import _, { result } from "lodash"
import moment from "moment";
export default {
  data() {
    return {
      operacoes: []
    };
  },
  methods: {
    calculos(operacoes) {
      let result = {};
      operacoes = _.orderBy(operacoes, ['data_negociacao'], ['asc'])

      function fnPortifolio(portifolio, operacao) {

        let quantidade;
        let preco;
        let lucro_prejuizo;

        if (portifolio.quantidade == 0) {
          if (operacao.compra_venda == "C") {
            quantidade = operacao.quantidade;
            lucro_prejuizo = 0;
          } else {
            quantidade = operacao.quantidade ? -operacao.quantidade : 0;
            lucro_prejuizo = operacao.quantidade * operacao.preco;
          }
          preco = operacao.preco;
        } else if (portifolio.quantidade > 0 && operacao.compra_venda == "V") {
          quantidade = portifolio.quantidade - operacao.quantidade;
          preco = portifolio.preco;
          //Posição Zerada
          if (!quantidade) preco = 0;
          lucro_prejuizo =
            portifolio.lucro_prejuizo +
            operacao.preco * operacao.quantidade -
            portifolio.preco * operacao.quantidade;

          // Comprado para Vendido
          if (quantidade < 0) {
            preco = operacao.preco;
            lucro_prejuizo =
              portifolio.lucro_prejuizo +
              operacao.preco * operacao.quantidade -
              portifolio.preco * portifolio.quantidade;
          }
        } else if (portifolio.quantidade > 0 && operacao.compra_venda == "C") {
          quantidade = portifolio.quantidade + operacao.quantidade;
          preco =
            (portifolio.preco * portifolio.quantidade +
              operacao.preco * operacao.quantidade) /
            (portifolio.quantidade + operacao.quantidade);
          lucro_prejuizo = portifolio.lucro_prejuizo;
        } else if (portifolio.quantidade < 0 && operacao.compra_venda == "V") {
          quantidade = portifolio.quantidade - operacao.quantidade;
          preco =
            (portifolio.preco * -portifolio.quantidade +
              operacao.preco * operacao.quantidade) /
            (-portifolio.quantidade + operacao.quantidade);
          lucro_prejuizo =
            portifolio.lucro_prejuizo + operacao.quantidade * operacao.preco;
        } else if (portifolio.quantidade < 0 && operacao.compra_venda == "C") {
          quantidade = portifolio.quantidade + operacao.quantidade;
          preco = portifolio.preco;
          //Posição Zerada
          if (!quantidade) preco = 0;
          lucro_prejuizo =
            portifolio.lucro_prejuizo - operacao.preco * operacao.quantidade;

          // Vendido para Comprado
          if (quantidade > 0) {
            lucro_prejuizo = 0;
          }
        }

        return { quantidade, preco, lucro_prejuizo };
      }

      function fnOperacoes(ultima_data_negocio, portifolio, operacao) {
        let _operacao = "Comum"
        let _lucro_prejuizo = 0
        ultima_data_negocio = new Date(ultima_data_negocio).getTime()
        let data_negocio = new Date(operacao.data_negocio).getTime()

        if (data_negocio == ultima_data_negocio) {
          if (portifolio.quantidade == 0) {
            _operacao = "Comum"
            if (operacao.compra_venda == "C") _lucro_prejuizo = 0
            else _lucro_prejuizo = operacao.valor_total
          } else if (portifolio.quantidade > 0 && operacao.compra_venda == "C") {
            _operacao = "Comum"
            _lucro_prejuizo = 0
          } else if (portifolio.quantidade > 0 && operacao.compra_venda == "V") {
            _operacao = "Day-Trade",
              _lucro_prejuizo = operacao.valor_total - portifolio.preco * operacao.quantidade
            //Comprado para vendido
            if (portifolio.quantidade < operacao.quantidade) {
              _lucro_prejuizo = operacao.valor_total - portifolio.quantidade * portifolio.preco
            }
          } else if (portifolio.quantidade < 0 && operacao.compra_venda == "V") {
            _operacao = "Comum",
              _lucro_prejuizo = operacao.valor_total
          } else if (portifolio.quantidade < 0 && operacao.compra_venda == "C") {
            _operacao = "Day-Trade",
              _lucro_prejuizo = portifolio.preco * operacao.quantidade - operacao.valor_total
            //Vendido para comprado
            if (Math.abs(portifolio.quantidade) < operacao.quantidade) {
              _lucro_prejuizo = Math.abs(portifolio.quantidade) * (portifolio.preco - operacao.preco)
            }
          }
        } else {
          _operacao = "Comum"
          if (portifolio.quantidade == 0) {
            if (operacao.compra_venda == "C") _lucro_prejuizo = 0
            else _lucro_prejuizo = operacao.valor_total
          } else if (portifolio.quantidade > 0 && operacao.compra_venda == "C") {
            _lucro_prejuizo = 0
          } else if (portifolio.quantidade > 0 && operacao.compra_venda == "V") {
            _lucro_prejuizo = operacao.valor_total - portifolio.preco * operacao.quantidade
            //Comprado para vendido
            if (portifolio.quantidade < operacao.quantidade) {
              _lucro_prejuizo = operacao.valor_total - portifolio.quantidade * portifolio.preco
            }
          } else if (portifolio.quantidade < 0 && operacao.compra_venda == "V") {
            _lucro_prejuizo = operacao.valor_total
          } else if (portifolio.quantidade < 0 && operacao.compra_venda == "C") {
            _lucro_prejuizo = portifolio.preco * operacao.quantidade - operacao.valor_total
            //Vendido para comprado
            if (Math.abs(portifolio.quantidade) < operacao.quantidade) {
              _lucro_prejuizo = portifolio.quantidade * (portifolio.preco - operacao.preco)
            }
          }
        }

        return {
          operacao: _operacao,
          lucro_prejuizo: _lucro_prejuizo != 0 ? _lucro_prejuizo : 0
        }
      }
      operacoes.forEach((operacao) => {
        if (!result[operacao.codigo]) {
          result[operacao.codigo] = {
            portifolio: {
              quantidade: 0,
              preco: 0,
              lucro_prejuizo: 0,
            },
            operacoes: {
              [operacao.key]: {},
            },
            ultima_data_negocio: null
          };
        }

        result[operacao.codigo].operacoes[operacao.key] = fnOperacoes(
          result[operacao.codigo].ultima_data_negocio,
          result[operacao.codigo].portifolio,
          operacao,
        );

        result[operacao.codigo].portifolio = fnPortifolio(
          result[operacao.codigo].portifolio,
          operacao
        );

        result[operacao.codigo].ultima_data_negocio = operacao.data_negocio

        // result[operacao.codigo].portifolio_do_dia = _portifolio_do_dia;
      });
      return result;
    },
    async fnPortifolio() {
      const operacoes = await this.$db.operacoes.getAll();
      let portifolio = this.calculos(operacoes);
      portifolio = Object.keys(portifolio)
        .map((codigo) => {
          let { quantidade, preco } = portifolio[codigo].portifolio;
          let port = {
            codigo,
            valor_total: quantidade * preco,
          };
          return Object.assign(port, portifolio[codigo].portifolio);
        })
        .filter((p) => p.quantidade);
      this.portifolio = portifolio;
    },
    alicota_do_imposto() {
      return {
        comuns: 15,
        day_trade: 20,
      }
    },
    resultados_default() {
      return {
        mercado_a_vista: [
          {
            mercado: "Mercado à vista - ações",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado à vista - ouro",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado à vista - ouro at. fin. fora bolsa",
            comuns: 0,
            day_trade: 0,
          },
        ],
        mercado_opcoes: [
          {
            mercado: "Mercado Opções - ações",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado Opções - ouro",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado Opções - fora de bolsa",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado Opções - outros",
            comuns: 0,
            day_trade: 0,
          }
        ],
        mercado_futuro: [
          {
            mercado: "Mercado futuro - dólar dos EUA",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado futuro - indices",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado futuro - juros",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado futuro - outros",
            comuns: 0,
            day_trade: 0,
          },
        ],
        mercado_a_termo: [
          {
            mercado: "Mercado a termo - ações/ouro",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Mercado a termo - outros",
            comuns: 0,
            day_trade: 0,
          },
        ],
        resultados: [
          {
            mercado: "RESULTADO LÍQUIDO DO MÊS",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Resultado negativo até o mês anterior",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "BASE DE CÁLCULO DO IMPOSTO",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Prejuízo a compensar",
            comuns: 0,
            day_trade: 0,
          },
          {
            mercado: "Alíquota do imposto",
            comuns: this.alicota_do_imposto().comuns,
            day_trade: this.alicota_do_imposto().day_trade,
          },
          {
            mercado: "IMPOSTO DEVIDO",
            comuns: 0,
            day_trade: 0,
          },
        ]
      }
    },
    meses(operacoes) {
      if (operacoes.length) {
        let meses = {};
        let dezembro_ano_corrente = moment.utc().endOf("year").startOf("month")
        let data_inicial = operacoes[0].data_negocio
        data_inicial = moment.utc(data_inicial).startOf("month")
        do {
          meses[data_inicial.format("YYYY-MM")] = this.resultados_default();
          data_inicial.add(1, "M");
        } while (data_inicial.isSameOrBefore(dezembro_ano_corrente))
        return meses
      }
      return {}
    },
    inicio_prejuizos() {
      return {
        comuns: 0,
        day_trade: 0
      }
    },

    resultados(operacoes) {
      let calculos = this.calculos(operacoes)
      let resultados = this.meses(operacoes)
      let alicota_do_imposto = this.alicota_do_imposto()
      let mercado_a_vista = ["Mercado a Vista", "Merc. Fracionário"]
      let mercado_opcoes = ["Opção de Venda", "Opção de Compra"]
      operacoes.forEach(operacao => {
        let mes = moment.utc(operacao.data_negocio).format("YYYY-MM")
        let mes_anterior = moment.utc(operacao.data_negocio).subtract(1, "M").format("YYYY-MM")
        let _operacao = calculos[operacao.codigo].operacoes[operacao.key].operacao
        let _lucro_prejuizo = calculos[operacao.codigo].operacoes[operacao.key].lucro_prejuizo

        //"RESULTADO LÍQUIDO DO MÊS",
        if (mercado_a_vista.includes(operacao.mercado)) {
          if (_operacao == "Comum") {
            resultados[mes].mercado_a_vista[0].comuns += _lucro_prejuizo
            resultados[mes].resultados[0].comuns += _lucro_prejuizo
          } else {
            resultados[mes].mercado_a_vista[0].day_trade += _lucro_prejuizo
            resultados[mes].resultados[0].day_trade += _lucro_prejuizo
          }
        } else if (mercado_opcoes.includes(operacao.mercado)) {
          if (_operacao == "Comum") {
            resultados[mes].mercado_opcoes[0].comuns += _lucro_prejuizo
            resultados[mes].resultados[0].comuns += _lucro_prejuizo
          } else {
            resultados[mes].mercado_opcoes[0].day_trade += _lucro_prejuizo
            resultados[mes].resultados[0].day_trade += _lucro_prejuizo
          }
        }

        // "Resultado negativo até o mês anterior",
        if (resultados[mes_anterior]) {
          resultados[mes].resultados[1].comuns = Math.abs(resultados[mes_anterior].resultados[3].comuns)
          resultados[mes].resultados[1].day_trade = Math.abs(resultados[mes_anterior].resultados[3].day_trade)
        } else {
          let inicio_prejuizos = this.inicio_prejuizos()
          resultados[mes].resultados[1].comuns = Math.abs(inicio_prejuizos.comuns)
          resultados[mes].resultados[1].day_trade = Math.abs(inicio_prejuizos.day_trade)
        }

        // "BASE DE CÁLCULO DO IMPOSTO",
        resultados[mes].resultados[2].comuns = resultados[mes].resultados[0].comuns - resultados[mes].resultados[1].comuns < 0
          ? 0
          : resultados[mes].resultados[0].comuns - resultados[mes].resultados[1].comuns
        resultados[mes].resultados[2].day_trade = resultados[mes].resultados[0].day_trade - resultados[mes].resultados[1].day_trade < 0
          ? 0
          : resultados[mes].resultados[0].day_trade - resultados[mes].resultados[1].day_trade

        // "Prejuízo a compensar",
        resultados[mes].resultados[3].comuns = resultados[mes].resultados[1].comuns - resultados[mes].resultados[0].comuns < 0
          ? 0
          : resultados[mes].resultados[1].comuns - resultados[mes].resultados[0].comuns
        resultados[mes].resultados[3].day_trade = resultados[mes].resultados[1].day_trade - resultados[mes].resultados[0].day_trade < 0
          ? 0
          : resultados[mes].resultados[1].day_trade - resultados[mes].resultados[0].day_trade

        // "Alíquota do imposto",
        resultados[mes].resultados[4].comuns = alicota_do_imposto.comuns
        resultados[mes].resultados[4].day_trade = alicota_do_imposto.day_trade

        // "IMPOSTO DEVIDO",
        resultados[mes].resultados[5].comuns = resultados[mes].resultados[2].comuns * resultados[mes].resultados[4].comuns / 100
        resultados[mes].resultados[5].day_trade = resultados[mes].resultados[2].day_trade * resultados[mes].resultados[4].day_trade / 100
      })
      return resultados
    }
  },
};
