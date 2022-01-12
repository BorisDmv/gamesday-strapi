import api from '@/services/api'

export default {
    pageCount(){
        return api().get('/page')
    },
    
    getGames(pageNum) {
        return api().get(`/api/gamesdays?pagination[page]=${pageNum}&populate=thumbImage`)
    },

    getGame2(slug) {
        return api().get(`/api/gamesdays/${slug}`)
    },

    getGame(slug) {
        return api().get("/api/gamesdays", {
            params: {
              filters: {
                slug: {
                  $eq: slug,
                },
              },
              populate: 'bannerImage,gameImages'
            }
          });
    }


}