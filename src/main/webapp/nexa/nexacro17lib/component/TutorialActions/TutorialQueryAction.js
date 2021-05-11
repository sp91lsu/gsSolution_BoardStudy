(function(nexacro) {
    "use strict";

    if (nexacro == null || nexacro.TutorialQueryAction)
        return nexacro.TutorialQueryAction;

    var TutorialQueryAction = function (id, parent)
	{
        nexacro.Action.call(this, id, parent);
	};
		
    var _pTutorialQueryAction = nexacro._createPrototype(nexacro.Action, TutorialQueryAction);
	TutorialQueryAction.prototype = _pTutorialQueryAction;
    _pTutorialQueryAction._type_name = "TutorialQueryAction";		
    
	_pTutorialQueryAction.serviceid = "";		
    _pTutorialQueryAction.serviceurl = "";
    _pTutorialQueryAction.async = false;
    _pTutorialQueryAction.datatype = 0;
    _pTutorialQueryAction.compress = false;
    _pTutorialQueryAction.resultcount = -1;

    _pTutorialQueryAction._dsname = "_dsname=";
    _pTutorialQueryAction._prefixdsname = "=ds_";
    
    _pTutorialQueryAction.callbackfn = "";
    _pTutorialQueryAction._callbackhn = "__queryaction_callbackfn_";
    _pTutorialQueryAction._errorevthn = "__queryaction_errorevtfn_";

    //===============================================================
    // nexacro.QueryAction : Create & Destroy & Update
    //===============================================================
	_pTutorialQueryAction.destroy = function ()
    {
        var targetview = this.getTargetView();
        if (targetview)
        {
            var targetform = (targetview instanceof nexacro.View) ? targetview.form : targetview;
            var callbackhn = this._callbackhn + this.id;
            var errorevthn = this._errorevthn + this.id;

            if (targetform)
            {
                if (!targetform[callbackhn]) delete targetform[callbackhn];
                if (!targetform[errorevthn]) delete targetform[errorevthn];
            }
        }

        nexacro.Action.prototype.destroy.call(this);
        
        this._callbackhn = null;
        this._errorevthn = null;

        this.serviceid = null;
        this.serviceurl = null;
        this.callbackfn = null;
        this.async = null;
        this.datatype = null;
        this.compress = null;

        this._dsname = null;
        this._prefixdsname = null;
    };
    
	//===============================================================
    // nexacro.TutorialQueryAction : Properties
    //===============================================================
	_pTutorialQueryAction.set_serviceid = function (v)
	{
		this.serviceid = v;			
	};

	_pTutorialQueryAction.set_serviceurl = function (v)
	{
		this.serviceurl = v;			
    };
    
    /*_pTutorialQueryAction.set_callbackfn = function (v)
    {
        this.callbackfn = v;
    };*/

    _pTutorialQueryAction.set_async = function (v)
    {
        this.async = nexacro._isBoolean(v);
    };

    _pTutorialQueryAction.set_datatype = function (v)
    {
        this.datatype = parseInt(v);
    };

    _pTutorialQueryAction.set_compress = function (v)
    {
        this.compress = nexacro._isBoolean(v);
    };

    //===============================================================
    // nexacro.TutorialQueryAction : Logical part
	//===============================================================		
    _pTutorialQueryAction._getTargetobj = function (obj, actionobj)
    {
        var parent = this.parent;
        if (!parent)
            return;

        var targetview = obj;
        var targetobj = null;

        if (!targetview || !actionobj)
            return;

        if (targetview instanceof nexacro.View)
        {
            targetobj = targetview.form[actionobj];
        }
        else if (targetview instanceof nexacro.Form)
        {
            targetobj = targetview[actionobj];
        }

        if (targetobj === undefined)
        {
            if (targetview.name == actionobj)
                targetobj = targetview;
        }

        return targetobj;
    };

    _pTutorialQueryAction._getViewDataObject = function (obj)
    {
        var viewdataset = obj.getViewDataset();
        if (viewdataset)
        {
          return this._getTargetobj(obj, viewdataset.binddataobject);
        }
    };

    _pTutorialQueryAction._getModelArgumentList = function ()
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

    _pTutorialQueryAction._getViewByID = function (viewid)
	{
		viewid = nexacro._toString(viewid);
		var parent = this.parent;
        if (!viewid || viewid.length == 0 || !parent)
            return null;

		return parent[viewid];
	};

    _pTutorialQueryAction._getArgValue = function (arg, viewdataset)
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
			default:
				retvalue = v;
		}

		return retvalue;
    };

    _pTutorialQueryAction._getServiceUrlInfo = function (url)
    {
        var serviceurlinfo = {};

        var argidx = url.indexOf('?'); argidx = argidx >= 0 ? argidx + 1 : -1;
        var frgidx = url.indexOf('#'); frgidx = frgidx >= 0 ? frgidx + 1 : -1;

        serviceurlinfo.urldocument = argidx < 0 ? url : url.slice(0,      argidx - 1);
        serviceurlinfo.urlquerystr = argidx < 0 ? ""  : url.slice(argidx, frgidx - 1);
        serviceurlinfo.urlfragment = frgidx < 0 ? ""  : url.slice(frgidx);
        serviceurlinfo.urlfragmentinfo = {};

        var svcfrg = serviceurlinfo.urlfragment;
        var frgarg = svcfrg.indexOf('=') >= 0;
        if (frgarg)
        {
            var o = serviceurlinfo.urlfragmentinfo;
            svcfrg.split('&').forEach(function (v) { var r = v.split("="); o[r[0]] = r[1]; });
        }

        return serviceurlinfo;
    };

    _pTutorialQueryAction._setWaitCursor = function (bWait)
    {
        var targetview = this.getTargetView();
        if (targetview)
        {
            var form = targetview.parent;
            if (form)
            {
                form.setWaitCursor(bWait);
            }
        }
    };

	_pTutorialQueryAction.run = function ()
	{
		var svcid = this.serviceid;
		var serviceurl = this.serviceurl;
        var targetview = this.getTargetView();

        this.resultcount = -1;

        if (!svcid || !serviceurl || !targetview)
        {
            this.on_fire_onerror();
            return;
        }

        var serviceurlinfo = this._getServiceUrlInfo(serviceurl);
        var isRESTJSON = !!serviceurlinfo.urlfragmentinfo.jsonrootpath;

        var name, value;
        var argumentlist = "";

        var modellist = this._getModelArgumentList();
        var extralist = this.getContents("extra");
        var i = 0, j = 0;

        if (isRESTJSON)
        {
            var targetobj = this._getViewDataObject(targetview);
            if (!targetobj)
            {
                this.on_fire_onerror();
                return;
            }

            argumentlist = serviceurlinfo.urlquerystr;

            if (extralist)
            {
                for (i = 0; extralist.length > i; i++)
                {
                    name = extralist[i].name;
                    value = extralist[i].value;
                    switch (name)
                    {
                        case "argumentlist":   // arguments
                            argumentlist += argumentlist ? "&" : "";
                            argumentlist += value;
                            break;
                    }
                }
            }

            if (modellist)
            {
                for (j = 0; modellist.length > j; j++)
                {
                    name = modellist[j].name;
                    value = modellist[j].value;

                    if (value !== null && value !== undefined)
                    {
                        argumentlist += argumentlist ? "&" : "";
                        argumentlist += name + "=" + value;
                    }
                }
            }

            var serviceurldata = serviceurlinfo.urldocument;
            if (argumentlist)
            {
                serviceurldata += "?";
                serviceurldata += argumentlist;
            }

            var httpRequest = new XMLHttpRequest();
            httpRequest._targetobj = targetobj;
            httpRequest._targetview = this.targetview;
            httpRequest._targetaction = this;
            httpRequest.onreadystatechange = function ()
            {
                if (this.readyState === 4 /*httpRequest.DONE*/)
                {
                    var success = false;

                    if (this.status === 200 || this.status === 201)
                    {
                        this._targetobj.set_data(this.responseText);

                        var _targetview = this._targetaction.getTargetView();
                        if (_targetview)
                        {
                            var viewdataset = _targetview.getViewDataset();
                            if (viewdataset)
                            {
                                this._targetaction.resultcount = viewdataset.rowcount;
                            }

                            success = true;
                        }
                    }

                    this._targetaction._setWaitCursor(false);

                    if (success)
                    {
                        this._targetaction.on_fire_onsuccess();
                    }
                    else
                    {
                        this._targetaction.on_fire_onerror();
                    }
                }
            };

            this._setWaitCursor(true);

            httpRequest.open('GET', serviceurldata);
            httpRequest.send();
        }
        else
        {
            var viewdataset = targetview.viewdataset;
            var outdataset = viewdataset + this._prefixdsname + viewdataset;	// sync server service argument

            var basync = this.async;
            var ndatatype = this.datatype;
            var bcompress = this.compress;

            if (extralist)
            {
                for (i = 0; extralist.length > i; i++)
                {
                    name = extralist[i].name;
                    value = extralist[i].value;
                    switch (name)
                    {
                        case "argumentlist":   // arguments
                            argumentlist += value;
                            argumentlist += " ";
                            break;
                    }
                }
            }

            if (modellist)
            {
                for (j = 0; modellist.length > j; j++)
                {
                    name = modellist[j].name;
                    value = modellist[j].value;

                    if (value !== null && value !== undefined)
                    {
                        argumentlist += name + "=" + value;
                        argumentlist += " ";
                    }
                }
            }

            argumentlist += this._dsname + viewdataset + " ";		// sync server service argument
            argumentlist.trim();

            var callbackfn = this.callbackfn;
            var callbackhn = this._callbackhn+this.id;
            var errorevthn = this._errorevthn+this.id;
            var targetaction = this;
            var targetform = (targetview instanceof nexacro.View) ? targetview.form : targetview;

            if (targetform && !targetform[callbackhn])
            {
                targetform[callbackhn] = function (strSvcID, nErrorCode, strErrorMag)
                {
                    if (callbackfn)
                    {
                        var context = this.parent.parent;
                        var callback_id = callbackfn;
                        var callback_func = context.lookup(callback_id);

                        if (callback_func && typeof (callback_func) == "function")
                            callback_func.call(context, strSvcID, nErrorCode, strErrorMag);
                    }

                    targetaction._setWaitCursor(false);

                    if (nErrorCode >= 0)
                    {
                        targetaction.error = "callback-success";
                        targetaction.on_fire_onsuccess();
                    }
                    else
                    {
                        targetaction.error = "callback-error";
                        targetaction.on_fire_onerror();
                    }
                };
            }

            if (targetform && !targetform[errorevthn])
            {
                targetform[errorevthn] = function (obj, e)
                {
                    if (serviceurl == e.requesturi)
                    {
                        targetaction._setWaitCursor(false);

                        targetaction.error = "form-onerror";
                        targetaction.on_fire_onerror();
                    }
                };

                targetform.addEventHandler("onerror", targetform[errorevthn], targetform);
            }

            targetaction._setWaitCursor(true);

            ////
            var test_file_url = nexacro._project_url;
            test_file_url += "nexacro17lib/component/TutorialActions/test_data/tutorial_querytest.xml";
            serviceurl = test_file_url;
            ////

            if (targetview instanceof nexacro.View)
            {
                targetview.form.transaction(svcid, serviceurl, "", outdataset, argumentlist, callbackhn, basync, ndatatype, bcompress);
            }
            else if (targetview instanceof nexacro.Form)
            {
                targetview.transaction(svcid, serviceurl, "", outdataset, argumentlist, callbackhn, basync, ndatatype, bcompress);
            }
        }
    };	

    nexacro.TutorialQueryAction = TutorialQueryAction;

    return TutorialQueryAction;
    
}) (nexacro);