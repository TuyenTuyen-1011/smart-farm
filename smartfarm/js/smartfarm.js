import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUgzm5Vqp_OBhkJnsqD-s-oQwSzn_T9sg",
  authDomain: "smart-farm-41d8d.firebaseapp.com",
  projectId: "smart-farm-41d8d",
  storageBucket: "smart-farm-41d8d.firebasestorage.app",
  messagingSenderId: "1094978194728",
  appId: "1:1094978194728:web:67251bbc2e83198513941d",
  measurementId: "G-FWN312MGMQ",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

onValue(ref(db, "DHT11"), (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const temp = data.nhietdo;
  const humi = data.doam;

  document.getElementById("nhietdo").innerText = temp + " °C";
  document.getElementById("doam").innerText = humi + " %";
});

onValue(ref(db, "state1"), (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  if (data === true) {
    document.getElementById("warnLed").innerText = "Đang bật";
  } else {
    document.getElementById("warnLed").innerText = "Đang tắt";
  }
});

onValue(ref(db, "state3"), (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  if (data === true) {
    document.getElementById("warnMaybom").innerText = "Đang bật";
  } else {
    document.getElementById("warnMaybom").innerText = "Đang tắt";
  }
});

var change = true;
document.getElementById("log").onclick = function () {
  if (change) {
    document.getElementsByClassName("box1")[0].style.display = "none";
    document.getElementsByClassName("box2")[0].style.display = "block";
    change = false;
  } else {
    document.getElementsByClassName("box1")[0].style.display = "block";
    document.getElementsByClassName("box2")[0].style.display = "none";
    change = true;
  }
};

onValue(ref(db, "CBND"), (snapshot) => {
  const data = snapshot.val();
  const box2 = document.getElementsByClassName("box2")[0];

  box2.innerHTML = "";
  box2.innerHTML += `<h1 class="heading">Log hệ thống</h1>
  <button class="golive" id="live2">
    <img src="img/stream.png" alt="lỗi tải ảnh" />
  </button>
  <h2>Ngày: <span id="ngayLog">--</span></h2>`;

  Object.entries(data).forEach(([key]) => {
    const dataNgay = data[key];

    document.getElementById("ngayLog").innerText = key;

    Object.entries(dataNgay).forEach(([time, val]) => {
      let h2 = document.createElement("h2");
      h2.innerText = `${time} || Nhiệt độ: ${val.nhietdo}°C || Độ ẩm: ${val.doam}%`;
      box2.appendChild(h2);
    });
  });
});
