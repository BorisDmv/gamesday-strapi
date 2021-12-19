import api from '@/services/api'

export default {
    pageCount(){
        return api().get('/page')
    },
    
    getGames(limit,offset) {
        return api().get(`games/${limit}/${offset}`)
    },

    getGame(id) {
        return api().get(`/games/${id}`)
    },


}