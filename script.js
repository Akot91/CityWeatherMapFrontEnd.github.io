var installationUrl = 'https://stanjakoscipowietrza.herokuapp.com/airly/installations/chosenInstallations/';
var chosenCitiesUrl = 'https://stanjakoscipowietrza.herokuapp.com/airly/installations/chosenCities/';
var actualCityList = 1;
 		
loadData(actualCityList);
		
function loadData(cityListNumber) {
	var newInstallationUrl = installationUrl + actualCityList;
	var newChosenCitiesUrl = chosenCitiesUrl + actualCityList;

	console.log(newInstallationUrl);
	console.log(newChosenCitiesUrl);
	
	fetch(newInstallationUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
			fetch(newChosenCitiesUrl)
				.then(function (response2) {
					return response2.json();
				})
                .then(function (data2) {
					appendData(data, data2);
				})
		})
        .catch(function (err) {
            console.log('error: ' + err);
        });
}
		
function changeData() {
	var cities = document.getElementById("cities");
	actualCityList = cities.value;
			
	var mainContainer = document.getElementById("myData");
	mainContainer.innerHTML = '';
		
	var measurmentDate = document.getElementById("measurmentDate");
	measurmentDate.innerHTML = '';
		
	loadData(actualCityList);
}
			
function appendData(data, data2) {	
    var mainContainer = document.getElementById("myData");
	var measurmentDate = document.getElementById("measurmentDate");
			
	measurmentDate.appendChild(document.createTextNode(data[0].current.fromDateTime.slice(0,10)));
			
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
				
		var tdCity = document.createElement("td");
		var tdPM1 = document.createElement("td");
		var tdPM25 = document.createElement("td");
		var tdPM10 = document.createElement("td");
		var tdNO2 = document.createElement("td");
		var tdCO = document.createElement("td");
		var tdSO2 = document.createElement("td");
		var tdO3 = document.createElement("td");
		var tdPressure = document.createElement("td");
		var tdHumidity = document.createElement("td");
		var tdTemperature = document.createElement("td");
		var tdAirQuality = document.createElement("td");
				
		var airQuality = data[i].current.indexes[0].level;
				
		var street;
		if (data2[i].address.street != null) {
			street = ', \n' + data2[i].address.street;
		} else {
			street = '';
		}
				
		tdCity.appendChild(document.createTextNode(data2[i].address.city + street));
		tdCity.style.fontWeight = "500";
		
		for (var j = 0; j < data[i].current.values.length; j++) {
			var name = data[i].current.values[j].name;
			var value = document.createTextNode(data[i].current.values[j].value);
					
			switch (name) {
				case 'PM1':
					tdPM1.appendChild(value);
					break;
				case 'PM25':
					tdPM25.appendChild(value);
					break;
				case 'PM10':
					tdPM10.appendChild(value);
					break;
				case 'NO2':
					tdNO2.appendChild(value);
					break;
				case 'CO':
					tdCO.appendChild(value);
					break;
				case 'SO2':
					tdSO2.appendChild(value);
					break;
				case 'O3':
					tdO3.appendChild(value);
					break;
				case 'PRESSURE':
					tdPressure.appendChild(value);
					break;
				case 'HUMIDITY':
					tdHumidity.appendChild(value);
					break;
				case 'TEMPERATURE':
					tdTemperature.appendChild(value);
					break;
				default:
			} 
					
		}
				
		switch (airQuality) {
			case 'LOW':
				markAirQuality('images/OK.png', 'good-air', tdAirQuality, tr);
				break;
			case 'MEDIUM':
				markAirQuality('images/MEDIUM.png', 'medium-air', tdAirQuality, tr);
				break;
			case 'HIGH':
				markAirQuality('images/BAD.png', 'bad-air', tdAirQuality, tr);
				break;
			case 'VERY_HIGH':
				markAirQuality('images/VERY_BAD.png', 'very-bad-air', tdAirQuality, tr);
				break;
			default:
		}
					
		tr.appendChild(tdCity);
		tr.appendChild(tdPM1);
		tr.appendChild(tdPM25);
		tr.appendChild(tdPM10);
		tr.appendChild(tdNO2);
		tr.appendChild(tdCO);
		tr.appendChild(tdSO2);
		tr.appendChild(tdO3);
		tr.appendChild(tdPressure);
		tr.appendChild(tdHumidity);
		tr.appendChild(tdTemperature);
		tr.appendChild(tdAirQuality);
				
		mainContainer.appendChild(tr);
	}
}

function markAirQuality(icon, rowClass, tableCol, tableRow) {
	var img = document.createElement("img");
	img.src = icon;
	tableCol.appendChild(img);
	tableRow.classList.add(rowClass);
}
