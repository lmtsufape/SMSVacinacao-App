



export default (value) => {
    return isValidate(value);
}

const isValidate = (value) => {
    if (value.match(/[1-2]\d{10}(00)[0-1]\d/) || value.match(/[7-9]\d{14}/)) {
        return somaPonderada(value) % 11 === 0;
    }
    return false;
}

const somaPonderada = (value) => {
    value_char = value.split('');
    value_char_lenght = value_char.length;
    soma = 0;
    for (i = 0; i < value_char_lenght; i++) {
        soma += parseInt(value_char[i], 10) * (15 - i);
    }
    return soma;
}

