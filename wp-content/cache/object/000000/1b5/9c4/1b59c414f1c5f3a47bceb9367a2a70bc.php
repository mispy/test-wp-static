��[<?php exit; ?>a:1:{s:7:"content";O:8:"stdClass":23:{s:2:"ID";s:5:"10619";s:11:"post_author";s:2:"10";s:9:"post_date";s:19:"2017-03-16 15:10:49";s:13:"post_date_gmt";s:19:"2017-03-16 15:10:49";s:12:"post_content";s:12879:"<div class="blog-info">Our World in Data presents the empirical evidence on global development in entries dedicated to specific topics.
This blog post draws on data and research discussed in our entry on <strong><a href="https://ourworldindata.org/economic-growth" target="_blank">Economic Growth</a></strong>.</div>

Measuring economic activity in a country is difficult, since 'the economy' is a complex system with lots of moving parts. A common way to deal with this is to focus on aggregate indicators, such as total national output: "the monetary value of all goods and services produced within a country (or region) in a specific time period". That’s what economists call the Gross Domestic Product (GDP).

GDP is measured using prevailing national prices to estimate the value of output. In other words, GDP is calculated using local currency units. This means that in order to make meaningful cross-country comparisons, it is necessary to translate figures into a common currency - i.e. use a consistent 'unit of measure'.

One option is to simply translate all national figures into one common currency (for instance, US dollars) using exchange rates from currency markets. But because market exchange rates do not always reflect the different price levels between countries, economists often opt for a different alternative. They create a hypothetical currency, called ‘international dollars’, and use this as a common unit of measure. The idea is that a given amount of international dollars should buy roughly the same amount – and quality – of goods and services in any country.

The exchange rates used to translate monetary values in local currencies into 'international dollars' (int-$) are the 'purchasing power parity conversion rates' (also called PPP conversion factors). Below we discuss where PPP rates come from, and why they can often be more useful for comparisons than market exchange rates.

<strong>What is purchasing power and why does it matter?</strong>

Why do many British pensioners decide to move to Southern Spain? It’s not just about the weather. It also has to do with differences in price levels, which are lower in Spain than Britain. You can buy more things with one sterling pound in Southern Spain than you can in England. In other words, the <em>purchasing power</em> of the British Pound is higher in Spain than in England. This difference in price levels is exactly what PPP conversion rates try to capture.

If we are interested in living standards, any monetary income should be considered in relation to the amount of goods and services that it can buy <em>locally</em>. The same type of meal in the same type of restaurant has a different cost depending on the country where it is sold. This matters for macroeconomic comparisons and it matters for travelers: <a href="http://www.lonelyplanet.com/india/money-costs" target="_blank">travel guides try to provide tourists with cross-country examples of differences in costs of living</a>, and for one very specific product it is also what <a href="http://www.economist.com/node/17257797?story_id=17257797" target="_blank">the Big Mac Index</a> captures.

The following visualization shows cross-country differences in purchasing power, taking the US as the reference country. To be specific, the figures below correspond to the price level ratio of PPP conversion factors to market exchange rates. Hence, numbers below 1 imply that if you exchange 1 dollar at the corresponding market exchange rate, the resulting amount of money in local currency will buy you more in that country than you could have bought with one dollar in the US in the same year.

A price level of 0.5 shown for a country in this map means that for a given sum of US dollars you can buy twice as many goods and services in that country than in the US. In countries with a price level above 1, you can buy fewer goods and services than in the US for a given sum of US dollar.

As we can see, price level differences between developed and developing countries are much larger than those between Spain and England. The amount of goods and services that you can buy with 500 US dollars in the US is very different to what you can buy with 500 US dollars in rural India.

<iframe style="width: 100%; height: 600px; border: 0px none;" src="https://ourworldindata.org/grapher/gdp-price-levels-relative-to-the-us" width="300" height="150"></iframe>

This is important beyond GDP. Price level differences imply that with the same income in US dollars, you could be on the verge of poverty in the US, or fairly well-off in rural India. For this reason, we need to consider purchasing power when comparing variables such as poverty rates between countries.

From the explanation above it should be clear that we need to control for price differentials in order to meaningfully compare GDP between countries. We need a conversion factor that achieves purchasing power <em>parity</em>.

If we take an all-embracing basket of goods and services and we use it as a reference point, we can compute price indices for each country and, using statistical methods, adjust the GDP figures to deal with the problem of different price levels.

This is exactly what purchasing power parity does. It's an exercise that is done by the International Comparison Programme (ICP).  <a href="https://www.princeton.edu/~deaton/downloads/Deaton_Aten_Trying_to_understand_ICP_2011_V5.pdf" target="_blank">Angus Deaton explains it as follows</a>: "Purchasing power parity exchange rates, or PPPs, are price indexes that summarize prices in each country relative to a numeraire country, typically the United States. These numbers are used to compare living standards across countries, by academics in studies of economic growth, particularly through the Penn World Table, by the World Bank to construct measures of global poverty, by the European Union to redistribute resources, and by the international development community to draw attention to discrepancies between rich and poor countries."

As the graph below shows, using PPP adjusted international dollars rather than US market dollars as unit of measure can make a huge difference. When price levels in a country are much lower than in the US, using US dollars at market exchange rates will significantly underestimate the standard of living when measured through GDP per capita.

<iframe style="width: 100%; height: 600px; border: 0px none;" src="https://ourworldindata.org/grapher/gdp-per-capita-ppp-adjusted-vs-us-market-exchange" width="300" height="150"></iframe>

<strong>Why are differences in price levels not reflected in currency market exchange rates?</strong>

For two countries – A and B – the two different currencies allow for different comparisons. The market exchange rate tells you how many units of currency from country B you can buy with a unit of currency A. The purchasing power parity conversion factor, on the other hand, takes the relative prices between countries into account and allows for comparisons when you want to know how many currency units you have to spend to buy the same amount of goods and services in each of the two countries.

So, why are these two things not the same? This is not a trivial question. There are good reasons why the market exchange rate between two currencies <em>should</em> reflect the relative price levels between the two economies. Imagine that one apple costs $1 in the US and £1 in the UK. Suppose the market exchange rate is not 1:1, but for example $1.5 = £1. Given this situation, an American person with an apple would have an incentive to sell the apple in the UK, and then convert pounds into dollars, making a profit. This is what is called arbitrage. People would jump at such opportunities, and before long, market forces would exhaust gains from trade, leading to an equilibrium where currency prices and apple prices adjust and there are no opportunities to engage in this 'free-money game'.

The above logic, however, assumes that goods and services are tradable internationally. But in reality there are goods and services that cannot be traded internationally. If you have a house in London, you cannot export that house to the US or China. There are many other examples of non-tradable goods, such as public roads, basic services such as schooling, or even more trivial services such as hair-cuts.

The issue is that if you live in Scotland, you do not care about the price of schools in Northern Italy, or rents in Southern Spain. And this matters in the context of our discussion because prices of non-tradable goods affect the general price level of a country; but prices of non-tradable goods are determined mainly by domestic dynamics. This is one reason why we observe cross-country differences in price levels that are not mirrored by corresponding differences in currency prices.

<strong>Why do rich countries tend to have higher prices?</strong>

Empirically, we observe that prices are higher in richer countries: there is a positive cross-country relationship between average incomes and average prices. This can be seen in the visualization below, which plots GDP per capita (in international dollars) against price levels (relative to the US). This observation was formalised by Balassa and Samuelson in the 1960s, and is usually referred to as the 'Penn effect'.

Pinning down the causes behind the Penn effect is not straightforward; but economic theory provides some hints. 

One possible explanation, which has received substantial attention in the academic literature, rests on cross-country productivity differences; specifically, the fact that labour tends to be more productive in rich countries because of the adoption of more advanced technologies. 

This is the essence of the 'Balassa-Samuelson model'. The greater the productivity differentials in the production of tradable goods between countries, the larger the differences in wages and prices of services; and correspondingly, the greater the gap between purchasing power parity and the equilibrium exchange rate.  If international productivity differences are greater in the production of tradable goods than in the production of non-tradable goods, the currency of the country with the higher productivity will appear to be overvalued in terms of purchasing power parity. Therefore, the ratio of purchasing power parity to the exchange rate will be an increasing function of income.[ref]You can read more about the Balassa-Samuelson model in the corresponding <a href="https://en.wikipedia.org/wiki/Balassa%E2%80%93Samuelson_effect">Wikipedia entry</a>. Or, for a more technical discussion, you can read  Asea P.K., Corden W.M., 1994, The Balassa-Samuelson Model: An Overview', Review of International Economics, 2:3, pp.191-200 (available online <a href="http://www.econ.ucla.edu/workingpapers/wp710.pdf">here</a>).[/ref]

The correlation between productivity and the price level can be seen in this scatter plot <a href="https://ourworldindata.org/grapher/higher-labour-productivity-and-price-levels-in-richer-and-poorer-countries" target="_blank">here</a>.

<iframe style="width: 100%; height: 600px; border: 0px none;" src="https://ourworldindata.org/grapher/gdp-per-capita-in-international-dollars-vs-price-levels-relative-to-us" width="300" height="150"></iframe>

<strong>What are the main limitations of PPP adjustments?</strong>

The two last rounds of PPP factors estimated by the International Comparison Programme (ICP) are from 2005 and 2011; and the next one is scheduled for 2017. With every release, estimates improve. But the data limitations have to be kept in mind, particularly if we consider the stakes: international institutions, charities and governments rely on PPP factors in order to design policies and allocate resources internationally. 

What are the main limitations?

First, there are issues with the underlying sources used by the ICP. Many low-income countries do not collect sufficiently rich data on price levels, so the ICP often needs to impute missing values by making extrapolations based on regional averages, or by relying on data from price levels in capital cities where prices are often higher than in rural parts of the country.

And second, differences in consumption and production patterns make the identification of a common 'standard' basket of goods difficult and arbitrary. Agreeing on broad categories (e.g. 'food') is relatively easy; but narrowing down the exact items is much more complicated, since allowances have to be made for differences in factors such as product quality. Hence, the actual items that should be included in the 'standard basket' of goods produced and consumed in, say Sweden, are very different to those that should be included in Saudi Arabia. 

";s:10:"post_title";s:49:"What are PPP adjustments and why do we need them?";s:12:"post_excerpt";s:0:"";s:11:"post_status";s:7:"publish";s:14:"comment_status";s:6:"closed";s:11:"ping_status";s:6:"closed";s:13:"post_password";s:0:"";s:9:"post_name";s:49:"what-are-ppp-adjustments-and-how-helpful-are-they";s:7:"to_ping";s:0:"";s:6:"pinged";s:0:"";s:13:"post_modified";s:19:"2017-04-03 21:50:46";s:17:"post_modified_gmt";s:19:"2017-04-03 21:50:46";s:21:"post_content_filtered";s:0:"";s:11:"post_parent";s:1:"0";s:4:"guid";s:35:"https://ourworldindata.org/?p=10619";s:10:"menu_order";s:1:"0";s:9:"post_type";s:4:"post";s:14:"post_mime_type";s:0:"";s:13:"comment_count";s:1:"0";}}