"use strict";

const buildStatistics = () => {
	let {countPerName, names, groups, countLevels} = countByPersonAndGroup();
	let colorGradient = buildColorGradient(countLevels.length);
	buildCountByPersonSplitByGroupBarChart(countPerName, names, groups);
	buildCountByGroupSplitByPersonBarChart(countPerName, names, groups, colorGradient);
	buildDoughnutChart(countPerName, names, colorGradient);
	buildTimeline();
};

const buildCountByPersonSplitByGroupBarChart = (countPerName, names, groups) => {
	let container = document.querySelector("div#countByPersonSplitByGroupBarChartContainer");
	let canvas = createHtmlTag("canvas", {id: "countByPersonSplitByGroupBarChart"});
	let context = canvas.getContext("2d");
	let groupColors = {
		"Big cubes": colorScheme[0],
		"Blindfolded": colorScheme[1],
		"Dodecahedrons": colorScheme[2],
		"NxNxN cubes Shape Mods": colorScheme[3],
		"NxNxN cubes Variations": colorScheme[4],
		"Team, Relays": colorScheme[5]
	};
	let data = {
		labels: names,
		datasets: []
	};
	for (let group of groups) {
		let dataset = {
			label: group,
			data: [],
			backgroundColor: groupColors[group],
			stack: "allSameStack"
		};
		for (let countForName of countPerName) {
			dataset.data.push(countForName.countPerGroup[group] ?? 0);
		}
		data.datasets.push(dataset);
	}
	new Chart(context, {
		type: "bar",
		data: data,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					stacked: true
				},
				y: {
					stacked: true
				}
			}
		}
	});
	container.appendChild(canvas);
};

const buildCountByGroupSplitByPersonBarChart = (countPerName, names, groups, colorGradient) => {
	let container = document.querySelector("div#countByGroupSplitByPersonBarChartContainer");
	let canvas = createHtmlTag("canvas", {id: "countByGroupSplitByPersonBarChart"});
	let context = canvas.getContext("2d");
	let data = {
		labels: groups,
		datasets: []
	};
	let lastRecordCount = null;
	let countGroupIndex = -1;
	for (let nameIndex = 0; nameIndex < names.length; nameIndex++) {
		if (countPerName[nameIndex].totalCount !== lastRecordCount) {
			countGroupIndex++;
			lastRecordCount = countPerName[nameIndex].totalCount;
		}
		let dataset = {
			label: names[nameIndex],
			data: [],
			backgroundColor: colorGradient[countGroupIndex],
			stack: "allSameStack"
		};
		for (let group of groups) {
			dataset.data.push(countPerName[nameIndex].countPerGroup[group] ?? 0);
		}
		data.datasets.push(dataset);
	}
	new Chart(context, {
		type: "bar",
		data: data,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					stacked: true
				},
				y: {
					stacked: true
				}
			}
		}
	});
	container.appendChild(canvas);
};

const buildDoughnutChart = (countPerName, names, colorGradient) => {
	let container = document.querySelector("div#doughnutChartContainer");
	let canvas = createHtmlTag("canvas", {id: "doughnutChart"});
	let context = canvas.getContext("2d");
	let data = [];
	let backgroundColors = [];
	let lastRecordCount = null;
	let countGroupIndex = -1;
	for (let nameIndex = 0; nameIndex < names.length; nameIndex++) {
		data.push(countPerName[nameIndex].totalCount);
		if (countPerName[nameIndex].totalCount !== lastRecordCount) {
			countGroupIndex++;
			lastRecordCount = countPerName[nameIndex].totalCount;
		}
		backgroundColors.push(colorGradient[countGroupIndex]);
	}
	new Chart(context, {
		type: "doughnut",
		data: {
			labels: names,
			datasets: [{
				data: data,
				backgroundColor: backgroundColors
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
		}
	});
	container.appendChild(canvas);
};

const buildTimeline = () => {
	let container = document.querySelector("div#timelineChartContainer");
	let canvas = createHtmlTag("canvas", {id: "timelineChart"});
	let context = canvas.getContext("2d");
	let data = {datasets: []};
	for (let groupIndex = 0; groupIndex < pagePlans.noWca.length; groupIndex++) {
		let dataset = {
			label: pagePlans.noWca[groupIndex].en,
			type: "bubble",
			data: [],
			labels: [],
			backgroundColor: []
		}
		let group = pagePlans.noWca[groupIndex];
		let color = colorScheme[groupIndex];
		let recordsGroupedByDate = [];
		for (let eventName of group.events) {
			for (let avgType in records[eventName]) {
				let record = records[eventName][avgType];
				let recordObjectForGroup = {
					eventName: eventName,
					avgType: avgType,
					name: record.name ?? record.names.join(" + "),
					time: record.time
				};
				let matchingRecordGroup = recordsGroupedByDate.find(recordGroup => recordGroup.date === record.date);
				if (matchingRecordGroup) {
					matchingRecordGroup.records.push(recordObjectForGroup);
				} else {
					recordsGroupedByDate.push({
						date: record.date,
						records: [recordObjectForGroup]
					});
				}
			}
		}
		for (let recordGroup of recordsGroupedByDate) {
			dataset.data.push({
				t: new Date(recordGroup.date),
				y: groupIndex,
				r: 5 * Math.sqrt(recordGroup.records.length)
			});
			dataset.backgroundColor.push(color);
			let subLabels = [];
			for (let record of recordGroup.records) {
				subLabels.push(`${record.eventName} ${record.avgType} : ${record.name} (${record.time})`);
			}
			dataset.labels.push(subLabels);
		}
		data.datasets.push(dataset);
	}
	new Chart(context, {
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [{
						type: "time",
						time: {
							tooltipFormat: "DD/MM/YYYY",
							max: new Date()
						}
					}],
					yAxes: [{
						display: false,
						ticks: {
							suggestedMin: -1,
							suggestedMax: 6
						}
					}]
				},
				tooltips: {
					callbacks: {
						label: function(t, d) {
							return d.datasets[t.datasetIndex].labels[t.index];
						}
					}
				}
			}
		}
	);
	container.appendChild(canvas);
};

const countByPersonAndGroup = () => {
	let countPerName = {};
	let groupLabels = [];
	// build count object
	for (let group of pagePlans.noWca) {
		groupLabels.push(group.en);
		for (let eventName of group.events) {
			for (let avgType in records[eventName]) {
				let record = records[eventName][avgType];
				let names = record.name ? [record.name] : record.names;
				for (let name of names) {		
					if (!countPerName[name]) {
						countPerName[name] = {
							name: name,
							countPerGroup: {},
							totalCount: 0
						};
					}
					if (!countPerName[name].countPerGroup[group.en]) {
						countPerName[name].countPerGroup[group.en] = 0;
					}
					countPerName[name].countPerGroup[group.en]++;
					countPerName[name].totalCount++;
				}
			}
		}
	}
	// convert object to array
	let countPerNameArray = [];
	for (let name in countPerName) {
		countPerNameArray.push({
			name: name,
			countPerGroup: countPerName[name].countPerGroup,
			totalCount: countPerName[name].totalCount
		});
	}
	// sort array
	countPerNameArray.sort((count1, count2) => count2.totalCount - count1.totalCount);
	// names
	let nameLabels = [];
	for (let countForName of countPerNameArray) {
		nameLabels.push(countForName.name);
	}
	// countLevels
	let countLevels = [];
	for (let countForName of countPerNameArray) {
		if (!countLevels.includes(countForName.totalCount)) {
			countLevels.push(countForName.totalCount)
		}
	}
	return {
		countPerName: countPerNameArray,
		names: nameLabels,
		groups: groupLabels,
		countLevels: countLevels
	};
};

const show = buttonId => { // show the div corresponding to the clicked button and hide the other ones
	document.querySelector("section#statistics ul").setAttribute("data-selected", buttonId.replace(/Button$/, ""));
};
