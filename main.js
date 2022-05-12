// Components

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
    products: Array,
    data: Object,
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
    <div id="carouselExampleCaptions" class="carousel slide mt-4" data-bs-ride="carousel" data-bs-interval="10000">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner border-0 rounded-custom">
        <div v-for="(product,index) in products" class="carousel-item" :class="{active:index==0}">
          <img :src="product.image1" class="d-block w-100 border-0 rounded-custom" alt="...">
           <div class="carousel-caption d-none d-md-block">
            <h5 v-if="!data">{{data}}Loading Please wait...</h5>
            <span v-else>
              <h5> {{product.title}}</h5>
              <p>{{data.portfolio[0].id}}</p>
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
    data: Object,
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
    data: Object,
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
        <carousel :products="products" :data="data" />
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
      data: null,
      count: 0,
      products: [
        {
          image1: "/images/KEAprodukter/balslev.png",
          title: "Kritik af den digital fornuft",
          subtext: "Et KEA produkt af",
          text: "Lorem ipsum...",
          author1: "Jesper Balslev",
          video1: "",
          press: "",
        },
        {
          image1: "/images/KEAprodukter/knibestribe.png",
          title: "Knibestriben",
          subtext: "Et KEA produkt af",
          text: "Lorem ipsum...",
          author1: "Per Halstrøm",
          video1: "zBr_ozl_Tgg",
          press: "",
        },
        {
          image1:
            "https://kea.dk/slir/w2200-c100x72/images/news/2021/12/Byg.jpeg",
          // title: this.data.portfolio[0].resource_metadata.title,
          // subtext: this.data.portfolio[0].id,
          title:
            this.data !== null
              ? "ping"
              : this.data.portfolio[0].resource_metadata.title,
          subtext: "Et KEA produkt af",
          text: "Lorem ipsum...",
          author1: "Jan Johannson",
          video1: "",
          press: "",
        },
      ],
    };
  },
  methods: {
    log(item) {
      console.log(item);
    },
    updateData() {
      this.title = this.data.portfolio[0].resource_metadata.title;
    },
  },
  mounted() {
    console.log(this.data);
    fetch(
      "https://alma-proxy.herokuapp.com/almaws/v1/electronic/e-collections/6186840000007387/e-services/6286839990007387/portfolios",
      {
        headers: { "Content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        this.data = response;
        console.log("data " + JSON.stringify(this.data));
        console.log(typeof this.data);
      })

      .catch((error) => {
        this.data = error;
      });
  },
})

  .component("Wrapper", Wrapper)
  .component("Navigation", Navigation)
  .component("Btngroup", Btngroup)
  .component("Carousel", Carousel)
  .component("Card", Card)
  .mount("#app");
