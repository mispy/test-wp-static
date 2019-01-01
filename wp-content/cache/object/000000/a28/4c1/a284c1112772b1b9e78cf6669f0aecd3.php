��[<?php exit; ?>a:1:{s:7:"content";O:8:"stdClass":23:{s:2:"ID";s:5:"12412";s:11:"post_author";s:2:"10";s:9:"post_date";s:19:"2017-08-28 17:00:41";s:13:"post_date_gmt";s:19:"2017-08-28 16:00:41";s:12:"post_content";s:11806:"<div class="blog-info">Our World in Data presents the empirical evidence on global development in entries dedicated to specific topics.
This blog post draws on data and research discussed in our entry on <strong><a href="https://ourworldindata.org/life-expectancy/" target="_blank" rel="noopener">Life Expectancy</a></strong>.</div>

The interactive chart below shows that life expectancy has increased substantially around the world in the last couple of centuries. As a matter of fact, the data tells us that <a href="https://ourworldindata.org/life-expectancy/#life-expectancy-increased-in-all-countries-of-the-world">in the long run life expectancy has increased in all countries around the world</a>.

Life expectancy is one of the key measures of a population’s health, and an indicator used widely by policymakers and researchers to complement economic measures of prosperity, such as <a href="https://ourworldindata.org/economic-growth">GDP per capita</a>. It is easy to see that the trends in the chart below are a fantastic achievement reflecting <a href="https://ourworldindata.org/health-meta/">widespread improvements in global health</a>.


However, despite its importance and prominence in research and policy, it is surprisingly difficult to find a simple yet detailed description of what “life expectancy” actually means. In this blog post, we try to fill this gap.

<iframe style="width: 100%; height: 600px; border: 0px none;" src="https://ourworldindata.org/grapher/life-expectancy?country=BRA+ETH+DEU+IND+JPN+KOR+GBR" width="300" height="150"></iframe>

<strong>What is life expectancy and how is it interpreted?</strong>

The term "life expectancy" refers to the number of years a person can expect to live. By definition, life expectancy is based on an estimate of the average age that members of a particular population group will be when they die.

In theory, estimating age-at-death is a simple exercise. Suppose we could track a group of people born a given year, many decades ago, and observe the exact date in which each one of them died. Then, we could estimate this cohort's life expectancy by simply calculating the average of the ages of all members when they died.

In practice, however, things are often more complicated because record-keeping is insufficient, and because we are interested in making inferences about how long a group of people can expect to live in the future. Hence, estimating life expectancy typically requires making assumptions.

One common approach is to track members of a particular cohort (i.e. a group of individuals born in a given year) and predict the average age-at-death for them using a combination of observed mortality rates for past years and projections about mortality rates for future years. This approach leads to what is known as '<strong>cohort life expectancy</strong>'. By definition, the cohort life expectancy takes into account observed and projected improvements in mortality for the cohort throughout its lifetime.

An alternative approach consists in estimating the average length of life for a <em>hypothetical</em> cohort assumed to be exposed, from birth through death, to the mortality rates observed at a given year. This approach leads to what is known as '<strong>period life expectancy</strong>' and is the definition used by most international organizations, including the UN and the World Bank, when reporting 'life expectancy' figures. Period life expectancy estimates do not take into account how mortality rates are changing and instead only look at the mortality pattern at one point in time. Because of this, period life expectancy figures are usually different to cohort life expectancy figures.

Since period life expectancy estimates are ubiquitous in research and public debate, it is helpful to use an example to flesh out the concept. Let's consider the visualization below, which maps life expectancy—specifically period life expectancy—at birth, country by county. You can hover the mouse over a country to display the corresponding estimate.

For the US, we can see that life expectancy in 2005 was 77.6 years. This means that the cohort of infants born in the US in 2005 could expect to live 77.6 years, under the assumption that mortality patterns observed in 2005 remain constant throughout their lifetime. This is clearly a strong assumption—if you move the slider forward in the chart below, you'll see that in 2010 the period life expectancy in the US was 78.8 years, which means that US mortality patterns did improve in the period 2005-2010.

In general, the commonly-used period life expectancies tend to be lower than the cohort life expectancies, because they do not include any assumptions about future improvements in mortality rates.

<iframe style="width: 100%; height: 600px; border: 0px none;" src="https://ourworldindata.org/grapher/life-expectancy?tab=map&amp;year=2005" width="300" height="150"></iframe>

An important point to bear in mind when interpreting life expectancy estimates is that very few people will die at precisely the age indicated by life expectancy, even if mortality patterns stay constant.

For example, very few of the infants born in South Africa in 2009 will die at 52.2 years of age, as per the figures in the map above. Most will die much earlier or much later, since the risk of death is not uniform across the lifetime. Life expectancy is the average.

In societies with high infant mortality rates many people die in the first few years of life; but once they survive childhood, people often live much longer. Indeed, this is a common source of confusion in the interpretation of life expectancy figures: It is perfectly possible that a given population has a low life expectancy at birth, and yet has a large proportion of old people.

Given that life expectancy at birth is highly sensitive to the rate of death in the first few years of life, it is common to report life expectancy figures at different ages, both under the period and cohort approaches. For example, the UN estimates that <a href="https://ourworldindata.org/grapher/life-expectancy-at-age-10?country=OWID_WRL">the (period) global life expectancy at age 10 in 2005 was 63.6 years</a>. This means that the group of 10-year-old children alive around the world in 2005 could expect to live another 63.6 years (i.e. until the age of 73.6), provided that mortality patterns observed in 2005 remained constant throughout their lifetime.

Finally, another point to bear in mind is that period and cohort life expectancy estimates are statistical measures, and they do not take into account any person-specific factors such as lifestyle choices. Clearly, the length of life for an average person is not very informative about the predicted length of life for a person living a particularly unhealthy lifestyle.

<strong>How is life expectancy calculated?</strong>

In practical terms, estimating life expectancy entails predicting the probability of surviving successive years of life, based on observed age-specific mortality rates. How is this actually done?

Age-specific mortality rates are usually estimated by counting (or projecting) the number of age-specific deaths in a time interval (e.g. the number of people aged 10-15 who died in the year 2005), and dividing by the total observed (or projected) population alive at a given point within that interval (e.g. the number of people aged 10-15 alive on 1 July 2015).

To ensure that the resulting estimates of the probabilities of death within each age interval are smooth across the lifetime, it is common to use mathematical formulas, to model how the force of mortality changes within and across age intervals. Specifically, it is often assumed that the proportion of people dying in an age interval starting in year [latex]x [/latex] and ending in year [latex]n+x[/latex] corresponds to [latex] q(n,x)=1-e^{n * m(n,x)}[/latex], where [latex]m(n,x)[/latex] is the age-specific mortality rate as measured in the middle of that interval (a term often referred to as the 'central death rate' for the age interval).[ref]The underlying assumption is that the force of mortality is constant within each age interval. The seminal reference introducing this method is Fergany (1971) "On the Human Survivorship Function and Life Table Construction," Demography8(3):331-334).[/ref]

Once we have estimates of the fraction of people dying across age intervals, it is simple to calculate a 'life table' showing the evolving probabilities of survival and the corresponding life expectancies by age. <a href="https://ourworldindata.org/wp-content/uploads/2017/07/Example-Life-Table-US.png" target="_blank" rel="noopener">Here is an example of a life table from the US</a>, and <a href="https://www.measureevaluation.org/resources/training/online-courses-and-resources/non-certificate-courses-and-mini-tutorials/multiple-decrement-life-tables/lesson-3" target="_blank" rel="noopener">this tutorial from MEASURE Evaluation</a> explains how life tables are constructed, step by step (see Section 3.2 'The Fergany Method').

Period life expectancy figures can be obtained from 'period life tables' (i.e. life tables that rely on age-specific mortality rates observed from deaths among individuals of different age groups at a fixed point in time). And similarly, cohort life expectancy figures can be obtained from 'cohort life tables' (i.e. life tables that rely on age-specific mortality rates observed from tracking and forecasting the death and survival of a group of people as they become older).

For some countries and for some time intervals, it is only possible to reconstruct life tables from either period or cohort mortality data. As a consequence, in some instances—for example in obtaining <a href="https://ourworldindata.org/grapher/life-expectancy-globally-since-1770">historical estimates of life expectancy across world regions</a>—it is necessary to combine period and cohort data. In these cases, the resulting life expectancy estimates cannot be simply classified into the 'period' or 'cohort' categories.

<strong>What else can we learn from 'life tables'?</strong>

Life tables are not just instrumental to the production of life expectancy figures (as noted above), they also provide many other perspectives on the mortality of a population. For example, they allow for the production of 'population survival curves', which show the share of people who are expected to survive various successive ages. The below chart provides an example, plotting survival curves for individuals born at different points in time, using cohort life tables from England and Wales.

At any age level in the horizontal axis, the curves in the chart below mark the estimated proportion of individuals who are expected to survive that age. As we can see, less than half of the people born in 1851 in England and Wales made it past their 50th birthday. In contrast, more than 95% of the people born in England and Wales today can expect to live longer than 50 years.

Since life expectancy estimates only describe averages, these indicators are complementary, and help us understand how health is distributed across time and space. In our entry on <a href="https://ourworldindata.org/life-expectancy/">Life Expectancy</a> you can read more about related complementary indicators, such as the <a href="https://ourworldindata.org/life-expectancy/#median-age-by-country">median age of a population.</a>

<a href="https://ourworldindata.org/wp-content/uploads/2017/07/Survival-Curves-UK.png"><img class="aligncenter size-full wp-image-12427" src="https://ourworldindata.org/wp-content/uploads/2017/07/Survival-Curves-UK.png" alt="" width="3000" height="2100" /></a>";s:10:"post_title";s:51:""Life Expectancy" – What does this actually mean?";s:12:"post_excerpt";s:0:"";s:11:"post_status";s:7:"publish";s:14:"comment_status";s:6:"closed";s:11:"ping_status";s:6:"closed";s:13:"post_password";s:0:"";s:9:"post_name";s:69:"life-expectancy-how-is-it-calculated-and-how-should-it-be-interpreted";s:7:"to_ping";s:0:"";s:6:"pinged";s:0:"";s:13:"post_modified";s:19:"2017-11-03 08:43:39";s:17:"post_modified_gmt";s:19:"2017-11-03 08:43:39";s:21:"post_content_filtered";s:0:"";s:11:"post_parent";s:1:"0";s:4:"guid";s:35:"https://ourworldindata.org/?p=12412";s:10:"menu_order";s:1:"0";s:9:"post_type";s:4:"post";s:14:"post_mime_type";s:0:"";s:13:"comment_count";s:1:"0";}}