"use strict";

const records = {
	"8x8x8": {
		single: {name: "Axel Brisse", time: "3:56.35", date: "2021-12-19", links: ["https://discordapp.com/channels/329175643877015553/330974462239309824/922152458527060028"]},
		mo3: {name: "Axel Brisse", time: "4:11.66", date: "2021-12-18", timeList: ["4:16.16", "4:06.95", "4:11.88"], links: ["https://discordapp.com/channels/329175643877015553/330974462239309824/921752347946913802"]},
		avg100: {name: "Axel Brisse", time: "4:39.94", date: "2021-12-06", links: ["https://discordapp.com/channels/329175643877015553/330974462239309824/917210531742486608"]}
	},
	"9x9x9": {
		single: {name: "Matthieu Aubert", time: "6:57.77", date: "2022-04-26", links: ["https://discord.com/channels/329175643877015553/330974462239309824/968470449434538026"]},
		mo3: {name: "Matthieu Aubert", time: "7:14.14", date: "2022-04-26", timeList: ["7:20.64", "7:20.97", "7:00.80"], links: ["https://discord.com/channels/329175643877015553/330974462239309824/968470449434538026"]},
		avg5: {name: "Matthieu Aubert", time: "7:14.14", date: "2022-04-26", timeList: ["6:57.77", "7:24.33", "7:20.64", "7:20.97", "7:00.80"], links: ["https://discord.com/channels/329175643877015553/330974462239309824/968470449434538026"]},
		avg12: {name: "Matthieu Aubert", time: "7:32.74", date: "2022-03-19", timeList: ["7:48.98", "7:29.35", "7:32.45", "7:10.75", "7:40.87", "8:11.24", "7:17.98", "7:37.33", "7:25.85", "7:30.90", "7:27.02", "7:36.68"], links: ["https://discord.com/channels/329175643877015553/330974462239309824/954785965300391946"]}
	},
	"10x10x10": {
		single: {name: "Matthieu Aubert", time: "14:25.19", date: "2020-05-29", links: ["https://discordapp.com/channels/329175643877015553/330974462239309824/715945183329517649"]},
		mo3: {name: "Matthieu Aubert", time: "14:50.72", date: "2020-05-29", timeList: ["14:49.66", "15:17.32", "14:25.19"], links: ["https://discordapp.com/channels/329175643877015553/330974462239309824/715945183329517649"]},
		avg5: {name: "Matthieu Aubert", time: "14:54.64", date: "2020-05-29", timeList: ["15:27.07", "14:36.95", "14:49.66", "15:17.32", "14:25.19"], links: ["https://discordapp.com/channels/329175643877015553/330974462239309824/715945183329517649"]},
		avg12: {name: "Matthieu Aubert", time: "15:15.37", date: "2020-05-29", timeList: ["15:39.77", "16:16.19", "15:16.53", "15:17.82", "14:26.61", "15:25.83", "17:26.51", "15:27.07", "14:36.95", "14:49.66", "15:17.32", "14:25.19"], links: ["https://discordapp.com/channels/329175643877015553/330974462239309824/715945183329517649"]}
	},
	"11x11x11": {
		single: {name: "Matthieu Aubert", time: "14:17.32", date: "2022-09-15", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1019927743237988362"]},
		mo3: {name: "Matthieu Aubert", time: "14:52.27", date: "2022-08-18", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1009888484506472469"]},
		avg5: {name: "Matthieu Aubert", time: "15:01.18", date: "2022-08-18", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1009888484506472469"]},
		avg12: {name: "Matthieu Aubert", time: "15:18.13", date: "2022-09-20", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1021748016249589772"]},
		avg50: {name: "Matthieu Aubert", time: "15:36.25", date: "2022-09-20", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1021748622351675403"]}
	},
	"12x12x12": {
		single: {name: "Matthieu Aubert", time: "19:17.20", date: "2022-06-30", links: ["https://discord.com/channels/329175643877015553/330974462239309824/992015504405450814"]},
		mo3: {name: "Matthieu Aubert", time: "19:57.35", date: "2022-05-09", timeList: "19:45.41, 20:34.26, 19.45.41", links: ["https://discord.com/channels/329175643877015553/330974462239309824/973189188100952145"]},
		avg5: {name: "Matthieu Aubert", time: "20:04.96", date: "2022-05-28", timeList: "20:10.92, 20:13.96, (21:02.30), 19:50.02, (19:46.86)", links: ["https://discord.com/channels/329175643877015553/330974462239309824/980137924177850410"]},
		avg12: {name: "Matthieu Aubert", time: "20:34.05", date: "2022-05-28", timeList: "21:08.08, 19:49.21, 20:10.92, 20:13.96, 21:02.30, 19:50.02, (19:46.86), 21:09.20, 20:19.73, (21:46.09), 20:33.37, 21:23.75", links: ["https://discord.com/channels/329175643877015553/330974462239309824/980137924177850410"]}
	},
	"13x13x13": {
		single: {name: "Matthieu Aubert", time: "27:27.87", date: "2022-08-28", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1013499737170780163"]},
		mo3: {name: "Paul Ducruet", time: "29:50.62", date: "2022-08-31", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1014525776714023046"]},
		avg5: {name: "Paul Ducruet", time: "30:07.96", date: "2022-08-31", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1014525776714023046"]},
		avg12: {name: "Paul Ducruet", time: "31:11.89", date: "2022-08-31", links: ["https://discord.com/channels/329175643877015553/330974462239309824/1014525776714023046"]}
	},
	"4x4x4 One-Handed": {
		single: {name: "Charles Daloz-Baltenberger", time: "57.60", date: "2020-06-01", scramble: "L' F2 L2 F' R' D' F' U B' D' L2 U L2 B2 D' L2 U2 R2 D B2 R2 Rw2 Fw2 L Fw2 B' L' Uw2 R F2 B2 Rw2 U R Uw F2 Uw R' Fw' D' L F' Uw' Rw'", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/717109928468414504"]},
		mo3: {name: "Axel Brisse", time: "1:04.39", date: "2018-05-13"},
		avg5: {name: "Axel Brisse", time: "1:03.88", date: "2018-05-13"},
		avg12: {name: "Axel Brisse", time: "1:10.64", date: "2018-05-13"},
		avg50: {name: "Axel Brisse", time: "1:14.22", date: "2018-05-13"},
		avg100: {name: "Axel Brisse", time: "1:16.65", date: "2018-05-13"}
	},
	"3x3x3 Virtual cube": {
		single: {name: "Alix Jack", time: "6.11", date: "2022-09-04", scramble: "L2 U' R2 U L2 D F2 D' L2 B2 D L' D' L2 R' D F R2 U2 L2 F2", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1016032613380653096"]},
		mo3: {name: "Charles Daloz-Baltenberger", time: "8.40", date: "2022-10-05", timeList: ["7.77", "10.42", "7.00"], links: ["https://discord.com/channels/329175643877015553/344073328744464384/1027156029919744023"]},
		avg5: {name: "Alix Jack", time: "8.98", date: "2022-09-04", timeList: ["9.03", "9.28", "10.43", "7.91", "8.63"], scrambleList: ["U' R2 U2 L2 F L2 B2 F U2 F' L2 D R2 F' L' F' D B R U'", "R F2 D2 U2 L' B2 R2 F2 U2 R2 D2 F' R2 D' L2 D' R B' L' U F'", "D F' L2 F' R' F R B2 D F' R2 U2 D2 B' D2 F' U2 L2 F2 R2", "L' F' L B2 L2 F2 D2 R' F2 R2 B2 L U2 R' B L' B D' B L F", "F' D2 R2 U2 L2 B2 R2 F' L2 F' D2 B2 L F R B2 D L' B L F"], links: ["https://discord.com/channels/329175643877015553/344073328744464384/1016033542700027965"]},
		avg12: {name: "Alix Jack", time: "10.30", date: "2022-09-04", timeList: ["9.85", "8.44", "12.30", "13.00", "9.38", "12.83", "7.87", "8.25", "12.23", "9.52", "11.96", "8.28"], scrambleList: ["F' D' R2 L B R2 D2 B R F' U2 F' D2 R2 F2 R2 B' U2 R2 F", "F L2 F L2 R2 F2 U2 B U2 F L2 F U L' R F R2 U' R2 F' D'", "R F' L' B2 R2 B2 F2 U2 B2 R B2 R2 D' U2 F U B F L'", "B' L' F D2 B' R2 D2 L2 D2 B' R2 B R2 F' D' R' F U R' B2 R", "D2 L2 F2 R U2 R D2 F2 R D2 B' D' R' D F' U' F R2 B2", "F2 D2 L D2 R' D2 F2 R' F2 L U2 R' B' D R D2 L2 B' F' L' F'", "D F' L' R2 B2 D' F2 D L2 U2 L2 D F2 U L' F U B2 L2 F U'", "U2 L' B2 R B2 R' U2 L' F2 U2 R' D B L2 F' U' L2 U2 F' L'", "R2 F D2 B D2 L2 F2 U2 B L2 R2 F2 L' B L' U L' B' D2 R F2", "D' L2 F2 U R2 B2 D' F2 R2 D' R' B L D' L' D' F' D' F2 R", "D2 U2 R2 F2 D2 B' L2 B' U2 L2 F' U' F2 R' B' R' B2 F D2 L2", "U' F2 U2 R' F D2 R F' R2 F2 B2 D' F2 U2 D' R2 U' B2 D' R2"], links: ["https://discord.com/channels/329175643877015553/344073328744464384/1016101138707259503"]},
		avg50: {name: "Alix Jack", time: "11.01", date: "2022-09-04", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1016101293061832774"]},
		avg100: {name: "Alix Jack", time: "11.18", date: "2022-09-04", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1016101363706511370"]}
	},
	"4x4x4 Fewest Moves": {
		single: {name: "Patrick Jamet", time: "69", date: "2021-03-31", links: ["https://discord.com/channels/329175643877015553/340029021884514316/826907931240824912"]},
		mo3: {name: "Patrick Jamet", time: "72.33", date: "2021-03-31"},
		avg5: {name: "Patrick Jamet", time: "75", date: "2021-03-31"}
	},
	"Kilominx": {
		single: {name: "Théo Paris", time: "11.29", date: "2018-02-17"},
		mo3: {name: "Théo Paris", time: "15.02", date: "2018-02-17", links: ["https://forum.francocube.com/viewtopic.php?p=272754#p272739"]},
		avg5: {name: "Théo Paris", time: "15.26", date: "2018-02-17"},
		avg12: {name: "Théo Paris", time: "15.93", date: "2018-02-17"},
		avg50: {name: "Théo Paris", time: "17.31", date: "2018-02-17"},
		avg100: {name: "Théo Paris", time: "17.63", date: "2018-02-17"}
	},
	"Masterkilominx": {
		single: {name: "Axel Brisse", time: "3:22.09", date: "2020-07-10", links: ["https://youtu.be/4ppRIoSbNkg", "https://discord.com/channels/329175643877015553/332432847908634644/731197865812295690"]},
		mo3: {name: "Matthieu Aubert", time: "3:38.56", date: "2020-08-02"},
		avg5: {name: "Axel Brisse", time: "3:43.76", date: "2022-04-27", timeList: ["4:02.78", "3:38.18", "3:35.77", "3:50.73", "3:42.38"], links: ["https://discord.com/channels/329175643877015553/344073328744464384/968691687499137024"]},
		avg12: {name: "Matthieu Aubert", time: "3:49.93", date: "2020-08-02", links: ["https://discord.com/channels/329175643877015553/344073328744464384/739281133941948526"]}
	},
	"Gigaminx": {
		single: {name: "Matthieu Aubert", time: "6:02.75", date: "2020-08-09", links: ["https://discord.com/channels/329175643877015553/344073328744464384/742062237086253096"]},
		mo3: {name: "Matthieu Aubert", time: "6:14.75", date: "2020-08-09", links: ["https://discord.com/channels/329175643877015553/344073328744464384/742062237086253096"]},
		avg5: {name: "Matthieu Aubert", time: "6:25.15", date: "2020-08-09", links: ["https://discord.com/channels/329175643877015553/344073328744464384/742062237086253096"]},
		avg12: {name: "Matthieu Aubert", time: "6:27.80", date: "2020-08-09", links: ["https://discord.com/channels/329175643877015553/344073328744464384/742062237086253096"]}
	},
	"3x3x3 Blindfolded": {
		single: {name: "Arthur Garcin", time: "13.78", date: "2022-04-26", scramble: "D2 R2 D2 R2 U F2 D L B2 F L B F2 R' U2 R F' L U2", links: ["https://discord.com/channels/329175643877015553/353504450867888128/968569484090691644"]},
		mo3: {name: "Arthur Garcin", time: "18.69", date: "2020-11-24", links: ["https://discord.com/channels/329175643877015553/353504450867888128/781231504562192394"]},
		avg5: {name: "Arthur Garcin", time: "20.04", date: "2020-11-24", links: ["https://discord.com/channels/329175643877015553/353504450867888128/781231504562192394"]},
		avg12: {name: "Arthur Garcin", time: "22.77", date: "2020-11-24", links: ["https://discord.com/channels/329175643877015553/353504450867888128/781231504562192394"]},
		avg50: {name: "Arthur Garcin", time: "37.54", date: "2018-02-08", links: ["https://forum.francocube.com/viewtopic.php?p=272754#p272754"]},
		avg100: {name: "William Phommaha", time: "57.86", date: "2020-06-21", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/724249018137575505"]}
	},
	"4x4x4 Blindfolded": {
		single: {name: "William Phommaha", time: "1:35.70", date: "2020-07-31", memoTime: "37.00", links: ["https://discord.com/channels/329175643877015553/353504450867888128/738859907457089597"]},
		mo3: {name: "William Phommaha", time: "1:57.14", date: "2020-04-17", timeList: ["1:46.13", "2:01.27", "2:04.01"], memoTimeList: ["46.64", "1:02.41", "57.30"], links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/700728861939466291", "https://www.speedcubingfrance.org/online_competitions/ConfinementOpen10"]},
		avg5: {name: "William Phommaha", time: "1:52.85", date: "2020-07-31", timeList: ["1:51.50", "1:47.34", "DNF", "1:59.71", "1:35.70"], memoTimeList: ["39.31", "36.35", "46.40", "54.20", "37.00"], links: ["https://discord.com/channels/329175643877015553/353504450867888128/738859907457089597"]},
		avg12: {name: "William Phommaha", time: "2:17.79", date: "2020-02-16"}
	},
	"5x5x5 Blindfolded": {
		single: {name: "William Phommaha", time: "3:48.24", date: "2020-02-02"},
		mo3: {name: "William Phommaha", time: "3:59.20", date: "2019-11-10"},
		avg5: {name: "William Phommaha", time: "4:05.95", date: "2019-11-10"},
		avg12: {name: "William Phommaha", time: "4:17.48", date: "2020-05-25", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/714539887138963486"]}
	},
	"6x6x6 Blindfolded": {
		single: {name: "William Phommaha", time: "12:14.81", date: "2019-03-24", memoTime: "5:40.64", links: ["https://discord.com/channels/329175643877015553/353504450867888128/559373208457838593"]},
		mo3: {name: "Wilfrid Py", time: "1:38:49", date: "2021-07-02", links: ["https://discord.com/channels/329175643877015553/353504450867888128/860326277754781716"]}
	},
	"7x7x7 Blindfolded": {
		single: {name: "William Phommaha", time: "31:00.08", date: "2019-05-03", memoTime: "14:17.81"}
	},
	"8x8x8 Blindfolded": {
		single: {name: "Wilfrid Py", time: "5:15:30.00", date: "2018-09-21", memoTime: "2:37:20.00", links: ["https://www.youtube.com/watch?v=rYMUp5gfbZ4"]}
	},
	"9x9x9 Blindfolded": {
		single: {name: "Matteo Chancerel", time: "2:41:00.00", date: "2019-07-15", memoTime: "1:24:00.00", links: ["https://youtu.be/IBJ4KsB8gqY"]}
	},
	"Relay 2-5 Blindfolded": {
		single: {name: "William Phommaha", time: "10:58.82", date: "2020-03-14", memoTime: "5:44.19", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/688504038496403611"]},
		mo3: {name: "William Phommaha", time: "13:00.63", date: "2020-06-08", memotimeList: ["12:20.00", "12:53.00", "13:47.00"], links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/719662250276946020"]},
		avg5: {name: "William Phommaha", time: "13:00.63", date: "2020-06-08", memotimeList: ["10:58.00", "DNF", "12:20.00", "12:53.00", "13:47.00"], links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/719662250276946020"]}
	},
	"Relay 2-6 Blindfolded": {
		single: {name: "William Phommaha", time: "31:38:86", date: "2020-03-15", memoTime: "17:34.85", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/688718045128032261"]}
	},
	"Megaminx Blindfolded": {
		single: {name: "William Phommaha", time: "23:38.69", date: "2020-05-03", memoTime: "12:55.93", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/706481971169067078"]}
	},
	"Square One Blindfolded": {
		single: {name: "Emma Cadet", time: "3:59.47", date: "2020-06-01", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/717124541540991100"]},
		mo3: {name: "Emma Cadet", time: "4:27.42", date: "2020-06-01", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/717124541540991100"]},
		avg5: {name: "Emma Cadet", time: "5:02.37", date: "2020-06-01", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/717124541540991100"]}
	},
	"Clock Blindfolded": {
		single: {name: "Maxime Madrzyk", time: "1:50.10", date: "2022-07-13", links: ["https://discord.com/channels/329175643877015553/353504450867888128/996827561877319770"]}
	},
	"3x3x3 Multi-Blindfolded": {
		single: {name: "William Phommaha", time: "37/37 (54:50.00)", date: "2020-04-16", memoTime: "34:52.00", links: ["https://www.speedcubingfrance.org/online_competitions/ConfinementOpen9"]},
		mo3: {name: "William Phommaha", time: "33", date: "2020-04-06", timeList: "33/35, 33/35, 37/37", links: ["https://discordapp.com/channels/329175643877015553/353504450867888128/700410469973754007"]},
		avg5: {name: "William Phommaha", time: "29", date: "2020-02-09", timeList: ["29/33", "31/33", "32/33", "30/33", "33/33"]}
	},
	"Relay WCA 17 events": {
		single: {name: "William Phommaha", time: "34:13.57", date: "2020-01-16", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/667414979116531732"]}
	},
	"Mini-Guilford Solo": {
		single: {name: "Lucas Déglise", time: "3:41.92", date: "2019-12-18", links: ["https://www.youtube.com/watch?v=o_Ul_unOUU8"]}
	},
	"Mini-Guilford Duo": {
		single: {names: ["Clément Cherblanc", "Lucas Déglise"], time: "1:52.53", date: "2019-05-06", links: ["https://www.youtube.com/watch?v=7jgfZIpjr3A"]},
		mo3: {names: ["Louis Fertier", "Victor Wijsman"], time: "2:23.63", date: "2017-10-26", links: ["https://forum.francocube.com/viewtopic.php?p=271420#p271420"]},
		avg5: {names: ["Louis Fertier", "Victor Wijsman"], time: "2:25.69", date: "2017-10-26", links: ["https://forum.francocube.com/viewtopic.php?p=271420#p271420"]},
		avg12: {names: ["Louis Fertier", "Victor Wijsman"], time: "2:28.24", date: "2017-10-26", links: ["https://forum.francocube.com/viewtopic.php?p=271420#p271420"]}
	},
	"Team Blind": {
		single: {names: ["Axel Brisse", "Wilfrid Py"], time: "11.79", date: "2021-08-25", scramble: "B F2 U2 L2 F2 R2 B2 F R D' B L2 U R' B D2 R2 D2 U", links: ["https://discord.com/channels/329175643877015553/344073328744464384/880048593879302214"]},
		mo3: {names: ["Axel Brisse", "Wilfrid Py"], time: "16.42", date: "2021-08-25", links: ["https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"]},
		avg5: {names: ["Axel Brisse", "Wilfrid Py"], time: "17.55", date: "2021-08-25", links: ["https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"]},
		avg12: {names: ["Axel Brisse", "Wilfrid Py"], time: "18.65", date: "2021-08-25", links: ["https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"]},
		avg50: {names: ["Axel Brisse", "Wilfrid Py"], time: "20.73", date: "2021-08-25", links: ["https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"]},
		avg100: {names: ["Axel Brisse", "Wilfrid Py"], time: "21.14", date: "2021-08-25", links: ["https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"]}
	},
	"Team Solve Duo": {
		single: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "5.36", date: "2022-04-30", scramble: "U2 L2 U2 R' D2 B2 R U2 F' R' B2 R2 U2 B2 U2 R", links: ["https://discord.com/channels/329175643877015553/329918000553525258/969880187640623144"]},
		mo3: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "10.01", date: "2017-01-04"},
		avg5: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "10.49", date: "2017-01-04"},
		avg12: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "10.97", date: "2017-01-04"},
		avg50: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "11.75", date: "2017-01-04"},
		avg100: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "12.64", date: "2017-01-04"}
	},
	"2-man 3x3x3 Blindfolded relay": {
		single: {names: ["Arthur Garcin", "Maxime Madrzyk"], time: "39.76", date: "2022-05-24", links: ["https://discord.com/channels/329175643877015553/353504450867888128/978593706972160011"]}
	},
	"Mirror": {
		single: {name: "Axel Brisse", time: "14.41", date: "2021-09-06", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"]},
		mo3: {name: "Axel Brisse", time: "18.70", date: "2021-09-06", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"]},
		avg5: {name: "Axel Brisse", time: "19.72", date: "2021-09-06", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"]},
		avg12: {name: "Axel Brisse", time: "20.99", date: "2021-09-06", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"]},
		avg50: {name: "Axel Brisse", time: "22.91", date: "2021-09-06", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"]},
		avg100: {name: "Axel Brisse", time: "23.39", date: "2021-09-06", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"]}
	},
	"Inequilateral": {
		single: {name: "Wilfrid Py", time: "23.76", date: "2017-04-08", links: ["https://forum.francocube.com/viewtopic.php?p: 265434#p265434"]},
		mo3: {name: "Wilfrid Py", time: "32.46", date: "2020-02-12", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"]},
		avg5: {name: "Wilfrid Py", time: "32.89", date: "2020-02-12", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"]},
		avg12: {name: "Wilfrid Py", time: "35.90", date: "2020-02-12", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"]},
		avg50: {name: "Wilfrid Py", time: "37.56", date: "2020-02-12", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"]},
		avg100: {name: "Wilfrid Py", time: "38.72", date: "2020-02-12", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"]}
	},
	"Ghost": {
		single: {name: "Matthieu Aubert", time: "1:41.42", date: "2020-08-25"},
		mo3: {name: "Matthieu Aubert", time: "1:51.99", date: "2020-08-25", timeList: ["1:41.42", "1:55.03", "1:59.54"]},
		avg5: {name: "Matthieu Aubert", time: "2:01.45", date: "2020-08-25", timeList: ["2:39.61", "2:09.79", "1:41.42", "1:55.03", "1:59.54"]},
		avg12: {name: "Matthieu Aubert", time: "2:11.15", date: "2020-08-25"}
	},
	"Penrose": {
		single: {name: "Wilfrid Py", time: "27.14", date: "2020-02-10", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/676210497196130304"]},
		mo3: {name: "Wilfrid Py", time: "31.56", date: "2020-02-18", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"]},
		avg5: {name: "Wilfrid Py", time: "34.40", date: "2020-02-18", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"]},
		avg12: {name: "Wilfrid Py", time: "37.22", date: "2020-02-18", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"]},
		avg50: {name: "Wilfrid Py", time: "44.37", date: "2020-02-18", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"]},
		avg100: {name: "Wilfrid Py", time: "45.30", date: "2020-02-18", links: ["https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"]}
	},
	"Mastermorphix": {
		single: {name: "Maxime Dotto", time: "21.21", date: "2022-07-28", scramble: "B U2 L2 U2 F L2 U2 F L2 U2 R B2 F' D2 R U' R2 U2 B' U2", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1001974528022429889"]},
		mo3: {name: "Maxime Dotto", time: "25.59", date: "2022-09-13", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1019207803321208882"]},
		avg5: {name: "Maxime Dotto", time: "26.62", date: "2022-09-27", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1024258456972177468"]},
		avg12: {name: "Maxime Dotto", time: "28.51", date: "2022-09-27", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1024258456972177468"]},
		avg50: {name: "Maxime Dotto", time: "30.30", date: "2022-09-27", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1024258456972177468"]},
		avg100: {name: "Maxime Dotto", time: "30.94", date: "2022-09-27", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1024258456972177468"]}
	},
	"Megamorphix": {
		single: {name: "Maxime Dotto", time: "1:55.38", date: "2022-10-15", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1030789105220599848"]},
		mo3: {name: "Maxime Dotto", time: "2:03.10", date: "2022-10-15", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1030789105220599848"]},
		avg5: {name: "Maxime Dotto", time: "2:10.52", date: "2022-10-15", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1030789105220599848"]},
		avg12: {name: "Maxime Dotto", time: "2:19.70", date: "2022-09-27", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1024258456972177468"]},
		avg50: {name: "Maxime Dotto", time: "2:38.08", date: "2022-09-27", links: ["https://discord.com/channels/329175643877015553/344073328744464384/1024258456972177468"]}
	}
};

const avgTypes = ["single", "mo3", "avg5", "avg12", "avg50", "avg100"];
