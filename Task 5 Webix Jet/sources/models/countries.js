 const data = new webix.DataCollection({ data:[
	{ id:1, name:"USA", shortname: "US"},
	{ id:2, name:"Russia", shortname: "RUS"},
	{ id:3, name:"Belarus", shortname: "MLR"},
	{ id:4, name:"China", shortname: "CN"},
	{ id:5, name:"Japan", shortname: "JP"},
	{ id:6, name:"Canada", shortname: "CND"},
	{ id:7, name:"France", shortname: "FR"}
]});

 export function getCountries(){ return data; };