//Router components

const Home = { template: "<div><routetest/></div>" };
const About = { template: "<div>About</div>" };

//Routes
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

// Components

const Routetest = {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username;
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/login");
      }
    },
  },
};

//Top bar
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
        <a class="navbar-brand p-0 d-flex align-items-center" href="https://bibliotek.kea.dk/da/?id=273">
          <img src="https://bibliotek.kea.dk/images/KEAprodukter/KEA_logo_EN_Web_red.png" :style="imgcss" class="logo d-inline" alt="">
          <p :style="titlecss" class="d-inline ps-2 m-0">Produkter</p>
        </a>
        <form class="d-flex w-50" action="https://api.agify.io" method="GET">
          <input name="name" value="" class="searchFld form-control me-2" type="search" placeholder="Søg..." aria-label="Søg">
          <button class="searchBtn btn btn-outline-light" type="submit">&nbsp;Søg&nbsp;</button>
        </form>
    </nav>
  `,
};

//Btngroup
const Btngroup = {
  name: "Btngroup",
  props: {
    // size: Number,
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
        <span v-for="material in materials.slice(0,8)" v-if="materials">
          <button type="button" class="btn btn-primary btn-custom me-4 rounded-pill">{{material}}</button>
        </span>
         <span v-for="category in categories.slice(0,10)" v-if="categories">
          <button type="button" class="btn btn-primary btn-custom me-4 rounded-pill">{{category}}</button>
        </span>
    </div>
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
      tempImg: "https://kea.dk/slir/w2200-c100x72/images/news/2021/12/Byg.jpeg",
    };
  },
  methods: {
    log(item) {
      console.log(item);
    },
  },
  template: `   
    <h5 v-if="loading">Loading Please wait...</h5>
    <div v-else id="carouselExampleCaptions" class="carousel slide mt-4" data-bs-ride="carousel" data-bs-interval="10000">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner border-0 rounded-custom">
        <div v-for="(product,index) in products" class="carousel-item" :class="{active:index==0}">
          <img :src="product.img1" class="d-block w-100 border-0 rounded-custom" alt="...">
          <div class="carousel-caption d-none d-md-block border-0 rounded-custom" style="background-color:rgba(0,0,0,0.2)">
            <h5 v-if="loading">Loading Please wait...</h5>
            <span v-else>
              <h5>{{product.author}}</h5>
              <p>{{product.title}}</p>
            </span>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `,
};

//Card
const Card = {
  name: "Card",
  props: {
    // data: Object,
    cards: Array,
  },
  data() {
    return {};
  },
  methods: {},
  template: `
  <div class="row row-cols-1 row-cols-lg-5 g-4 mt-3">
    <div class="col" v-for="card in cards">
      <div class="card text-white bg-dark border-2 h-100">
        <img :src="card.img" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{card.title}}</h5>
          <p class="card-text">{{card.text}}</p>
        </div>
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
      cards: [
        {
          img: "https://kea.dk/slir/w2200-c100x72/images/news/2021/12/Byg.jpeg",
          title: "Byggekoordinator",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          img: "/images/KEAprodukter/fashion.jpg",
          title: "Fashion",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          img: "/images/KEAprodukter/podcast.jpg",
          title: "Podcast",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          img: "/images/KEAprodukter/knibestribe.png",
          title: "Knibestriben",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          img: "/images/KEAprodukter/balslev.png",
          title: "Kritik af den digitale fornuft",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
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
    <div class="row">
      <div class="col-xl-6">
        <navigation></navigation>
      </div>
      <div class="col-xl-6">
        <btngroup :materials="materials"></btngroup>
        <btngroup :categories="categories"></btngroup>
      </div>
    </div>
  </div>
  <div class="container p-0">
    <div class="row align-items-center text-center">
      <div class="col-md-1">
        <i class="bi bi-heart d-md-block m-5 m-md-0"></i>
        <i class="bi bi-calendar d-md-block mt-md-5 mb-md-5 mt-0 mtb-0"></i>
        <i class="bi bi-share d-md-block m-5 m-md-0"></i>
      </div>
      <div class="col-md-11">
        <carousel :products="products" :loading="loading"/>
      </div>
    </div>
  </div>
  <div class="container p-0">
    <card :cards="cards"></card>
  </div>
 
  `,
};

// app
const app = Vue.createApp({
  setup() {},
  data() {
    return {
      loading: true,
      products: [],
      fetchUrl:
        "https://alma-proxy.herokuapp.com/almaws/v1/electronic/e-collections/6186840000007387/e-services/6286839990007387/portfolios?limit=10&offset=0&apikey=l8xxf96f99c580364be08333d1a57b4af036",
      // products: [
      //   {
      //     image1: "/images/KEAprodukter/balslev.png",
      //     title: "Kritik af den digital fornuft",
      //     subtext: "Et KEA produkt af",
      //     text: "Lorem ipsum...",
      //     author1: "Jesper Balslev",
      //     video1: "",
      //     press: "",
      //   },
      //   {
      //     image1: "/images/KEAprodukter/knibestribe.png",
      //     title: "Knibestriben",
      //     subtext: "Et KEA produkt af",
      //     text: "Lorem ipsum...",
      //     author1: "Per Halstrøm",
      //     video1: "zBr_ozl_Tgg",
      //     press: "",
      //   },
      //   {
      //     image1:
      //       "https://kea.dk/slir/w2200-c100x72/images/news/2021/12/Byg.jpeg",
      //     // title: this.data.portfolio[0].resource_metadata.title,
      //     // subtext: this.data.portfolio[0].id,
      //     title:
      //       this.data !== null
      //         ? "ping"
      //         : this.data.portfolio[0].resource_metadata.title,
      //     subtext: "Et KEA produkt af",
      //     text: "Lorem ipsum...",
      //     author1: "Jan Johannson",
      //     video1: "",
      //     press: "",
      //   },
      // ],
    };
  },
  computed: {},
  methods: {
    log(item) {
      console.log(item);
    },
    parseProducts(data) {
      // parse xml inspireret af https://www.c-sharpcorner.com/blogs/get-data-from-xml-content-using-javascript
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data.anies, "text/xml");

      var x = xmlDoc.getElementsByTagName("datafield");
      const parsedData = [];
      for (i = 0; i < x.length; i++) {
        parsedData[i] =
          x[i].getElementsByTagName("subfield")[0].childNodes[0].nodeValue;
      }

      // Object.assign for at beholde reactivity
      const parsedProduct = [];
      this.products[this.products.length] = Object.assign({}, parsedProduct, {
        author: parsedData[0],
        title: parsedData[1],
        subtitle: parsedData[2],
        text: parsedData[3],
        keywords: parsedData[4],
        author2: parsedData[5],
        author3: parsedData[6],
        links: parsedData[7],
        video: parsedData[8],
        video2: parsedData[9],
        img1: parsedData[10],
        img2: parsedData[11],
        img3: parsedData[12],
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
})

  .component("Wrapper", Wrapper)
  .component("Navigation", Navigation)
  .component("Btngroup", Btngroup)
  .component("Carousel", Carousel)
  .component("Card", Card)
  .component("Routetest", Routetest)
  .use(router)
  .mount("#app");
