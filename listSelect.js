fetch('https://stanjakoscipowietrza.herokuapp.com/cityList/lists')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
		createCityList(data);
	})
    .catch(function (err) {
        console.log('error: ' + err);
});
			
function createCityList(data) {
		
    var cities = document.getElementById("cities");
			
	for (var i = 0; i < data.length; i++){
		var option = document.createElement("option");
		option.text = data[i].name;
		option.value = data[i].id;
		cities.add(option);
	}
			
}
