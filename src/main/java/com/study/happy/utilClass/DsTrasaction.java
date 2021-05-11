package com.study.happy.utilClass;

import com.nexacro17.xapi.data.*;
import com.nexacro17.xapi.tx.*;
import org.apache.poi.openxml4j.opc.ContentTypes;
import org.apache.poi.openxml4j.opc.internal.ContentType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.nexacro17.xapi.tx.PlatformType.DEFAULT_HTTP_CONTENT_TYPE;

public class DsTrasaction {

    public void listToDs(HttpServletResponse response, List<Map<String, Object>> list) throws PlatformException {

        PlatformData pdata = new PlatformData();
        DataSet ds = new DataSet("ds");
        ds.addColumn("seq", DataTypes.INT);
        ds.addColumn("author", DataTypes.STRING);
        ds.addColumn("id", DataTypes.STRING);
        ds.addColumn("subject", DataTypes.STRING);
        ds.addColumn("regDate", DataTypes.DATE_TIME);
        ds.addColumn("uptDate", DataTypes.DATE_TIME);
        ds.addColumn("viewCnt", DataTypes.INT);

        /** 5.1 Processing ErrorCode and ErrorMsg **/
        int nErrorCode = 0;
        String strErrorMsg = "START";

        try {
            int row = 0;
            for (int i = 0; i < list.size(); i++) {
                row = ds.newRow();
                ds.set(row,"seq",list.get(i).get("seq"));
                ds.set(row,"author",list.get(i).get("memName"));
                ds.set(row,"id",list.get(i).get("memId"));
                ds.set(row,"subject",list.get(i).get("boardSubject"));
                ds.set(row,"regDate",list.get(i).get("regDate"));
                ds.set(row,"uptDate",list.get(i).get("uptDate"));
                ds.set(row,"viewCnt",list.get(i).get("viewCnt"));
            }
            pdata.addDataSet(ds);

            nErrorCode = 0;
            strErrorMsg = "SUCC";

            } catch (Throwable th) {
                nErrorCode = -1;
                strErrorMsg = th.getMessage();
            }

            VariableList varList = pdata.getVariableList();
            varList.add("ErrorCode", nErrorCode);
            varList.add("ErrorMsg", strErrorMsg);

            /** 6. Sending result data to the client **/
            HttpPlatformResponse res = new HttpPlatformResponse(response,
                    PlatformType.CONTENT_TYPE_XML,"UTF-8");
            res.setData(pdata);
            res.sendData();
    }

    public Map<String,String> formToMap(HttpServletRequest request) throws PlatformException {
        Map<String, String> map = new HashMap<>();
        HttpPlatformRequest req = new HttpPlatformRequest(request);
        req.receiveData();
        PlatformData pData = req.getData();
        DataSet ds = pData.getDataSet("ds");
        String schType = ds.getString(0, 0);
        String schWord = ds.getString(0, 1);
        StringBuffer sb = new StringBuffer();
        String date1 = ds.getString(0, 2);
        sb.append(date1);
        sb.insert(4, "-");
        sb.insert(7, "-");
        map.put("date1", sb.toString());
        String date2 = ds.getString(0, 3);
        sb.setLength(0);
        sb.append(date2);
        sb.insert(4, "-");
        sb.insert(7, "-");
        map.put("date2", sb.toString());
        map.put("scope", schType);
        map.put("schText", schWord);
        return map;
    }
}
