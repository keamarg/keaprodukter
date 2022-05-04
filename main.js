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
    <nav class="navbar d-flex flex-row">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="https://bibliotek.kea.dk/da/?id=273">
          <img src="https://bibliotek.kea.dk/images/KEAprodukter/KEA_logo_EN_Web_red.png" :style="imgcss" class="logo d-inline" alt="">
          <p :style="titlecss" class="d-inline ps-2 align-self-end">Produkter</p>
        </a>
        <form class="d-flex" action="https://api.agify.io" method="GET">
          <input name="name" value="" class="searchFld form-control me-2" type="search" placeholder="Søg..." aria-label="Søg">
          <button class="searchBtn btn btn-outline-light" type="submit">Søg</button>
        </form>
      </div>
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
  <div class="btn-group d-flex" role="group" aria-label="Basic example">
    <span v-for="category in categories">
      <button type="button" class="btn btn-primary btn-custom me-4 rounded-pill">{{category}}</button>
    </span>
    <span v-for="material in materials">
      <button type="button" class="btn btn-primary btn-custom me-4 rounded-pill">{{material}}</button>
    </span>
  </div>
  `,
};

//Alt indhold i denne
const Wrapper = {
  name: "Wrapper",
  props: {
    images: Object,
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
      ],
      categories: [
        "Labs",
        "Digital",
        "Byg",
        "Design",
        "Teknik",
        "Business",
        "Teknologi",
      ],
    };
  },
  methods: {},
  template: `
  <div class="container">
    <div class="row">
      <div class="col-6 d-flex">
        <navigation></navigation>
      </div>
        <div class="col-6">
          <btngroup :materials="materials" class="d-flex justify-content-center"></btngroup>
          <btngroup :categories="categories" class="d-flex justify-content-center"></btngroup>
        </div>
    </div>
  </div>
  <carousel :images="images" :message="message" />
  `,
};

//Carousel
const Carousel = {
  name: "Carousel",
  props: {
    images: Object,
    message: String,
  },
  data() {
    return {};
  },
  methods: {
    deleteRound() {
      console.log("yesyes");
    },
  },
  template: `
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="images.img1" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Kritik af den digital fornuft</h5>
            <p>Et KEA produkt af Jesper Balslev.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="images.img2" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Knibestriben</h5>
            <p>Endnu et KEA projekt.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="images.img3" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5 v-if="!message">{{message}}Loading Please wait...</h5>
            <span v-else>
              <h5> {{message.portfolio[0].resource_metadata.title}}</h5>
              <p>{{message.portfolio[0].id}}</p>
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

// app
Vue.createApp({
  // setup() {
  //   const message = Vue.reactive({
  //     message: null,
  //   });
  // },
  data() {
    return {
      message: "",
      count: 0,
      images: {
        img1: "https://bibliotek.kea.dk/images/KEAprodukter/balslev.png",
        img2: "https://bibliotek.kea.dk/images/KEAprodukter/knibestribe.png",
        img3: "https://picsum.photos/1024/480/?image=12",
      },
    };
  },
  mounted() {
    fetch(
      "https://alma-proxy.herokuapp.com/almaws/v1/electronic/e-collections/6186840000007387/e-services/6286839990007387/portfolios",
      {
        headers: { "Content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        this.message = response;
      })
      .catch((error) => {
        this.message = error;
      });
  },
})
  .component("Wrapper", Wrapper)
  .component("Carousel", Carousel)
  .component("Navigation", Navigation)
  .component("Btngroup", Btngroup)
  .mount("#app");
