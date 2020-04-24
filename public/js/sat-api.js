const queryN2YO = "https://www.n2yo.com/rest/v1/satellite/";
const apiKeyN2YO = "&apiKey=NWXNVK-K8V7UG-YTMY6D-4DCH";
const userAlt = 0;

// const satelliteIDArray = {
//   18: "Amateur radio",
//   35: "Beidou Navigation System",
//   1: "Brightest",
//   45: "Celestis",
//   32: "CubeSats",
//   8: "Disaster monitoring",
//   6: "Earth resources",
//   29: "Education",
//   28: "Engineering",
//   19: "Experimental",
//   48: "Flock",
//   22: "Galileo",
//   27: "Geodetic",
//   10: "Geostationary",
//   50: "GPS Constellation",
//   20: "GPS Operational",
//   17: "Globalstar",
//   51: "Glonass Constellation",
//   21: "Glonass Operational",
//   5: "GOES",
//   40: "Gonets",
//   12: "Gorizont",
//   11: "Intelsat",
//   15: "Iridium",
//   46: "IRNSS",
//   2: "ISS",
//   49: "Lemur",
//   30: "Military",
//   14: "Molniya",
//   24: "Navy Navigation Satellite System",
//   4: "NOAA",
//   43: "O3B Networks",
//   53: "OneWeb",
//   16: "Orbcomm",
//   38: "Parus",
//   47: "QZSS",
//   31: "Radar Calibration",
//   13: "Raduga",
//   25: "Russian LEO Navigation",
//   23: "Augmentation System",
//   7: "Search & Rescue",
//   26: "Space & Earth Science",
//   52: "Starlink",
//   39: "Strela",
//   9: "Tracking & Data Relay",
//   44: "Tselina",
//   42: "Tsikada",
//   41: "Tsiklon",
//   34: "TV",
//   3: "Weather",
//   37: "Westford Needles",
//   33: "XM and Sirius",
//   36: "Yaogan"
// };

window.satApi = {
  getPosition: (userLon, userLat) => {
    let positionQuery = `/positions/${satID}/${userLat}/${userLon}/${userAlt}/50`;
    $(function() {
      $.ajax({
        url: queryN2YO + positionQuery + apiKeyN2YO,
        method: "GET"
      }).then(result => {
        console.log(result);
      });
    });
  },

  getAbove: (userLon, userLat, categoryID) => {
    let searchRadius = 15;
    let aboveQuery = `/above/${userLat}/${userLon}/${userAlt}/${searchRadius}/${categoryID}`;
    $(function() {
      $.ajax({
        url: queryN2YO + aboveQuery + apiKeyN2YO,
        method: "GET"
      }).then(result => {
        console.log(result.above);

        // let mapCoords = result.above.map(sat => {
        //   return { latitude: sat.satlat, longitude: sat.satlng };
        // });
        // const aboveData = result.above;
        // console.log(aboveData.length);
        // console.log(aboveData);
        // let points = "";
        // let pointGraphics = [];
        // for (let i = 0; i < aboveData.length; i++) {
        //   points += `
        //   const point${i} = new Point({
        //     longitude: ${aboveData[i].satlng},
        //     latitude: ${aboveData[i].satlat}
        //   });
        //   const pointGraphic${i} = new Graphic({
        //     geometry: point${i},
        //     symbol: textSymbol
        //   });`;
        //   pointGraphics += `pointGraphic${i}, `;
        // }
        // let mapDisplayData = `<script>require([
        //   "esri/Map",
        //   "esri/PopupTemplate",
        //   "esri/views/MapView",
        //   "esri/Graphic",
        //   "esri/geometry/Point"
        // ], function (Map, PopupTemplate, MapView, Graphic, Point) {
        //   const map = new Map({
        //     basemap: "satellite"
        //   });

        //   const view = new MapView({
        //     center: [${userLon}, ${userLat}],
        //     container: "viewDiv",
        //     map: map,
        //     zoom: 4
        //   });
        // ${points}
        // const textSymbol = {
        //   type: "text", // autocasts as new TextSymbol()
        //   color: "#7A003C",
        //   text: "\ue680",
        //   font: {
        //     size: 24,
        //     family: "CalciteWebCoreIcons"
        //   }
        // };
        // view.graphics.addMany([${pointGraphics}]);</script>`;
        // console.log(mapDisplayData);
        // $("#mapdata").text(mapDisplayData);
        // return mapDisplayData;
      });
      getAboveHomePage(userLon, userLat, categoryID);
    });
  }
};

function getAboveHomePage(userLon, userLat, categoryID) {
  let searchRadius = 15;
  let aboveQuery = `/above/${userLat}/${userLon}/${userAlt}/${searchRadius}/${categoryID}`;
  $(function() {
    $.ajax({
      url: queryN2YO + aboveQuery + apiKeyN2YO,
      method: "GET"
    }).then(result => {
      $("#spinner").hide();
      const aboveDataHome = result.above;
      console.log(aboveDataHome);
      var userID = "";
      $.get("/api/user_data").then(function(data) {
        userID = data.id;
      });
      for (let i = 0; i < aboveDataHome.length; i++) {
        var percentage1 = Math.floor(Math.random() * 21) + 40;
        var percentage2 = Math.floor(Math.random() * 21) + 20;
        var markerLink = `<a href="#satellite${i +
          1}" uk-toggle class="uk-position-absolute uk-transform-center" style="left: 
          ${i + percentage1 + 5}%; top: 
          ${i + percentage2 + 5}%" href="#" uk-marker>
      <i class="fas fa-satellite"></i></a>
      <div id="satellite${i + 1}" class="uk-flex-top" uk-modal>
      <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical" id="satellite${i +
        1}">
        <button class="uk-modal-close-outside" type="button" uk-close></button>

        <p id="satellite-${i + 1}-name"style="font-weight: bold;">
        ${aboveDataHome[i].satname}</p>
        <p id="satellite-${i + 1}-launch">IDENTIFICATION : 
        ${aboveDataHome[i].satid}
        <p id="satellite-${i + 1}-launch">LAUNCH : 
        ${aboveDataHome[i].launchDate}</p>
        <p id="satellite-${i + 1}-class">CLASSIFICATION : </p>
        <button class="sat" 
        data-name="${aboveDataHome[i].satname}" 
        data-id="${aboveDataHome[i].satid}" 
        uk-icon="icon: bookmark; ratio: 2"></button>
        <br>
        <a href="/maps"> VIEW MAP</a>
        </div> </div>`;
        $("#satellite-display").append(markerLink);
      }
      $(".sat").on("click", function(event) {
        var satellite = $(this);
        $(this).hide();
        event.preventDefault();
        satData = {
          satName: satellite.attr("data-name"),
          satID: satellite.attr("data-id"),
          nickname: satellite.attr("data-name"),
          UserId: userID
        };
        $.post("/api/user_favorites", satData).then(function() {
          getFavorites();
        });
      });
    });
  });
}

getFavorites();

function getFavorites() {
  $("#fav-satellite").empty();
  $.get("/api/user_favorites").then(function(data) {
    for (let i = 0; i < data.length; i++) {
      var satFav = $("<p>");
      satFav.text(`${data[i].nickname}`);
      $("#fav-satellite").append(satFav);
    }
  });
}
