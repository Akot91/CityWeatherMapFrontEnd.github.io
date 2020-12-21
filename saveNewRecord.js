function databasebData(dbData, cityListName, citiesValue) {
	var size = dbData;
	var nextRecord = size + 1;
			
	var xhr = new XMLHttpRequest();
	var url = "https://stanjakoscipowietrza.herokuapp.com/cityList/lists";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	var data = JSON.stringify({"id": nextRecord, "name": cityListName, "cityIds": citiesValue});
	xhr.send(data);
			
	alert("Nowa lista " + cityListName + " została utworzona w bazie");
	window.open("index.html");
}
		
function createNewRecord(data) {
	var cities = document.getElementsByClassName("cityList");
	var citiesValue = "";
	var cityListName = document.getElementById("cityListName").value;
			
	for (var i = 0; i < cities.length; i++) {
		if (cities[i].checked == true) {
			citiesValue += cities[i].value + ", ";
		}
	}
			
	citiesValue = citiesValue.slice(0,-2);
			
	fetch('https://stanjakoscipowietrza.herokuapp.com/cityList/lists/size')
        .then(function (response) {
            return response.json();
        })
        .then(function (dbData) {
			databasebData(dbData, cityListName, citiesValue);
		})
        .catch(function (err) {
            console.log('error: ' + err);
        });					
}
