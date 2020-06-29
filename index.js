const replaceAll = (from, to, text) => text.split(from).join(to);
String.prototype.replaceAll = function(from, to){ return this.split(from).join(to);};

const productListElement = document.querySelector('#lista-produtos');
const cartListElement = document.querySelector('#lista-carrinho');
const comprarButtonsElement = document.querySelectorAll('.action-buttons');
const totalElement = document.querySelector('#total');
const templateElement = document.querySelector('#carrinho-item');
const template = templateElement.innerHTML;

let cart = [];

const cartHandler = {
  key: 'cart',
  storage: localStorage,
  setCartItems: function (arr) {
    if (arr instanceof Array) this.storage.setItem(this.key, JSON.stringify(arr));
    else throw 'O valor passado para storageHandler.setItems() deve ser Array';
  },
  getItemsFromCart: function () {
    return (JSON.parse(this.storage.getItem(this.key) || '[]'));
  }
};

const setCartItems = (arr) => {
  cartHandler.setCartItems(arr);
  cart = cartHandler.getItemsFromCart();
  render();
};

//cart.filter(item => item.id === data.id)
//cart.includes(data)

const onAddItemClicked = (evt) => {
  
  const id = parseInt(evt.target.attributes['data-id'].nodeValue);
  
  if(evt.target.nodeName === 'BUTTON' && evt.target.attributes['data-id'])
  {
    if(cart.filter(item => parseInt(item.id) === id).length > 0)
    {
      const index = cart.findIndex(item => parseInt(item.id) === id);
      cart[index].quantity = parseInt(cart[index].quantity) + 1;
      setCartItems(cart);
    } 
    else 
    {
      const data = [...evt.target.attributes];
      const product = data.reduce((obj, node) => {
        const attr = node.nodeName.replace('data-', '');
        const value = node.nodeValue;
        obj[attr] = value;
        return obj;
      }, {});
      const newCart = [...cart, product];
      setCartItems(newCart);
    }
  }
};

const addEventToComprarButton = (item) => {
  item.addEventListener('click', onAddItemClicked);
};


const templateToHTML = (template, item) => {
  return template
    .replaceAll('{{NOME}}', item.name)
    .replaceAll('{{PRECO}}', item.price)
    .replaceAll('{{ID}}', item.id)
    .replaceAll('{{IMAGEM}}', item.image)
    .replaceAll('{{QUANTIDADE}}', item.quantity);
};


const render = () => {
  const cartHTML = cart.map((item) => templateToHTML(template, item));
  cartListElement.innerHTML = cartHTML.join('\n');
  const total = cart.reduce((acc, item) => acc += parseInt(item.price) * parseFloat(item.quantity), 0);
  totalElement.innerText = total.toFixed(2).replace('.',',');

};


const onTrashClicked = (evt) => {  
  if(evt.target.nodeName === 'BUTTON')
  {
    const id = parseInt(evt.target.attributes['data-id'].nodeValue);
    const newCart = cart.filter((v) => parseInt(v.id) !== id);
    setCartItems(newCart);
  }
};

const onQuantityEdited = (evt) => {
  if(evt.target.nodeName === 'INPUT')
  {
    const id = parseInt(evt.target.attributes['data-id'].nodeValue);
    const index = cart.findIndex(item => parseInt(item.id) === id);
    cart[index].quantity = evt.target.value;
    setCartItems(cart);
  }
};

const init = () => {
  cart = cartHandler.getItemsFromCart();
  comprarButtonsElement.forEach(addEventToComprarButton);
  cartListElement.addEventListener('click', onTrashClicked);
  cartListElement.addEventListener('change', onQuantityEdited);
  render();
};

init();










// Obter a lista de produtos como Elemento (UL) OK
// Adicionar um eventListener para click na lista OK
// No evento, filtrar quem é o target, e regir apenas ao botão comprar OK 
// Ler os valores do attr data- e criar um objeto OK

/*
  const button = document.querySelector('button[data-id]');
  const data = [...button.attributes];//Transforma um nodeMap em [node]
  const produto = data.reduce((obj, node) => {
    const attr = node.nodeName.replace('data-', '');
    const value = node.nodeValue;
    obj[attr] = value;
    return obj;
  }, {});
*/

// Adicionar esse objeto em uma lista "global" que representa o carrinho OK

/*
  item = [...items, produto]; //opção 1
  item.push(produto);  //opção 2
*/

// Obter a lista de produtos DO CARRINHO como Elemento (UL) OK
// Obter o template do produto para o carrinho OK
// Fazer o replace dos valores do objeto no template OK
// Renderizar - Adicionar todos os items (transformados pelo template) da lista global no innerHTML da lista do carrinho OK

// Adicionar um eventListener para click na lista do carrinho OK
// Verificar se é o botão remover OK
// Pegar o data-id, para saber qual item remover OK
// Fazer um filter na lista global e remover o que tiver o id proveniente do botão OK
// Rederizar - Adicionar todos os items (transformados pelo template) da lista global no innerHTML da lista do carrinho OK

// Desafio
// Adicionar um eventListener para change na lista do carrinho
// Verificar se o target é um input
// Pegar o valor do target que é a quantidade
// Pegar o id do data-id do target
// Alterar o item na lista global de mesmo id atualizando a quantidade

/*
  const lista = [
    { id:1, quantidade:2, preco:100.00 },
    { id:2, quantidade:1, preco:150.00 },
    { id:3, quantidade:3, preco:99.00 },
    { id:4, quantidade:1, preco:10.00 }
  ];

  const alterarItem = function(id, qtd){
    const index  = lista.findIndex(x => x.id === id);
    lista[index].quantidade = qtd;
    return lista;
  };
*/

// Calcular o Total (Obter o span com id total e modificar seu innerHTML)

/*
  const total = lista.reduce(
    (acc, item) => acc += parseInt(item.quantidade) * parseFloat(item.preco)
    , 0.0
  );
*/

// Renderizar o total na tela

/*
  const total = 100.0;
  total.toFixed(2).replace('.',',');
*/
















/*
const sortById = function(list){
  list.sort((a, b) => {
    if(a.id > b.id)  return 1;
    if(a.id == b.id) return 0;
    if(a.id < b.id)  return -1;
  });
};

const lista = [
  { id:1, quantidade:'2', preco:'100.00' },
  { id:2, quantidade:'1', preco:'150.00' },
  { id:3, quantidade:'3', preco:'99.00' },
  { id:4, quantidade:'1', preco:'10.00' }
];

const parseNumericProperties = function(lista){
  return lista.map(
    item => 
    ({
        ...item, 
        quantidade : parseInt(item.quantidade), 
        preco : parseFloat(item.preco)
      })
  );
};
*/