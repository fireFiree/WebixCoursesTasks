import {JetView, plugins} from "webix-jet";
import {data} from "models/contacts";

export default class ContactsView extends JetView{
	config(){

		var rules = {
			name: webix.rules.isNotEmpty,
			email: webix.rules.isNotEmpty
		}

		//webix.protoUI({
		//    name:"editlist"
		//}, webix.EditAbility, webix.ui.list);

		var list = { view: "list",
			id:"contactsList", 
			borderless:true,   
			template:"<b>#name#</b>#email#",
			//editable:true,
			//editor:"text",
			//editValue:"name",
			//editaction:"dblclick",
			select:true,
			//rules: rules
		};

		var header = {view:"label", label:"Contacts", css:"center"};

		var form = { view: "form", id: "contactsForm",
			elements:[
	    		{ view:"text", 	label:"User Name", 	name:"name", 	invalidMessage: "Invalid User Name!" },
	    		{ view:"text", 	label:"E-Mail", 	name:"email", 	invalidMessage: "Invalid Email!" },
	    		{ view:"select", label:"Country", 	name:"country",	options:["USA", "Canada"]},
	    		{ view:"select", label:"Status", 	name:"status", 	options:["Status1", "Status2"]},
	    		{ view:"button", value:"Save"},
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
		$$("contactsList").parse(data);
		$$("contactsForm").bind($$("contactsList"));
	}
}