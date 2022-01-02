import api from '@/services/api'

export default {
    pageCount(){
        return api().get('/page')
    },
    
    getGames(pageNum) {
        return api().get(`api/gamesdays?pagination[page]=${pageNum}&populate=thumbImage`)
    },

    getGame(id) {
        return api().get(`api/gamesdays/${id}/?populate=bannerImage,gameImages`)
    },

    // getGame(slug) {
    //     return api().get(`api/gamesdays/${slug}/?populate=bannerImage,gameImages`)
    // },

    // getGame(slug) {
    //     try {
    //      api().get("api/gamesdays", {
    //         params: {
    //           filters: {
    //             slug: {
    //               $eq: slug,
    //             },
    //           },
    //         }
    //       });
    //     } catch (e) {
    //       console.log(e);
    //     }
    // }


}