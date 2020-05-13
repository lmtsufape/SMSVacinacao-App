import { Constants } from "@common";


export default {
    cep: (value) => {
        const request = fetch(`https://viacep.com.br/ws/${value}/json/`).then((value) => (value.json()));
        return request;
    },
    createPaciente: (value) => {
        const request = fetch(
            `${Constants.API_ADDR}/paciente?json=true`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }).then((value) => (value.json()));

        return request;
    },
    createSolicitacao: (id, value) => {
        const request = fetch(
            `${Constants.API_ADDR}/solicitacao/paciente/${id}?json=true`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }).then((value) => (value.json()));

        return request;
    },
    getPaciente: (cns) => {
        const request = fetch(`${Constants.API_ADDR}/paciente/${cns}?json=true`).then((value) => (value.json()));
        return request;
    },
    unidades: (distance, lat, lng) => {
        const request = fetch(`${Constants.API_ADDR}/unidade/near?lat=${lat}&lng=${lng}&distance=${distance}`).then((value) => (value.json()));
        return request;
    },
    campanhas: () => {
        const request = fetch(`${Constants.API_ADDR}/campanha?json=true`).then((value) => (value.json()));
        return request;
    },
    campanhasMes: (mes, excecao) => {
        const request = fetch(`${Constants.API_ADDR}/campanha?json=true&mes=${mes}&excecao=${excecao}`).then((value) => (value.json()));
        return request;
    },
    getCampanha: (id) => {
        const request = fetch(`${Constants.API_ADDR}/campanha/${id}?json=true`).then((value) => (value.json()));
        return request;
    },

    getSolicitacoes: (cns) => {
        const request = fetch(`${Constants.API_ADDR}/solicitacao/paciente/${cns}?json=true`).then((value) => (value.json()));
        return request;
    },

    createSolicitacoes: (value) => {
        return fetch(
            `${Constants.API_ADDR}/solicitacao/`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }).then((value) => (value.json()));
    }

}

