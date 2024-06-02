let cities = [
    { arabicName: "أدرار", name: "Adrar" },
    { arabicName: "الشلف", name: "Chlef" },
    { arabicName: "الأغواط", name: "Laghouat" },
    { arabicName: "أم البواقي", name: "Oum El Bouaghi" },
    { arabicName: "باتنة", name: "Batna" },
    { arabicName: "بجاية", name: "Bejaia" },
    { arabicName: "بسكرة", name: "Biskra" },
    { arabicName: "بشار", name: "Bechar" },
    { arabicName: "البليدة", name: "Blida" },
    { arabicName: "البويرة", name: "Bouira" },
    { arabicName: "تمنراست", name: "Tamanrasset" },
    { arabicName: "تبسة", name: "Tebessa" },
    { arabicName: "تلمسان", name: "Tlemcen" },
    { arabicName: "تيارت", name: "Tiaret" },
    { arabicName: "تيزي وزو", name: "Tizi Ouzou" },
    { arabicName: "الجزائر", name: "Algiers" },
    { arabicName: "الجلفة", name: "Djelfa" },
    { arabicName: "جيجل", name: "Jijel" },
    { arabicName: "سطيف", name: "Setif" },
    { arabicName: "سعيدة", name: "Saïda" },
    { arabicName: "سكيكدة", name: "Skikda" },
    { arabicName: "سيدي بلعباس", name: "Sidi Bel Abbes" },
    { arabicName: "عنابة", name: "Annaba" },
    { arabicName: "قالمة", name: "Guelma" },
    { arabicName: "قسنطينة", name: "Constantine" },
    { arabicName: "المدية", name: "Medea" },
    { arabicName: "مستغانم", name: "Mostaganem" },
    { arabicName: "المسيلة", name: "Msila" },
    { arabicName: "معسكر", name: "Mascara" },
    { arabicName: "ورقلة", name: "Ouargla" },
    { arabicName: "وهران", name: "Oran" },
    { arabicName: "البيض", name: "El Bayadh" },
    { arabicName: "اليزي", name: "Illizi" },
    { arabicName: "برج بوعريريج", name: "Bordj Bou Arreridj" },
    { arabicName: "بومرداس", name: "Boumerdes" },
    { arabicName: "الطارف", name: "El Tarf" },
    { arabicName: "تندوف", name: "Tindouf" },
    { arabicName: "تيسمسيلت", name: "Tissemsilt" },
    { arabicName: "الوادي", name: "El Oued" },
    { arabicName: "خنشلة", name: "Khenchela" },
    { arabicName: "سوق أهراس", name: "Souk Ahras" },
    { arabicName: "تيبازة", name: "Tipaza" },
    { arabicName: "ميلة", name: "Mila" },
    { arabicName: "عين الدفلى", name: "Aïn Defla" },
    { arabicName: "النعامة", name: "Naama" },
    { arabicName: "عين تموشنت", name: "Aïn Temouchent" },
    { arabicName: "غرداية", name: "Ghardaia" },
    { arabicName: "غليزان", name: "Relizane" },
    { arabicName: "تميمون", name: "Timimoun" },
    { arabicName: "برج بادجي مختار", name: "Bordj Badji Mokhtar" },
    { arabicName: "أولاد جلال", name: "Ouled Djellal" },
    { arabicName: "بني عباس", name: "Béni Abbès" },
    { arabicName: "إن صالح", name: "In Salah" },
    { arabicName: "إن قزام", name: "In Guezzam" },
    { arabicName: "تقرت", name: "Touggourt" },
    { arabicName: "جانت", name: "Djanet" },
    { arabicName: "المغير", name: "El M’Ghaier" },
    { arabicName: "المنيعة", name: "El Meniaa" }
  ];
  
  
  for (let city of cities) {
      const content = `
      <option>${city.arabicName}</option>
      `
      document.getElementById("cities-select").innerHTML += content 
  }
  
      document.getElementById("cities-select").addEventListener("change" , function () {
          
          document.getElementById("city-name").innerHTML = this.value
          
          let cityName = "" 
          for (let city of cities) {
              if(city.arabicName == this.value) {
                  cityName = city.name
              }
          }
          getPrayersTimingOfCity(cityName)
          console.log(this.value)
      })
  
      function getPrayersTimingOfCity (cityName) {
          let params = {
      country: "DZ",
      city: cityName // Alger
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
      params: params
    })
    .then(function (response) {
      const timings  = response.data.data.timings
      fillTimeForPrayer("fajr-time" , timings.Fajr )
      fillTimeForPrayer("sunrise-time" , timings.Sunrise )
      fillTimeForPrayer("dhuhr-time" , timings.Dhuhr )
      fillTimeForPrayer("asr-time" , timings.Asr )
      fillTimeForPrayer("sunset-time" , timings.Sunset )
      fillTimeForPrayer("isha-time" , timings.Isha )
  
      const readableDate = response.data.data.date.readable
      const weekDay = response.data.data.date.hijri.weekday.ar
      const date = weekDay +  " " + readableDate
      document.getElementById("date").innerHTML = date
      // document.getElementById("fajr-time").innerHTML = timings.Fajr
      // console.log( weekDay +  " " + readableDate );
    })
    .catch(function (error) {
      console.log(error);
    })
  
      }
  
      getPrayersTimingOfCity("Alger")
  
    function fillTimeForPrayer(id, time) {
      document.getElementById(id).innerHTML = time
    }