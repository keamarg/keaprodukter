//Router components

const Home = {
  name: "Home",
  props: ["products", "loading"],
  methods: {},
  template: `
      <carousel :products="products" :loading="loading"/>
  `,
};

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

    filteredProducts() {
      return this.products.filter((product) =>
        product.keywords.some(
          (keyword) =>
            keyword.toLowerCase() == this.$route.params.id.toLowerCase()
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
    return {
      // css: {
      //   textAlign: "left",
      //   color: "white",
      //   background:
      //     "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.9),rgba(0,0,0,0.8),rgba(0,0,0,0.5),rgba(0,0,0,0.3)),url(" +
      //     this.products[this.$route.params.id].img1 +
      //     "), no-repeat",
      //   backgroundSize: "cover",
      //   fontSize: "16px",
      //   minHeight: "60rem",
      // },
    };
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
          <Cardgroup v-if="filteredProducts.length>0" :products="filteredProducts"/>
          <div v-else>Nothing here...</div>
    </template>
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
  props: {},
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
    };
  },
  methods: {},
  template: `
    <nav class="navbar justify-content-start">
        <router-link :to="{ name: 'Home'}">
          <div class="navbar-brand p-0 d-flex align-items-center">
            <img src="https://bibliotek.kea.dk/images/KEAprodukter/KEA_logo_EN_Web_red.png" :style="imgcss" class="logo d-inline" alt="">
            <p :style="titlecss" class="d-inline ps-2 m-0">Produkter</p>
          </div>
        </router-link>
        <form class="d-flex w-50" action="https://api.agify.io" method="GET">
          <input name="name" value="" class="searchFld form-control me-2" type="search" placeholder="Søg..." aria-label="Søg">
          <button class="searchBtn btn btn-outline-light" type="submit">&nbsp;Søg&nbsp;</button>
        </form>
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
  props: {},
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
  },
  template: `
  <div class="container-fluid p-0">
    <div class="row align-items-center">
      <div class="col-xl-6">
        <navigation></navigation>
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
    <i class="bi bi-heart d-md-block m-5 m-md-0 sidebar-icons "></i>
    <i class="bi bi-calendar d-md-block mt-md-5 mb-md-5 mt-0 mtb-0 sidebar-icons"></i>
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
  },
  template: `
  <div class="row row-cols-1 row-cols-lg-5 g-4">
    <div class="col" v-for="card in products">
      <router-link :to="{ name: 'Product',params:{id:card.id}}">
        <div class="card text-white bg-dark border-2 h-100">
          <img :src="card.img1" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{card.title}}</h5>
            <p class="card-text">{{card.subtitle}}</p>
          </div>
        </div>
      </router-link>
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
    return {};
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
  },
  template: `
  <div>
      <topbar></topbar>
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
          // console.log(data);
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
