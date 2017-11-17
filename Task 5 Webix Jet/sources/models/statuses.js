 const data = new webix.DataCollection({ data:[
	{ id:1, name:"Status1", icon: "user"},
	{ id:2, name:"Status2", icon: "cog"},
	{ id:3, name:"Status3", icon: "database"}
]});

 export function getStatuses(){ return data; };