(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("signUP");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(670,450);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsGender", this);
            obj._setContents("<ColumnInfo><Column id=\"radioName\" type=\"STRING\" size=\"256\"/><Column id=\"radioValue\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"radioName\">man</Col><Col id=\"radioValue\">남</Col></Row><Row><Col id=\"radioValue\">여</Col><Col id=\"radioName\">woman</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsPN1", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"CONTENT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CONTENT\">선택</Col><Col id=\"CODE\"/></Row><Row><Col id=\"CODE\">010</Col><Col id=\"CONTENT\">010</Col></Row><Row><Col id=\"CODE\">02</Col><Col id=\"CONTENT\">02</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsGrid", this);
            obj._setContents("<ColumnInfo><Column id=\"이름\" type=\"STRING\" size=\"256\"/><Column id=\"학번\" type=\"STRING\" size=\"256\"/><Column id=\"성별\" type=\"STRING\" size=\"256\"/><Column id=\"list_phone\" type=\"STRING\" size=\"256\"/><Column id=\"list_sum\" type=\"STRING\" size=\"256\"/><Column id=\"list_avg\" type=\"STRING\" size=\"256\"/><Column id=\"list_grade\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsTest", this);
            obj._setContents("<ColumnInfo><Column id=\"Test\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsChks", this);
            obj._setContents("<ColumnInfo><Column id=\"objID\" type=\"STRING\" size=\"256\"/><Column id=\"isChecked\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("regiBtn","246","25","128","25",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("등록");
            obj.set_color("#000000");
            obj.set_background("#DAA521");
            obj.set_border("#C2E07D");
            this.addChild(obj.name, obj);

            obj = new Edit("userName","84","84","96","22",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            this.addChild(obj.name, obj);

            obj = new Edit("stNum","319","84","96","22",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            this.addChild(obj.name, obj);

            obj = new Radio("gender","84","122","89","37",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_innerdataset("dsGender");
            obj.set_codecolumn("radioName");
            obj.set_datacolumn("radioValue");
            obj.set_direction("vertical");
            this.addChild(obj.name, obj);

            obj = new Edit("PN2","390","133","55","22",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Edit("PN3","455","133","55","22",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            this.addChild(obj.name, obj);

            obj = new Combo("PN1","319","133","61","22",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_innerdataset("dsPN1");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("CONTENT");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Edit("scoreKor","43","210","67","22",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            this.addChild(obj.name, obj);

            obj = new CheckBox("Chk_Kor","45","180","65",null,null,"250",null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("국어");
            this.addChild(obj.name, obj);

            obj = new CheckBox("Chk_Math","135","180","65","20",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("수학");
            this.addChild(obj.name, obj);

            obj = new Edit("scoreMath","134","210","67","22",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            this.addChild(obj.name, obj);

            obj = new CheckBox("Chk_Eng","228","180","65","20",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("영어");
            this.addChild(obj.name, obj);

            obj = new Edit("scoreEng","227","210","67","22",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            this.addChild(obj.name, obj);

            obj = new CheckBox("Chk_IT","318","180","65","20",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("컴퓨터");
            this.addChild(obj.name, obj);

            obj = new Edit("scoreIT","317","210","67","22",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            this.addChild(obj.name, obj);

            obj = new Grid("list","30","248","620","184",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_binddataset("dsGrid");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"97\"/><Column size=\"63\"/><Column size=\"131\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"이름\"/><Cell col=\"1\" text=\"학번\"/><Cell col=\"2\" text=\"성별\"/><Cell col=\"3\" text=\"list_phone\"/><Cell col=\"4\" text=\"list_sum\"/><Cell col=\"5\" text=\"list_avg\"/><Cell col=\"6\" text=\"list_grade\"/></Band><Band id=\"body\"><Cell text=\"bind:이름\"/><Cell col=\"1\" text=\"bind:학번\"/><Cell col=\"2\" text=\"bind:성별\"/><Cell col=\"3\" text=\"bind:list_phone\"/><Cell col=\"4\" text=\"bind:list_sum\"/><Cell col=\"5\" text=\"bind:list_avg\"/><Cell col=\"6\" text=\"bind:list_grade\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("StaticName","40","87","34","17",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("이름:");
            this.addChild(obj.name, obj);

            obj = new Static("StaticGender","40","130","34","17",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("성별:");
            this.addChild(obj.name, obj);

            obj = new Static("StaticStNum","263","87","34","17",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("학번:");
            this.addChild(obj.name, obj);

            obj = new Static("StaticCtNum","263","133","34","17",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("연락처:");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",670,450,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("signUP.xfdl", function() {
        this.onload1 = function(obj,e)
        {
        	this.PN1.set_index(0);
        };


        this.regiBtn_onclick = function(obj,e)
        {
        	var un = this.userName.value;
        	var sn = this.stNum.value;
        	var gd = this.gender.value;
        	var pn = this.PN1.value + "-" + this.PN2.value + "-" + this.PN3.value;

        	var kor = this.Chk_Kor.isChecked() ? nexacro.toNumber(this.scoreKor.value) : 0;
        	var math = this.Chk_Math.isChecked() ? nexacro.toNumber(this.scoreMath.value) : 0;
        	var eng = this.Chk_Eng.isChecked() ? nexacro.toNumber(this.scoreEng.value) : 0;
        	var it = this.Chk_IT.isChecked() ? nexacro.toNumber(this.scoreIT.value) : 0;
        	var subject = [kor,math,eng,it];

        	var cnt = 0;
        	for(var i=0; i < subject.length; i++){
        		if(subject[i] > 0) cnt++;
        	}

        	var sum = kor + math + eng + it;
        	var avg = sum/cnt;
        	var grade="";
        	switch(Math.floor(avg/10)) {
        	case 10 :
        	case 9:
        		grade = "수";
        		break;
        	case 8:
        		grade = "우";
        		break;
        	case 7:
        		grade = "미";
        		break;
        	case 6:
        		grade = "양";
        		break;
        	default:
        		grade = "가";
        		break;
        	}

        	var objApp = nexacro.getApplication();
        	var ds = this.dsGrid;
        	objApp.addVariable("ds", ds);
        	objApp.ds.addRow();
        	objApp.ds.setColumn(objApp.ds.rowposition,"이름",un);
        	objApp.ds.setColumn(objApp.ds.rowposition,"학번",sn);
        	objApp.ds.setColumn(objApp.ds.rowposition,"성별",gd);
        	objApp.ds.setColumn(objApp.ds.rowposition,"list_phone",pn);
        	objApp.ds.setColumn(objApp.ds.rowposition,"list_sum",sum);
        	objApp.ds.setColumn(objApp.ds.rowposition,"list_avg",avg);
        	objApp.ds.setColumn(objApp.ds.rowposition,"list_grade",grade);

        };

        this.Radio00_onitemchanged = function(obj,e)
        {

        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.onload1,this);
            this.regiBtn.addEventHandler("onclick",this.regiBtn_onclick,this);
            this.userName.addEventHandler("onchanged",this.userName_onchanged,this);
            this.gender.addEventHandler("onitemchanged",this.Radio00_onitemchanged,this);
        };
        this.loadIncludeScript("signUP.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
