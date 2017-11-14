import {JetView} from "webix-jet";
import {data} from "models/contacts";

export default class DataView extends JetView{
	config(){

		return { view:"datatable", autoConfig:true };
	}
	init(view){
		view.parse(data);
	}
}