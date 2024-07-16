let cities = [
    {
        arName: "مكة المكرمة",
        name: "Makkah al Mukarramah",
    },
    {
        arName: "الرياض",
        name: "Ar Riyāḑ",
    },
    {
        arName: "عسير",
        name: "'Asīr",
    },
    {
        arName: "الباحة",
        name: "Al Bāḩah",
    },
    {
        arName: "الجوف",
        name: "Al Jawf",
    },
    {
        arName: "المدينة المنورة",
        name: "Al Madīnah al Munawwarah",
    },
    {
        arName: "القصيم",
        name: "Al Qaşīm",
    },
    {
        arName: "الحدود الشمالية",
        name: "Al Ḩudūd ash Shamālīyah",
    },
    {
        arName: "الشرقية",
        name: "Ash Sharqīyah",
    },
];
let Params = {
    country: "sa",
    city: city,
};
let day = document.getElementById("day");
let date = document.getElementById("date");
let fajr = document.getElementById("fajr");
let shrooq = document.getElementById("shrooq");
let duhr = document.getElementById("dhuhr");
let asr = document.getElementById("asr");
let magreb = document.getElementById("maghrib");
let aisha = document.getElementById("aisha");
for (let city of cities) {
    let content = `<option>${city.arName}</option>`;
    document.getElementById("select").innerHTML += content;
}
document.getElementById("city").innerHTML =
    document.getElementById("select").value;

function GetPrayTime() {
    axios
        .get(
            `https://api.aladhan.com/v1/timingsByCity?city=${Params.city}&country=${Params.country}`
        )
        .then((response) => {
            console.log(response.data.data);
            day.innerHTML = response.data.data.date.hijri.weekday.ar;
            date.innerHTML = response.data.data.date.hijri.date;
            fajr.innerHTML = response.data.data.timings.Fajr;
            shrooq.innerHTML = response.data.data.timings.Sunrise;
            duhr.innerHTML = response.data.data.timings.Dhuhr;
            asr.innerHTML = response.data.data.timings.Asr;
            magreb.innerHTML = response.data.data.timings.Maghrib;
            aisha.innerHTML = response.data.data.timings.Isha;
        })
        .catch((error) => {
            console.log(error);
        });
}
GetPrayTime();
function mapCityNameToIso(cityName) {
    let newCityName = "";
    for (let city of cities) {
        if (city.arName == cityName) {
            newCityName = city.name;
            return newCityName;
        }
    }
    return "Makkah al Mukarramah";
}
document.getElementById("select").addEventListener("change", function () {
    document.getElementById("city").innerHTML = this.value;
    Params.city = mapCityNameToIso(this.value);
    GetPrayTime();
});
