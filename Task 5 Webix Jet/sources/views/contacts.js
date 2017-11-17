import {JetView, plugins} from "webix-jet";
import {getData} from "models/contacts";
import {getCountries} from "models/countries";
import {getStatuses} from "models/statuses";

export default class ContactsView extends JetView{
	config(){

		var rules = {
			name: webix.rules.isNotEmpty,
			email: webix.rules.isNotEmpty
		};

		function unselectAll_list(){
			$$("contactsList").unselectAll();
		};

		function delete_item(){
			var item = this.getParentView().getValues();
          	if(item)
          		$$("contactsList").remove(item);
          		unselectAll_list();
		};

		function save_form(){
			var form = this.getParentView();
				if (form.validate())
					form.save();		
		};

		var list = { view: "list",
			id:"contactsList", 
			borderless:true,   
			template:"<b>#name#</b><br/>#email#",
			type: { height: 80 },
			select:true,
			on: {
				onItemClick: function(id){

				} 
			}
			//rules: rules
		};

		var header = {type:"header", template:"Contacts", css:"center"};

		var form = { view: "form", id: "contactsForm", 
			elements:[
				{ template:"Contacts Form", type:"section"},
	    		{ view:"text", 		label:"User Name", 	labelWidth: 100,	name:"name", 	invalidMessage: "Invalid User Name!" },
	    		{ view:"text", 		label:"E-Mail", 	labelWidth: 100,	name:"email", 	invalidMessage: "Invalid Email!"},
	    		{ view:"select", 	label:"Country", 	labelWidth: 100,	name:"country",	options: getCountries()},
	    		{ view:"select", 	label:"Status", 	labelWidth: 100,	name:"status", 	options:["Status1", "Status2"]},
	    		{ view:"button", value:"Save", click: save_form},
	    		{ view:"button", type:"danger", value:"Delete", click: delete_item},
				{}
			],
			rules: rules
		};

		var ui = { cols:[
			{ rows:[ header, list] },
			form
			]};

		return ui;
	}
	init(view){
		view.queryView({ view:"list"}).parse(getData());

		view.queryView({ view:"form"}).bind(view.queryView({ view:"list"}));

	}
}