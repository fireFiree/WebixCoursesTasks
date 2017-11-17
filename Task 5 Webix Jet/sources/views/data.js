import {JetView} from "webix-jet";
import {data} from "models/contacts";

export default class DataView extends JetView{
	config(){

		var header = { type:"header", template: "Data", css:"center"};

		var menu = {
			view:"menu", id:"data:menu", 
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon fa-#icon#'></span> #value# ",
			data:[
				{ value:"Countries", 	id:"countries", 	icon:"globe" },
				{ value:"Statuses",		id:"statuses",  	icon:"certificate" }
			],
			click: function(id){
				if( id === "data")
					this.$scope.show("data/countries");
				else
					this.$scope.show(id);
			}
		};

		var ui = {
			type:"line", rows:[ header, {cols:[
				{ type:"clean", css:"app-left-panel", padding:5, margin:5, borderless:true, rows: [ menu ]},
				{ rows:[ { height:10}, 
					{ type:"clean", css:"app-right-panel", padding:20, rows:[
						{ $subview:true } 
					]}
				]}
			]}]
		};

		return ui;
	}
	init(view){
	}
}