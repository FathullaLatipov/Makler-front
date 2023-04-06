// import axios from "axios";

// export default function renderMap() {
//   let points = {};
//   let btnSubmitAddress = document.querySelector("#save-address");
//   if (btnSubmitAddress) {
//     ymaps.ready(function () {
//       var myMap = new ymaps.Map("map", {
//           center: [41.311158, 69.279737],
//           zoom: 12,
//           controls: [],
//         }),
//         suggestView = new ymaps.SuggestView("suggest");

//       btnSubmitAddress.addEventListener("click", (e) => {
//         e.preventDefault();
//         let address = document.querySelector("#suggest").value;
//         address = address.replace(/,/g, "");
//         address = address.replace(/ /g, ",");
//         axios
//           .get(
//             `https://geocode-maps.yandex.ru/1.x/?apikey=c5bd98ea-afd9-433c-909d-a54b6459fb30&format=json&geocode=${address}`
//           )
//           .then(function (response) {
//             // handle success

//             points =
//               response.data.response.GeoObjectCollection.featureMember[0]
//                 .GeoObject.Point;

//             myMap.setCenter(
//               [
//                 Number(points.pos.split(" ")[1]),
//                 Number(points.pos.split(" ")[0]),
//               ],
//               18
//             );

//             myMap.geoObjects.removeAll();

//             var myPlacemark = new ymaps.Placemark(
//               myMap.getCenter(),
//               {
//                 hintContent: "Собственный значок метки",
//                 balloonContent: "Это красивая метка",
//               },
//               {
//                 // Опции.
//                 // Необходимо указать данный тип макета.
//                 iconLayout: "default#image",
//                 // Своё изображение иконки метки.
//                 iconImageHref: "../img/mapIcon.svg",
//                 // Размеры метки.
//                 iconImageSize: [30, 42],
//                 // Смещение левого верхнего угла иконки относительно
//                 // её "ножки" (точки привязки).
//                 iconImageOffset: [-5, -38],
//               }
//             );
//             myMap.geoObjects.add(myPlacemark);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       });
//     });
//   }
// }
