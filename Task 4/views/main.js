var products = new webix.DataCollection({
  url:"data/products.js"
});

var films = new webix.DataCollection({
  url:"data/data.js"
});
var users = new webix.DataCollection({
  url:"data/users.js"
});


rules = {
  			title:webix.rules.isNotEmpty,
  			year: function(year){
  				return (year >= 1970 && year <= (new Date()).getFullYear());
			},
  			rating: function(rating){
  				return (rating != 0 && rating != "");
			},
  			votes: function(votes){
  				return ( votes >= 0 && votes <= 100000);
			}
};

function addItem(){

	if($$("filmForm").validate()){
		var item = $$("filmForm").getValues();
		var newObj = {
			//id : $$("dataTable").count() +1,
			title :item.title.replace(/<\/?[^>]+(>|$)/g, ""),
			year :item.year.replace(/<\/?[^>]+(>|$)/g, ""),
			rating :item.rating.replace(/<\/?[^>]+(>|$)/g, ""),
			votes: item.votes.replace(/<\/?[^>]+(>|$)/g, ""),
			rank: ""
		};
		$$("dataTable").add(newObj);
		//webix.message({text: "Succesed validation!"});
	}
};

function clearForm(){
	$$("filmForm").clear();
	$$("filmForm").clearValidation();
	$$("dataTable").unselectAll();
};

function sortASC(){
	$$("usersList").sort('#name#', 'asc');
};
function sortDESC(){
	$$("usersList").sort('#name#', 'desc');
}; 


var form = { view: "form", id: "filmForm", maxWidth:300,
			elements:[
        		{ template:"Edit Films", type:"section"},
        		{ view:"text", label:"Title", name: "title", invalidMessage:"Title is Required!" },
        		{ view:"text", label:"Year", name: "year",invalidMessage:"Invalid year!"},
        		{ view:"text", label:"Rating", name: "rating", invalidMessage:"Rating is required!"},
       			{ view:"text", label:"Votes", name: "votes", invalidMessage:"Invalid votes!"},
       			{cols:[
					{ view:"button", value:"Add", id: "btnAdd", type:"form", click:addItem },
					{ view:"button", id: "btnClear", value:"Clear", click: clearForm }
					]},
					{}
				],
				rules: rules};

var dataTable = { view: "datatable", id:"dataTable", editable:true, editaction:"dblclick", data:films, select:true, 
				scrollX: false, columns:[
			{ id:"title", editor:"text", header:["Film Title", {content:"textFilter"}], sort:"string", fillspace: true},
			{ id:"year", editor:"text", header:["Year", {content:"textFilter"}], sort:"int"},
			{ id:"rating", editor:"text", header:["Rating", {content:"textFilter"}], sort:"string"},
			{ id:"votes", editor:"text", header:["Votes", {content:"textFilter"}], sort:"string"},
			{ id:"rank",  editor:"text", header:["Rank", {content:"textFilter"}], sort:"int"}	
			],
			rules: rules	
};

var dataView = { view:"dataview", id:"dataView", xCount:2, type: { height: 60 }, template:"#title# \n Year: #year#, Rank: #rank#"};



webix.protoUI({
    name:"editlist"
}, webix.EditAbility, webix.ui.list, webix.EventSystem);

var chart = { id: "Users", autoWidth: true, rows:[
			{ cols:[
				{view:"text", id:"listFilter", placeholder: "Type of filter..."},
				{view:"button", id:"sortASC", value:"Sort ASC", click: sortASC},
				{view:"button", id:"sortDESC", value:"Sort DESC", click: sortDESC},
				]},
			{ view: "editlist",borderless:true, template:"<b>#name#</b> #age# old years From #country#", id:"usersList", editable:true, 
			editor:"text", editValue:"name", editaction:"dblclick", data: users, rules:{
				name:function(value){
					return value != "" ;
				}
			}},
			{ view: "chart", id:"chart", value:"#age#", xAxis:{ template:"#age#"}, data: users, type:"bar"}
]};

var treeTable = { id:"Products", autoWidth: true, view:"treetable", editable:true, editaction:"dblclick", scrollX: false, 
					url:"data/products.js",
					on:{onAfterLoad: function(){
						this.openAll();
						}
					},
					columns: [
					{ id:"id", header:"ID", width:50},
      				{ id:"title", editor:"text", header:"Film Title", width:250, template:"{common.treetable()} #title#" },
      				{ id:"price", editor:"text", header:"Price", width:200}
					],
					rules: {
						title: webix.rules.isNotEmpty,
						price: function(value){
							return value >= 3;
						}
					}
};

var main = { cols: [ 
		{rows:[	{ view: "list", width: 300, scroll:false, data: ["Dashboard", "Users", "Products", "Locations"], select:true, 
						autoheight: true, on:{
											onAfterSelect:function(id){
												$$(id).show();
											}
						}},
				{ borderless: true},
				{ view: "label", label: "<span class='webix_icon fa-check'></span> Connected", css: "greenColor", align: "center", autoheight: true}
		]},	
		{ view: "resizer"},
		{ view:"multiview", animate:{type:"flip", subtype:"vertical"}, cells: [
			{ id:"Dashboard", cols:[ { rows:[dataTable, dataView ]},
									 { rows:[form, { borderless:true}, 
				{ view:"button", value:"Remove selected", type:"danger", click:function(){
          								var sel = $$("dataTable").getSelectedId();
          								if(sel)
          									$$("dataTable").remove(sel);
        }}]}]
    			},
			chart,
			treeTable,
			{ id: "Locations", template: "Locations template", autoWidth: true}
		]},				
]};







