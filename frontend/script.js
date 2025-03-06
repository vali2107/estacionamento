// forms de login, que puxa a rota que verifica se existe e se a senha está certa
if (document.getElementById("loginForm")) {
    formLogin = document.getElementById("loginForm")
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
    
        const data = {nome, senha}
    
        const response = await fetch('http://localhost:3006/usuarios/login', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
    
        let results = await response.json();
    
        if(results.success) {
            let userData = results.data;
            console.log(userData)
            
            alert(results.message)
            window.location.href = './index.html';
        } else {
            alert(results.message)
        }
    });
}

// puxa rota do hello world
async function carregar() {
    const response = await fetch('http://localhost:3006/');
}
carregar()

// pega os valores do forms e puxa a rota de add no banco
if (document.getElementById("addForm")) {
    const addForm = document.getElementById("addForm")

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dono = document.getElementById("dono").value
        const marca = document.getElementById("marca").value
        const modelo = document.getElementById("modelo").value
        const placa = document.getElementById("placa").value
        const entrada = document.getElementById("horario").value

        const data = {dono, marca, modelo, placa, entrada}

        const response = await fetch('http://localhost:3006/adicionar', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })

        const results = await response.json();

        if(results.success) {        
            alert(results.message)
            listarCarros()

        } else {
            alert(results.message)
        }
        listarCarros()

    }) 
}

// puxa a rota que pega todos os carros e cria linhas no html com as infos
async function listarCarros() {
    const response = await fetch('http://localhost:3006/carros', {
        method: 'GET',
        headers: {
            "Content-Type":"application/json"
        }
    })

    const results = await response.json();

    const div = document.getElementById('listaCarros')
    div.innerHTML = ''
    results.carros.forEach(carro => {
        const card = document.createElement('div')
        card.innerHTML = `
            <p class="dono">${carro.dono}</p>
            <p class="marca">${carro.marca}</p>
            <p class="modelo">${carro.modelo}</p>
            <p class="placa">${carro.placa}</p>
            <p class="entrada">${carro.entrada}</p>
            <div class="acoes">
              <button class="edit-btn" onclick='editar(${carro.id})'>Editar</button>
              <button class="delete-btn" onclick='deletar(${carro.id})'>Excluir</button>
              <button class="saida-btn" onclick='saiu(${carro.id})'>Saída</button>
            </div>
        `
        div.appendChild(card)
    })
}

// pega as informações da edição e puxa a rota que vai editar no banco
async function editar(id) {
    const dono = prompt("Novo dono: ")
    const marca = prompt("Nova marca: ")
    const modelo = prompt("Novo modelo: ")
    const placa = prompt("Nova placa: ")
    const entrada = prompt("Novo horário de entrada: ")

    const data = {dono, marca, modelo, placa, entrada}

    await fetch(`http://localhost:3006/carros/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    listarCarros()
}

// pega o horário de saída e puxa a rota que edita o banco
async function saiu(id) {
    const saida = prompt("Horário de saída: ")

    const data = {saida}

    await fetch(`http://localhost:3006/carros/saida/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    listarCarros()
}

// puxa a rota de deletar do banco
async function deletar(id) {
    await fetch(`http://localhost:3006/carros/${id}`, {
        method: 'DELETE'
    })

    listarCarros()
}

listarCarros()