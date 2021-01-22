import { Constants } from "@common";


export default {
    cep: (value) => {
        const request = fetch(`https://viacep.com.br/ws/${value}/json/`).then((value) => (value.json()));
        return request;
    },
    createPaciente: (value) => {
        const request = fetch(
            `${Constants.API_ADDR}/api/paciente`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }).then((value) => value.json());

        return request;
    },
    editPaciente: (value) => {
        const request = fetch(
            `${Constants.API_ADDR}/api/paciente`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }).then((value) => value.json());

        return request;
    },
    createSolicitacao: (id, value) => {
        const request = fetch(
            `${Constants.API_ADDR}/api/solicitacao/paciente/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }).then(async (value) => {
                if (value.ok) {
                    return value.json();
                }
                const message = await value.text();
                const erro = new Error(message);
                erro.name = value.status
                throw erro;
            });

        return request;
    },

    deleteSolicitacao: (id) => {
        const request = fetch(
            `${Constants.API_ADDR}/api/solicitacao/${id}`,
            {
                method: 'DELETE',
            }).then(async (value) => {
                if (value.ok) {
                    return value.json();
                }
                const message = await value.text();
                throw new Error(message);
            });

        return request;
    },
    getPaciente: (cns) => {
        const request = fetch(`${Constants.API_ADDR}/api/paciente/${cns}`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    },
    unidades: (distance, lat, lng) => {
        const request = fetch(`${Constants.API_ADDR}/api/unidade/near?lat=${lat}&lng=${lng}&distance=${distance}`).then((value) => (value.json()));
        return request;
    },
    campanhas: () => {
        const request = fetch(`${Constants.API_ADDR}/api/segmento`).then((value) => (value.json()));
        return request;
    },
    campanhasMes: (mes, excecao) => {
        const request = fetch(`${Constants.API_ADDR}/api/segmento?mes=${mes}&excecao=${excecao}`).then((value) => (value.json()));
        return request;
    },
    getCampanha: (id, mes = null) => {
        let request
        mes ?
            request = fetch(`${Constants.API_ADDR}/api/segmento/${id}?mes=${mes}`).then((value) => (value.json()))
            :
            request = fetch(`${Constants.API_ADDR}/api/segmento/${id}`).then((value) => (value.json()));
        return request;
    },

    getSolicitacoes: (cns) => {
        const request = fetch(`${Constants.API_ADDR}/api/solicitacao/paciente/${cns}`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    },

    createSolicitacoes: (value) => {
        return fetch(
            `${Constants.API_ADDR}/api/solicitacao`,
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

