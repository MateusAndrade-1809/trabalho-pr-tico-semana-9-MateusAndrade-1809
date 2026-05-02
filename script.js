const data = {
  produtos: [
    {
      id: 1,
      nome: "Celular Galaxy A15",
      preco: 1999.9,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      descricao: "Celular para o dia a dia, com boa bateria, 128 GB e camera dupla.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Notebook Lenovo Ideapad",
      preco: 4599.99,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      descricao: "Notebook bom para estudar, programar e fazer trabalhos da faculdade.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Fone Gamer com Microfone",
      preco: 249.9,
      categoria: "Acessorios",
      imagem: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80",
      descricao: "Fone com microfone para jogar, conversar online e assistir aulas.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Console PlayStation 5",
      preco: 3799.0,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80",
      descricao: "Console para jogos atuais, com controle sem fio e boa qualidade de imagem.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Mouse Logitech sem Fio",
      preco: 159.9,
      categoria: "Acessorios",
      imagem: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
      descricao: "Mouse simples e confortavel para usar no notebook ou no computador.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Notebook Dell Inspiron",
      preco: 5299.9,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      descricao: "Notebook para estudo e tarefas do dia a dia, com SSD e tela de 15 polegadas.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Controle Xbox Wireless",
      preco: 299.0,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80",
      descricao: "Controle sem fio para jogar no console ou no PC.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "Celular Motorola G54",
      preco: 1299.5,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      descricao: "Celular intermediario com leitor digital, bom armazenamento e carregamento rapido.",
      emEstoque: false
    }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function createProductCard(produto) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);
  card.style.borderWidth = "2px";

  const image = document.createElement("img");
  image.setAttribute("src", produto.imagem);
  image.setAttribute("alt", `Imagem do produto ${produto.nome}`);

  const content = document.createElement("div");
  content.classList.add("card-content");

  const title = document.createElement("h2");
  title.classList.add("card-title");
  title.textContent = produto.nome;

  const category = document.createElement("p");
  category.classList.add("card-category");
  category.textContent = produto.categoria;

  const price = document.createElement("p");
  price.classList.add("card-price");
  price.textContent = formatPrice(produto.preco);

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const detailsButton = document.createElement("button");
  detailsButton.classList.add("btn-details");
  detailsButton.setAttribute("type", "button");
  detailsButton.textContent = "Ver detalhes";
  detailsButton.addEventListener("click", () => {
    showProductDetails(produto);
  });

  const highlightButton = document.createElement("button");
  highlightButton.classList.add("btn-highlight");
  highlightButton.setAttribute("type", "button");
  highlightButton.textContent = "Destacar";
  highlightButton.addEventListener("click", () => {
    if (card.classList.contains("highlight")) {
      card.classList.remove("highlight");
    } else {
      card.classList.add("highlight");
    }
  });

  actions.appendChild(detailsButton);
  actions.appendChild(highlightButton);
  content.appendChild(title);
  content.appendChild(category);
  content.appendChild(price);
  content.appendChild(actions);
  card.appendChild(image);
  card.appendChild(content);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  if (produtos.length === 0) {
    productList.innerHTML = '<p class="empty-message">Nenhum produto encontrado.</p>';
    return;
  }

  produtos.forEach((produto) => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    // Conferencia pedida na atividade usando querySelectorAll.
    console.log("Card renderizado - data-id:", card.getAttribute("data-id"));
    card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
  });
}

function renderCategories() {
  const categorias = data.produtos.map((produto) => produto.categoria);
  const categoriasUnicas = ["Todas", ...new Set(categorias)];

  categorySelect.innerHTML = "";

  categoriasUnicas.forEach((categoria) => {
    const option = document.createElement("option");
    option.setAttribute("value", categoria);
    option.textContent = categoria;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  const statusClasse = produto.emEstoque ? "available" : "unavailable";
  const statusTexto = produto.emEstoque ? "Em estoque" : "Indisponivel";

  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preco:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status:</strong> <span class="stock ${statusClasse}">${statusTexto}</span></p>
    <p><strong>Descricao:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;

  return data.produtos.filter((produto) => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "Todas" || produto.categoria === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);
