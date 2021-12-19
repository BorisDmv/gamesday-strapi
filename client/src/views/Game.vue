<template>
  <div class="about">
    <div v-if="this.game[0] !== undefined">
      <div class="container">
        <div class="content">
          <div class="library">   
            <button class="default-btn" @click="libaryClick(lastpage)">LIBRARY<img class="arrowIcon" src="../assets/next.png"></button>
          </div>
          <div class="titleCont">
            <div class="title-date">
            <p>{{ this.game[0].title }}</p>
            <p>{{ this.game[0].releaseDate }}</p>
            </div>
          </div>
          <div class="platformsCont">
            <div v-if="this.game[0].win == 1">
              <img class="platforms" src="../assets/windows-logo.svg">
            </div>
            <div v-if="this.game[0].xbox == 1">
              <img class="platforms" src="../assets/xbox.png">
            </div>
            <div v-if="this.game[0].ps == 1">
              <img class="platforms" src="../assets/playstation.png">
            </div>
            <div v-if="this.game[0].switch == 1">
              <img class="platforms" src="../assets/nintendo-switch.png">
            </div>
          </div>
        </div>
        <div class="overlay"></div>
        <img class="banner" :src="this.game[0].bannerImage">
        <div class="gradient-bg"></div>
      </div>


      <div class="container2">
        <div class="leftCont">
          <div class="platformText">
            <p style="color: #DF3F53">Platforms:</p>
            <p>{{ this.game[0].platforms }}</p>
          </div>

          <div class="platformText">
            <p style="color: #DF3F53">Developers:</p>
            <p>{{ this.game[0].developers }}</p>
          </div>

          <div class="platformText">
            <p style="color: #DF3F53">Genres:</p>
            <p>{{ this.game[0].genres }}</p>
          </div>


          <div class="platformText">
            <p style="color: #DF3F53">Description:</p>
            <p>{{ this.game[0].description }}</p>
          </div>
        </div>

        <div class="rightCont">
            <a style="text-decoration: none;" :href="this.game[0].trailer" target="_blank"><button class="default-btn">WATCH TRAILER</button></a>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="noGamePanel">
        <h1>No such game!</h1>
        <button class="default-btn" @click="libaryClick(lastpage)">LIBRARY<img class="arrowIcon" src="../assets/next.png"></button>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '@/services/auth-service'

export default {
  name: 'game',
  data () {
    return{
      game: [
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
        },
      ],
      lastpage: 1
    }
  },
  methods: {
    libaryClick:function(PageToRedirect){
      let makingPath = '/?Page='+PageToRedirect;
      this.$router.push({ path: makingPath });
    },
    async fetchGame(id) {
      const response = await authService.getGame(id)
      this.game = response.data

      if(typeof this.game[0].title !== "undefiend")
        console.log(this.game[0].title)
    },
    async tryGetLastPage(PageId){
      if(PageId != null){
        this.lastpage = PageId
      }
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
  background: rgba(255, 255, 255, 0) linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(255, 255, 255, .1) 40%, rgba(0, 0, 0, 0.5) 75%, rgb(0, 0, 0) 100%) repeat scroll 0 0;
  position: relative;
  margin-top: -200px;
  height: 200px;
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
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.leftCont{
  position: absolute;
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
  position: absolute;
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

  .leftCont{
    flex-direction: column;
    margin-top: 70px;
  }

  .platformText{
    width: auto;
    text-align: center;
  }

  .rightCont{
    justify-content: center;
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