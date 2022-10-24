"use strict";

const buildStatistics = () => {
	let {countPerName, groups, countLevels} = countByPersonAndGroup();
	let colorGradient = buildColorGradient(countLevels.length);
	buildCountByPersonSplitByGroupBarChart(countPerName, groups);
	buildCountByGroupSplitByPersonBarChart(countPerName, groups, colorGradient);
	buildDoughnutChart(countPerName, colorGradient);
	buildTimeline();
};

const buildCountByPersonSplitByGroupBarChart = (countPerName, groups) => {
	let canvas = document.querySelector("canvas#countByPersonSplitByGroupBarChart");
	let datasets = [];
	for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
		let data = [];
		for (let countForName of countPerName) {
			data.push(countForName.countPerGroup[groups[groupIndex]] ?? 0);
		}
		datasets.push({
			label: groups[groupIndex],
			data: data,
			backgroundColor: colorScheme[groupIndex]
		});
	}
	new Chart(canvas, {
		type: "bar",
		data: {
			labels: countPerName.map(countForName => countForName.name),
			datasets: datasets
		},
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
};

const buildCountByGroupSplitByPersonBarChart = (countPerName, groups, colorGradient) => {
	let canvas = document.querySelector("canvas#countByGroupSplitByPersonBarChart");
	let datasets = [];
	let lastRecordCount = null;
	let countGroupIndex = -1;
	for (let countForName of countPerName) {
		if (countForName.totalCount !== lastRecordCount) {
			countGroupIndex++;
			lastRecordCount = countForName.totalCount;
		}
		datasets.push({
			label: countForName.name,
			data: groups.map(group => countForName.countPerGroup[group] ?? 0),
			backgroundColor: colorGradient[countGroupIndex]
		});
	}
	new Chart(canvas, {
		type: "bar",
		data: {
			labels: groups,
			datasets: datasets
		},
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
};

const buildDoughnutChart = (countPerName, colorGradient) => {
	let canvas = document.querySelector("canvas#doughnutChart");
	let data = [];
	let backgroundColors = [];
	let lastRecordCount = null;
	let countGroupIndex = -1;
	for (let countForName of countPerName) {
		data.push(countForName.totalCount);
		if (countForName.totalCount !== lastRecordCount) {
			countGroupIndex++;
			lastRecordCount = countForName.totalCount;
		}
		backgroundColors.push(colorGradient[countGroupIndex]);
	}
	new Chart(canvas, {
		type: "doughnut",
		data: {
			labels: countPerName.map(countForName => countForName.name),
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
};

const buildTimeline = () => {
	let canvas = document.querySelector("canvas#timelineChart");
	let datasets = [];
	for (let groupIndex = 0; groupIndex < pagePlans.noWca.length; groupIndex++) {
		let group = pagePlans.noWca[groupIndex];
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
		let data = [];
		for (let recordGroup of recordsGroupedByDate) {
			data.push({
				x: recordGroup.date,
				y: groupIndex,
				r: 5 * Math.sqrt(recordGroup.records.length),
				// custom label, not interpreted by Chart.js but stored in the tooltip context for tooltip rendering
				tooltipLabel: recordGroup.records.map(record => `${record.eventName} ${record.avgType} : ${record.name} (${record.time})`)
			});
		}
		datasets.push({
			label: pagePlans.noWca[groupIndex].en,
			data: data,
			backgroundColor: colorScheme[groupIndex],
			borderColor: "rgba(0, 0, 0, 0.5)"
		});
	}
	new Chart(canvas, {
		type: 'bubble',
		data: {
			datasets: datasets
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					type: "time",
					time: {
						unit: "quarter",
						displayFormats: {
							quarter: "MMM yyyy"
						},
						tooltipFormat: "dd/MM/yyyy"
					},
					max: getBubbleChartUpperBound()
				},
				y: {
					display: false,
					min: -1,
					max: 6
				}
			},
			plugins: {
				tooltip: {
					callbacks: {
						title: tooltipContext => formatDateFromHyphensToSlashes(tooltipContext[0].element.$context.raw.x),
						label: tooltipContext => tooltipContext.element.$context.raw.tooltipLabel
					}
				}
			}
		}
	});
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
	// countLevels
	let countLevels = [];
	for (let countForName of countPerNameArray) {
		if (!countLevels.includes(countForName.totalCount)) {
			countLevels.push(countForName.totalCount)
		}
	}
	return {
		countPerName: countPerNameArray,
		groups: groupLabels,
		countLevels: countLevels
	};
};

const show = buttonId => { // show the div corresponding to the clicked button and hide the other ones
	document.querySelector("section#statistics ul").setAttribute("data-selected", buttonId.replace(/Button$/, ""));
};
