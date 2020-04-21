import { Constants } from "@common";


export default {
    unidades: (distance, lat, lng) => {
        const request = fetch(`http://${Constants.API_ADDR}/unidade/near?lat=${lat}&lng=${lng}&distance=${distance}`).then((value) => (value.json()));
        return request;
    },
    campanhas: () => {
        const request = fetch(`http://${Constants.API_ADDR}/campanha?json=true`).then((value) => (value.json()));

        return request;
    }
}

