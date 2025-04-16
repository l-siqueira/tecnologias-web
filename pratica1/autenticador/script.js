// Dados simulados para login
const usuarioPadrao = {
    username: "admin",
    password: "1234"
  };
  
  // Array para armazenar itens
  let itens = [];
  
  // Troca de seções
  function mostrarSecao(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }
  
  // Navegação
  document.getElementById("link-login").addEventListener("click", () => mostrarSecao("login-section"));
  document.getElementById("link-cadastro").addEventListener("click", () => mostrarSecao("cadastro-section"));
  document.getElementById("link-listagem").addEventListener("click", () => {
    atualizarLista();
    mostrarSecao("listagem-section");
  });
  
  // Login
  document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    if (username === usuarioPadrao.username && password === usuarioPadrao.password) {
      mostrarSecao("cadastro-section");
      document.getElementById("login-error").textContent = "";
    } else {
      document.getElementById("login-error").textContent = "Usuário ou senha inválidos.";
    }
  });
  
  // Cadastro de itens
  document.getElementById("cadastro-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const nome = document.getElementById("item-nome").value.trim();
    const descricao = document.getElementById("item-descricao").value.trim();
  
    if (nome === "" || descricao === "") {
      alert("Todos os campos são obrigatórios!");
      return;
    }
  
    itens.push({ nome, descricao });
    document.getElementById("cadastro-form").reset();
    atualizarLista();
  });
  
  // Atualiza a lista de itens
  function atualizarLista() {
    const lista = document.getElementById("item-lista");
    lista.innerHTML = "";
  
    itens.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - ${item.descricao}`;
  
      const btn = document.createElement("button");
      btn.textContent = "Remover";
      btn.onclick = () => {
        itens.splice(index, 1);
        atualizarLista();
      };
  
      li.appendChild(btn);
      lista.appendChild(li);
    });
  }
  