const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCnpj = document.querySelector('#m-cnpj')
const sRazaoSocial = document.querySelector('#m-razao_social')
const sNomeFantasia = document.querySelector('#m-nome_fantasia')
const sEmail = document.querySelector('#m-email')
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
    sCnpj.value = itens[index].cnpj
    sRazaoSocial.value = itens[index].razao_social
    sNomeFantasia.value = itens[index].nome_fantasia
    sEmail.value = itens[index].email
    id = index
  } else {
    sCnpj.value = ''
    sRazaoSocial.value = ''
    sNomeFantasia.value = ''
    sEmail.value = ''
  }
  sCnpj.focus()

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
    <td>${item.cnpj}</td>
    <td>${item.razao_social}</td>
    <td>${item.nome_fantasia}</td>
    <td>${item.email}</td>
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
  if (sCnpj.value == '' || sRazaoSocial.value == '' || sNomeFantasia.value == '' || sEmail.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].cnpj = sCnpj.value
    itens[id].razao_social = sRazaoSocial.value
    itens[id].nome_fantasia = sNomeFantasia.value
    itens[id].email = sEmail.value
  } else {
    itens.push({'cnpj': sCnpj.value, 'razao_social': sRazaoSocial.value, 'nome_fantasia': sNomeFantasia.value, 'email': sEmail.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined

  sCnpj.value=""
  sRazaoSocial.value=""
  sNomeFantasia.value=""
  sEmail.value=""
  sCnpj.focus()
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('db_Forneced')) ?? []
const setItensBD = () => localStorage.setItem('db_Forneced', JSON.stringify(itens))

loadItens()