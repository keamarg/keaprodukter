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
      },
    };
  },
  methods: {},
  template: `
    <nav class="navbar">
      <div class="container justify-content-start">
        <a class="navbar-brand" href="https://bibliotek.kea.dk/da/?id=273">
          <img src="https://bibliotek.kea.dk/images/KEAprodukter/KEAprodukter_logo.png" :style="imgcss" class="logo" alt="">
        </a>
      </div>
    </nav>
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
            <h5 v-if="!message">Loading Please wait...</h5>
            <h5 v-else> {{message.portfolio[0].id}}</h5>
            <p>Et random billede.</p>
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
  setup() {
    const message = reactive({
      message: null,
    });
  },
  data() {
    return {
      // message: "",
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
        console.log(this.message.portfolio[0].id);
      })
      .catch((error) => {
        this.message = error;
      });
  },
})
  .component("Carousel", Carousel)
  .component("Navigation", Navigation)
  .mount("#app");
