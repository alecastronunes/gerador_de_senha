//Verificando se os checkboxs estão clicados
function getCharTypes() {
    const uppercase = document.querySelector('#include-uppercase').checked
    const lowercase = document.querySelector('#include-lowercase').checked
    const number = document.querySelector('#include-number').checked
    const specialCharacter = document.querySelector('#include-especial-character').checked

    const charTypes = []

    if(uppercase == true) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }

    if(lowercase == true) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz')
    }

    if(number == true) {
        charTypes.push('0123456789')
    }

    if(specialCharacter == true) {
        charTypes.push('!@#$%&*')
    }


    return charTypes
}

//Pega a quantidade de caracteres e faz a validação
function getPasswordSize() {
    const size = document.querySelector('#size').value
    if(isNaN(size) || size < 4 || size > 128) {
       message('Tamanho inválido, digite um número entre 4 e 128', 'warning')
    }
    return size
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length)

    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)]
}

function generatePassword(size, charTypes) {
    let passwordGenerated = ''

    while (passwordGenerated.length < size) {
        passwordGenerated += randomCharType(charTypes)
    }

    return passwordGenerated
}

function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
          }
    }).showToast()
}

document.querySelector('#generate').addEventListener('click', function() {
    const size = getPasswordSize()
    const charTypes = getCharTypes()
    

    if(!size) {
        return 
    }

    if(!charTypes.length) {
        message('Selecione pelo menos um tipo de caractere!!!', 'warning')
        return 
    }

    const passwordGenerated = generatePassword(size, charTypes)

    //document.querySelector('#password_container').classList.add('show')
    document.querySelector('#password').textContent = passwordGenerated
})

//Função responsável por copiar a senha gerada.
document.querySelector('#copy').addEventListener('click', function() {
    navigator.clipboard.writeText(document.querySelector('#password').textContent)
    message('Senha copiada com sucesso!!!', 'success')
})