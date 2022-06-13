//Router components

//view til forsiden
const Home = {
  name: "Home",
  props: ["products", "loading"],
  methods: {},
  template: `
      <carousel :products="products" :loading="loading"/>
  `,
};

//view til likes
const Liked = {
  name: "Liked",
  props: ["products", "loading"],
  computed: {
    filteredProducts() {
      console.log(this.products.filter((product) => product.liked));
      return this.products.filter((product) => product.liked);
    },
  },
  methods: {},
  template: `
    <div>
      <p v-if="filteredProducts.length<1" class="pt-5 ps-5">Du har ikke "liket" nogen produkter...</p>
      <Cardgroup v-else :products="filteredProducts"/>
    </div>
  `,
};

//view til produktvisning (præsentationsside, videoside, søgningsside osv., burde måske deles op...)
const Product = {
  name: "Product",
  props: ["products", "loading"],
  computed: {
    video() {
      return this.$route.fullPath == `/products/${this.$route.params.id}/video`;
    },
    videosrc() {
      return `https://www.youtube.com/embed/${
        this.products[this.$route.params.id].video
      }?autoplay=1`;
    },
    articlesrc() {
      return `${this.products[this.$route.params.id].article}`;
    },

    //tjekker om produktet i søgningen findes i produktlisten (slice sørger for, at også søgninger på f.eks. "pod" stadig viser podcasts)
    filteredProducts() {
      if (this.$route.params.id)
        return this.products.filter((product) =>
          product.keywords.some(
            (keyword) =>
              keyword.slice(0, this.$route.params.id.length).toLowerCase() ==
              this.$route.params.id.toLowerCase()
          )
        );
    },
    css() {
      return {
        textAlign: "left",
        color: "white",
        background:
          "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.9),rgba(0,0,0,0.8),rgba(0,0,0,0.5),rgba(0,0,0,0.3)),url(" +
          this.products[this.$route.params.id].img1 +
          "), no-repeat",
        backgroundSize: "cover",
        fontSize: "16px",
        minHeight: "60rem",
      };
    },
  },

  data() {
    return {};
  },
  methods: {
    log(item) {
      console.log(item);
    },
  },
  created() {
    // this.$watch(
    //   () => this.$route.params,
    //   (toParams, previousParams) => {
    //     if (this.products[toParams.id]) {
    //       this.css.backgroundImage =
    //         "linear-gradient(0.25turn, rgba(0,0,0,0.8), rgba(0,0,0,0.6),rgba(0,0,0,0.3), rgba(0,0,0,0.0)),url(" +
    //         this.products[toParams.id].img1 +
    //         ")";
    //     }
    //   }
    // );
  },

  template: `
  <div :products="products" :loading="loading" class="p-3 mb-3">
  <div class="row align-items-center">
    <template v-if="$route.params.type"> 
          <p>Søgning på {{$route.params.id}}...</p>
          <Cardgroup v-if="filteredProducts.length>0" :products="filteredProducts"/>
          <h5 v-else>ingen resultater</h5>
    </template>
    <div
      v-else-if="video"
      class="col mt-5 p-5 rounded-custom align-items-center"
      :style="css"
    >
      <h1>{{ products[$route.params.id].title }}</h1>
      <div class="iframediv ratio ratio-16x9 rounded-custom">
        <iframe
          class="rounded-custom"
          :src="videosrc"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
    <div
      v-else-if="!video"
      class="col pt-3 product p-5 rounded-custom"
      :style="css"
    >
      <div class="col-lg-7 producttext rounded-custom">
        <h1>{{ products[$route.params.id].title }}</h1>
        <p>{{ products[$route.params.id].text }}</p>
        <router-link :to="{ name: 'ProductVideo',params:{id:$route.params.id}}">
          <button
            v-if="products[$route.params.id].video"
            type="button"
            class="btn btn-custom-product rounded-custom me-4 mt-5"
          >
            <i class="bi bi-play-circle"></i>&nbsp AFSPIL VIDEO
          </button>
        </router-link>
        <a
          v-if="products[$route.params.id].article"
          :href="articlesrc"
          target="_blank"
          class="btn btn-custom-product rounded-custom me-4 mt-5"
          download
          ><i class="bi bi-file-earmark-pdf"></i>&nbsp Hent artikel</a
        >
      </div>
      <div class="col-lg-5"></div>
    </div>
  </div>
</div>`,
};

//Routes
const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  { name: "Product", path: "/products/:id", component: Product },
  { name: "ProductVideo", path: "/products/:id/video", component: Product },
  {
    name: "Liked",
    path: "/liked",
    component: Liked,
  },

  // { path: "*", component: Home },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

// Components

//Logo + søgefelt
const Navigation = {
  name: "Navigation",
  props: {
    products: Array,
  },
  data() {
    return {
      imgcss: {
        width: "12rem",
        "text-align": "left",
        // "padding-bottom": "1rem",
      },
      titlecss: {
        color: "white",
        "text-transform": "none",
        // "margin-bottom": "0.7rem",
        "font-size": "2rem",
        // "padding-bottom": "0rem",
        // "margin-bottom": "0rem",
      },
      searchQuery: null,
      // keywords: [],
      filteredKeywords: [],
    };
  },
  computed: {
    filteredList() {
      if (this.searchQuery)
        return this.products.filter((product) =>
          product.keywords.some(
            (keyword) =>
              keyword.slice(0, this.searchQuery.length).toLowerCase() ==
              this.searchQuery.toLowerCase()
          )
        );
    },

    //lav liste af unikke keywords til brug under dynamisk søgning
    keywordList() {
      keywords = [];
      this.products.map((product) =>
        product.keywords.map((keyword) => {
          if (!keywords.includes(keyword)) {
            keywords.push(keyword);
          }
        })
      );
      return keywords;
    },

    //filtrer keyword listen efter søgefeltet
    keywordSearchFilter() {
      let keywords = this.keywordList.filter(
        (keyword) =>
          keyword.slice(0, this.searchQuery.length) ==
          this.searchQuery.slice(0, this.searchQuery.length)
      );
      return keywords;
    },
  },
  methods: {
    updateSearchQuery() {
      this.$emit("updateSearchQuery", this.searchQuery, this.filteredList);
    },
    search(searchQuery) {
      if (searchQuery) {
        this.$router.push({
          name: "Product",
          params: { id: searchQuery, type: "productlist" },
        });
        this.searchQuery = null;
      }
    },
  },
  template: `
    <nav class="navbar justify-content-start">
        <router-link :to="{ name: 'Home'}" @click="searchQuery=''">
          <div class="navbar-brand p-0 d-flex align-items-center">
            <img src="https://bibliotek.kea.dk/images/KEAprodukter/KEA_logo_EN_Web_red.png" :style="imgcss" class="logo d-inline" alt="">
            <p :style="titlecss" class="d-inline ps-2 m-0">Produkter</p>
          </div>
        </router-link>
        <div class="d-flex w-50">
          <div class="w-100">
              <input  @input="updateSearchQuery" @keyup.enter="search(searchQuery)" v-model="searchQuery" name="name" class="searchFld form-control me-2" type="searchQuery" autocomplete="off" placeholder="&#xF52A;" style="font-family:'bootstrap-icons', Arial" aria-label="Søg">
                <div v-if="searchQuery" class="dropdown w-100">
                  <div class="dropdown-content w-100">
                    <p v-for="keyword in keywordSearchFilter" @click="search(keyword)" class="w-100"><i class="bi bi-search"></i>
                    &nbsp;{{keyword}}</p>
                </div>
              </div>
          </div>
          <button @click="search(searchQuery)" class="btn-search btn btn-outline-light" type="button">&nbsp;Søg&nbsp;</button>
        </div>
    </nav>
  `,
};

//Kategori og materialeknapper
const Btngroup = {
  name: "Btngroup",
  props: {
    materials: Array,
    categories: Array,
  },
  data() {
    return {};
  },
  methods: {},
  template: `
  <div class="btn-group d-flex text-center" role="group" aria-label="Basic example">
    <div class="col d-sm-flex justify-content-center">
        <span v-for="(material,index) in materials.slice(0,8)" v-if="materials">
          <router-link :to="{ name: 'Product',params:{id:material,type:'productlist'}}">
            <button type="button" class="btn btn-primary btn-custom-nav me-4 rounded-pill">{{material}}</button>
          </router-link>
        </span>
        <span v-for="category in categories.slice(0,10)" v-if="categories">
          <router-link :to="{ name: 'Product',params:{id:category, type:'productlist'}}">
            <button type="button" class="btn btn-primary btn-custom-nav me-4 rounded-pill">{{category}}</button>
          </router-link>
        </span>
    </div>
  </div>
  `,
};

//Logo, søgefelt og knapper kombineret
const Topbar = {
  name: "Topbar",
  props: {
    products: Array,
  },
  data() {
    return {
      materials: [
        "E-bøger",
        "Artikler",
        "Videoer",
        "Rapporter",
        "Podcasts",
        "Bøger",
        // "newMat1",
        // "newMat2",
      ],
      categories: [
        "Labs",
        "Digital",
        "Byg",
        "Design",
        "Teknik",
        "Business",
        "Teknologi",
        // "newCat1",
        // "newCat2",
      ],
    };
  },
  methods: {
    log(item) {
      console.log(item);
    },
    updateSearchQuery(value1, value2) {
      this.$emit("updateSearchQuery", value1, value2);
    },
  },
  template: `
  <div class="container-fluid p-0">
    <div class="row align-items-center">
      <div class="col-xl-6">
        <navigation :products="products" @updateSearchQuery="updateSearchQuery"></navigation>
      </div>
      <div class="col-xl-6">
        <btngroup :materials="materials"></btngroup>
        <btngroup :categories="categories"></btngroup>
      </div>
    </div>
  </div>
  `,
};

//Sidebar ikoner
const Sidebar = {
  name: "Sidebar",
  props: {},
  data() {
    return {};
  },
  methods: {
    log(item) {
      console.log(item);
    },
  },
  template: `
  <div class="col-md-1 pt-3 text-center mt-5">
    <router-link :to="{ name: 'Liked'}">
      <i class="bi bi-heart d-md-block m-5 m-md-0 sidebar-icons "></i>
    </router-link>
    <i class="bi bi bi-archive d-md-block mt-md-5 mb-md-5 mt-0 mtb-0 sidebar-icons"></i>
    <i class="bi bi-share d-md-block m-5 m-md-0 sidebar-icons"></i>
  </div>
  `,
};

//Carousel
const Carousel = {
  name: "Carousel",
  props: {
    products: { type: Array },
    loading: { type: Boolean },
  },
  data() {
    return {
      // tempImg: "https://kea.dk/slir/w2200-c100x72/images/news/2021/12/Byg.jpeg",
      isLoaded: false,
    };
  },
  computed: {
    filteredProducts: function () {
      return this.products.slice(0, 3);
    },
  },
  methods: {
    log(item) {
      console.log(item);
    },
    onImgLoad() {
      this.isLoaded = true;
    },
  },
  template: `  
    <div id="carouselExampleCaptions" class="carousel slide mt-4" data-bs-ride="carousel" data-bs-interval="10000">
      <div v-if="isLoaded" class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner border-0 rounded-custom">
        <div v-for="(product,index) in filteredProducts" class="carousel-item" :class="{active:index==0}">
          <img :src="product.img1" class="d-block w-100 border-0 rounded-custom" alt="..." @load="onImgLoad">
          <router-link :to="{ name: 'Product',params:{id:product.id}}">
            <div class="carousel-caption d-block border-0 rounded-custom"> 
              <h5>{{product.author}}</h5>
              <p>{{product.title}}</p>
            </div>
          </router-link>
        </div>
      </div>
      <button v-if="isLoaded" class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button v-if="isLoaded" class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `,
};

//Card group
const Cardgroup = {
  name: "Cardgroup",
  props: {
    products: { type: Array },
    loading: { type: Boolean },
  },
  data() {
    return {};
  },
  methods: {
    log(item) {
      console.log(item);
    },
    like(event, card) {
      card.liked = !card.liked;
      if (card.liked == true) {
        localStorage.setItem(card.title, card.liked);
      } else {
        localStorage.removeItem(card.title);
      }
      // console.log(card.liked);
      // console.log(card);
      // console.log(event.target, card.id);
    },
  },
  template: `
  <div class="row row-cols-1 row-cols-lg-5 g-4">
    <div class="col" v-for="card in products.slice(0,10)" :id="card.id">
        <div class="card text-white bg-dark border-2 h-100">
          <i @click="like($event,card)" :class="card.liked?'bi bi-heart-fill likeheart':'bi bi-heart unlikeheart'"></i>
          <router-link :to="{ name: 'Product',params:{id:card.id}}">
            <img :src="card.img1" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{card.title}}</h5>
              <p class="card-text">{{card.subtitle}}</p>
            </div>
          </router-link>
        </div>
    </div>
  </div>
  `,
};

//Alt indhold i denne
const Wrapper = {
  name: "Wrapper",
  props: {
    loading: { type: Boolean },
    products: { type: Array },
  },
  data() {
    return {
      filteredList: [],
    };
  },
  methods: {
    log(item) {
      console.log(item);
    },
    homePage() {
      if (this.$route.path == "/" || this.$route.path == "/home") {
        return true;
      } else {
        return false;
      }
    },
    updateSearchQuery(value1, value2) {
      this.filteredList = value2;
    },
  },
  template: `
  <div>
      <topbar :products="products" @updateSearchQuery="updateSearchQuery"></topbar>
      <div class="row">
        <sidebar></sidebar>
        <div v-if="loading" style="min-height: 37rem;" class="col d-flex align-items-center justify-content-center">
          <h5>Loading please wait...</h5>
        </div>
        <router-view v-else class="col" style="min-height: 35.5rem;"
          :products="products"
          :loading="loading"
          v-slot="{ Component,route }"
        >
          <transition name="fade" mode="out-in">
            <div :key="route.fullPath" class="col">
              <component :is="Component"/>
            </div>
          </transition>
        </router-view>
      </div>
      <transition name="fade" mode="out-in">
        <cardgroup v-if="homePage() && !loading" :products="products" :loading="loading"></cardgroup>
      </transition>
  </div>
  `,
};

//keaprodukter
const KeaProdukter = {
  setup() {},
  data() {
    return {
      loading: true,
      products: [],
      fetchUrl:
        "https://alma-proxy.herokuapp.com/almaws/v1/electronic/e-collections/6186840000007387/e-services/6286839990007387/portfolios?limit=500&offset=0&apikey=l8xxf96f99c580364be08333d1a57b4af036",
    };
  },
  computed: {},
  methods: {
    log(item) {
      console.log(item);
    },
    parseProducts(data) {
      // parse xml inspireret af https://www.c-sharpcorner.com/blogs/get-data-from-xml-content-using-javascript burde nok udskiftes med en Vue version, som bruger virtual DOM
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data.anies, "text/xml");

      var x = xmlDoc.getElementsByTagName("datafield");
      const parsedData = [];
      for (i = 0; i < x.length; i++) {
        const subfieldData = Object.values(
          x[i].getElementsByTagName("subfield")
        ).map(function (value, index) {
          return value.innerHTML;
        });
        parsedData[i] = subfieldData;
      }
      // Object.assign for at beholde reactivity
      const parsedProduct = [];
      this.products[this.products.length] = Object.assign({}, parsedProduct, {
        author: parsedData[0][0],
        title: parsedData[1][0],
        subtitle: parsedData[2][0],
        text: parsedData[3][0],
        keywords: parsedData[4],
        author2: parsedData[5][0],
        author3: parsedData[6][0],
        links: parsedData[7][0],
        video: parsedData[8][0],
        video2: parsedData[9][0],
        img1: parsedData[10][0],
        img2: parsedData[11][0],
        img3: parsedData[12][0],
        article: parsedData[13][0],
        id: this.products.length,
        mms_id: data.mms_id,
        liked: localStorage.getItem(parsedData[1][0]),
      });
    },

    async fetchData(url) {
      try {
        //henter productLinks ind fra den aktuelle portfolio, så de kan bruges til at hente products
        const response = await fetch(url, {
          headers: { "Content-type": "application/json" },
        });
        const data = await response.json();

        const productLinks = data.portfolio.map((product, index) => {
          let linkList = [];
          return (linkList[index] = {
            link: product.resource_metadata.mms_id.link,
          });
        });

        //bruger productLinks til at hente products ind
        productLinks.map(async (link, index) => {
          const response = await fetch(link.link, {
            headers: { "Content-type": "application/json" },
          });
          const data = await response.json();
          this.parseProducts(data);
        });
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchData(this.fetchUrl);
  },
};

// app
const app = Vue.createApp(KeaProdukter)

  .component("Wrapper", Wrapper)
  .component("Navigation", Navigation)
  .component("Btngroup", Btngroup)
  .component("Carousel", Carousel)
  .component("Cardgroup", Cardgroup)
  .component("Topbar", Topbar)
  .component("Sidebar", Sidebar)
  .use(router)
  .mount("#app");
