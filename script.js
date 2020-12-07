var data = null;
var Countries=[];
var ulCountry = document.getElementById('ulCountry');

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
//xhr.withCredentials = true;

xhr.onload = function(e) {
    if (this.status == 200) {
      //console.log('response', this.response); // JSON response 
      this.resData= this.response;
      for(i=0;i<this.response.length;i++){   
          var country ={
              name:this.response[i].name,
              capital:this.response[i].capital,
              population:this.response[i].population,
              region:this.response[i].region,
              area:this.response[i].area,
              alpha2Code:this.response[i].alpha2Code,
              alpha3Code:this.response[i].alpha3Code,
              borders: this.response[i].borders,
              currencies: this.response[i].currencies,
              languages : this.response[i].languages,
              latlng: this.response[i].latlng,
              nativeName:this.response[i].nativeName,
              subregion:this.response[i].subregion,
              timezones:this.response[i].timezones,
              callingCodes:this.response[i].callingCodes
          };
          Countries[i]=country;
          
          
      }
      populateUl('A');
    }
  };

xhr.open("GET", "https://restcountries-v1.p.rapidapi.com/all");
xhr.setRequestHeader("x-rapidapi-host", "restcountries-v1.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "5xgJGp0O9Tmshqgh8XvZY1alx0Ptp1EKqT4jsnVbaVdzBdd6wr");


xhr.send(data);

function populateUl(ele){
    var list = document.getElementById('countries');
    list.innerHTML='';
    for(i=0; i<Countries.length; i++){
        if(Countries[i].name[0]==ele){
            var div = document.createElement('div');
            div.classList.add('country');
            div.setAttribute("onclick", "displayDetails(this)");
            div.innerText =Countries[i].name;
            list.appendChild(div);
        }
        
    }     
}
function displayDetails(country){
    var image = document.getElementById('image');
    var h2 = document.getElementById('title');
    var capital = document.getElementById('capital');
    var area = document.getElementById('area');
    var population = document.getElementById('population');
    var region = document.getElementById('region');
    var alpha3Code = document.getElementById('alpha3Code');
    var alpha2Code = document.getElementById('alpha2Code');
    var borders = document.getElementById('borders');
    var callingCodes = document.getElementById('callingCodes');
    var currencies = document.getElementById('currencies');
    var latlng = document.getElementById('latlng');
    var languages = document.getElementById('languages');
    var timezones = document.getElementById('timezones');
    var ct = searchCountry(country.innerText);
    h2.innerText=country.innerText+"( "+ct.nativeName+" )";
    capital.innerText=`Capital: ${ct.capital}`;
    region.innerText="Region: "+ct.region;
    area.innerText = "Area: "+ct.area;
    population.innerText = "Population: "+ct.population; 
    alpha2Code.innerText = "Alpha2Code: "+ct.alpha2Code;
    alpha3Code.innerText = "Alpha3Code: "+ct.alpha3Code;
    borders.innerText = "Borders: " +ct.borders;
    callingCodes.innerText = "callingCodes: "+ct.callingCodes;
    currencies.innerText = "Currencies: "+ct.currencies;
    latlng.innerText = "latlng: "+ct.latlng;
    languages.innerText = "Languages: "+ct.languages;
    timezones.innerText = "Timezones: "+ct.timezones;
    image.style.background ="url(./images/"+ct.name+".png";
    image.style.backgroundRepeat="no-repeat";
    image.style.backgroundSize="cover";
    //console.log(ct);
}
function searchCountry(name){
    for(i=0;i<Countries.length;i++){
        if(name==Countries[i].name){
            return Countries[i];
        }
    }
    return null;
}