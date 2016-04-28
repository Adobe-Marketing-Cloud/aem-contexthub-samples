<%@page
    session="false"
    pageEncoding="utf-8"
    import="
        com.adobe.granite.xss.XSSAPI,
        org.apache.sling.commons.json.io.JSONWriter,
        org.apache.sling.commons.json.JSONException,
        java.text.SimpleDateFormat,
        java.text.DateFormat,
        java.util.Date,
        java.io.StringWriter
    "
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.2" %><%
%><sling:defineObjects /><%

    DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
    XSSAPI xssAPI = sling.getService(XSSAPI.class).getRequestSpecificAPI(slingRequest);
    StringWriter buffer = new StringWriter();
    JSONWriter json = new JSONWriter(buffer);

    /* get parameters */
    String message = request.getParameter("message");
    long delay;
    int delayMin;
    int delayMax;

    try {
        delayMin = Integer.parseInt(request.getParameter("delayMin"));
        delayMax = Integer.parseInt(request.getParameter("delayMax"));
    } catch (NumberFormatException e) {
        delayMin = 1000;
        delayMax = 5000;
    }

    delayMin = Math.max(0, delayMin);
    delayMax = Math.max(delayMin, delayMax);
    delay = (long) Math.floor(Math.random() * (delayMax - delayMin + 1) + delayMin);

    /* generate output */
    try {
        json.object();
        json.key("time").value(fmt.format(new Date()));
        json.key("message").value(xssAPI.encodeForXMLAttr(message));
        json.key("delay").value(String.valueOf(delay / 1000.0) + "s");
        json.endObject();
    } catch (JSONException e) {
        buffer = new StringWriter();
        buffer.append("{ error: \":(\" }");
    }

    /* sleep and send response */
    Thread.currentThread().sleep(delay);
    response.getWriter().append(buffer.toString());

%>