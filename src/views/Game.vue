<template>
  <div class="about">
      
      <div class="container">
        <div class="content">
          <div class="library">   
            <button class="default-btn" @click="libaryClick(lastpage)">LIBRARY<img class="arrowIcon" src="../assets/next.png"></button>
          </div>
          <div class="titleCont">
            <div class="title-date">
            <p>{{ this.game.title }}</p>
            <p>{{ this.game.releaseDate }}</p>
            </div>
          </div>
          <div class="platformsCont">
            <div v-if="this.game.win == 1">
              <img class="platforms" src="../assets/windows-logo.svg">
            </div>
            <div v-if="this.game.xbox == 1">
              <img class="platforms" src="../assets/xbox.png">
            </div>
            <div v-if="this.game.ps == 1">
              <img class="platforms" src="../assets/playstation.png">
            </div>
            <div v-if="this.game.switch == 1">
              <img class="platforms" src="../assets/nintendo-switch.png">
            </div>
          </div>
        </div>
        <div class="overlay"></div>
        <img class="banner" :src="`${baseUrl + this.game.bannerImage}`">
        <div class="gradient-bg"></div>
      </div>


      <div class="container2">
        <div class="leftCont">
          <div class="platformText">
            <p style="color: #DF3F53">Platforms:</p>
            <p>{{ this.game.platforms }}</p>
          </div>

          <div class="platformText">
            <p style="color: #DF3F53">Developers:</p>
            <p>{{ this.game.developers }}</p>
          </div>

          <div class="platformText">
            <p style="color: #DF3F53">Genres:</p>
            <p>{{ this.game.genres }}</p>
          </div>


          <div class="platformText">
            <p style="color: #DF3F53">Description:</p>
            <p>{{ this.game.description }}</p>
          </div>
        </div>

        <div class="rightCont">
            <a style="text-decoration: none;" :href="this.game.trailer" target="_blank"><button class="default-btn">WATCH TRAILER</button></a>
        </div>
      </div>

      <!-- Gallery -->
      <div class="galleryCont">
        <div
          v-for="(src, id) in this.game.gameImages"
          :key="id"
          class="pic"
          @click="() => showImg(id)"
        >
          <img :src="`${baseUrl + src.attributes.url}`">
        </div>
      </div>

      
      <vue-easy-lightbox
      :visible="visible"
      :imgs="`${baseUrl + this.game.gameImages[index].attributes.url}`"
      :index="index"
      :moveDisabled=true
      @hide="handleHide"
      ></vue-easy-lightbox>


  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
import authService from '@/services/auth-service'

export default {
  name: 'game',
  components: {
    VueEasyLightbox
  },
  data () {
    return{
      baseUrl: process.env.VUE_APP_BASE_URL,
      game:
        {
          id: '',
          bannerImage: '',
          title: '...',
          releaseDate: '...',
          platforms: '...',
          genres: '...',
          developers: '...',
          description: '...',
          trailer: '...',
          gameImages: []
        },
      lastpage: 1,
      //Gallery
      index: 0,
      visible: false
    }
  },
  methods: {
    libaryClick:function(PageToRedirect){
      let makingPath = '/?Page='+PageToRedirect;
      this.$router.push({ path: makingPath });
    },
    async fetchGame(id) {
      const response = await authService.getGame(id)
      //console.log(response.data.data[0].attributes.title)
      let respp = response
      respp = respp.data.data[0].attributes
      //console.log(response.data.data.attributes.title)
      this.game = respp
      this.game.bannerImage = respp.bannerImage.data.attributes.url
      this.game.gameImages = respp.gameImages.data
      console.log(this.game.title)
    },
    async tryGetLastPage(PageId){
      if(PageId != null){
        this.lastpage = PageId
      }
    },
    //Gallery
    showImg (index) {
      this.index = index
      this.visible = true
    },
    handleHide () {
      this.visible = false
    }
  },
  mounted() {
    this.tryGetLastPage(this.$route.params.lastpage);
    this.fetchGame(this.$route.params.id);
  }
}
</script>


<style scoped lang="scss">

.about{
  overflow-x: hidden;
}

.gradient-bg{
  //background: rgba(255, 255, 255, 0) linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(255, 255, 255, .1) 40%, rgba(0, 0, 0, 0.5) 75%, rgb(0, 0, 0) 100%) repeat scroll 0 0;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}

.overlay{
  background: red;

}

.container{
  position: relative;
  width: 100%;
  height: 100%;
}

.content{
  display: flex;
  justify-content: center;
}

.titleCont{
  position: absolute;
  bottom: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: left;
  z-index: 1;
  width: 85%;
}

.title-date{
  display: flex;
  flex-direction: column;
}

.platformsCont{
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  z-index: 1;
  width: 85%;
}

.platforms{
  width: 1.5rem;
}

.banner{
  width: 100%;
}

.library{
  margin-top: 30px;
  width: 85%;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
}

.default-btn{
  background: #DF3F53;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  color: white;
  border-radius: 10px;
  width: 166px;
  height: 45px;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover{
    transform: scale(0.98);
  }
}

.arrowIcon{
  width: 20px;
}

.container2{
  width: 85%;
  margin: 50px auto 50px auto;
  display: flex;
  justify-content: center;
}

.leftCont{
  display: flex;
  flex-direction: column;
  width: 85%;
}

.platformText{
  width: 600px;
  text-align: left;
  margin-bottom: 10px;
}

.rightCont{
  display: flex;
  justify-content: flex-end;
  width: 85%;
}

.noGamePanel{  
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-direction: column;
}

.galleryCont{
  display: flex;
  flex-wrap: wrap;
  margin: 50px auto;
  width: 85%;
  gap: 10px;


  img{
    cursor: pointer;
    height: 200px;
  }
}

@media only screen and (max-width: 1000px) {

  .banner {
    width: auto;
    height: 400px;
    object-position: -300px 0;
  }

  .library{
    justify-content: center;
  }

  .titleCont{
    flex-direction: column;
    margin-bottom: 50px;
  }

  .title-date{
    text-align:center;
  }
  
  .platformsCont{
    justify-content: center;
  }

  .platformText{
    width: auto;
    text-align: center;
  }

  .container2{
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .rightCont{
    justify-content: center;
  }

  .galleryCont{
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .pic{
      width: 60%;
    }

    img{
      width: 100%;
      height: 100%;
    }
  }
}

@media only screen and (max-width: 900px) {
  .banner {
    object-position: -340px 0;
  }
}

@media only screen and (max-width: 800px) {
  .banner {
    object-position: -380px 0;
  }
}

@media only screen and (max-width: 700px) {
  .banner {
    object-position: -420px 0;
  }
}

@media only screen and (max-width: 600px) {
  .banner {
    object-position: -480px 0;
  }
}

@media only screen and (max-width: 500px) {
  .banner {
    object-position: -540px 0;
  }
}

@media only screen and (max-width: 400px) {
  .banner {
    object-position: -580px 0;
  }
}


</style>