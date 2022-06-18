function toggleNavigation() {
  const x = document.getElementById("navigation");
  if (x.className === "navbar-right") {
    x.className += " responsive";
  } else {
    x.className = "navbar-right";
  }
}

function createMap(elementId) {
  let uluru = { lat: 0, lng: 0 };

  switch (elementId) {
    case "map1":
      uluru.lat = 13.726669960144392;
      uluru.lng = 100.51003778201455;
      break;
    case "map2":
      uluru.lat = 25.19876564986349;
      uluru.lng = 55.27960550172962;
      break;
    case "map3":
      uluru.lat = 25.19876564986349;
      uluru.lng = 55.27960550172962;
      break;
    case "map4":
      uluru.lat = 37.51708248865795;
      uluru.lng = 126.90387918191314;
      break;

  }

  const map = new google.maps.Map(document.getElementById(elementId), {
    zoom: 16,
    center: uluru,
  });

  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

function initMap() {
  createMap("map1");
  createMap("map2");
  createMap("map3");
  createMap("map4");
}

function validateCountry(str) {
  const validCountries = ["indonesia", "japan"];
  return validCountries.includes(str);
}

function containsNumber(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) >= '0' && str.charAt(i) <= '9') {
      return true;
    }
  }

  return false;
}

function validateNumber(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) < '0' || str.charAt(i) > '9') {
      return false;
    }
  }

  return str.length == 12;
}

function validateEmail(str) {
  let atSymbol = str.indexOf("@");
  if (atSymbol < 1) return false;

  let dot = str.indexOf(".");
  if (dot <= atSymbol + 2) return false;

  if (dot === str.length - 1) return false;
  return true;
}

function subscribeListener(form) {
  let formData = new FormData(form);
  for (let [key, val] of formData.entries()) {
    if (val.trim().length === 0) {
      alert("Please fill in all the fields!");
      return false;
    }

    switch (key) {
      case "name":
        if (containsNumber(val)) {
          alert("Name cannot contain numbers!");
          return false;
        }
        break;
      case "email":
        if (validateEmail(val) === false) {
          alert("Please enter a valid email address!");
          return false;
        }
        break;
      case "phone":
        if (validateNumber(val) === false) {
          alert("Please enter a valid phone number!");
          return false;
        }
        break;
      case "country":
        if (validateCountry(val) === false) {
          alert("Please enter a valid country!");
          return false;
        }
        break;
      default:
        break;
    }
  }

  if (!document.getElementById("terms").checked) {
    alert("Please agree to the terms and conditions!");
    return false;
  }

  alert("Subscribed successfully");
  return true;
}

function elementExists(ele) {
  return (typeof (ele) != 'undefined' && ele != null);
}

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

window.onload = function () {
  window.initMap = initMap;
  let btnContainer = document.getElementById("filter-container");
  if (elementExists(btnContainer)) {
    filterSelection("all");

    let btns = btnContainer.getElementsByClassName("btn-default");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("filter-active");
        current[0].className = current[0].className.replace(" filter-active", "");
        this.className += " filter-active";
      });
    }
  }
}