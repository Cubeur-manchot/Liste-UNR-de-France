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
			backgroundColor: colorScheme[groupIndex],
			stack: "allSameStack"
		});
	}
	new Chart(canvas, {
		type: "bar",
		data: {
			labels: names,
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

const buildCountByGroupSplitByPersonBarChart = (countPerName, names, groups, colorGradient) => {
	let canvas = document.querySelector("canvas#countByGroupSplitByPersonBarChart");
	let datasets = [];
	let lastRecordCount = null;
	let countGroupIndex = -1;
	for (let nameIndex = 0; nameIndex < names.length; nameIndex++) {
		if (countPerName[nameIndex].totalCount !== lastRecordCount) {
			countGroupIndex++;
			lastRecordCount = countPerName[nameIndex].totalCount;
		}
		let data = [];
		for (let group of groups) {
			data.push(countPerName[nameIndex].countPerGroup[group] ?? 0);
		}
		datasets.push({
			label: names[nameIndex],
			data: data,
			backgroundColor: colorGradient[countGroupIndex],
			stack: "allSameStack"
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

const buildDoughnutChart = (countPerName, names, colorGradient) => {
	let canvas = document.querySelector("canvas#doughnutChart");
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
	new Chart(canvas, {
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
		let labels = [];
		for (let recordGroup of recordsGroupedByDate) {
			data.push({
				x: recordGroup.date,
				y: groupIndex,
				r: 5 * Math.sqrt(recordGroup.records.length)
			});
			let subLabels = [];
			for (let record of recordGroup.records) {
				subLabels.push(`${record.eventName} ${record.avgType} : ${record.name} (${record.time})`);
			}
			labels.push(subLabels);
		}
		datasets.push({
			label: pagePlans.noWca[groupIndex].en,
			data: data,
			labels: labels,
			backgroundColor: colorScheme[groupIndex],
			borderColor: "rgba(0, 0, 0, 0.5)"
		});
	}
	let options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				type: "time",
				time: {
					unit: "day",
					/*displayFormats: {
						hour: "dd/MM/yyyy hh:mm",
						day: "dd/MM/yyyy",
						week: "dd/MM/yyyy",
						month: "MM/yyyy",
						quarter: "MM/yyyy",
						year: "yyyy"
					},*/
					tooltipFormat: "dd/MM/yyyy"
				},
				max: getCurrentDateStringBubbleChart()
			},
			y: {
				display: false,
				min: -1,
				max: 6
			}
		},
		tooltips: {
			callbacks: {
				label: function(t, d) {
					return d.datasets[t.datasetIndex].labels[t.index];
				}
			}
		}
	};
	new Chart(canvas, {
		type: 'bubble',
		data: {
			datasets: datasets
		},
		options: options
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

const getCurrentDateStringBubbleChart = () => { // returns the current date with format dd/MM/YYYY
	let currentLocalDate = new Date();
	currentLocalDate.setDate(currentLocalDate.getDate() + 14); // move 14 days to the future to avoid bubbles to overflow at the side of the chart
	let day = currentLocalDate.getDate();
	let month = currentLocalDate.getMonth();
	let year = currentLocalDate.getFullYear();
	return `${year}-${month < 9 ? "0" : ""}${month + 1}-${day < 10 ? "0" : ""}${day}`;
};
