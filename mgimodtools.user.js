// ==UserScript==
// @name          MGi Mod Tools
// @namespace     http://m.tacker.org/blog/74.mgi-mod-tools.html
// @description   Adds moderator tools to topic reply form
// @include       http://www.mediengestalter.info/posting.php*
// @include       http://www.mediengestalter.info/posting.php
// @include       http://www.mediengestalter.info/privmsg.php*
// ==/UserScript==

(function() {

    // Color for your comments
    var commentsColor = readCookie("MGiModToolsCommentColor");
    if (commentsColor == null) {
        var commentsColor = "#B7B7B7";
    }

    // Enable the prefix
    var prefixEnabled = true;

    // Value of the comment field
    var commentvalue = readCookie("MGiModToolsCommentValue");
    if (commentvalue == null) {
        var commentvalue = "Titel ge&auml;ndert";
    }

    // Available QuickComments
    var comments = new Array(
        new Array("Titel ge&auml;ndert.", "Titel ge&auml;ndert."),
        new Array("Bitte [code]-Tags verwenden.", "Bitte [code]-Tags verwenden."),
        new Array("Bitte [quote]-Tags verwenden.", "Bitte [quote]-Tags verwenden."),
        new Array("Keine Eyecatcher im Titel verwenden.", "Keine Eyecatcher im Titel verwenden."),
        new Array("Bitte edit verwenden.", "Bitte edit verwenden."),
        new Array("Bitte verwende die Suche.", "Dieses Thema hatten wir schon mehrfach. Bitte verwende die Suche."),
        new Array("Bitte nur fertige Tutorials posten", "Wichtig: [url=http://mediengestalter.info/forum/22/bitte-nur-fertige-tutorials-posten-55661-1.html]Bitte nur fertige Tutorials posten[/url]"),
        new Array("HTML und CSS sind keine Programmiersprachen!", "Wichtig: [url=http://mediengestalter.info/forum/10/unbedingt-lesen-html-css-ist-keine-programmierung-11877-1.html]HTML und CSS sind keine Programmiersprachen![/url]"),
        new Array("{WIKIFY}", "[color=white]{WIKIFY}[/color]"),
        new Array("F&uuml;r Hardware-Kaufberatung gibt es Sammelthreads.", "F&uuml;r Hardware-Kaufberatung gibt es [url=http://www.mediengestalter.info/forum/2/sammelthreads-fuer-hardware-kaufberatung-63510-1.html]Sammelthreads[/url]."),
        new Array("Flash-Fragen bitte in Multimedia stellen.", "Flash-Fragen bitte in [url=http://www.mediengestalter.info/forum/19/multimedia-1.html]Multimedia[/url] stellen."),
        new Array("Thema geschlossen.", "Thema geschlossen."),
        new Array("Welche Software-Frage wohin?.", "Siehe: [url=http://www.mediengestalter.info/forum/6/welche-software-frage-gehoert-in-welches-forum-64205-1.html]Welche Software-Frage geh&ouml;rt in welches Forum?[/url]")
        // Customize it by adding more elements
        // Do not add a comma after the last element
    );

    // Available QuickPNs
    var pns = new Array(
        new Array("Besoffen?", "Poste bitte noch mal, wenn dein Promillespiegel es wieder zu l&auml;sst."),
        new Array("Rab&auml;&auml;hh", "Wenn dir jemand das F&ouml;rmchen weg genommen hat, musst du hier nicht so einen Aufstand machen."),
        new Array("Sinnfrei", "Dein Beitrag war kein &quot;Beitrag&quot; zur Diskussion und wurde daher gel&ouml;scht."),
        new Array("Beleidigend", "Dein Beitrag enthielt Beleidigungen und wurde daher gel&ouml;scht."),
        new Array("Regelversto&szlig;", "Dein Beitrag verst&ouml;&szlig;t gegen die [url=http://www.mediengestalter.info/faq.php]allgemeinen Bedingungen[/url] von Mediengestalter.info und wurde daher gel&ouml;scht."),
        new Array("Kommerzielle Werbung", "Kommerzielle Werbung ist im Forum nicht gestattet. Wenn du Werbung schalten m&ouml;chtest, wende dich an die Administratoren."),
        new Array("Pushen", "Bitte unterlasse in Zukunft das [url=http://www.mediengestalter.info/faq.php#22]Pushen von Threads[/url]."),
        new Array("Pushen (Jobb&ouml;rse)", "Bitte unterlasse in Zukunft das mehrfache Anlegen von Beiträgen in der Jobbörse,\nda dies als [url=http://www.mediengestalter.info/faq.php#22]Pushen von Threads[/url] gewertet wird. Weitere Informationen zu den Regeln\nin der Jobb&ouml;rse findest Du hier: [url=http://www.mediengestalter.info/forum/34/wie-poste-ich-in-der-jobboerse-87195-1.html]Wie poste ich in der Jobb&ouml;rse?[/url]."),
        new Array("Mehrfache Threads", "Das mehrfache Anlegen von Threads zum gleichen Thema ist nicht gestattet, da es sich hierbei auch um eine Form des [url=http://www.mediengestalter.info/faq.php#22]Pushen von Threads[/url] handelt."),
        new Array("Anforderung Jobb&ouml;rse", "Dein Beitrag entsprach nicht [url=http://www.mediengestalter.info/forum/34/wie-poste-ich-in-der-jobboerse-87195-1.html]den Anforderungen f&uuml;r einen Beitrag in der Jobb&ouml;rse[/url] und wurde daher entfernt."),
        new Array("Anforderung Jobb&ouml;rse (Anschrift)", "Dein Beitrag entsprach nicht [url=http://www.mediengestalter.info/forum/34/wie-poste-ich-in-der-jobboerse-87195-1.html]den Anforderungen f&uuml;r einen Beitrag in der Jobb&ouml;rse[/url] und\nwurde daher entfernt.\n\nBitte beachte insbesondere, dass eine [b]vollst&auml;ndige[/b] Anschrift erforderlich ist.\n[color=red][b][u]Folgende Informationen m&uuml;ssen vorhanden sein:[/u][/b][/color]\n[] [b]Firmenname in rechtlich korrekter Schreibweise[/b] oder bei Personengesellschaften der Name des Inhabers\n[] [b]Ansprechpartner[/b] (kann bei Personengesellschaften entfallen)\n[] [b]Stra&szlig;e[/b] und [b]Hausnummer[/b]\n[] [b]PLZ[/b] und [b]Ort[/b]\n[] [b]Telefonnummer[/b]\n[] [b]E-Mail-Adresse[/b]\nDie angekreuzten fehlten in deinem Fall.\nDie o.g. Informationen k&ouml;nnen auch als Grafik hinterlegt werden."),
        new Array("Als Duplikat markiert.", "Das Thema wurde als Duplikat ([url=http://www.mediengestalter.info/forum/56/doppelte-themen-forum-68289-1.html]was bedeutet das?[/url]) von diesem Thema markiert: "),
        new Array("Flohmarkt", "Verkaufsangebote nur in [url=http://www.mediengestalter.info/forum/47/mgi-flohmarkt-2007-75826-1.html]MGIbay - Der MGI-Flohmarkt[/url] posten.")
        // Customize it by adding more elements
        // Do not add a comma after the last element
    );

    // function copied from http://www.faqts.com/knowledge_base/view.phtml/aid/11698
    function addHTML (ele, html)
    {
        if (document.all)
            ele.insertAdjacentHTML('beforeEnd', html);
        else if (document.createRange) {
            var range = document.createRange();
            range.setStartAfter(ele.lastChild);
            var docFrag = range.createContextualFragment(html);
            ele.appendChild(docFrag);
        }
        else if (document.layers) {
            var l = new Layer(window.innerWidth);
            l.document.open();
            l.document.write(html);
            l.document.close();
            l.top = document.height;
            document.height += l.document.height;
            l.visibility = 'show';
        }
    }

    // helper function copied from "Google Image Relinker" Greasemonkey script
    function selectNodes(doc, context, xpath)
    {
        var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var result = new Array( nodes.snapshotLength );
        for (var x=0; x < result.length; x++) {
            result[x] = nodes.snapshotItem(x);
        }
        return result;
    }

    function array_to_string(array)
    {
        str = "";
        for (i = 0; array && i < array.length ; i++ ) {
            str = str + "\"" + array[i] + "\"";
            if ((i+1) < array.length) {
                str = str + ", ";
            }
        }
        return str;
    }

    function createCookie(name,value,hours)
    {
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime()+(hours*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        } else {
            var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }
    }

    function readCookie(name)
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name)
    {
        createCookie(name,"",-1);
    }

    var commentOptions =
    "<option disabled='true' selected='true'> ( QuickComment ) </option>\n";
    for (i in comments) {
        commentOptions += "<option value='" + comments[i][1] + "' label='" + comments[i][0] + "'>" + comments[i][0] + "</option>\n";
    }

    var forumOptions =
    "<option label='Bitte w&auml;hlen ...' disabled='true' selected='true'>Bitte w&auml;hlen ...</option>\n" +
    "<optgroup label='mediengestalter.info'>\n" +
    "<option label='News' value='http://www.mediengestalter.info/forum/2/news-1.html'>News</option>\n" +
    "<option label='Anregungen &amp; Kritik' value='http://www.mediengestalter.info/forum/6/anregungen-kritik-1.html'>Anregungen &amp; Kritik</option>\n" +
    "<option label='Backup' value='http://www.mediengestalter.info/forum/46/backup-1.html'>Backup</option>\n" +
    "</optroup>\n" +
    "<optgroup label='Pr&uuml;fungen'>\n" +
    "<option label='FAQ - Pr&uuml;fungen' value='http://www.mediengestalter.info/forum/36/faq-pruefungen-1.html'>FAQ - Pr&uuml;fungen</option>\n" +
    "<option label='Allgemeines - Pr&uuml;fungen' value='http://www.mediengestalter.info/forum/51/allgemeines-pruefungen-1.html'>Allgemeines - Pr&uuml;fungen</option>\n" +
    "<option label='Abschlusspr&uuml;fung Theorie' value='http://www.mediengestalter.info/forum/29/abschlusspruefung-theorie-1.html'>Abschlusspr&uuml;fung Theorie</option>\n" +
    "<option label='Abschlusspr&uuml;fung Praxis' value='http://www.mediengestalter.info/forum/31/abschlusspruefung-praxis-1.html'>Abschlusspr&uuml;fung Praxis</option>\n" +
    "<option label='Zwischenpr&uuml;fung Theorie' value='http://www.mediengestalter.info/forum/32/zwischenpruefung-theorie-1.html'>Zwischenpr&uuml;fung Theorie</option>\n" +
    "<option label='Zwischenpr&uuml;fung Praxis' value='http://www.mediengestalter.info/forum/33/zwischenpruefung-praxis-1.html'>Zwischenpr&uuml;fung Praxis</option>\n" +
    "</optroup>\n" +
    "<optgroup label='Print'>\n" +
    "<option label='FAQ - Print' value='http://www.mediengestalter.info/forum/37/faq-print-1.html'>FAQ - Print</option>\n" +
    "<option label='Allgemeines - Print' value='http://www.mediengestalter.info/forum/7/allgemeines-print-1.html'>Allgemeines - Print</option>\n" +
    "<option label='Software - Print' value='http://www.mediengestalter.info/forum/8/software-print-1.html'>Software - Print</option>\n" +
    "<option label='Typografie' value='http://www.mediengestalter.info/forum/11/typografie-1.html'>Typografie</option>\n" +
    "<option label='Schriftensuche' value='http://www.mediengestalter.info/forum/54/schriften-identifizierung-und-suche-1.html'>Schriftensuche</option>\n" +
	"<option label='Druck - Produktion' value='http://www.mediengestalter.info/forum/58/druck-produktion-1.html'>Druck - Produktion</option>\n" +
    "<option label='Tipps &amp; Tricks f&uuml;r Print' value='http://www.mediengestalter.info/forum/21/tipps-tricks-fuer-print-1.html'>Tipps &amp; Tricks f&uuml;r Print</option>\n" +
    "<option label='Farbe' value='http://www.mediengestalter.info/forum/60/farbe-1.html'>Farbe</option>\n" +
    "</optroup>\n" +
    "<optgroup label='Non-Print'>\n" +
    "<option label='FAQ - Nonprint' value='http://www.mediengestalter.info/forum/38/faq-nonprint-1.html'>FAQ - Nonprint</option>\n" +
    "<option label='Allgemeines - Nonprint' value='http://www.mediengestalter.info/forum/4/allgemeines-nonprint-1.html'>Allgemeines - Nonprint</option>\n" +
    "<option label='Software - Nonprint' value='http://www.mediengestalter.info/forum/9/software-nonprint-1.html'>Software - Nonprint</option>\n" +
    "<option label='Web-Software' value='http://www.mediengestalter.info/forum/62/web-software-1.html'>Web-Software</option>\n" +
    "<option label='Multimedia' value='http://www.mediengestalter.info/forum/19/multimedia-1.html'>Multimedia</option>\n" +
    "<option label='Programmierung' value='http://www.mediengestalter.info/forum/10/programmierung-1.html'>Programmierung</option>\n" +
    "<option label='Tipps &amp; Tricks f&uuml;r Nonprint' value='http://www.mediengestalter.info/forum/22/tipps-tricks-fuer-nonprint-1.html'>Tipps &amp; Tricks f&uuml;r Nonprint</option>\n" +
    "</optroup>\n" +
    "<optgroup label='Bild und Ton'>\n" +
    "<option label='FAQ - Bild und Ton' value='http://www.mediengestalter.info/forum/39/faq-bild-und-ton-1.html'>FAQ - Bild und Ton</option>\n" +
    "<option label='Allgemeines - Bild und Ton' value='http://www.mediengestalter.info/forum/26/allgemeines-bild-und-ton-1.html'>Allgemeines - Bild und Ton</option>\n" +
    "<option label='Produktion' value='http://www.mediengestalter.info/forum/27/produktion-1.html'>Produktion</option>\n" +
    "<option label='Postproduktion' value='http://www.mediengestalter.info/forum/25/postproduktion-1.html'>Postproduktion</option>\n" +
    "</optroup>\n" +
    "<optgroup label='Ausbildung und Beruf'>\n" +
    "<option label='Ausbildung' value='http://www.mediengestalter.info/forum/18/ausbildung-1.html'>Ausbildung</option>\n" +
    "<option label='Weiterbildung' value='http://www.mediengestalter.info/forum/49/weiterbildung-1.html'>Weiterbildung</option>\n" +
    "<option label='Studium' value='http://www.mediengestalter.info/forum/50/studium-1.html'>Studium</option>\n" +
    "<option label='Beruf und Karriere' value='http://www.mediengestalter.info/forum/45/beruf-und-karriere-1.html'>Beruf und Karriere</option>\n" +
    "<option label='Jobb&ouml;rse' value='http://www.mediengestalter.info/forum/34/jobboerse-1.html'>Jobb&ouml;rse</option>\n" +
    "<option label='Die Mediengestalter Ausbildung' value='http://www.mediengestalter.info/forum/43/die-mediengestalter-ausbildung-1.html'>Die Mediengestalter Ausbildung</option>\n" +
    "</optroup>\n" +
    "<optgroup label='Kreatives'>\n" +
    "<option label='Projekte' value='http://www.mediengestalter.info/forum/20/projekte-1.html'>Projekte</option>\n" +
    "<option label='Artwork Showcase' value='http://www.mediengestalter.info/forum/44/artwork-showcase-1.html'>Artwork Showcase</option>\n" +
    "<option label='Graphic-Battles' value='http://www.mediengestalter.info/forum/35/graphic-battles-1.html'>Graphic-Battles</option>\n" +
    "<option label='Advanced Graphic-Battles' value='http://www.mediengestalter.info/forum/53/advanced-graphic-battles-1.html'>Advanced Graphic-Battles</option>\n" +
    "<option label='Fotografie Showcase' value='http://www.mediengestalter.info/forum/48/fotografie-showcase-1.html'>Fotografie Showcase</option>\n" +
	"</optroup>\n" +
    "<optgroup label='Weitere Wissensgebiete'>\n" +
    "<option label='Medienberatung und Marketing' value='http://www.mediengestalter.info/forum/52/medienberatung-und-marketing-1.html'>Medienberatung und Marketing</option>\n" +
    "<option label='Hard- und Software' value='http://www.mediengestalter.info/forum/16/hard-und-software-1.html'>Hard- und Software</option>\n" +
    "<option label='Web-Hosting und Internetzugang' value='http://www.mediengestalter.info/forum/42/web-hosting-und-internetzugang-1.html'>Web-Hosting und Internetzugang</option>\n" +
    "<option label='Fotoapparate, Film &amp; Technik' value='http://www.mediengestalter.info/forum/40/fotoapparate-film-technik-1.html'>Fotoapparate, Film &amp; Technik</option>\n" +
    "<option label='Recht' value='http://www.mediengestalter.info/forum/41/recht-1.html'>Recht</option>\n" +
    "<option label='Wie macht man...' value='http://www.mediengestalter.info/forum/57/wie-macht-man-1.html'>Wie macht man...</option>\n" +
    "</optroup>\n" +
    "<optgroup label='Sonstiges'>\n" +
    "<option label='Surftipps' value='http://www.mediengestalter.info/forum/13/surftipps-1.html'>Surftipps</option>\n" +
    "<option label='MGi-Treffen &amp; Veranstaltungen' value='http://www.mediengestalter.info/forum/59/mgi-treffen-veranstaltungen-1.html'>MGi-Treffen &amp; Veranstaltungen</option>\n" +
    "<option label='Off Topic - Diskussionsrunde' value='http://www.mediengestalter.info/forum/47/off-topic-diskussionsrunde-1.html'>Off Topic - Diskussionsrunde</option>\n" +
    "<option label='Off Topic - Plauderecke' value='http://www.mediengestalter.info/forum/14/off-topic-plauderecke-1.html'>Off Topic - Plauderecke</option>\n" +
    "</optroup>\n";

    var pnOptions = "<option disabled='true' selected='true'> ( QuickPN ) </option>\n";
    for (i in pns) {
        pnOptions += "<option value='" + pns[i][1] + "' label='" + pns[i][0] + "'>" + pns[i][0] + "</option>\n";
    }

    var nodes = selectNodes(document, document.body, "//input[@name='helpbox']/..");
    if (nodes[0]) {
        var targetNode = nodes[0];

        // Edit Kommentar
        addHTML(targetNode, "<label class='gensmall' for='comment'>Kommentar: </label>"
        + "<input type='text' id='MGiModToolsComment' name='MGiModToolsComment' value='" + commentvalue + "' />"
        + " <button onclick='MGiModToolsAddComment(); return false;'>dazu</button>"
        + " <select id='MGiModToolsQuickComment' name='MGiModToolsQuickComment' onchange='MGiModToolsAddQuickComment();' style='width: 130px;'>" + commentOptions + "</select>"
        );

        // QuickPNs
        addHTML(targetNode, " <select id='MGiModToolsQuickPN' name='MGiModToolsQuickPN' onchange='MGiModToolsAddQuickPN();' style='width: 130px;'>" + pnOptions + "</select>");

        // Add edit line on first action
        addHTML(targetNode, "<script type='text/javascript'>"
        + "<!-- \n function MgiModToolsAddPrefix() {"
        + "    if (firstAction && document.post.MGiModToolsUseColors.checked) {"
        + "        firstAction = false;"
        + "        document.post.message.value += \"\\n\\n\" + '[color=' + document.post.MGiModToolsColor.value + '][[b]edit[/b]][/color]';"
        + "    }"
        + "    document.post.disable_bbcode.checked = false;"
        + "}"
        + "var firstAction = true;"
        + "</script>");
        // Paint comments in colors
        addHTML(targetNode, "<script type='text/javascript'>"
        + "<!-- \n function MgiModToolsColorComments(text) {"
        + "    createCookie(\"MGiModToolsCommentColor\", document.post.MGiModToolsColor.value, 8500); "
        + "    if (document.post.MGiModToolsUseColors.checked) {"
        + "        return '[color=' + document.post.MGiModToolsColor.value + ']' + text + '[/color]';"
        + "    } else {"
        + "        return text;"
        + "    }"
        + "}"
        + "var firstAction = true;"
        + "</script>");
        // Comment
        addHTML(targetNode, "<script type='text/javascript'>"
        + "<!-- \n function MGiModToolsAddComment() { "
        + "MgiModToolsAddPrefix(); "
        + "document.post.message.value += \"\\n\" + MgiModToolsColorComments(document.post.MGiModToolsComment.value); "
        + "document.post.message.focus(); "
        + "createCookie(\"MGiModToolsCommentValue\", document.post.MGiModToolsComment.value, 8500); "
        + "}; // -->"
        + "</script>");
        // QuickComment
        addHTML(targetNode, "<script type='text/javascript'>"
        + "<!-- \n function MGiModToolsAddQuickComment() { "
        + "MgiModToolsAddPrefix(); "
        + "document.post.message.value += \"\\n\" + MgiModToolsColorComments(document.post.MGiModToolsQuickComment.value); "
        + "document.post.message.focus(); "
        + "}; // --></script>");
        // QuickPN
        addHTML(targetNode, "<script type='text/javascript'>"
        + "<!-- \n function MGiModToolsAddQuickPN() { "
        + "document.post.message.value += \"\\n\" + document.post.MGiModToolsQuickPN.value; "
        + "if ( document.post.subject.value === \"\" ) document.post.subject.value = \"Beitrag entfernt.\";"
        + "document.post.message.focus(); "
        + "}; // --></script>");

        // Color
        addHTML(targetNode, " <label class='gensmall' for='comment'>Farbe: </label>"
        + "<input type='text' id='MGiModToolsColor' name='MGiModToolsColor' value='" + commentsColor + "' style='width: 60px;' />");

        // Solved
        // Comment
        addHTML(targetNode, "<script type='text/javascript'>"
        + "<!-- \n function MGiModToolsSolved() { "
        + "document.post.subject.value += \" [solved]\";"
        + "MgiModToolsAddPrefix(); "
        + "document.post.message.value += \"\\n\" + MgiModToolsColorComments(\"Als erledigt markiert.\"); "
        + "}; // -->"
        + "</script>");
        addHTML(targetNode, " <button onclick='MGiModToolsSolved(); return false;'>solved</button>");

        // Topic verschoben
        addHTML(targetNode, "<span class='gensmall'><br/>"
        + "Verschoben:</span> "
        + "<label class='gensmall' for='MGiModToolsFrom'>von</label> "
        + "<select name='MGiModToolsFrom' id='MGiModToolsFrom' style='width: 130px;'>" + forumOptions + "</select>");
        addHTML(targetNode, " <label class='gensmall' for='MGiModToolsTo'>nach</label> "
        + "<select name='MGiModToolsTo' id='MGiModToolsTo' onchange='MGiModToolsAddTopicMoved();' style='width: 130px;'>" + forumOptions + "</select>");
        addHTML(targetNode, " <button onclick='MGiModToolsAddTopicMoved(); return false;'>dazu</button>");

        // Options
        addHTML(targetNode, "<span class='gensmall'>");
        // Use colors switch
        addHTML(targetNode, " | <input type='checkbox' name='MGiModToolsUseColors' id='MGiModToolsUseColors' value='1' checked='true' /> <label for='MGiModToolsUseColors' title='Eingef&uuml;gte Text farbig markieren?'>Farbig?</label>");
        // Update link
        addHTML(targetNode, " | <a href='http://code.coderbyheart.de/svn/greasemonkey/mgimodtools.user.js' title='Rechts-Klicken und \"Install User Script...\" ausw&auml;hlen, um die neueste Version zu installieren.'>update</a>");
        // Feedback
        addHTML(targetNode, " | <a href='http://www.mediengestalter.info/forum/28/mgi-mod-tools-greasemonkey-52052-1.html' title='Feedback'>Feedback</a>");
        addHTML(targetNode, "</span>");

        addHTML(targetNode, "<script type='text/javascript'>"
        + "<!-- \n function MGiModToolsAddTopicMoved() { "
        + "MgiModToolsAddPrefix(); "
        + "document.post.message.value += \"\\n\" + MgiModToolsColorComments('Verschoben von [url=' + document.post.MGiModToolsFrom.value + ']' + document.post.MGiModToolsFrom.options[document.post.MGiModToolsFrom.selectedIndex].label + '[/url] nach [url=' + document.post.MGiModToolsTo.value + ']' + document.post.MGiModToolsTo.options[document.post.MGiModToolsTo.selectedIndex].label + '[/url].'); "
        + "document.post.message.focus(); "
        + "}; // --></script>");

        // Cookie handling
        addHTML(targetNode, "<script type='text/javascript'><!-- \n function createCookie(name,value,hours) { if (hours) { var date = new Date(); date.setTime(date.getTime()+(hours*60*60*1000)); var expires = \"; expires=\"+date.toGMTString(); } else var expires = \"\"; document.cookie = name+\"=\"+value+expires+\"; path=/\"; } function readCookie(name) { var nameEQ = name + \"=\"; var ca = document.cookie.split(\";\"); for(var i=0;i < ca.length;i++) { var c = ca[i]; while (c.charAt(0)==\" \") c = c.substring(1,c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); } return null; } function eraseCookie(name) { createCookie(name,\"\",-1); } // --></script>");
    }

})();
