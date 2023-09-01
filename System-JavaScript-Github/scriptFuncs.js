const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCpf = document.querySelector('#m-cpf')
const sNome = document.querySelector('#m-nome')
const sSetor = document.querySelector('#m-setor')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
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
    sCpf.value = itens[index].cpf
    sNome.value = itens[index].nome
    sSetor.value = itens[index].setor
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
  } else {
    sCpf.value = ''
    sNome.value = ''
    sSetor.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
  sCpf.focus()

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
    <td>${item.cpf}</td>
    <td>${item.nome}</td>
    <td>${item.setor}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
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
  if (sCpf.value == '' || sNome.value == '' || sSetor.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].cpf = sCpf.value
    itens[id].nome = sNome.value
    itens[id].setor = sSetor.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'cpf': sCpf.value, 'nome': sNome.value, 'setor': sSetor.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined

  sCpf.value=""
  sNome.value=""
  sSetor.value=""
  sFuncao.value=""
  sSalario.value=""
  sCpf.focus()
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('db_Funcs')) ?? []
const setItensBD = () => localStorage.setItem('db_Funcs', JSON.stringify(itens))

loadItens()