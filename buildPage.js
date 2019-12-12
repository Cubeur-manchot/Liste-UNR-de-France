"use strict";

// import functions from inputData.js
/* global inputData */

// import functions from pagePlan.js
/* global buildAvgTypeFilters, buildPlan */

// import functions from buildRecords.js
/* global buildRecords */

// import functions from statistics.js
/* global buildStatistics */

function buildPage()
{
	inputData();
	buildRecords(window.normalPlan);
	buildAvgTypeFilters();
	buildPlan(window.normalPlan);
	buildStatistics();
}
