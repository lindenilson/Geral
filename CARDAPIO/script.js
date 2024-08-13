const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const addressName = document.getElementById("adress-name");
const res = document.getElementById("res");
const pessoa = document.getElementById("pessoa");
const nameWarn = document.getElementById("name-warn");
const obs = document.getElementById("obs");
const cepInput = document.getElementById("cep");
const freteDisplay = document.getElementById("frete");
const totalComFreteDisplay = document.getElementById("total-com-frete");

//NAVBAR
const toggleMenuOpen = () => document.body.classList.toggle('open');

let cart = [];

// ABRIR MODAL DO CARRINHO
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
});

// FECHAR MODAL QUANDO CLICAR FORA
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// FECHAR MODAL CLICAR BUTTON FECHAR
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }
});

// FUNÇÃO ADICIONAR NO CARRINHO
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}

// ATUALIZA CARRINHO
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mt-1", "flex-col");

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn mr-2" data-name="${item.name}">
                    Remover
                </button>
            </div>
        `;
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    cartCounter.innerHTML = cart.length;

    atualizarTotalComFrete(); // Chama a função para atualizar o total incluindo frete
}

// FUNÇÃO PARA REMOVER O ITEM DO CARRINHO
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];
        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
});

pessoa.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        pessoa.classList.remove("border-red-500");
        nameWarn.classList.add("hidden");
    }
});

// FINALIZAR PEDIDO
checkoutBtn.addEventListener("click", function () {
    const isOpen = checkHora();
    if (!isOpen) {
        Toastify({
            text: "Estamos fechados no momento!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast();
        return;
    }

    if (cart.length === 0) return;

    let valid = true;

    if (pessoa.value === "") {
        nameWarn.classList.remove("hidden");
        pessoa.classList.add("border-red-500");
        valid = false;
    }

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        valid = false;
    }

    if (!valid) return;

    // ENVIAR PEDIDO WHATSAPP
    const frete = calcularFrete(cepInput.value);
    const totalProdutos = calcularTotalProdutos();
    const totalComFrete = totalProdutos + frete;

    const cartItems = cart.map((item) => {
        return (
            `${item.name} 
            Quantidade: (${item.quantity}) 
            Preço: R$ ${item.price.toFixed(2)}`
        )
    }).join("\n");

    const message = encodeURIComponent(`👋 Olá, meu nome é ${pessoa.value}.\n\n📋 *Gostaria de fazer um pedido com os seguintes itens:*\n\n${cartItems}\n\nTotal Produtos: R$ ${totalProdutos.toFixed(2)}\nFrete: R$ ${frete.toFixed(2)}\n*Total Pedido:* R$ ${totalComFrete.toFixed(2)}\n\nMeu endereço para entrega é:\n${addressInput.value}\n\n⚠ *Observação:*\n${obs.value}\n\n🙏 Agradeço pela atenção e aguardo a confirmação do pedido.`);
    const phone = "77981071559";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    cart = [];
    updateCartModal();
});

// VERIFICAR HORARIO DE ABERTURA E FECHAMENTO
function checkHora() {
    const data = new Date();
    const dia = data.getDay(); // 0 (domingo) a 6 (sábado)
    const hora = data.getHours();

    const diasAbertos = [1, 2, 3, 4, 5, 6, 0]; // Quinta-feira (4) a Domingo (0)

    const estaAberto = diasAbertos.includes(dia) && hora >= 1 && hora < 22;
    return estaAberto;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkHora();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}

// FUNÇÃO DE EXPANDIR SECTION
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        const items = section.children;
        for (let i = 3; i < items.length; i++) {
            items[i].classList.add('hidden');
        }
    });
});

function toggleSection(sectionId, button) {
    const section = document.getElementById(sectionId);
    const items = section.children;
    let isExpanded = button.innerText === 'Ver Menos';

    for (let i = 3; i < items.length; i++) {
        items[i].classList.toggle('hidden', isExpanded);
    }

    button.innerText = isExpanded ? 'Ver Tudo' : 'Ver Menos';
}

// FIM FUNÇÃO DE EXPANDIR SECTION

// FUNÇÃO FRETE 

// Função para calcular o frete (exemplo simplificado)
function calcularFrete(cep) {
    // Exemplo de cálculo de frete baseado no CEP
    // Pode substituir por uma chamada API ou uma lógica mais complexa
    if (cep.startsWith("100")) {
        return 10.00; // CEPs começando com 100 têm frete de R$ 10,00
    } else if (cep.startsWith("200")) {
        return 20.00; // CEPs começando com 200 têm frete de R$ 20,00
    } else {
        return 15.00; // Outros CEPs têm frete de R$ 15,00
    }
}

// Evento de input no campo CEP
cepInput.addEventListener("input", function () {
    atualizarTotalComFrete(); // Chama a função para atualizar o total incluindo frete ao digitar o CEP
});

// Função para calcular o total dos produtos
function calcularTotalProdutos() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Atualiza a exibição do total incluindo frete
function atualizarTotalComFrete() {
    const cep = cepInput.value;
    if (cep.length === 8) { // Supondo que o CEP tenha 8 dígitos
        const frete = calcularFrete(cep);
        const totalProdutos = calcularTotalProdutos();
        const totalComFrete = totalProdutos + frete;
        freteDisplay.textContent = `R$ ${frete.toFixed(2)}`;
        totalComFreteDisplay.textContent = `R$ ${totalComFrete.toFixed(2)}`;
    } else {
        freteDisplay.textContent = "R$ 0,00";
        totalComFreteDisplay.textContent = "R$ 0,00";
    }
}
