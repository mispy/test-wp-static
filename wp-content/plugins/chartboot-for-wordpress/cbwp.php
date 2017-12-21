<?php require_once('../../../wp-load.php'); ?>

<?php
	if(!current_user_can('edit_posts'))
	wp_die('You do not have rights to embed Google Charts to Post or Pages');
?>

<!DOCTYPE html>
<html lang="en">
<head>

	<meta charset="utf-8">
	<title>ChartBoot - Embed Google Charts in your site in seconds.</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="The easier and faster way to create, edit and embed dynamic Google Charts in your site.">
	<meta name="author" content="Paggetti Luca">

    <link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/custom.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 3px;
        padding-bottom: 0px;
	}
    </style>

<link rel="shortcut icon" href="ico/favicon.ico">
	
	
</head>

<body>

<div class="container">


<div class="row">

<div class="span3">
<p><a class="btn btn-large btn-primary" style="width:90%" data-toggle="modal" href="#ImportData" >Import Data &raquo;</a></p>
<p><a class="btn btn-large btn-primary" style="width:90%" data-toggle="modal" href="#SetTypes" >Set Types &raquo;</a></p>
</div>

<div class="span3">
<p><a class="btn btn-large btn-primary" style="width:90%" href="#" onclick="GCEWP.openEditor();return false;">Edit Chart &raquo;</a></p>
</div>

<div class="span3">
<p><a class="btn btn-large btn-primary" style="width:90%" data-toggle="modal" href="#SetStyle" >Set Style &raquo;</a></p>
</div>

<div class="span3">
<p><a class="btn btn-large btn-primary" style="width:90%;" onclick="GCEWP.sendCode();" href="#" >Send to WP &raquo;</a></p>
</div>

</div>

<div class="row">
<div class="span12">

<div id="brd" style='border: 1px darkgray solid; width: 800px;'>
<div id='visualization' style='width: 800px; height: 400px;'></div>
<p id="attr" style='text-align: right; margin:3px;'><span style='font-size:11px;font-family:arial,helvetica,sans-serif;'>made with <a href='http://www.chartboot.com' target='_blank'>ChartBoot</a></span></p>
</div>


</div>

</div>


</div>


<div class="modal hide" id="ImportData">
<div class="modal-header">
<button class="close" data-dismiss="modal">x</button>
<h3>Import Data</h3>
</div>
<div class="modal-body">
<p>Paste cells from Excel, Calc ...</p>
<textarea id="inp" rows="4" cols="6" style="margin-left: 0px; width:100%; overflow:hidden;resize: none;" onclick="this.focus();this.select()">
Year	Sales	Expenses
2004	1000	400
2005	1170	460
2006	660	1120
2007	1030	540
</textarea><br>
<label class="checkbox"><input type="checkbox" id="haslabels" value="option1" checked="yes">Headers?</label>
</div>
<div class="modal-footer">
<a href="#" class="btn" data-dismiss="modal">Close</a>
<a href="#" class="btn btn-primary" data-dismiss="modal" onclick="GCEWP.importData();">OK</a>
</div>
</div>

<div class="modal hide" id="SetTypes">
<div class="modal-header">
<button class="close" data-dismiss="modal">x</button>
<h3>Set Column Types</h3>
</div>
<div class="modal-body">
<div id="ds">
<table width="100%" class="table">
<tr><td>Year<br><select class="span2" id="tp0">
<option value="string" selected="">string</option>
<option value="number">number</option>
<option value="date">date</option>
</select></td></tr>
<tr><td>Sales<br><select class="span2" id="tp1">
<option value="string">string</option>
<option value="number" selected="">number</option>
<option value="date">date</option>
</select></td></tr>
<tr><td>Expenses<br><select class="span2" id="tp2">
<option value="string">string</option>
<option value="number" selected="">number</option>
<option value="date">date</option>
</select></td></tr>
</table>
</div>
</div>
<div class="modal-footer">
<a href="#" class="btn" data-dismiss="modal">Close</a>
<a href="#" class="btn btn-primary" data-dismiss="modal" onclick="GCEWP.setTypes();">OK</a>
</div>
</div>


<div class="modal hide" id="SetStyle">
<div class="modal-header">
<button class="close" data-dismiss="modal">x</button>
<h3>Set Style</h3>
</div>
<div class="modal-body">
<label>Width</label>
<input type="text" class="input-mini" id="ws" value=800>
<span class="help-block">Original Width = 800</span>
<label>Height</label>
<input type="text" class="input-mini" id="hs" value=400>
<span class="help-inline">Original Height = 400</span>
<label class="checkbox"><input type="checkbox" id="brdcb" value="option1" checked="yes">Border?</label>
<label class="checkbox"><input type="checkbox" id="attribution" value="option1" checked="yes">Link to ChartBoot? - Thank you.</label>
</div>
<div class="modal-footer">
<a href="#" class="btn" data-dismiss="modal">Close</a>
<a href="#" class="btn btn-primary" data-dismiss="modal" onclick="GCEWP.setStyle();">OK</a>
</div>
</div>




<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->

<script src="http://www.google.com/jsapi"></script>
<script> google.load('visualization', '1', {packages: ['charteditor']}); </script>

<script src="../../../wp-includes/js/jquery/jquery.js"></script>

<script src="js/bootstrap.min.js"></script>
<script src="js/date.js"></script>
<script src="js/gcewp.js"></script>

</body>
</html>