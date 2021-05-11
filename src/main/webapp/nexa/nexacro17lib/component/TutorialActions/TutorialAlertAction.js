(function(nexacro) {
	"use strict";

	if (nexacro == null || nexacro.TutorialAlertAction)
		return nexacro.TutorialAlertAction;
		
	var TutorialAlertAction = function(id, parent)
	{
		nexacro.Action.call(this, id, parent);
	};
		
	var _pTutorialAlertAction = nexacro._createPrototype(nexacro.Action, TutorialAlertAction);		
	TutorialAlertAction.prototype = _pTutorialAlertAction;
    _pTutorialAlertAction._type_name = "TutorialAlertAction";		
        
    _pTutorialAlertAction.message = "";

    //===============================================================
    // nexacro.TutorialAlertAction : Create & Destroy & Update
    //===============================================================

	//===============================================================
    // nexacro.TutorialAlertAction : Properties
    //===============================================================
    _pTutorialAlertAction.set_message = function (v)
	{
		this.message = v;			
	};

    //===============================================================
    // nexacro.TutorialAlertAction : Logical part
	//===============================================================		
    _pTutorialAlertAction._getModelArgumentList = function ()
    {
        var modelargumentlist = this.getContents("model");

        if (!modelargumentlist)
            return;

		var argumentlist = [];
        var sourceview;
        var viewdataset;
        var col;
        var arg;
        var rowpos;
		var val;

        for (var i = 0; i < modelargumentlist.length; i++)
        {
            sourceview = modelargumentlist[i].viewid;
            col = modelargumentlist[i].fieldid;
            arg = modelargumentlist[i].value;
            if (sourceview && col)
            {
                sourceview = this._getViewByID(sourceview);
                if (sourceview)
                {
                    viewdataset = sourceview.getViewDataset();
                    if (viewdataset && viewdataset._type_name == "Dataset")
                    {
                        if (arg)
                        {
							val = this._getArgValue(arg, viewdataset);
                        }
                        else
                        {
                            rowpos = viewdataset.rowposition ? viewdataset.rowposition : 0;
                            val = viewdataset.getColumn(rowpos, col);
						}

						argumentlist[i] = {"name" : col, "value" : (val === undefined ? null : val)};
                    }
                }
            }
        }

		return argumentlist;
	};

	_pTutorialAlertAction._getViewByID = function (viewid)
	{
		viewid = nexacro._toString(viewid);
		var parent = this.parent;
        if (!viewid || viewid.length == 0 || !parent)
            return null;

		return parent[viewid];
	};

    _pTutorialAlertAction._getArgValue = function (arg, viewdataset)
    {
		var context = this;
		var v = arg;

		v = v.toString();

		var arr = v.split(":");
		var rowpos, retvalue;
		var type = arr[0];

		switch (type)
		{
			case "bind":
			case "prop":
				if (context)
				{
					if (viewdataset)
					{
						rowpos = viewdataset.rowposition;
						if (type == "bind")
							retvalue = viewdataset.getColumn(rowpos, arr[1]);
						else
							retvalue = viewdataset[arr[1]];
					}
				}
			break;
			case "expr":
				{
					if (context)
					{
						if (viewdataset)
						{
							rowpos = viewdataset.rowposition;
							var exprFn = viewdataset._createExprFunc(arr[1]);
							if (exprFn)
							{
								retvalue = exprFn.call(context, rowpos, rowpos, null, viewdataset, viewdataset._viewRecords, viewdataset._viewRecords[rowpos], []);
							}
						}
					}
				}
				break;
			case "arg":
				{
					if (arr[1] == "useindataset")
					{
						retvalue = viewdataset;
					}
				}
				break;
			default:
				retvalue = v;
		}

		return retvalue;
    };

    _pTutorialAlertAction.run = function ()
	{
        var name, value;
        var argumentlist = "";

		var modellist = this._getModelArgumentList();

        argumentlist = this.message;
        argumentlist += " ";
        
        if (modellist)
        {
            for (var j = 0; modellist.length > j; j++)
		    {
			    name = modellist[j].name;
			    value = modellist[j].value;

				argumentlist += name + "=" + value;
				argumentlist += " ";
            }
        }
        
        argumentlist.trim();

        alert(argumentlist);
	};		
	
	nexacro.TutorialAlertAction = TutorialAlertAction;

	return TutorialAlertAction;

}) (nexacro);