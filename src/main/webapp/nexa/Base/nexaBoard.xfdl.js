(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("board");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsList", this);
            obj._setContents("<ColumnInfo><Column id=\"seq\" type=\"INT\" size=\"256\"/><Column id=\"author\" type=\"STRING\" size=\"256\"/><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"subject\" type=\"STRING\" size=\"256\"/><Column id=\"regDate\" type=\"DATETIME\" size=\"256\"/><Column id=\"uptDate\" type=\"DATETIME\" size=\"256\"/><Column id=\"viewCnt\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSchType", this);
            obj._setContents("<ColumnInfo><Column id=\"name\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"name\">mem_name</Col><Col id=\"value\">작성자</Col></Row><Row><Col id=\"value\">제목</Col><Col id=\"name\">board_subject</Col></Row><Row><Col id=\"value\">제목+내용</Col><Col id=\"name\">board_subject||board_content</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSchForm", this);
            obj._setContents("<ColumnInfo><Column id=\"schType\" type=\"STRING\" size=\"256\"/><Column id=\"schWord\" type=\"STRING\" size=\"256\"/><Column id=\"date1\" type=\"STRING\" size=\"256\"/><Column id=\"date2\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("inqBtn","696","55","157","41",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("조회");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","27","109","826","331",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("dsList");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"150\"/><Column size=\"180\"/><Column size=\"150\"/><Column size=\"150\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"글번호\"/><Cell col=\"1\" text=\"작성자(ID)\"/><Cell col=\"2\" text=\"제목\"/><Cell col=\"3\" text=\"작성일\"/><Cell col=\"4\" text=\"수정일\"/><Cell col=\"5\" text=\"조회수\"/></Band><Band id=\"body\"><Cell text=\"bind:seq\"/><Cell col=\"1\" text=\"expr:author+'('+id+')'\"/><Cell col=\"2\" text=\"bind:subject\"/><Cell col=\"3\" text=\"bind:regDate\"/><Cell col=\"4\" text=\"bind:uptDate\"/><Cell col=\"5\" text=\"bind:viewCnt\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Combo("CombSchType","30","22","110","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_innerdataset("dsSchType");
            obj.set_codecolumn("name");
            obj.set_datacolumn("value");
            obj.set_text("Combo00");
            this.addChild(obj.name, obj);

            obj = new Edit("EditSchWord","160","22","260","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            this.addChild(obj.name, obj);

            obj = new Calendar("Date1","30","65","180","30",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Calendar("Date2","240","65","180","30",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","220","65","20","31",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("~");
            obj.set_font("bold 16px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Button("BtnSch","434","22","50","73",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("검색");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","869","62","139","214",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("Test print");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","CombSchType","value","dsSchForm","schType");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","EditSchWord","value","dsSchForm","schWord");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","Date1","value","dsSchForm","date1");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","Date2","value","dsSchForm","date2");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("nexaBoard.xfdl", function() {
        this.board_onload = function(obj,e)
        {
        	this.combSchType.set_index(0)
        };

        this.inqBtn_onclick = function(obj,e)
        {
        	 var id = "board";
             var url = "http://localhost:8282/nexaboard/list";
             var reqDs = "";
             var respDs = "dsList=ds";
             var args = "";
             var callback = "received";

        	 console.log("transaction 전");
             this.transaction(id, url, reqDs, respDs, args, callback);

        };
        this.BtnSch_onclick = function(obj,e)
        {
        	 var id = "board";
             var url = "http://localhost:8282/nexaboard/search";
             var reqDs = "ds=dsSchForm"; //java=nexa
             var respDs = "dsList=ds"; // nexa=java
             var args = "";
             var callback = "received";

        	 console.log("transaction 전");
             this.transaction(id, url, reqDs, respDs, args, callback);
        };


        this.received = function(id, code, message)
        {
        	 console.log("transaction 후 콜백함수 안, ID: "+id);
             if (code == 0) {
                  this.alert(message);
                  trace(message);
             } else {
                  this.alert("Error["+code+"]:"+message);
                  trace("Error["+code+"]:"+message);
             }
        }


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.board_onload,this);
            this.inqBtn.addEventHandler("onclick",this.inqBtn_onclick,this);
            this.EditSchWord.addEventHandler("onchanged",this.Edit00_onchanged,this);
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.BtnSch.addEventHandler("onclick",this.BtnSch_onclick,this);
            this.Static01.addEventHandler("onclick",this.Static01_onclick,this);
        };
        this.loadIncludeScript("nexaBoard.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
