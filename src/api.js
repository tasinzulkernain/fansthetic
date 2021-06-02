import { setup } from 'axios-cache-adapter'

const api = setup({
    baseURL: "https://fansthetic.com/api/v1/",
    timeout: 10000,
    auth: {
        username: 'takamura',
        password: 'ninetail'
    },

    // `axios-cache-adapter` options
    cache: {
        maxAge: 15 * 60 * 1000,
        exclude: { query: false }
    },
})

export default api;