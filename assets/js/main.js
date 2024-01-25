function criptografa(frase){
    //Ajusta texto antes de descriptografar
    frase = ajustaTexto(frase);
    const mapaCriptografia = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    frase = frase.split("").map(letra => mapaCriptografia[letra] || letra).join("")

    let paragrafo = document.createElement("p");
        paragrafo.innerText = frase;

        mensagemModificada.innerHTML = '';
        mensagemModificada.appendChild(paragrafo);

    let btn_copiar = document.createElement("button");
        btn_copiar.innerText = "Copiar";
        btn_copiar.setAttribute("class", "btn btn_Descriptografar")    
        btn_copiar.setAttribute("onclick", "copiarParaClipboard()")    

        mensagemModificada.appendChild(btn_copiar);
        
}

function desCriptografa(fraseCripto){
    //Ajusta texto antes de descriptografar
    fraseCripto = ajustaTexto(fraseCripto);
    const mapaDescriptografia = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    fraseCripto = fraseCripto.replace(/enter|imes|ai|ober|ufat/g, matched => mapaDescriptografia[matched])

    let paragrafo = document.createElement("p");
        paragrafo.innerText = fraseCripto;

        mensagemModificada.innerHTML = '';
        mensagemModificada.appendChild(paragrafo);

    let btn_copiar = document.createElement("button");
        btn_copiar.innerText = "Copiar";
        btn_copiar.setAttribute("class", "btn btn_Descriptografar")    
        btn_copiar.setAttribute("onclick", "copiarParaClipboard()")    

        mensagemModificada.appendChild(btn_copiar);
}

function ajustaTexto(texto) {
    // Primeiro, converte o texto para letras minúsculas
    let textoAjustado = texto.toLowerCase();
    // Em seguida, remove acentos
    textoAjustado = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if( texto != textoAjustado ){
        //avisa sobre a alteração no texto
        textarea.value = textoAjustado;
        mostrarAlerta("Parece que você inseriu caracteres não permitidos, sua mensagem foi alterada para ser aceita no padrão!");
    }
    
    return textoAjustado;
}

let mensagemModificada = document.getElementById('mensagemModificada')

let btn_Descriptografar = document.getElementById('btn_Descriptografar')
    btn_Descriptografar.addEventListener('click', function() {
        desCriptografa(textarea.value);
    });
let btn_Criptografar = document.getElementById('btn_Criptografar')
    btn_Criptografar.addEventListener('click', function() {
        criptografa(textarea.value);
    });

//ajusta data
let anoFooter = document.getElementById('anoAtual')
    anoFooter.textContent = '© ' + new Date().getFullYear();

//Eventos textarea
let textarea = document.getElementById('txt_mensagem');

    // Adiciona o evento 'input' para capturar digitação e outras formas de entrada
    textarea.addEventListener('input', function(event) {
        switchOp.checked ?
            criptografa(event.target.value) : 
            desCriptografa(event.target.value);
    });
    
    // Adiciona o evento 'paste' para capturar o conteúdo colado
    textarea.addEventListener('paste', function(event) {
        switchOp.checked ?
            criptografa(event.target.value) : 
            desCriptografa(event.target.value);
    });

let switchOp = document.getElementById('switchOp')
    switchOp.addEventListener('change', function() {
        alteraCores()
    });


function mostrarAlerta(mensagem) {
    document.getElementById("alertaMensagem").textContent = mensagem;
    document.getElementById("alertaPersonalizado").style.display = "block";
}

function fecharAlerta() {
    document.getElementById("alertaPersonalizado").style.display = "none";
}

function copiarParaClipboard() {
    let texto = document.querySelector("#mensagemModificada > p");
        texto = texto.innerText;

    navigator.clipboard.writeText(texto).then(() => {
        mostrarAlerta("Texto copiado com sucesso!");
    }).catch(err => {
        mostrarAlerta("Falha ao copiar texto!");
    });
}

function alteraCores(){
    let textoModo = document.querySelector("body > header > div > b")

    if(switchOp.checked){ //normal Cript
        textoModo.innerText = "Criptografar";

        document.documentElement.style.setProperty('--cor-fundo', '#00000017');
        document.documentElement.style.setProperty('--cor-primaria', '#1d0a71');
        document.documentElement.style.setProperty('--cor-secundaria', '#D8DFE8');
        document.documentElement.style.setProperty('--cor-terciaria', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--cor-trans', '#f0f8ff00');

        document.querySelector("#mensagemModificada > div > img").style.setProperty('filter', 'hue-rotate(45deg)');
    }else{
        textoModo.innerText = "Descriptografar";

        document.documentElement.style.setProperty('--cor-fundo', '#000000eb');
        document.documentElement.style.setProperty('--cor-primaria', '#307c26');
        document.documentElement.style.setProperty('--cor-secundaria', '#ffffff');
        document.documentElement.style.setProperty('--cor-terciaria', 'rgb(255 255 255)');
        document.documentElement.style.setProperty('--cor-trans', '#3a6e9c00');

        document.querySelector("#mensagemModificada > div > img").style.setProperty('filter', 'hue-rotate(284deg)');
    }
}