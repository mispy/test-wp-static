jQuery(function() {
	jQuery('a#poppe').click(function (e) {
	e.preventDefault();
	var page = jQuery(this).attr("href")
	var pagetitle = jQuery(this).attr("title")
	var jQuerydialog = jQuery("<div id='aaape'></div>")
	.html('<iframe style="border: 0px; " src="' + page + '" width="1050" height="550"></iframe>')
	.dialog({
		'dialogClass'   : 'wp-dialog',
		autoOpen: false,
		modal: true,
		height: 580,
		width: 1050,
		title: pagetitle
	});
	jQuerydialog.dialog('open');
	});
});


