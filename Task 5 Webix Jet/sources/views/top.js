import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){
		var header = {
			type:"header", template: "MyApp!"
		};

		var menu = {
			view:"menu", id:"top:menu", 
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon fa-#icon#'></span> #value# ",
			data:[
				{ value:"Contacts", id:"contacts", 	icon:"users" },
				{ value:"Data",		id:"data",  	icon:"database" },
				{ value:"Setting",	id:"settings",  	icon:"cogs" }
			]
		};

		var ui = {
			type:"line", cols:[
				{ type:"clean", css:"app-left-panel",
					padding:10, margin:20, borderless:true, rows: [ header, menu ]},
				{ rows:[ { height:10}, 
					{ type:"clean", css:"app-right-panel", padding:4, rows:[
						{ $subview:true } 
					]}
				]}
			]
		};


		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
}