(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("sample_SingleDetail");
            this.set_titletext("Sing Detail Sample");
            if (Form == this.constructor)
            {
                this._setFormPosition(600,450);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new TutorialQueryAction("TutorialQueryAction00", this);
            obj.set_targetview("view_master");
            obj.set_serviceid("tutorial_SearchEmployee");
            obj._setContents({
            "model":
            [
                {
                    "name":"view_search:company",
                    "viewid":"view_search",
                    "fieldid":"company",
                    "value":""
                },
                {
                    "name":"view_search:department",
                    "viewid":"view_search",
                    "fieldid":"department",
                    "value":""
                },
                {
                    "name":"view_search:name",
                    "viewid":"view_search",
                    "fieldid":"name",
                    "value":""
                }
            ]
            });
            obj.set_serviceurl("http://localhost:8080/");
            this.addChild(obj.name, obj);


            obj = new TutorialAlertAction("TutorialAlertAction00", this);
            obj.set_message("THIS IS ALERT");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new View("view_search","0","0","600","100",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_viewtype("FreeForm");
            obj.set_viewdataset("viewdataset");
            obj.set_text("view_search");
            this.addChild(obj.name, obj);


            obj = new Dataset("viewdataset", this.view_search.form);
            obj._setContents("<ColumnInfo><Column id=\"company\" type=\"BLOB\" size=\"80\"/><Column id=\"department\" type=\"BLOB\" size=\"80\"/><Column id=\"name\" type=\"STRING\" size=\"80\"/></ColumnInfo><Rows><Row><Col id=\"company\"/><Col id=\"department\"/><Col id=\"name\"/></Row></Rows>");
            this.view_search.addChild(obj.name, obj);


            obj = new Dataset("ds_company", this.view_search.form);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"80\"/><Column id=\"data\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">nexa</Col><Col id=\"data\">nexa</Col></Row></Rows>");
            this.view_search.addChild(obj.name, obj);


            obj = new Dataset("ds_department", this.view_search.form);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"80\"/><Column id=\"data\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">Development</Col><Col id=\"data\">Development</Col></Row><Row><Col id=\"code\">Abroad</Col><Col id=\"data\">Abroad</Col></Row><Row><Col id=\"code\">Management</Col><Col id=\"data\">Management</Col></Row></Rows>");
            this.view_search.addChild(obj.name, obj);

            obj = new Static("stcompany","10","10","80","20",null,null,null,null,null,null,this.view_search.form);
            obj.set_text("Company");
            this.view_search.addChild(obj.name, obj);

            obj = new Combo("cmbcompany","100","10","130","20",null,null,null,null,null,null,this.view_search.form);
            obj.set_innerdataset("ds_company");
            obj.set_datacolumn("data");
            obj.set_codecolumn("code");
            this.view_search.addChild(obj.name, obj);

            obj = new Static("stdepartment","250","10","80","20",null,null,null,null,null,null,this.view_search.form);
            obj.set_text("Department");
            this.view_search.addChild(obj.name, obj);

            obj = new Combo("cmbdepartment","340","10","130","20",null,null,null,null,null,null,this.view_search.form);
            obj.set_innerdataset("ds_department");
            obj.set_datacolumn("data");
            obj.set_codecolumn("code");
            this.view_search.addChild(obj.name, obj);

            obj = new Static("stname","10","40","80","20",null,null,null,null,null,null,this.view_search.form);
            obj.set_text("Name");
            this.view_search.addChild(obj.name, obj);

            obj = new Edit("edtname","100","40","130","20",null,null,null,null,null,null,this.view_search.form);
            this.view_search.addChild(obj.name, obj);

            obj = new Button("btnSearch",null,"10","100",null,"10","10",null,null,null,null,this.view_search.form);
            obj.set_text("Search");
            this.view_search.addChild(obj.name, obj);

            obj = new View("view_master","0","100","600","350",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_viewtype("GridView");
            obj.set_viewdataset("viewdataset");
            obj.set_text("view_master");
            this.addChild(obj.name, obj);


            obj = new Dataset("viewdataset", this.view_master.form);
            obj._setContents("<ColumnInfo><Column id=\"company\" type=\"BLOB\" size=\"80\"/><Column id=\"department\" type=\"BLOB\" size=\"80\"/><Column id=\"emp_name\" type=\"STRING\" size=\"80\"/><Column id=\"position\" type=\"STRING\" size=\"80\"/><Column id=\"cellphone\" type=\"STRING\" size=\"80\"/><Column id=\"address\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"company\"/><Col id=\"department\"/><Col id=\"emp_name\"/><Col id=\"position\"/><Col id=\"cellphone\"/><Col id=\"address\"/></Row></Rows>");
            this.view_master.addChild(obj.name, obj);

            obj = new Grid("grdMaster","0","0",null,null,"0","0",null,null,null,null,this.view_master.form);
            obj.set_binddataset("viewdataset");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\" band=\"body\"/><Column size=\"80\" band=\"body\"/><Column size=\"80\" band=\"body\"/><Column size=\"80\" band=\"body\"/><Column size=\"80\" band=\"body\"/><Column size=\"80\" band=\"body\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"body\"/></Rows><Band id=\"head\"><Cell id=\"cell_company\" col=\"0\" row=\"0\" text=\"Company\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_department\" col=\"1\" row=\"0\" text=\"Department\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_emp_name\" col=\"2\" row=\"0\" text=\"Name\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_position\" col=\"3\" row=\"0\" text=\"Position\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_cellphone\" col=\"4\" row=\"0\" text=\"Phone\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_address\" col=\"5\" row=\"0\" text=\"Address\" displaytype=\"text\" edittype=\"none\"/></Band><Band id=\"body\"><Cell id=\"cell_company\" col=\"0\" row=\"0\" text=\"bind:company\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_department\" col=\"1\" row=\"0\" text=\"bind:department\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_emp_name\" col=\"2\" row=\"0\" text=\"bind:emp_name\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_position\" col=\"3\" row=\"0\" text=\"bind:position\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_cellphone\" col=\"4\" row=\"0\" text=\"bind:cellphone\" displaytype=\"text\" edittype=\"none\"/><Cell id=\"cell_address\" col=\"5\" row=\"0\" text=\"bind:address\" displaytype=\"text\" edittype=\"none\"/></Band></Format></Formats>");
            this.view_master.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",600,450,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("cmbcompany_viewdataset","cmbcompany","value","viewdataset","company");
            this.view_search.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("cmbdepartment_viewdataset","cmbdepartment","value","viewdataset","department");
            this.view_search.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("edtname_viewdataset","edtname","value","viewdataset","name");
            this.view_search.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information
            this._setTriggerInfo([
            {
                "triggertype":"Click",
                "triggerview":"view_search",
                "triggerobj":"btnSearch",
                "targetaction":"TutorialQueryAction00",
                "condition":""
            },
            {
                "triggertype":"Action Success",
                "triggerview":"sample_SingleDetail",
                "triggerobj":"TutorialQueryAction00",
                "targetaction":"TutorialAlertAction00",
                "condition":""
            }
            ]);
        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("EasyUITutorialForm.xfdl", function() {

        this.view_search_cmbcompany_onitemchanged = function(obj,e)
        {

        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.view_search.form.cmbcompany.addEventHandler("onitemchanged",this.view_search_cmbcompany_onitemchanged,this);
        };
        this.loadIncludeScript("EasyUITutorialForm.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
