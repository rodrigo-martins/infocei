(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{430:function(e,o,d){"use strict";d(4),d(8),d(84),d(12),d(45);var t=d(10),n=d(0),r=d(431),c=d.n(r);o.a={data:function(){return{operacoes:[]}},methods:{calculos:function(e){var o={};return(e=c.a.orderBy(e,["data_negociacao"],["asc"])).forEach((function(e){o[e.codigo]||(o[e.codigo]={portifolio:{quantidade:0,preco:0,lucro_prejuizo:0},operacoes:Object(n.a)({},e.key,{}),ultima_data_negocio:null}),o[e.codigo].operacoes[e.key]=function(e,o,d){var t="Comum",n=0;return e=new Date(e).getTime(),new Date(d.data_negocio).getTime()==e?0==o.quantidade?(t="Comum",n="C"==d.compra_venda?0:d.valor_total):o.quantidade>0&&"C"==d.compra_venda?(t="Comum",n=0):o.quantidade>0&&"V"==d.compra_venda?(t="Day-Trade",n=d.valor_total-o.preco*d.quantidade,o.quantidade<d.quantidade&&(n=d.valor_total-o.quantidade*o.preco)):o.quantidade<0&&"V"==d.compra_venda?(t="Comum",n=d.valor_total):o.quantidade<0&&"C"==d.compra_venda&&(t="Day-Trade",n=o.preco*d.quantidade-d.valor_total,Math.abs(o.quantidade)<d.quantidade&&(n=Math.abs(o.quantidade)*(o.preco-d.preco))):(t="Comum",0==o.quantidade?n="C"==d.compra_venda?0:d.valor_total:o.quantidade>0&&"C"==d.compra_venda?n=0:o.quantidade>0&&"V"==d.compra_venda?(n=d.valor_total-o.preco*d.quantidade,o.quantidade<d.quantidade&&(n=d.valor_total-o.quantidade*o.preco)):o.quantidade<0&&"V"==d.compra_venda?n=d.valor_total:o.quantidade<0&&"C"==d.compra_venda&&(n=o.preco*d.quantidade-d.valor_total,Math.abs(o.quantidade)<d.quantidade&&(n=o.quantidade*(o.preco-d.preco)))),{operacao:t,lucro_prejuizo:0!=n?n:0}}(o[e.codigo].ultima_data_negocio,o[e.codigo].portifolio,e),o[e.codigo].portifolio=function(e,o){var d,t,n;return 0==e.quantidade?("C"==o.compra_venda?(d=o.quantidade,n=0):(d=o.quantidade?-o.quantidade:0,n=o.quantidade*o.preco),t=o.preco):e.quantidade>0&&"V"==o.compra_venda?(d=e.quantidade-o.quantidade,t=e.preco,d||(t=0),n=e.lucro_prejuizo+o.preco*o.quantidade-e.preco*o.quantidade,d<0&&(t=o.preco,n=e.lucro_prejuizo+o.preco*o.quantidade-e.preco*e.quantidade)):e.quantidade>0&&"C"==o.compra_venda?(d=e.quantidade+o.quantidade,t=(e.preco*e.quantidade+o.preco*o.quantidade)/(e.quantidade+o.quantidade),n=e.lucro_prejuizo):e.quantidade<0&&"V"==o.compra_venda?(d=e.quantidade-o.quantidade,t=(e.preco*-e.quantidade+o.preco*o.quantidade)/(-e.quantidade+o.quantidade),n=e.lucro_prejuizo+o.quantidade*o.preco):e.quantidade<0&&"C"==o.compra_venda&&(d=e.quantidade+o.quantidade,t=e.preco,d||(t=0),n=e.lucro_prejuizo-o.preco*o.quantidade,d>0&&(n=0)),{quantidade:d,preco:t,lucro_prejuizo:n}}(o[e.codigo].portifolio,e),o[e.codigo].ultima_data_negocio=e.data_negocio})),o},fnPortifolio:function(){var e=this;return Object(t.a)(regeneratorRuntime.mark((function o(){var d,t;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.$db.operacoes.getAll();case 2:d=o.sent,t=e.calculos(d),t=Object.keys(t).map((function(e){var o=t[e].portifolio,d={codigo:e,valor_total:o.quantidade*o.preco};return Object.assign(d,t[e].portifolio)})).filter((function(p){return p.quantidade})),e.portifolio=t;case 6:case"end":return o.stop()}}),o)})))()}}}},436:function(e,o,d){"use strict";d.r(o);var t={mixins:[d(430).a]},n=d(50),component=Object(n.a)(t,(function(){var e=this.$createElement;return(this._self._c||e)("div")}),[],!1,null,null,null);o.default=component.exports}}]);