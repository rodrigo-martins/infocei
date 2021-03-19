import { mount } from '@vue/test-utils'
import mixins from '@/pages/tests/mixins.vue'
import db from '@/mock/db'

describe.skip('Calculos Portifólio - Comprado', () => {
  test('Vue instance', () => {
    const wrapper = mount(mixins)
    expect(wrapper.vm).toBeTruthy()
  })

  test('Verifica compra Comum - primeira', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 1)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos).toHaveProperty("KLBN11")
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: 400,
      preco: 1,
      lucro_prejuizo: 0
    })
    // expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    // expect(calculos["KLBN11"].operacoes).toHaveProperty("1", {
    //   operacao: "Comum",
    //   lucro_prejuizo: 0
    // })
    // expect(calculos["KLBN11"]).toHaveProperty("portifolio_do_dia", {
    //   data_negocio: new Date("2020-01-01"),
    //   quantidade: 400,
    //   preco: 1,
    //   lucro_prejuizo: 0
    // })
  })

  test('Verifica venda Day-Trade', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 2)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(2)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 300,
      preco: 1,
      lucro_prejuizo: 100
    })
    // expect(calculos["KLBN11"].operacoes['2']).toEqual({
    //   operacao: "Day-Trade",
    //   lucro_prejuizo: 0
    // })
    // expect(calculos["KLBN11"].portifolio_do_dia).toEqual({
    //   data_negocio: new Date("2020-01-01"),
    //   quantidade: 300,
    //   preco: 1,
    //   lucro_prejuizo: 100
    // })
  })

  test('Verifica venda Comum', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 3)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(3)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 200,
      preco: 1,
      lucro_prejuizo: 50
    })
    // expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(3)
    // expect(calculos["KLBN11"].operacoes).toHaveProperty("3", {
    //   operacao:"Comum",
    //   lucro_prejuizo: -50
    // })
  })

  test('Verifica compra Comum - dia seguinte', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 4)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(4)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 400,
      preco: .75,
      lucro_prejuizo: 50
    })
    // expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(3)
    // expect(calculos["KLBN11"].operacoes).toHaveProperty("3", {
    //   operacao:"Comum",
    //   lucro_prejuizo: -50
    // })
  })
  test('Verifica compra Comum - no mesmo dia', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 5)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(5)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 500,
      preco: .8,
      lucro_prejuizo: 50
    })
  })
  test('Verifica venda Day-Trade', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 6)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(6)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 400,
      preco: .8,
      lucro_prejuizo: 70
    })
  })

  test('Verifica venda Comum - Zerar posição', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 7)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(7)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 550
    })
  })

  test('Verifica compra Comum', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 8)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(8)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 1000,
      preco: 1,
      lucro_prejuizo: 0
    })
  })

  test('Verifica venda Comum', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 9)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(9)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 0
    })
  })
})

describe.skip('Calculos Portifólio - Vendido', () => {
  test('Verifica venda Comum - Primeira', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 10)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos).toHaveProperty("KLBN11")
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: -400,
      preco: 1,
      lucro_prejuizo: 400
    })
  })

  test('Verifica compra Day-Trade', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 11)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(11)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -300,
      preco: 1,
      lucro_prejuizo: 200
    })
  })

  test('Verifica compra Comum', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 12)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(12)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -200,
      preco: 1,
      lucro_prejuizo: 150
    })
  })

  test('Verifica venda Comum - dia seguinte', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 13)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(13)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -400,
      preco: .75,
      lucro_prejuizo: 250
    })
  })
  test('Verifica venda Comum - no mesmo dia', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 14)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(14)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -500,
      preco: .8,
      lucro_prejuizo: 350
    })
  })
  test('Verifica compra Day-Trade', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 15)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(15)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -400,
      preco: .8,
      lucro_prejuizo: 250
    })
  })

  test('Verifica compra Comum - Zerar posição', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 16)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(16)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: -550
    })
  })

  test('Verifica venda Comum', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 17)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(17)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: -1000,
      preco: 1,
      lucro_prejuizo: 1000
    })
  })

  test('Verifica compra Comum', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 18)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(Object.keys(calculos["KLBN11"].operacoes)).toHaveLength(18)
    expect(calculos["KLBN11"].portifolio).toEqual({
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 0
    })
  })
})
describe.skip('Calculos Portifólio - Comprado vs Vendido', () => {
  test('Verifica compra Comum - Primeira', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 19)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: 100,
      preco: 1,
      lucro_prejuizo: 0
    })
  })

  test('Verifica venda Comum - Passando para Vendido', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 20)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: -100,
      preco: 1,
      lucro_prejuizo: 100
    })
  })
  test('Verifica compra Comum - Passando para Comprado', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 21)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: 200,
      preco: 1,
      lucro_prejuizo: 0
    })
  })
  test('Verifica venda Comum - Passando para Vendido com lucro', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 22)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: -100,
      preco: 2,
      lucro_prejuizo: 400
    })
  })
  test('Verifica compra Comum - Zerando com lucro', async () => {
    const wrapper = mount(mixins)
    const operacoes = db.operacoes.slice(0, 23)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 300
    })
  })
})

describe.skip('Comprado - Operação e Resultado', () => {
  const wrapper = mount(mixins)
  test('Verifica compra Comum - Primeira', async () => {
    const operacoes = db.operacoes.slice(0, 1)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("1", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
  test('Verifica venda Day-Trade - Lucro', async () => {
    const operacoes = db.operacoes.slice(0, 2)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"].operacoes).toHaveProperty("2", {
      operacao: "Day-Trade",
      lucro_prejuizo: 100
    })
  })
  test('Verifica venda Comum - Prejuizo', async () => {
    const operacoes = db.operacoes.slice(0, 3)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"].operacoes).toHaveProperty("3", {
      operacao: "Comum",
      lucro_prejuizo: -50
    })
  })
  test('Verifica compra Comum', async () => {
    const operacoes = db.operacoes.slice(0, 4)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"].operacoes).toHaveProperty("4", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
  test('Verifica compra Comum', async () => {
    const operacoes = db.operacoes.slice(0, 5)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"].operacoes).toHaveProperty("5", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
  test('Verifica venda Day-Trade - Lucro', async () => {
    const operacoes = db.operacoes.slice(0, 6)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"].operacoes).toHaveProperty("6", {
      operacao: "Day-Trade",
      lucro_prejuizo: 20
    })
  })
  test('Verifica venda Comum - Lucro - Zerar posição', async () => {
    const operacoes = db.operacoes.slice(0, 7)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"].operacoes).toHaveProperty("7", {
      operacao: "Comum",
      lucro_prejuizo: 480
    })
  })
  test('Verifica compra Comum', async () => {
    const operacoes = db.operacoes.slice(0, 8)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"].operacoes).toHaveProperty("8", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
  test('Verifica venda Comum - Sem Lucro', async () => {
    const operacoes = db.operacoes.slice(0, 9)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"].operacoes).toHaveProperty("9", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
})

describe.skip('Vendido - Operação e Resultado', () => {
  const wrapper = mount(mixins)
  test('Verifica venda Comum - Primeira', async () => {
    const operacoes = db.operacoes.slice(0, 10)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("10", {
      operacao: "Comum",
      lucro_prejuizo: 400
    })
  })
  test('Verifica compra Day-Trade - Prejuizo', async () => {
    const operacoes = db.operacoes.slice(0, 11)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("11", {
      operacao: "Day-Trade",
      lucro_prejuizo: -100
    })
  })
  test('Verifica compra Comum - Lucro', async () => {
    const operacoes = db.operacoes.slice(0, 12)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("12", {
      operacao: "Comum",
      lucro_prejuizo: 50
    })
  })
  test('Verifica venda Comum - Lucro', async () => {
    const operacoes = db.operacoes.slice(0, 13)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("13", {
      operacao: "Comum",
      lucro_prejuizo: 100
    })
  })
  test('Verifica venda Comum - Lucro', async () => {
    const operacoes = db.operacoes.slice(0, 14)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("14", {
      operacao: "Comum",
      lucro_prejuizo: 100
    })
  })
  test('Verifica compra Day-Trade - Prejuizo', async () => {
    const operacoes = db.operacoes.slice(0, 15)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("15", {
      operacao: "Day-Trade",
      lucro_prejuizo: -20
    })
  })
  test('Verifica compra Comum - Prejuizo', async () => {
    const operacoes = db.operacoes.slice(0, 16)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("16", {
      operacao: "Comum",
      lucro_prejuizo: -480
    })
  })
  test('Verifica venda Comum - Lucro', async () => {
    const operacoes = db.operacoes.slice(0, 17)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("17", {
      operacao: "Comum",
      lucro_prejuizo: 1000
    })
  })
  test('Verifica compra Comum - Zera posição sem lucro ou prejuízo', async () => {
    const operacoes = db.operacoes.slice(0, 18)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("18", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
})

describe.skip('Operação e Resultado - Comprado vs Vendido', () => {
  const wrapper = mount(mixins)
  test('Verifica compra Comum', async () => {
    const operacoes = db.operacoes.slice(0, 19)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("19", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })

  test('Verifica venda Comum - Comprado para Vendido', async () => {
    const operacoes = db.operacoes.slice(0, 20)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("20", {
      operacao: "Comum",
      lucro_prejuizo: 100
    })
  })

  test('Verifica compra Comum - Vendido para Comprado', async () => {
    const operacoes = db.operacoes.slice(0, 21)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("21", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
  test('Verifica venda Comum - Comprado para Vendido', async () => {
    const operacoes = db.operacoes.slice(0, 22)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("22", {
      operacao: "Comum",
      lucro_prejuizo: 400
    })
  })
  test('Verifica compra Comum - Zerado com lucro', async () => {
    const operacoes = db.operacoes.slice(0, 23)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("23", {
      operacao: "Comum",
      lucro_prejuizo: 100
    })
  })
  test('Verifica compra Comum', async () => {
    const operacoes = db.operacoes.slice(0, 24)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("24", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
  test('Verifica venda Day-Trade - Compra para Vendido', async () => {
    const operacoes = db.operacoes.slice(0, 25)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("25", {
      operacao: "Day-Trade",
      lucro_prejuizo: 100
    })
  })
  test('Verifica compra Day-Trade - Vendido para Comprado', async () => {
    const operacoes = db.operacoes.slice(0, 26)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("26", {
      operacao: "Day-Trade",
      lucro_prejuizo: 50
    })
  })
  test('Verifica venda Comum - Zera posição', async () => {
    const operacoes = db.operacoes.slice(0, 27)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("27", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
})

describe.skip('Ordenação', () => {
  const wrapper = mount(mixins)
  test('Verifica venda Comum - Dois dias ', async () => {
    const operacoes = db.operacoes.slice(0, 28)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos).toHaveProperty("KLBN11")
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: -200,
      preco: 1,
      lucro_prejuizo: 200
    })
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("28", {
      operacao: "Comum",
      lucro_prejuizo: 200
    })
  })
  test('Verifica compra Comum - Insere uma operacao entre datas ', async () => {
    const operacoes = db.operacoes.slice(0, 29)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos).toHaveProperty("KLBN11")
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: -100,
      preco: 1,
      lucro_prejuizo: 100
    })
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("29", {
      operacao: "Comum",
      lucro_prejuizo: 0
    })
  })
  test('Verifica compra Comum - Insere duas operacao entre datas - Zera posição ', async () => {
    const operacoes = db.operacoes.slice(0, 30)
    const calculos = await wrapper.vm.calculos(operacoes)
    expect(calculos).toHaveProperty("KLBN11")
    expect(calculos["KLBN11"]).toHaveProperty("portifolio", {
      quantidade: 0,
      preco: 0,
      lucro_prejuizo: 50
    })
    expect(calculos["KLBN11"]).toHaveProperty("operacoes")
    expect(calculos["KLBN11"].operacoes).toHaveProperty("30", {
      operacao: "Comum",
      lucro_prejuizo: 50
    })
  })
})


describe('Resultados IRPF', () => {
  const wrapper = mount(mixins)
  test('Verifica primeiro mês - Ações e Opções com lucro ', async () => {
    const operacoes = db.operacoes_resultados.slice(0, 6)
    const resultados = await wrapper.vm.resultados(operacoes)
    expect(resultados).toHaveProperty("2021-01", {
      mercado_a_vista: [
        {
          mercado: "Mercado à vista - ações",
          comuns: 100,
          day_trade: 100,
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
          comuns: 100,
          day_trade: 100,
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
          comuns: 200,
          day_trade: 200,
        },
        {
          mercado: "Resultado negativo até o mês anterior",
          comuns: 0,
          day_trade: 0,
        },
        {
          mercado: "BASE DE CÁLCULO DO IMPOSTO",
          comuns: 200,
          day_trade: 200,
        },
        {
          mercado: "Prejuízo a compensar",
          comuns: 0,
          day_trade: 0,
        },
        {
          mercado: "Alíquota do imposto",
          comuns: 15,
          day_trade: 20,
        },
        {
          mercado: "IMPOSTO DEVIDO",
          comuns: 30,
          day_trade: 40,
        },
      ],
    })
  })
  test('Verifica segundo mês - Ações e Opções com prejuízo ', async () => {
    const operacoes = db.operacoes_resultados.slice(0, 12)
    const resultados = await wrapper.vm.resultados(operacoes)
    expect(resultados).toHaveProperty("2021-02", {
      mercado_a_vista: [
        {
          mercado: "Mercado à vista - ações",
          comuns: -100,
          day_trade: -100,
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
          comuns: -100,
          day_trade: -100,
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
          comuns: -200,
          day_trade: -200,
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
          comuns: 200,
          day_trade: 200,
        },
        {
          mercado: "Alíquota do imposto",
          comuns: 15,
          day_trade: 20,
        },
        {
          mercado: "IMPOSTO DEVIDO",
          comuns: 0,
          day_trade: 0,
        },
      ]
    })
  })
})
