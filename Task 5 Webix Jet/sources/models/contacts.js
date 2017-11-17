 const data = new webix.DataCollection({ data:[
	{ id:1, name:"Contact 1", email:" contact1@email.com", country:"USA"},
	{ id:2, name:"Contact 2", email:" contact2@email.com", country:"USA"},
	{ id:3, name:"Contact 3", email:" contact3@email.com", country:"Canada"},
	{ id:4, name:"Contact 4", email:" contact4@email.com", country:"Canada"},
	{ id:5, name:"Contact 5", email:" contact5@email.com", country:"USA"},
	{ id:6, name:"Contact 6", email:" contact6@email.com", country:"USA"}
]});

 export function getData(){ return data; };