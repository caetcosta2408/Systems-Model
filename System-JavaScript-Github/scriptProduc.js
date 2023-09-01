const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCodigo = document.querySelector('#m-codigo')
const sProduto = document.querySelector('#m-produto')
const sUnidMedida = document.querySelector('#m-unid_medida')
const sValor = document.querySelector('#m-valor')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sCodigo.value = itens[index].codigo
    sProduto.value = itens[index].produto
    sUnidMedida.value = itens[index].unid_medida
    sValor.value = itens[index].valor
    id = index
  } else {
    sCodigo.value = ''
    sProduto.value = ''
    sUnidMedida.value = ''
    sValor.value = ''
  }
  sCodigo.focus()

}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')
  tr.innerHTML = `
    <td>${item.codigo}</td>
    <td>${item.produto}</td>
    <td>${item.unid_medida}</td>
    <td>${item.valor}</td>
    <td class="acao">
      <button onclick="editItem(${index})">Editar</button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})">Deletar</button>
    </td>
  `
  tbody.appendChild(tr)
}


btnSalvar.onclick = e => {
  if (sCodigo.value == '' || sProduto.value == '' || sUnidMedida.value == '' || sValor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].codigo = sCodigo.value
    itens[id].produto = sProduto.value
    itens[id].unid_medida = sUnidMedida.value
    itens[id].valor = sValor.value
  } else {
    itens.push({'codigo': sCodigo.value, 'produto': sProduto.value, 'unid_medida': sUnidMedida.value, 'valor': sValor.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined

  sCodigo.value=""
  sProduto.value=""
  sUnidMedida.value=""
  sValor.value=""
  sCodigo.focus()
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('db_Produc')) ?? []
const setItensBD = () => localStorage.setItem('db_Produc', JSON.stringify(itens))

loadItens()