<template>
  <div class="library">

    <form class="searchPanel" @submit.prevent="searchGame">
      <input class="searchInput" v-model="gameTitle" placeholder="Type Game Title">
      <img class="searchIcon" src="../assets/icons8-search.svg" @click="searchGame()">
    </form>

    <div class="wrapper">
      <div class="games"  v-for="game in games" :key="game.id">
        <img @click="$router.push({name: 'game', params: {id: game.title, lastpage: nowPage}})" class="thumbnail" :src="game.thumbnailImage">
      </div>
    </div>

    <div id="app" class="container">  
      <ul class="page">
          <!-- <li class="page__btn"><span class="material-icons"><img style="transform: rotateY(-180deg);" class="arrowIcon" src="../assets/next.png"></span></li> -->
          
          <div v-for="item in itemsCount" :key="item">
              <li v-bind:id="item" class="page__numbers" @click="pageClick(item)">
                {{item}}
              </li>  
          </div>
          
          <!-- <li class="page__btn"><span class="material-icons"><img class="arrowIcon" src="../assets/next.png"></span></li> -->
        </ul>
      </div>

  </div>
</template>

<script>
import authService from '@/services/auth-service'

export default {
  name: "Library",
  data () {
    return{
      gameTitle: '',
      games: [
        {
          id: '',
          image: '',
          title: '...',
          releaseDate: '...',
          platforms: '...',
          genres: '...',
          developers: '...',
          description: '...',
        }
      ],
      itemsCount: 0, // DO not TOUCH !!!!!
      nowPage: 1, // currnet page view
      lastPageId: 1,
      ElementCount: null,
      divideNumber: 20 //this is number for divide page count elements
    }
  },
  methods: {
    async dds () {
      //this.router.push({ name: 'user', params: { userId: '123' } })
      // /this.router.push({ path: 'register', query: { plan: 'private' } })
      const response = await authService.getGames()
      this.games = response.data
      
    },
    async getUrlPageCount(){
        let parameters = this.$route.query
        console.log(parameters)
    },

    async GetContenet(pageNow){
      let Coutnt = this.divideNumber // on page view 20 
      // let pageNow = this.nowPage // = 1 
      let Offset  = (pageNow - 1) * Coutnt
      let res = await authService.getGames(Coutnt,Offset)
      this.games = res.data
      this.lastPageId = pageNow
      
    },

    async pageCalculator(){
      console.log("asd")
      let parameters = this.$route.query
      if(Object.keys(parameters).length === 0){
        this.$router.push({path:'/', query:{Page: 1}})
        this.nowPage = 1
      }
      await this.getPageElementsCount()

      if(parameters.Page > this.itemsCount){
        this.nowPage = 1
        this.$router.push({path:'/', query:{Page: 1}})
      } else {
        this.nowPage = parameters.Page
      }
      if(this.nowPage == null){
        this.nowPage = 1
      }

      console.log(this.nowPage)
      console.log(this.lastPageId)
      await this.changeStyle(this.nowPage, this.lastPageId)
      await this.GetContenet(this.nowPage)      
    },
    
    async changeStyle(nowPage,lastPage){
      let removeClass = document.getElementById(lastPage)
      removeClass.classList.remove('active');

      let AddClass = document.getElementById(nowPage)
      AddClass.classList.add('active');
    },

    async getPageElementsCount(){ //done math for get and set pagination
      const response = await authService.pageCount()
      let element = response.data[0].totalElements
      let count  = element / this.divideNumber
      let spliter = count.toString()
      spliter = spliter.split('.')
      let page = parseInt(spliter[0])

      if(spliter[1] != null){
       page =  page + 1
      }
      this.itemsCount = page
    },
    async pageClick(pageId){
      if(this.nowPage != pageId){
        this.$router.push({path:'/', query:{Page: pageId}})
        this.lastPageId = this.nowPage
        this.nowPage = pageId
        await this.pageCalculator(this.nowPage)
        // /this.router.push('/?Page='+pageId)
      }
    },
    searchGame(){
      if(this.gameTitle != ''){
        this.$router.push(this.gameTitle)
      }
    }
    
  },
  mounted() {
    //this.$router.push({path:'/', query:{Page: 1}})
    // this.getUrlPageCount()
    //this.fetchGames()
    this.pageCalculator()
  }
};
</script>

<style scoped lang="scss">

.searchPanel{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0 10px 0;
}

.searchInput{
  background: #0d1216;
  padding: 12px;
  border-radius: 10px;
  color: white;
  border: 0;

  &:focus{
    outline: var(--primary) 1.5px solid;
  }
}

.searchIcon{
  margin-left: 10px;
  width: 20px;
  cursor: pointer;

  &:active{
    transform: scale(0.96);
  }
}

.arrowIcon{
  width: 20px;
}


.title{
  margin-bottom: 30px;
}

.wrapper{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 20px;
  width: 85%;
  margin: auto;
}

.games{
  padding: 20px;
}


.thumbnail{
  width: 220px;
  border-radius: 10px;
  // border: 1px solid #707070;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover{
    transform: translateY(-6px);
  }
}

@media only screen and (max-width: 700px) {
  .title{
    font-size: 1.6rem;
  }

  .wrapper{
    width: 100%;
  }

  .games{
    flex-basis: 25%;

    img{
      width: 150px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .games{
    flex-basis: 35%;

    img{
      width: 120px;
    }
  }
}


// PAGINATION
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--greyDark);
}

ul {
  list-style-type: none;
}

.items-list {
  max-width: 90vw;
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 3rem;
  justify-content: center;
  align-content: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.item {
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--greyDark);
  cursor: pointer;

  span {
    background: #ffffff;
    box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);
    border-radius: 0.6rem;
    padding: 2rem;
    font-size: 3rem;
    transition: all 0.3s ease;
  }

  &:hover {
    span {
      transform: scale(1.2);
      color: var(--primary);
    }
  }

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
    color: var(--greyLight);
  }
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin: 3rem;
  padding: 0;
  border-radius: 0.6rem;
  background: #0d1216;
  box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);

  &__numbers,
  &__btn,
  &__dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.8rem;
    font-size: 1.4rem;
    cursor: pointer;
  }

  &__dots {
    width: 2.6rem;
    height: 2.6rem;
    color: var(--greyLight);
    cursor: initial;
  }

  &__numbers {
    width: 2rem;
    height: 2rem;
    border-radius: 0.4rem;

    &:hover {
      color: var(--primary);
    }

    &.active {
      color: #ffffff;
      background: var(--primary);
      border: 1px solid var(--primary);
    }
  }

  &__btn {
    color: var(--greyLight);
    pointer-events: none;

    &.active {
      color: var(--greyDark);
      pointer-events: initial;

      &:hover {
        color: var(--primary);
      }
    }
  }
}

</style>