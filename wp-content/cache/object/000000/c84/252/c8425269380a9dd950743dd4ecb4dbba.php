��[<?php exit; ?>a:1:{s:7:"content";O:8:"stdClass":23:{s:2:"ID";s:5:"11723";s:11:"post_author";s:2:"10";s:9:"post_date";s:19:"2017-08-16 17:30:51";s:13:"post_date_gmt";s:19:"2017-08-16 16:30:51";s:12:"post_content";s:10909:"<div class="blog-info">Our World in Data presents the empirical evidence on global development in entries dedicated to specific topics.
This blog post draws on data and research discussed in our entry on <strong><a href="ourworldindata.org/financing-healthcare/" target="_blank" rel="noopener noreferrer">Financing Healthcare</a></strong>.</div>
Today, healthcare is commonly considered a ‘merit good’—a commodity an individual should have on the basis of need rather than ability and willingness to pay. This view, mainly grounded in the recognized positive externalities of healthcare, is reflected in the fact that access to healthcare is currently a constitutional right in many countries.[ref]That healthcare should be considered a human right is nevertheless still subject of much debate. For an academic discussion of the principle of healthcare as a human right, see Smith, Richard, et al. "<a href="http://www.ncbi.nlm.nih.gov/pmc/articles/PMC1114728/" target="_blank">Shared ethical principles for everybody in healthcare: a working draft from the Tavistock Group</a>." British Medical Journal 318.7178 (1999): 248.[/ref]

However, a couple of centuries ago, the situation was very different. In fact, during the Middle Ages, personal health was considered a matter of destiny across most of Western Europe.[ref]Sundin and Willner (2007) say that "[g]enerally, before the era of the Enlightenment, it was thought that health was God’s gift and disease and death was His punishment for the sins of an individual, the congregation, the whole nation or its rulers. Hence, to live a decent life in accordance with His will and repenting one’s sins were considered the most effective preventive measures against illnesses".

The full reference is Sundin, Jan, and Sam Willner. (2007) <a href="https://www.diva-portal.org/smash/get/diva2:17729/FULLTEXT01.pdf" target="_blank">Social change and health in Sweden: 250 years of politics and practice.</a> Swedish National Institute of Public Health.[/ref]

So, when was it that the provision of healthcare became a public policy priority? To answer this question, we piece together a new dataset and give you a behind-the-scenes look at our approach.

As we discuss below in more detail, the data shows that it was only recently that public healthcare became a policy priority. Up until 1930, public spending on healthcare was less than 1% of national incomes everywhere in the world. For context, the countries with the highest public healthcare spending levels today devote close to 10% of their national incomes to it.

<strong>Available sources</strong>

Reliable historical data on healthcare expenditure is scant. To our knowledge, the longest series on healthcare expenditure is available from Tanzi and Schuknecht (2000).[ref]Tanzi, Vito, and Ludger Schuknecht. <a href="https://books.google.com.au/books?hl=en&amp;lr=&amp;id=kHl6xCgd3aAC&amp;oi=fnd&amp;pg=PR11&amp;dq=Public+spending+in+the+20th+century:+A+global+perspective&amp;ots=WhdEEdxaWN&amp;sig=XJsyIdSA8C2cD-wqOFVrBCtuaY4#v=onepage&amp;q=Public%20spending%20in%20the%2020th%20century%3A%20A%20global%20perspective&amp;f=false" target="_blank">Public spending in the 20th century: A global perspective</a>. Cambridge University Press, 2000 [/ref]

Tanzi and Schuknecht compile estimates from various sources, covering the period 1880-1994.

Because the most recent observations in Tanzi and Schuknecht come from the World Bank's <a href="http://data.worldbank.org/indicator/SH.XPD.PUBL.ZS" target="_blank">World Development Indicators (WDI)</a>, we turn to the same source to try to extend the series forward from 1995 to 2014. Unfortunately, a comparison of the WDI series and the series in Tanzi and Schuknecht reveals that this is not possible since there is a clear discrepancy in levels—the WDI observations for 1995 imply a marked jump with respect to the 1994 observations reported by Tanzi and Schuknecht. This discrepancy arises from the fact that the World Health Organization—which is the underlying source of the WDI series—has revised its methodology and estimates. Hence, the estimates compiled by Tanzi and Schuknecht are not comparable to more recent estimates from the same underlying source.

An alternative source of up-to-date data on healthcare spending is the OECD via the <a href="http://stats.oecd.org/" target="_blank" rel="noopener noreferrer">OECD.stat portal</a>. This source publishes estimates for the period 1970-2016. However once again, it is neither consistent with the World Bank series, nor with the estimates compiled by Tanzi and Schuknecht.

The discrepancies between these sources are mainly due to differences in definitions regarding the types of expenditure that are accounted for. In particular, the figures published by OECD.stat do not include capital expenditures as part of total spending on healthcare, public or private.

Whether reporting agencies include capital expenditure as part of healthcare expenditure depends on the 'System of Health Accounts' (SHA) that is in place. The OECD figures use the <a href="http://www.who.int/health-accounts/methodology/sha2011.pdf" target="_blank" rel="noopener noreferrer">SHA 2011</a>, which is the latest revision. The WHO figure use a previous version (<a href="http://www.who.int/health-accounts/documentation/EnglishSHA.pdf?ua=1">SHA 1.0</a>).

While it is widely accepted that the SHA 2011 is superior to previous versions, many countries still use previous versions. This means there is a trade-off between coverage across countries, and data quality. In the interest of coverage, we have chosen to rely on WHO definitions.

<strong>Piecing together a new series</strong>

Given these difficulties, we decided to piece together a new series using information from various sources based on a number of assumptions.

Our approach consisted in taking the latest release of the data from the World Health Organization (WHO), and extrapolating backwards using the rates of change implied by the sources underlying the estimates from Tanzi and Schuknecht and others.

In the end, our dataset was constructed by combining four sources. These are Lindert (1994)[ref] Lindert (1994), The Rise of Social Spending, 1880-1930, in Explorations in Economic History, 31, 1-37.[/ref], OECD (1993)[ref]OECD (1993), OECD Health Systems: facts and trends 1960-1991, Health Policy Studies n°3.[/ref], <a href="http://stats.oecd.org/" target="_blank" rel="noopener noreferrer">OECD.stat</a>, and the <a href="http://apps.who.int/nha/database/Select/Indicators/en" target="_blank" rel="noopener noreferrer">WHO Global Health Expenditure Database (WHO GHED).</a>

These four sources were combined as follows.
<ul>
 	<li>For the period 1995-2015 we report the figures as published in WHO GHED.</li>
 	<li>For the period 1970-1994, we extended the recent figures (from WHO GHED) backwards by using the rates of change as reported in OECD.stat.</li>
 	<li>For the period 1960-1969, we continue extending backwards by using the rates of change as reported in OECD (1993).</li>
 	<li>For the period 1880-1930, we report observations from Lindert (1994).</li>
</ul>
To be precise, the process of extrapolation consisted in taking the earliest available observation from WHO GHED, and then successively extending the series backwards; first by using the year-by-year rate of change implied by the estimates in OECD.stat, for the period 1970-1994; and then using the year-by-year rate of change in OECD (1993), for the period 1960-1969.[ref]Here is an example:

WHO_(year-1)= WHO_year x [OECD.stat_(year-1)]/[OECD.stat_(year)]
[/ref]

The implicit assumption in our constructed dataset is that the estimates from these three series have different levels, but common trends. Empirically, the validity of this assumption is supported by the trends in the overlapping years.

The following chart plots, country by country, the underlying sources. If you want to compare our constructed dataset against the underlying sources for a specific country, all you need to do is select the series labelled ‘OWID extrapolated series', at the top of the chart.

<iframe style="width: 100%; height: 600px; border: 0px none;" src="https://ourworldindata.org/grapher/various-measures-of-health-expenditure-as-share-of-gdp?shown=United%20Kingdom%20-%20Public%20expenditure%20on%20health%20%25GDP%20-%20(Lindert%201994)+United%20Kingdom%20-%20Public%20expenditure%20on%20health%20%25GDP%20-%20(OECD%201993)+United%20Kingdom%20-%20Public%20expenditure%20on%20health%20%25GDP%20-%20(OECDstat)+United%20Kingdom%20-%20Public%20expenditure%20on%20health%20%25GDP%20(WHO)" width="300" height="150"></iframe>

<strong>The rise of public healthcare </strong>

The visualization below plots our new dataset of healthcare estimates for a selection of today’s rich countries.

Public expenditure on healthcare in all of these countries followed roughly similar paths—and this is despite early differences in their healthcare regimes (for a detailed account of the institutional evolution of healthcare regimes in these countries see the <a href="https://www.cesifo-group.de/ifoHome/facts/DICE/Social-Policy/Health/Organisational-Structure/DR4-04-ev-HC-ref.html" target="_blank" rel="noopener noreferrer">report prepared by CESifo DICE</a>).

As we can see, before World War I, public spending on healthcare was negligible, accounting for less than 1% of national incomes in all countries. Yet in the second half of the twentieth century things started changing quickly, and today public healthcare spending is between 5-10% of national incomes.

<iframe style="width: 100%; height: 600px; border: 0px none;" src="https://ourworldindata.org/grapher/public-health-expenditure-share-GDP-OWID" width="300" height="150"></iframe>

The same data from the chart above is mapped in the visualization below. As we can see, after half a century of expanding their healthcare systems, OECD countries today spend much more on healthcare than lower income countries where the expansion of healthcare protection started decades later.

And the differences in healthcare spending between countries today are larger yet if we compare per capita figures, rather than shares of GDP. As we show in <a href="https://ourworldindata.org/grapher/healthcare-expenditure-per-capita" target="_blank" rel="noopener noreferrer">this interactive chart</a>, per capita healthcare spending in the US is 387 times higher than in the Central African Republic; which means that, on average, Americans spend more on healthcare per day than people in the Central African Republic spend per year.

<iframe style="width: 100%; height: 600px; border: 0px none;" src="https://ourworldindata.org/grapher/public-health-expenditure-share-GDP-OWID?tab=map&amp;year=2014" width="300" height="150"></iframe>";s:10:"post_title";s:75:"When did the provision of healthcare first become a public policy priority?";s:12:"post_excerpt";s:0:"";s:11:"post_status";s:7:"publish";s:14:"comment_status";s:6:"closed";s:11:"ping_status";s:6:"closed";s:13:"post_password";s:0:"";s:9:"post_name";s:67:"the-expansion-of-healthcare-evidence-from-a-newly-assembled-dataset";s:7:"to_ping";s:0:"";s:6:"pinged";s:0:"";s:13:"post_modified";s:19:"2017-11-03 08:45:34";s:17:"post_modified_gmt";s:19:"2017-11-03 08:45:34";s:21:"post_content_filtered";s:0:"";s:11:"post_parent";s:1:"0";s:4:"guid";s:35:"https://ourworldindata.org/?p=11723";s:10:"menu_order";s:1:"0";s:9:"post_type";s:4:"post";s:14:"post_mime_type";s:0:"";s:13:"comment_count";s:1:"0";}}