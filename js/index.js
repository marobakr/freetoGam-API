const allLinks = document.querySelectorAll('.nav-link');
const rowBox = document.querySelector('.row');
const games = document.querySelector('.games');
const boxDetails = document.getElementById('layerContainer');
const innerBox = document.getElementById('innerbox');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const loding = document.getElementById('loding');
let counterIndex = 0;

let fullData = new Array();
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e24ee579ddmshd31c21eb3b6b0aap15bdfejsnfd70a35feebe',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
  },
};
// Toggle Class Active
(function () {
  // Add Class Active
  allLinks[0].classList.add('active');

  allLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      let category = e.target.innerHTML;
      //  Send New Category
      getAll(category);
      // Remove Prev Active
      RemoveClassActive(allLinks);
      // Add Class Active
      this.classList.add('active');
    });
  });
  // Remove Class Active From Prev
  function RemoveClassActive(Links) {
    Links.forEach((link) => {
      link.classList.remove('active');
    });
  }
})();

// Get All Data Api
async function getAll(category = 'mmorpg') {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
  const respons = await (await fetch(url, options)).json();
  fullData = respons;
  displayAll(fullData);
  ToggleAllData();
}
getAll();

// Get getDetails Data Api
async function getDetails(index) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${fullData[index].id}`;
  const details = await fetch(url, options);
  const respons = await details.json();
  displayDetails(respons);
}

// Display All Data
function displayAll(Games) {
  startLoading();
  let cartonaBox = ``;
  Games.forEach((game, index) => {
    // Distract

    let {
      genre: uname,
      short_description: desc,
      thumbnail: img,
      title,
      platform,
    } = game;
    console.log();
    cartonaBox += `
     <div class="col-md-6 col-lg-3">
              <div class="card h-100" role="button" onclick="getDetails(${index})">
                <figure class="p-3 mb-0">
                  <img
                    src=${img}
                    class="card-img-top"
                    alt="${title}"
                  />
                </figure>
                <div class="card-body p-3 text-center">
                  <div
                    class="card-title text-white d-flex justify-content-between align-items-center"
                  >
                    <h3>${title}</h3>
                    <span class="p-2 rounded-2 free">free</span>
                  </div>
                  <p class="card-text">
                    ${desc.split('').splice(0, 40).join('')}...
                  </p>
                </div>
                <div class="card-footer d-flex text-white justify-content-between align-items-center">
                  <span class="p-2 rounded-2">${uname}</span>
                  <span class="p-2 rounded-2"> ${platform}</span>
                </div>
              </div>
            </div>
   `;
  });
  // render data From APi
  rowBox.innerHTML = cartonaBox;
}
// display Details Data
function displayDetails(respons) {
  // Distract
  let {
    status,
    thumbnail: img,
    title,
    platform,
    genre,
    description,
    freetogame_profile_url: siteGame,
  } = respons;
  let ditalisGame = `
  <div class="row gy-3 align-items-start py-4">
          <div class="col-lg-6 text-center">
            <h2 class="text-white">Details Game</h2>
            <img class="w-100" src="${img}" alt="" />
          </div>
          <div class="col-lg-6">
            <h4 class="text-white">Title: ${title}</h4>
            <ul class="list text-white d-flex flex-column gap-2 ">
              <li>Category: <span class="btn btn-outline-warning p-1 "> ${genre}</span></li>
              <li>platform: <span class="btn btn-outline-warning p-1"> ${platform}</span></li>
              <li>status: <span class="btn btn-outline-warning p-1"> ${status}</span></li>
            </ul>
            <div class="desc text-white py-4">${description}</div>
            <a class="btn btn-outline-warning" href=${siteGame}>show game</a>
          </div>
        </div>
        <i onclick="closeCard()" class="close p-2 fa-solid fa-circle-xmark position-absolute"> </i>

        `;

  innerBox.innerHTML = ditalisGame;
}
function ToggleAllData() {
  const allCard = document.querySelectorAll('.card');
  allCard.forEach((card) => {
    card.addEventListener('click', function () {
      startLoading();
      games.classList.toggle('d-none');
      boxDetails.classList.toggle('d-none');
    });
  });
}

function closeCard() {
  startLoading();
  boxDetails.classList.toggle('d-none');
  games.classList.toggle('d-none');
}

function startLoading() {
  loding.classList.remove('d-none');

  setTimeout(() => {
    loding.classList.add('d-none');
  }, 500);
}

next.addEventListener('click', function () {
  startLoading();
  counterIndex++;
  if (counterIndex > fullData.length - 1) {
    counterIndex = 0;
  }
  getDetails(counterIndex);
});

prev.addEventListener('click', function () {
  startLoading();

  counterIndex--;
  if (counterIndex < 0) {
    counterIndex = fullData.length - 1;
  }
  getDetails(counterIndex);
});

window.onload = startLoading();
