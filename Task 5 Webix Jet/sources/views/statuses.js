import {JetView, plugins} from "webix-jet";
import {getStatuses} from "models/statuses";

export default class StatusesView extends JetView{
	config(){

		function add_item(){
			var newObj= { name: "New Status", icon:"Icon"};
			$$("dataTable").add(newObj);
		};

		function delete_item(){
			var itemId = $$("dataTable").getSelectedId();
          	$$("dataTable").remove(itemId);
		};

		var rules = {
			name: webix.rules.isNotEmpty,
			icon: webix.rules.isNotEmpty
		};

		var toolbar = { view:"toolbar", cols:[
		        { view:"button", value:"Add", width:100, click: add_item},
		        { view:"button", value:"Delete", width:100, click: delete_item }

   		]};

		var datatable = { view: "datatable", id:"dataTable", autoConfig: true,
						scrollX: false, editable: true,
						editaction:"dblclick", select: true,
						rules: rules
		};


		return { rows:[ toolbar, datatable] };	
	}

	init(view){
		view.queryView({view:"datatable"}).parse(getStatuses());
	}
}