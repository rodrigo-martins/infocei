export default {
  "KLBN11": {
    auxiliar_acumulado_do_dia:{
      id:12,
      data_negociacao: 4,
      compra_venda: "C",
      quantidade: 200,
      preco_medio: 23
    },
    portifolio:
    {
      quantidade: 400, //(200*1+200*.5)/400
      preco_medio: .75,
      lucro_prejuizo: 150, //talvez não calcual os lucros_prejuízos
    },
    operacoes: {
      1: {
        data_negocio: 1,
        operacao: "-", // ["-"", "Comum", "Day-Trade"]
        c_v:"c",
        //posicao: "comprada", // comprada, vendida
        quantidade: 400,
        preco: 1,
        lucro_prejuizo: 0,
      },
      2: {
        data_negocio: 1,
        operacao: "Day-Trade",
        c_v: "v",
        //posicao: "-",
        preco: 2,
        quantidade: 100,
        lucro_prejuizo: 100,
      },
      3: {
        data_negocio: 3,
        operacao: "Comum",
        c_v:"v",
        // posicao: "-",
        preco: .5,
        quantidade: 100,
        lucro_prejuizo: -50,
      },
      4: {
        data_negocio: 4,
        operacao: "Comum",
        c_v:"c",
        // posicao: "-",
        preco: .5,
        quantidade: 200,
        lucro_prejuizo: 0,
      },
      5: {
        data_negocio: 4,
        operacao: "Comum",
        c_v:"c",
        // posicao: "-",
        preco: 1,
        quantidade: 100,
        lucro_prejuizo: 100,
      },
      6: {
        data_negocio: 4,
        operacao: "Day-Trade",
        c_v:"v",
        // posicao: "-",
        preco: 1,
        quantidade: 100,
        lucro_prejuizo: 100,
      },
    }
  }
}
