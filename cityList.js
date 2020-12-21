fetch('https://stanjakoscipowietrza.herokuapp.com/airly/installations/allCities')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
		appendData(data);
	})
    .catch(function (err) {
        console.log('error: ' + err);
    });
			
function appendData(data) {
		
    var mainContainer = document.getElementById("myData");

    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
				
		var id = data[i].locationId;
				
		var tdCity = document.createElement("td");
		var tdBox = document.createElement("td");
		
		var cBox = document.createElement("INPUT");
				
		var street;
		
		if (data[i].address.street != null) {
			street = ', \n' + data[i].address.street;
		} else {
			street = '';
		}
				
		cBox.setAttribute("type", "checkbox");
		cBox.value = id;
		cBox.classList.add("cityList");
		
		tdBox.appendChild(cBox);
				
		tdCity.appendChild(document.createTextNode(data[i].address.city + street));
		tdCity.style.fontWeight = "500";				
					
		tr.appendChild(tdBox);
		tr.appendChild(tdCity);
				
		mainContainer.appendChild(tr);
	}
}
