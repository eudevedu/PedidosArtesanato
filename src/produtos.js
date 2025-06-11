const produtos = [
  { nome: "Linha de algodão", preco: 0.43 },
  { nome: "Fardo de Garrafa de vidro", preco: 0.49 },
  { nome: "Cápsula plástica", preco: 0.65 },
  { nome: "Alça de couro", preco: 0.72 },
  { nome: "Mochila 20KG", preco: 10.0 },
  { nome: "Tinta", preco: 0.36 },
  { nome: "Embalagem", preco: 0.57 },
  { nome: "Coador", preco: 0.33 },
  { nome: "Verniz", preco: 0.46 },
  { nome: "Rótulo", preco: 0.48 },
  { nome: "Vara de pescar", preco: 10.0 },
  { nome: "Câmera Fotográfica", preco: 26.33 },
  { nome: "Bonecas", preco: 8.45 },
  { nome: "Orelhas", preco: 8.45 },
  { nome: "Caixa Rustica", preco: 0.5 },
];

const tabela = document.querySelector("#tabelaProdutos tbody");

produtos.forEach((produto, i) => {
  const row = tabela.insertRow();
  row.innerHTML = `
        <td>${produto.nome}</td>
        <td>R$ ${produto.preco.toFixed(2)}</td>
        <td><input type="number" min="0" value="0" data-index="${i}" onchange="atualizarTotal()"></td>
        <td id="total-${i}">R$ 0,00</td>
      `;
});

function atualizarTotal() {
  let total = 0;
  document.querySelectorAll("input[type='number']").forEach((input) => {
    const i = input.dataset.index;
    const subtotal = produtos[i].preco * input.value;
    document.getElementById(`total-${i}`).innerText = `R$ ${subtotal.toFixed(
      2
    )}`;
    total += subtotal;
  });
  document.getElementById(
    "totalPedido"
  ).innerText = `Total do Pedido: R$ ${total.toFixed(2)}`;
}

async function enviarPedido() {
  const nome = document.getElementById("nome").value;
  const pombo = document.getElementById("pombo").value;
  let pedido = `**Novo Pedido**\n👤 Nome: ${nome}\n🐦 Pombo: ${pombo}\n\n📦 **Itens:**\n`;
  let total = 0;

  document.querySelectorAll("input[type='number']").forEach((input) => {
    const i = input.dataset.index;
    const qtd = Number(input.value);
    if (qtd > 0) {
      const produto = produtos[i];
      const subtotal = qtd * produto.preco;
      pedido += `- ${produto.nome} x ${qtd} = R$ ${subtotal.toFixed(2)}\n`;
      total += subtotal;
    }
  });

  pedido += `\n💰 Total: R$ ${total.toFixed(2)}`;

  await fetch("https://discord.com/api/webhooks/1382189563807662214/9rlsoxh2jxKvVCUo0j4tAwDN8zeJaHhFoPk9JduHcFZO46rh7B0jAuayqgvvVo24Q4Wa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: pedido }),
  });

  alert("Pedido enviado com sucesso!");
}
