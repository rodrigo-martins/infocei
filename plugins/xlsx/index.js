import XLSX from 'xlsx'
export default async (context, inject) => {
  function previewFile(e) {
    return new Promise((resolve, _reject)=>{
      var files = e.target.files, f = files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        let sheetName = workbook.SheetNames[0]
        /* DO SOMETHING WITH workbook HERE */;
        let worksheet = workbook.Sheets[sheetName];
        resolve(XLSX.utils.sheet_to_json(worksheet, {
              range: 10,
            }
          )
        )
      };
      reader.readAsArrayBuffer(f);
    })
  }

  function parse_date(dateString){
    if(!dateString) return null
    let dateParts = dateString.split("/");
    let day = dateParts[0]
    let month = dateParts[1]
    let year = dateParts[2].length == 2 ? `20${dateParts[2]}` : dateParts[2]
    return new Date(`${year}-${month}-${day}`);
  }

  async function cei_json(e){
    let json = await previewFile(e)
    return json
      .filter(row=>{
        return row["Mercado"]
      })
      .map(row=>{
        return {
          key: parse_date(row["key"]),
          data_negocio: parse_date(row["Data Negócio"]),
          compra_venda:	row["C/V"].trim(),
          mercado: row["Mercado"].trim(),
          prazo: parse_date(row["Prazo"]),
          codigo: row["Código"].trim(),
          especificacao_do_ativo:	row["Especificação do Ativo"].trim().replace(/ {1,}/g," "),
          quantidade: row["Quantidade"],
          preco: row["Preço (R$)"],
          valor_total: row["Valor Total (R$)"]
        }
    })

  }
  inject("xlsx", { previewFile, cei_json })
}
