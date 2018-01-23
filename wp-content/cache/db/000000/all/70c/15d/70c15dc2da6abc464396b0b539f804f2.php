6�W<?php exit; ?>a:6:{s:10:"last_error";s:0:"";s:10:"last_query";s:46:"SELECT * FROM wp_posts WHERE id IN (6724,7922)";s:11:"last_result";a:2:{i:0;O:8:"stdClass":23:{s:2:"ID";s:4:"6724";s:11:"post_author";s:1:"2";s:9:"post_date";s:19:"2015-12-08 13:56:48";s:13:"post_date_gmt";s:19:"2015-12-08 13:56:48";s:12:"post_content";s:4665:"<p style="text-align: right;"><a href="http://ourworldindata.org/chart-builder/public/charts">Login</a></p>

<div style="max-width: 1800px; margin: auto;">
<h2>The open-source tool to store and visualize data online</h2>
As every other tool developed and used at OurWorldInData this tool is also completely open source and is <em>free to use on any other web publication</em>. <a href="http://github.com/OurWorldInData/our-world-in-data-grapher">The Grapher is completely open source on GitHub</a>.

The <em>OurWorldInData-Grapher</em> is the chart building tool which is used on our web-publication <a href="http://ourworldindata.org/">OurWorldInData.org</a>.

Essentially these are two tools in one:
<ol>
	<li>A first tool allows the author to upload panel data into one central SQL database and tn the process of uploading the data, the author can store all the relevant information about the data source so that the authors get credited and the definitions, units, and other relevant information get stored with the data.</li>
	<li>A second tool then allows to pull any of the data from this database and visualize it in an interactive chart in many, many different ways.</li>
</ol>
We have so far developed the capabilities to visualize data in the following ways:
<ul>
	<li>scatter plot,</li>
	<li>line chart,</li>
	<li>stacked area chart,</li>
	<li>bar chart (horizontal and vertical; single- and multi-bar charts)</li>
	<li>choropleth maps (world maps and maps of all countries and continents)</li>
</ul>
With this tool it will is possible for the reader to pull the information for additional countries from the database and add them to the visualization. The reader can then build her own charts or maps and save it as a .svg vector image or as a .png image. These visualizations work for all countries, many different data types and are highly customizable.
The OurWorldInData-Grapher was developed by the web developers <a href="http://www.zdenekhynek.cz/">Zdenek Hynek</a> and <a href="https://mispy.me/">Jaiden Mispy</a> with the support from Max Roser. Since February 2016 Jaiden Mispy is the developer of the Grapher.

&nbsp;

Zdenek Hynek shows in this short video the basic work flow to store data and create a chart:

https://www.youtube.com/watch?v=Fods4ygADLg

The Grapher makes use of the beautiful reusable visualizations made available by two libraries that have been built on top of D3: The library <a href="http://datamaps.github.io">datamaps.js</a> for maps and the <a href="http://nvd3.org">NVD3.js</a> library for line charts, bar charts and some other types of charts. The backend is written in PHP using the Laravel Framework. The frontend is written using Backbone.js. You find more information and the source code on the <a href="http://github.com/OurWorldInData/our-world-in-data-grapher">Grapher page at GitHub</a>.

<strong><a href="#_ftn1" name="_ftnref1"></a>Line chart</strong>
Here is the empirical evidence on child mortality visualised – to show an example of what a line chart visualsiation done with the OurWorldInData-Grapher looks like.
<iframe style="width: 100%; height: 660px; border: 0px none;" src="http://ourworldindata.org/grapher/public/view/58" width="300" height="150"></iframe>

<strong>A stacked area chart with change country function</strong>

You can click on <em>Change Country</em> to see the data for a different country.
<iframe style="width: 100%; height: 660px; border: 0px none;" src="http://ourworldindata.org/grapher/public/view/79" width="300" height="150"></iframe>

<strong>Choropleth World Maps</strong>

World maps with numerical (ratio) data
<iframe style="width: 100%; height: 660px; border: 0px none;" src="http://ourworldindata.org/grapher/public/view/148" width="300" height="150"></iframe>

<strong>Political Regime Map</strong>

World map with categorical data that is coded as numerical data and then displayed with category names
<iframe style="width: 100%; height: 700px; border: 0px none;" src="http://ourworldindata.org/chart-builder/public/view/135" width="300" height="150"></iframe>

<strong>Multi-Bar Chart</strong>
This is a bar chart for time series information
Example shows war deaths – you can "group" or "stack" the data by year by choosing one or the other option on the top left.

<iframe src="https://ourworldindata.org/grapher/battle-deaths-global" style="width:100%;height:660px; border: 0px none;"></iframe>

<strong>Scatter plot</strong>
<iframe style="width: 100%; height: 660px; border: 0px none;" src="http://ourworldindata.org/grapher/public/view/71" width="300" height="150"></iframe>

</div>";s:10:"post_title";s:26:"The OurWorldInData-Grapher";s:12:"post_excerpt";s:0:"";s:11:"post_status";s:7:"publish";s:14:"comment_status";s:4:"open";s:11:"ping_status";s:4:"open";s:13:"post_password";s:0:"";s:9:"post_name";s:12:"owid-grapher";s:7:"to_ping";s:0:"";s:6:"pinged";s:0:"";s:13:"post_modified";s:19:"2016-06-03 12:59:42";s:17:"post_modified_gmt";s:19:"2016-06-03 12:59:42";s:21:"post_content_filtered";s:0:"";s:11:"post_parent";s:1:"0";s:4:"guid";s:39:"http://ourworldindata.org/?page_id=6724";s:10:"menu_order";s:1:"0";s:9:"post_type";s:4:"page";s:14:"post_mime_type";s:0:"";s:13:"comment_count";s:1:"0";}i:1;O:8:"stdClass":23:{s:2:"ID";s:4:"7922";s:11:"post_author";s:1:"2";s:9:"post_date";s:19:"2016-06-13 09:58:00";s:13:"post_date_gmt";s:19:"2016-06-13 09:58:00";s:12:"post_content";s:3351:"You can use any of the interactive visualizations from Our World In Data in your articles. This is possible because everything is permissively licensed (under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>) and because there is an easy embed feature on every chart.

Here are three recent examples of articles that embed OWID visualizations:

– <a href="http://www.politifact.com/global-news/statements/2016/mar/23/gayle-smith/did-we-really-reduce-extreme-poverty-half-30-years/">Politifact using OurWorldInData in fact checking claims about global poverty</a>.

– <a href="http://ofuturodascoisas.com/projecao-da-populacao-pelo-nivel-educacional-ate-2100/">The Brazilian website <em>o futuro das coisas</em> in an article about the future of global education</a>.

– <a href="http://www.vox.com/2016/4/25/11488196/world-malaria-day">Vox.com in an article on the decline of global malaria deaths on World Malaria Day</a>.

<h3>An example:</h3>
For example let's assume you want to write about fertility and on the <a href="https://ourworldindata.org/fertility/">fertility</a> page you find this map that you want to embed in your own article:

<iframe src="https://ourworldindata.org/grapher/children-per-woman-UN" width="100%" height="660px"></iframe>
<h3>All you have to do to embed it in your article:</h3>
At the bottom of the chart you click on<strong> &lt;/&gt;Embed</strong> and you will see a box popping up (try it!) with the following bit of text:

&lt;iframe src="https://ourworldindata.org/grapher/children-per-woman-UN" width="100%" height="660px"&gt;&lt;/iframe&gt;

Now you just take this bit of html code and place it in the text of your own article.

An iframe is used to display a website within another website (<em>w3schools</em> has <a href="http://www.w3schools.com/html/html_iframe.asp">more info on iframes</a>.) Similar to when you embed a YouTube video in your article, your article now embeds an Our World In Data visualization.

<h3>Change the map focus, change the year:</h3>
We try to make the embed tool as useful as possible: For example, you can focus on Africa instead of World in the map above; and you can move the time slider to 2015 (you will get <a href="https://ourworldindata.org/grapher/children-per-woman-UN?region=Africa&amp;year=2015">this</a>). Now when you click on<strong> &lt;/&gt; Embed</strong> you get the following bit of code:

&lt;iframe src="https://ourworldindata.org/grapher/children-per-woman-UN?region=Africa&amp;year=2015" width="100%" height="660px"&gt;&lt;/iframe&gt;

If you copy-paste this code your article will embed the map with a focus on Africa and the fertility rate for 2015.

And the same works for the chart view. Just switch to Chart in the visualization above and add the countries that you are interested in – like <a href="https://ourworldindata.org/grapher/children-per-woman-UN?tab=chart&amp;country=DEU+IRN">this</a>. When you click on<strong> &lt;/&gt; Embed</strong> you can now get the code to embed this line chart.

<h3>Static visualizations for your text or presentation:</h3>
It is also possible to put static versions of Our World In Data visualizations in web articles, text documents or presentations. Just click on PNG below the chart and you have the chart that you need.";s:10:"post_title";s:61:"How to embed Our World In Data visualizations in your article";s:12:"post_excerpt";s:0:"";s:11:"post_status";s:7:"publish";s:14:"comment_status";s:4:"open";s:11:"ping_status";s:4:"open";s:13:"post_password";s:0:"";s:9:"post_name";s:58:"how-to-embed-ourworldindata-visualisations-in-your-article";s:7:"to_ping";s:0:"";s:6:"pinged";s:0:"";s:13:"post_modified";s:19:"2016-06-15 12:42:04";s:17:"post_modified_gmt";s:19:"2016-06-15 12:42:04";s:21:"post_content_filtered";s:0:"";s:11:"post_parent";s:1:"0";s:4:"guid";s:34:"https://ourworldindata.org/?p=7922";s:10:"menu_order";s:1:"0";s:9:"post_type";s:4:"post";s:14:"post_mime_type";s:0:"";s:13:"comment_count";s:1:"0";}}s:8:"col_info";a:23:{i:0;O:8:"stdClass":13:{s:4:"name";s:2:"ID";s:7:"orgname";s:2:"ID";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:4;s:6:"length";i:20;s:9:"charsetnr";i:63;s:5:"flags";i:49699;s:4:"type";i:8;s:8:"decimals";i:0;}i:1;O:8:"stdClass":13:{s:4:"name";s:11:"post_author";s:7:"orgname";s:11:"post_author";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:1;s:6:"length";i:20;s:9:"charsetnr";i:63;s:5:"flags";i:49193;s:4:"type";i:8;s:8:"decimals";i:0;}i:2;O:8:"stdClass":13:{s:4:"name";s:9:"post_date";s:7:"orgname";s:9:"post_date";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:19;s:6:"length";i:19;s:9:"charsetnr";i:63;s:5:"flags";i:16513;s:4:"type";i:12;s:8:"decimals";i:0;}i:3;O:8:"stdClass":13:{s:4:"name";s:13:"post_date_gmt";s:7:"orgname";s:13:"post_date_gmt";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:19;s:6:"length";i:19;s:9:"charsetnr";i:63;s:5:"flags";i:129;s:4:"type";i:12;s:8:"decimals";i:0;}i:4;O:8:"stdClass":13:{s:4:"name";s:12:"post_content";s:7:"orgname";s:12:"post_content";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:4665;s:6:"length";i:4294967295;s:9:"charsetnr";i:224;s:5:"flags";i:4113;s:4:"type";i:252;s:8:"decimals";i:0;}i:5;O:8:"stdClass":13:{s:4:"name";s:10:"post_title";s:7:"orgname";s:10:"post_title";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:61;s:6:"length";i:262140;s:9:"charsetnr";i:224;s:5:"flags";i:4113;s:4:"type";i:252;s:8:"decimals";i:0;}i:6;O:8:"stdClass":13:{s:4:"name";s:12:"post_excerpt";s:7:"orgname";s:12:"post_excerpt";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:0;s:6:"length";i:262140;s:9:"charsetnr";i:224;s:5:"flags";i:4113;s:4:"type";i:252;s:8:"decimals";i:0;}i:7;O:8:"stdClass":13:{s:4:"name";s:11:"post_status";s:7:"orgname";s:11:"post_status";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:7;s:6:"length";i:80;s:9:"charsetnr";i:224;s:5:"flags";i:16385;s:4:"type";i:253;s:8:"decimals";i:0;}i:8;O:8:"stdClass":13:{s:4:"name";s:14:"comment_status";s:7:"orgname";s:14:"comment_status";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:4;s:6:"length";i:80;s:9:"charsetnr";i:224;s:5:"flags";i:1;s:4:"type";i:253;s:8:"decimals";i:0;}i:9;O:8:"stdClass":13:{s:4:"name";s:11:"ping_status";s:7:"orgname";s:11:"ping_status";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:4;s:6:"length";i:80;s:9:"charsetnr";i:224;s:5:"flags";i:1;s:4:"type";i:253;s:8:"decimals";i:0;}i:10;O:8:"stdClass":13:{s:4:"name";s:13:"post_password";s:7:"orgname";s:13:"post_password";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:0;s:6:"length";i:80;s:9:"charsetnr";i:224;s:5:"flags";i:1;s:4:"type";i:253;s:8:"decimals";i:0;}i:11;O:8:"stdClass":13:{s:4:"name";s:9:"post_name";s:7:"orgname";s:9:"post_name";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:58;s:6:"length";i:800;s:9:"charsetnr";i:224;s:5:"flags";i:16393;s:4:"type";i:253;s:8:"decimals";i:0;}i:12;O:8:"stdClass":13:{s:4:"name";s:7:"to_ping";s:7:"orgname";s:7:"to_ping";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:0;s:6:"length";i:262140;s:9:"charsetnr";i:224;s:5:"flags";i:4113;s:4:"type";i:252;s:8:"decimals";i:0;}i:13;O:8:"stdClass":13:{s:4:"name";s:6:"pinged";s:7:"orgname";s:6:"pinged";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:0;s:6:"length";i:262140;s:9:"charsetnr";i:224;s:5:"flags";i:4113;s:4:"type";i:252;s:8:"decimals";i:0;}i:14;O:8:"stdClass":13:{s:4:"name";s:13:"post_modified";s:7:"orgname";s:13:"post_modified";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:19;s:6:"length";i:19;s:9:"charsetnr";i:63;s:5:"flags";i:129;s:4:"type";i:12;s:8:"decimals";i:0;}i:15;O:8:"stdClass":13:{s:4:"name";s:17:"post_modified_gmt";s:7:"orgname";s:17:"post_modified_gmt";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:19;s:6:"length";i:19;s:9:"charsetnr";i:63;s:5:"flags";i:129;s:4:"type";i:12;s:8:"decimals";i:0;}i:16;O:8:"stdClass":13:{s:4:"name";s:21:"post_content_filtered";s:7:"orgname";s:21:"post_content_filtered";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:0;s:6:"length";i:4294967295;s:9:"charsetnr";i:224;s:5:"flags";i:4113;s:4:"type";i:252;s:8:"decimals";i:0;}i:17;O:8:"stdClass":13:{s:4:"name";s:11:"post_parent";s:7:"orgname";s:11:"post_parent";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:1;s:6:"length";i:20;s:9:"charsetnr";i:63;s:5:"flags";i:49193;s:4:"type";i:8;s:8:"decimals";i:0;}i:18;O:8:"stdClass":13:{s:4:"name";s:4:"guid";s:7:"orgname";s:4:"guid";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:39;s:6:"length";i:1020;s:9:"charsetnr";i:224;s:5:"flags";i:1;s:4:"type";i:253;s:8:"decimals";i:0;}i:19;O:8:"stdClass":13:{s:4:"name";s:10:"menu_order";s:7:"orgname";s:10:"menu_order";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:1;s:6:"length";i:11;s:9:"charsetnr";i:63;s:5:"flags";i:32769;s:4:"type";i:3;s:8:"decimals";i:0;}i:20;O:8:"stdClass":13:{s:4:"name";s:9:"post_type";s:7:"orgname";s:9:"post_type";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:4;s:6:"length";i:80;s:9:"charsetnr";i:224;s:5:"flags";i:16393;s:4:"type";i:253;s:8:"decimals";i:0;}i:21;O:8:"stdClass":13:{s:4:"name";s:14:"post_mime_type";s:7:"orgname";s:14:"post_mime_type";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:0;s:6:"length";i:400;s:9:"charsetnr";i:224;s:5:"flags";i:1;s:4:"type";i:253;s:8:"decimals";i:0;}i:22;O:8:"stdClass":13:{s:4:"name";s:13:"comment_count";s:7:"orgname";s:13:"comment_count";s:5:"table";s:8:"wp_posts";s:8:"orgtable";s:8:"wp_posts";s:3:"def";s:0:"";s:2:"db";s:14:"owid_wordpress";s:7:"catalog";s:3:"def";s:10:"max_length";i:1;s:6:"length";i:20;s:9:"charsetnr";i:63;s:5:"flags";i:32769;s:4:"type";i:8;s:8:"decimals";i:0;}}s:8:"num_rows";i:2;s:10:"return_val";i:2;}