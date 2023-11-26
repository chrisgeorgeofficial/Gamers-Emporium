let movies = [
  {
    name: "GTA VI",
    des:
      "GTA 6 is still something of a mystery. Here's everything we know about the game so far, including a look at the initial announcement.",
    image: "images/gta61.jpg"
  },
  {
    name: "Call of Duty: Modern Warfare 3",
    des:
      "Call of Duty®: Modern Warfare® III is the direct sequel to the record-breaking Call of Duty®: Modern Warfare® II. Captain Price and Task Force 141 face off against the ultimate threat. The ultranationalist war criminal Vladimir Makarov is extending his grasp across the world causing Task Force 141 to fight like never before.",
    image: "images/CODM3.jpeg"
  },
  {
    name: "EA SPORTS FC™ 24",
    des:
      "EA SPORTS FC™ 24 welcomes you to The World’s Game—the most true-to-football experience ever with HyperMotionV*, PlayStyles optimised by Opta, and a revolutionised Frostbite™ Engine reinventing how 19,000+ authentic players move, play and look in every match.",
    image: "images/fc24.jpeg"
  },
  {
    name: "Spider-Man 2",
    des:
      "Marvel's Spider-Man 2 is a 2023 action-adventure game developed by Insomniac Games and published by Sony Interactive Entertainment.. ",
    image: "images/sp2.jpg"
  },
  {
    name: "Alan Wake II",
    des:
      "Alan Wake 2 is a 2023 survival horror game developed by Remedy Entertainment and published by Epic Games Publishing.",
    image: "images/aw2.jpg"
  }
];
const carousel = document.querySelector(".carousel");
let sliders = [];

let slideIndex = 0;

const createSlide = () => {
  if (slideIndex >= movies.length) {
    slideIndex = 0;
  }

  let slide = document.createElement("div");
  var imgElement = document.createElement("img");
  let content = document.createElement("div");
  let h1 = document.createElement("h1");
  let p = document.createElement("p");

  imgElement.appendChild(document.createTextNode(""));
  h1.appendChild(document.createTextNode(movies[slideIndex].name));
  p.appendChild(document.createTextNode(movies[slideIndex].des));
  content.appendChild(h1);
  content.appendChild(p);
  slide.appendChild(content);
  slide.appendChild(imgElement);
  carousel.appendChild(slide);

  imgElement.src = movies[slideIndex].image;
  slideIndex++;

  slide.className = "slider";
  content.className = "slide-content";
  h1.className = "movie-title";
  p.className = "movie-des";

  sliders.push(slide);

  if (sliders.length) {
    sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${
      30 * (sliders.length - 2)
    }px)`;
  }
};

for (let i = 0; i < 3; i++) {
  createSlide();
}

setInterval(() => {
  createSlide();
}, 3000);

//video cards

const videoCards = [...document.querySelectorAll(".video-card")];

videoCards.forEach((item) => {
  item.addEventListener("mouseover", () => {
    let video = item.children[1];
    video.play();
  });
  item.addEventListener("mouseleave", () => {
    let video = item.children[1];
    video.pause();
  });
});

//card sliders

let cardContainers = [...document.querySelectorAll(".card-container")];
let preBtns = [...document.querySelectorAll(".pre-btn")];
let nxtBtns = [...document.querySelectorAll(".nxt-btn")];

cardContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtns[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth - 200;
  });

  preBtns[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth + 200;
  });
});
