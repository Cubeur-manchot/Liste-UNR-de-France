"use strict";

const records = {
	"8x8x8": {
		single: {name: "Axel Brisse", time: "3:56.35", date: "2021-12-19", discordLink: "https://discordapp.com/channels/329175643877015553/330974462239309824/922152458527060028"},
		mo3: {name: "Axel Brisse", time: "4:11.66", date: "2021-12-18", timeList: ["4:16.16", "4:06.95", "4:11.88"], discordLink: "https://discordapp.com/channels/329175643877015553/330974462239309824/921752347946913802"},
		avg5: {name: "Axel Brisse", time: "4:13.53", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"},
		avg12: {name: "Axel Brisse", time: "4:20.47", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"},
		avg50: {name: "Axel Brisse", time: "4:27.16", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"},
		avg100: {name: "Axel Brisse", time: "4:31.86", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"}
	},
	"9x9x9": {
		single: {name: "Axel Brisse", time: "6:04.55", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"},
		mo3: {name: "Axel Brisse", time: "6:20.82", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"},
		avg5: {name: "Axel Brisse", time: "6:31.31", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"},
		avg12: {name: "Axel Brisse", time: "6:35.55", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"},
		avg50: {name: "Axel Brisse", time: "6:44.04", date: "2022-11-05", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1038514618055786496"}
	},
	"10x10x10": {
		single: {name: "Axel Brisse", time: "9:32.14", date: "2023-04-19", youtubeVideoId: "kZjrVsjTp28", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1098351020159021076"},
		mo3: {name: "Matthieu Aubert", time: "10:53.55 ", date: "2022-12-13", timeList: ["10:52.76", "10:52.34", "10:55.56"], discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1052206072397561866"},
		avg5: {name: "Matthieu Aubert", time: "11:04.63", date: "2022-12-13", timeList: ["11:50.45", "11:25.58", "10:52.76", "10:52.34", "10:55.56"], discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1052206072397561866"},
		avg12: {name: "Matthieu Aubert", time: "11:21.83", date: "2022-12-20", timeList: ["12:55.73", "11:40.20", "11:50.45", "11:25.58", "10:52.76", "10:52.34", "10:55.56", "11:32.94", "11:36.72", "11:34.33", "11:10.04", "10:59.69"]},
		avg50: {name: "Matthieu Aubert", time: "11:49.98", date: "2023-01-12"},
		avg100: {name: "Matthieu Aubert", time: "11:56.80", date: "2023-04-10"}
	},
	"11x11x11": {
		single: {name: "Matthieu Aubert", time: "13:46.61", date: "2022-11-15", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1042067658629185596"},
		mo3: {name: "Matthieu Aubert", time: "14:16.87", date: "2022-11-15", timeList: ["14:45.90", "13:46.61", "14:18.11"], discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1042067658629185596"},
		avg5: {name: "Matthieu Aubert", time: "14:42.62", date: "2022-11-15", timeList: ["15:16.11", "15:03.86", "14:45.90", "13:46.61", "14:18.11"], discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1042067658629185596"},
		avg12: {name: "Matthieu Aubert", time: "14:59.21", date: "2022-11-15", timeList: ["15:11.58", "15:16.63", "15:27.64", "15:16.20", "14:59.58", "14:26.63", "15:17.51", "15:16.11", "15:03.86", "14:45.90", "13:46.61", "14:18.11"], discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1042067658629185596"},
		avg50: {name: "Matthieu Aubert", time: "15:30.27", date: "2022-11-15", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1042067658629185596"},
		avg100: {name: "Matthieu Aubert", time: "15:33.50", date: "2022-11-15", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1042067658629185596"}
	},
	"12x12x12": {
		single: {name: "Matthieu Aubert", time: "19:17.20", date: "2022-06-30", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/992015504405450814"},
		mo3: {name: "Matthieu Aubert", time: "19:57.35", date: "2022-05-09", timeList: "19:45.41, 20:34.26, 19.45.41", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/973189188100952145"},
		avg5: {name: "Matthieu Aubert", time: "20:04.96", date: "2022-05-28", timeList: "20:10.92, 20:13.96, (21:02.30), 19:50.02, (19:46.86)", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/980137924177850410"},
		avg12: {name: "Matthieu Aubert", time: "20:34.05", date: "2022-05-28", timeList: "21:08.08, 19:49.21, 20:10.92, 20:13.96, 21:02.30, 19:50.02, (19:46.86), 21:09.20, 20:19.73, (21:46.09), 20:33.37, 21:23.75", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/980137924177850410"}
	},
	"13x13x13": {
		single: {name: "Paul Ducruet", time: "27:06.84", date: "2022-10-24", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1034094729245237348"},
		mo3: {name: "Paul Ducruet", time: "29:50.62", date: "2022-08-31", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1014525776714023046"},
		avg5: {name: "Paul Ducruet", time: "30:00.34", date: "2022-10-24", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1034094729245237348"},
		avg12: {name: "Paul Ducruet", time: "31:11.89", date: "2022-08-31", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1014525776714023046"}
	},
	"4x4x4 One-Handed": {
		single: {name: "Charles Daloz-Baltenberger", time: "57.60", date: "2020-06-01", scramble: "L' F2 L2 F' R' D' F' U B' D' L2 U L2 B2 D' L2 U2 R2 D B2 R2 Rw2 Fw2 L Fw2 B' L' Uw2 R F2 B2 Rw2 U R Uw F2 Uw R' Fw' D' L F' Uw' Rw'", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/717109928468414504"},
		mo3: {name: "Axel Brisse", time: "1:04.39", date: "2018-05-13"},
		avg5: {name: "Axel Brisse", time: "1:03.88", date: "2018-05-13"},
		avg12: {name: "Axel Brisse", time: "1:10.64", date: "2018-05-13"},
		avg50: {name: "Axel Brisse", time: "1:14.22", date: "2018-05-13"},
		avg100: {name: "Axel Brisse", time: "1:16.65", date: "2018-05-13"}
	},
	"5x5x5 One-Handed": {
		single: {name: "Matthieu Aubert", time: "2:11.56", date: "2023-11-01", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1169291037332746332"},
		mo3: {name: "Matthieu Aubert", time: "2:35.67", date: "2023-11-01", timeList: ["2:52.05", "2:30.14", "2:24.83"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1169291037332746332"},
		avg5: {name: "Matthieu Aubert", time: "2:33.54", date: "2023-11-01", timeList: ["2:28.47", "2:42.01", "2:52.05", "2:30.14", "2:24.83"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1169291037332746332"},
		avg12: {name: "Matthieu Aubert", time: "2:42.94", date: "2023-11-01", timeList: ["2:28.47", "2:42.01", "2:52.05", "2:30.14", "2:24.83", "2:50.50", "3:19.91", "2:34.82", "2:47.67", "2:58.03", "3:00.92", "2:11.56"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1169291037332746332"},
	},
	"3x3x3 Virtual cube": {
		single: {name: "Charles Daloz-Baltenberger", time: "5.42", date: "2023-05-31", scramble: "L' F2 R F2 L' B2 U2 R2 F2 D2 L F' D' L' D2 B2 D2 F2 R2", reconstruction: ["z2 y' // inspection", "F D2 R D R' D // cross", "L U2 L' // 1st pair", "y' L U L' // 2nd pair", "y R U R' L' U L // 3rd pair", "U2' R U R' U' R U R' // 4th pair", "U R U R' U' R' F R F' // OLL", "U' R U' R U R U R U' R' U' R2 // PLL"], splits: ["Cross 0.57", "F2L 2.35", "OLL 1.11", "PLL 1.37"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1113403691068837888"},
		mo3: {name: "Charles Daloz-Baltenberger", time: "6.72", date: "2023-03-30", timeList: ["5.55", "7.30", "7.31"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1091012498611777627"},
		avg5: {name: "Charles Daloz-Baltenberger", time: "7.01", date: "2023-01-28", timeList: ["6.12", "8.24", "7.90", "5.59", "7.01"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1068982369383633010"},
		avg12: {name: "Charles Daloz-Baltenberger", time: "8.25", date: "2023-03-30", timeList: ["6.97", "8.83", "7.79", "9.37", "7.86", "7.56", "8.84", "7.95", "7.54", "7.96", "8.76", "9.93"], scrambleList: ["L U2 F' D F U R' B' D2 F2 B2 R2 L U2 R B2 L2 U2 B2 D2 B", "D2 F2 D F2 L' F' B2 U' R' F' B' U2 R2 D2 L2 F' U2 F' R2 U2 F", "F B' R' U F U D F2 U2 L2 B' R2 L2 B2 L2 F' L2 F R'", "L2 F2 L2 U' L2 U R2 D2 F2 L2 F2 B' D' L R B L' R2 D' L", "F B' D' F U2 B2 L F U2 F2 L2 B' U2 F' R2 L2 B' L", "D2 L' D' L B' U' R B D2 B2 L2 U2 F2 R L2 B2 R2 B2 U2 F'", "F2 L2 U L2 D2 F2 R2 D2 B2 U B' R' F2 U' L D2 R2 U R U", "L F' B2 L' U2 L B' U' L' F2 L2 D2 B' U2 F2 R2 U2 F2 R2 B'", "B2 L' F2 D2 L2 F2 R2 D R2 U L2 D' R2 U L' D F' D2 B U F'", "B U' R F' D' B' L B2 D R2 U2 L2 B' L2 F U2 B L2 B2 U2", "D2 F' B2 U' L' D F' L2 B' U2 B R2 B U2 F U2 L2 B R' D'", "D' B2 D' L2 D2 U' B2 L2 F2 L2 F2 U2 R' F D L F' R' F2 R'"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1091027614157766767"},
		avg50: {name: "Charles Daloz-Baltenberger", time: "9.32", date: "2022-12-24", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1056375992333115463"},
		avg100: {name: "Charles Daloz-Baltenberger", time: "9.48", date: "2022-12-24", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1056383292699574343"}
	},
	"4x4x4 Fewest Moves": {
		single: {name: "Louis-Marie Ratto", score: "64", date: "2023-06-23", scramble: "F' U L' D2 R2 B2 D B2 U' B2 F2 U2 R2 U' L' U2 R B' F D' R' Rw2 F L2 U' Rw2 B D Rw2 U F' U2 L2 Rw U R2 Rw' F Rw U' L Uw F2 L' Uw2 R", reconstruction: ["R' Uw2 L F2 Uw' // 2c (5)", "Rw // 3c (6)", "D' Rw2 U2 Rw2 // 4c (10)", "R D Rw D' Rw' // centers + 1e (15)", "L' D' Rw D' L2 D B R L' B' Rw' // 6e (26)", "R2 Fw2 D B' D' Fw' U' B U Fw' // 9e (36)", "R Uw2 R B' R' B Uw2 // redux + partial eo (43)", "F2 D U2 F' // EO (47)", "L R2 F2 B2 D' R2 D' // DR (54)", "R' B2 L' R' F2 U2 B2 D2 B2 R // solved (64)"], discordLink: "https://discord.com/channels/329175643877015553/340029021884514316/826907931240824912"},
		mo3: {name: "Patrick Jamet", score: "72.33", date: "2021-03-31"},
		avg5: {name: "Patrick Jamet", score: "75", date: "2021-03-31"}
	},
	"Kilominx": {
		single: {name: "Théo Paris", time: "11.29", date: "2018-02-17"},
		mo3: {name: "Théo Paris", time: "15.02", date: "2018-02-17", francocubePostId: "272739"},
		avg5: {name: "Théo Paris", time: "15.26", date: "2018-02-17"},
		avg12: {name: "Théo Paris", time: "15.93", date: "2018-02-17"},
		avg50: {name: "Théo Paris", time: "17.31", date: "2018-02-17"},
		avg100: {name: "Théo Paris", time: "17.63", date: "2018-02-17"}
	},
	"Masterkilominx": {
		single: {name: "Axel Brisse", time: "3:22.09", date: "2020-07-10", youtubeVideoId: "4ppRIoSbNkg", discordLink: "https://discord.com/channels/329175643877015553/332432847908634644/731197865812295690"},
		mo3: {name: "Matthieu Aubert", time: "3:38.56", date: "2020-08-02"},
		avg5: {name: "Axel Brisse", time: "3:43.76", date: "2022-04-27", timeList: ["4:02.78", "3:38.18", "3:35.77", "3:50.73", "3:42.38"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/968691687499137024"},
		avg12: {name: "Matthieu Aubert", time: "3:49.93", date: "2020-08-02", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/739281133941948526"}
	},
	"Gigaminx": {
		single: {name: "Axel Brisse", time: "5:59.78", date: "2022-11-06", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1038770209340796940"},
		mo3: {name: "Matthieu Aubert", time: "6:14.75", date: "2020-08-09", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/742062237086253096"},
		avg5: {name: "Axel Brisse", time: "6:12.10", date: "2022-11-06"},
		avg12: {name: "Matthieu Aubert", time: "6:27.80", date: "2020-08-09", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/742062237086253096"}
	},
	"3x3x3 Blindfolded": {
		single: {name: "Arthur Garcin", time: "12.95", date: "2023-09-02", scramble: "R2 F2 R2 U2 B2 U B2 U B R' F' D' U' B2 R' B2 D R", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1147534483340394617"},
		mo3: {name: "Arthur Garcin", time: "18.20", date: "2023-03-24", timeList: ["16.47", "18.42", "19.72"], scrambleList: ["B2 U' L2 B2 L2 D' L2 F2 U2 B2 U' B' D F L2 R' D' B2 U R' D Rw", "D' B2 U B2 R2 D2 F2 U2 F2 D L' U' F' D' B' R' D L' D2 L' Fw2", "L F2 U2 B2 R2 U2 F2 R B2 L D2 U' F2 R' U2 L2 B L' U2 B2 F2"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1088812779206611004"},
		avg5: {name: "Arthur Garcin", time: "19.79", date: "2023-03-24", timeList: ["DNF", "21.22", "16.47", "18.42", "19.72"], scrambleList: ["B2 F2 D L2 F2 D U2 L2 D U F2 L' D' R U' F L' R' B F2 D2 Fw2", "B2 F2 D2 R2 U R2 B2 D2 U R2 B2 F' U' L' F2 R2 F' U2 R2 D' F Rw' Uw", "B2 U' L2 B2 L2 D' L2 F2 U2 B2 U' B' D F L2 R' D' B2 U R' D Rw", "D' B2 U B2 R2 D2 F2 U2 F2 D L' U' F' D' B' R' D L' D2 L' Fw2", "L F2 U2 B2 R2 U2 F2 R B2 L D2 U' F2 R' U2 L2 B L' U2 B2 F2"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1088812779206611004"},
		avg12: {name: "Maxime Madrzyk", time: "22.03", date: "2023-03-02", timeList: ["20.70", "23.57", "21.68", "19.25", "DNF", "22.21", "20.18", "26.12", "24.02", "18.95", "20.80", "21.78"], scrambleList: ["R' U2 F2 L' B2 L' F2 R F2 R B2 R B' U2 B2 R' B R2 D F2", "D2 F U D2 R' B D2 L' F' B' U2 R2 U2 R2 D2 B' D2 F' D2 R2 U Fw Uw'", "U B2 L2 D2 B2 U L2 D F2 D' R2 U2 R B2 U L2 B R2 D' L U F2", "D F2 D' B2 U R2 F2 D2 R2 D B2 D B D2 F2 L R2 D' B2 D L U'", ", U2 L' B2 R B2 R F2 R' B2 R U2 R2 B D' B2 L2 F R' D R' Rw Uw", ", B U2 R' B' U' D2 F R2 B U2 D2 F2 L' F2 B2 D2 R' B2 R' U2 R2", "R2 U' F2 U F' D2 B2 L' B D' B2 U' F2 U R2 B2 L2 F2 R2 U' F2", "F' U' B' U2 R2 F' D2 L2 F' U2 F' U2 B2 L' U' F D' L2 R' U2 F Fw' Uw", "L2 D2 B2 L2 U' F2 R2 B2 L2 U' R2 D' L U' F R' F D' B F' L2 U'", "U2 R2 B' F2 L2 D2 B U2 B' R2 D2 F2 R' D' U2 L U' B' U2 B2 R", "F2 U' R2 D2 U R2 F2 D L2 B2 L2 F2 R' F' L2 D2 L2 F D' U B", "D' U2 B2 R2 D L2 D' R2 B2 F2 U2 F2 L' F2 R2 U' R' B2 L B' L F"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1080973882573467660"},
		avg50: {name: "Maxime Madrzyk", time: "26.43", date: "2022-12-21", timeList: ["26.22", "22.92", "24.27", "30.28", "20.36", "22.10", "27.56", "26.70", "27.81", "24.15", "DNF", "22.33", "DNF", "22.60", "24.08", "21.01", "27.98", "34.85", "20.75", "22.20", "24.04", "30.14", "28.91", "24.27", "24.57", "22.44", "24.05", "29.53", "24.53", "29.08", "32.00", "27.71", "25.29", "22.02", "DNF", "21.17", "26.76", "25.12", "25.59", "21.90", "24.04", "27.27", "24.90", "35.20", "24.03", "27.07", "27.10", "24.19", "24.51", "49.43"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1054899767290896464"},
		avg100: {name: "William Phommaha", time: "57.86", date: "2020-06-21", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/724249018137575505"}
	},
	"4x4x4 Blindfolded": {
		single: {name: "William Phommaha", time: "1:35.70", date: "2020-07-31", memoTime: "37.00", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/738859907457089597"},
		mo3: {name: "William Phommaha", time: "1:57.14", date: "2020-04-17", timeList: ["1:46.13", "2:01.27", "2:04.01"], memoTimeList: ["46.64", "1:02.41", "57.30"], discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/700728861939466291", otherLink: "https://www.speedcubingfrance.org/online_competitions/ConfinementOpen10"},
		avg5: {name: "William Phommaha", time: "1:52.85", date: "2020-07-31", timeList: ["1:51.50", "1:47.34", "DNF", "1:59.71", "1:35.70"], memoTimeList: ["39.31", "36.35", "46.40", "54.20", "37.00"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/738859907457089597"},
		avg12: {name: "William Phommaha", time: "2:11.24", date: "2023-09-14", timeList: ["1:55.96", "2:11.73", "DNF", "1:55.74", "2:15.64", "2:15.97", "2:02.88", "1:59.52", "2:10.75", "2:23.55", "2:21.83", "2:14.52"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1151942562047864983"}
	},
	"5x5x5 Blindfolded": {
		single: {name: "William Phommaha", time: "3:25.91", date: "2023-04-19", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1106261407705616434"},
		mo3: {name: "William Phommaha", time: "3:39.98", date: "2023-04-20", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1106261407705616434"},
		avg5: {name: "William Phommaha", time: "3:53.82", date: "2023-04-19", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1106261407705616434"},
		avg12: {name: "William Phommaha", time: "4:17.48", date: "2020-05-25", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/714539887138963486"}
	},
	"6x6x6 Blindfolded": {
		single: {name: "William Phommaha", time: "12:14.81", date: "2019-03-24", memoTime: "5:40.64", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/559373208457838593"},
		mo3: {name: "Wilfrid Py", time: "1:38:49", date: "2021-07-02", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/860326277754781716"}
	},
	"7x7x7 Blindfolded": {
		single: {name: "William Phommaha", time: "31:00.08", date: "2019-05-03", memoTime: "14:17.81"}
	},
	"8x8x8 Blindfolded": {
		single: {name: "Wilfrid Py", time: "5:15:30.00", date: "2018-09-21", memoTime: "2:37:20.00", youtubeVideoId: "rYMUp5gfbZ4"}
	},
	"9x9x9 Blindfolded": {
		single: {name: "Matteo Chancerel", time: "2:41:00.00", date: "2019-07-15", memoTime: "1:24:00.00", discordLink: "https://youtu.be/IBJ4KsB8gqY"}
	},
	"Relay 2-5 Blindfolded": {
		single: {name: "William Phommaha", time: "10:58.82", date: "2020-03-14", memoTime: "5:44.19", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/688504038496403611"},
		mo3: {name: "William Phommaha", time: "13:00.63", date: "2020-06-08", timeList: ["12:20.00", "12:53.00", "13:47.00"], discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/719662250276946020"},
		avg5: {name: "William Phommaha", time: "13:00.63", date: "2020-06-08", timeList: ["10:58.00", "DNF", "12:20.00", "12:53.00", "13:47.00"], discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/719662250276946020"}
	},
	"Relay 2-6 Blindfolded": {
		single: {name: "William Phommaha", time: "31:38:86", date: "2020-03-15", memoTime: "17:34.85", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/688718045128032261"}
	},
	"Megaminx Blindfolded": {
		single: {name: "William Phommaha", time: "23:38.69", date: "2020-05-03", memoTime: "12:55.93", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/706481971169067078"}
	},
	"Square One Blindfolded": {
		single: {name: "Emma Cadet", time: "3:59.47", date: "2020-06-01", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/717124541540991100"},
		mo3: {name: "Emma Cadet", time: "4:27.42", date: "2020-06-01", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/717124541540991100"},
		avg5: {name: "Emma Cadet", time: "5:02.37", date: "2020-06-01", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/717124541540991100"}
	},
	"Clock Blindfolded": {
		single: {name: "Maxime Madrzyk", time: "1:50.10", date: "2022-07-13", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/996827561877319770"}
	},
	"3x3x3 Multi-Blindfolded": {
		single: {name: "William Phommaha", score: "37/37", time: "54:50.00", date: "2020-04-16", memoTime: "34:52.00", otherLink: "https://www.speedcubingfrance.org/online_competitions/ConfinementOpen9"},
		mo3: {name: "William Phommaha", score: "33", date: "2020-04-06", scoreList: ["33/35", "33/35", "37/37"], discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/700410469973754007"},
		avg5: {name: "William Phommaha", score: "29", date: "2020-02-09", scoreList: ["29/33", "31/33", "32/33", "30/33", "33/33"]},
		avg12: {name: "Maxime Madrzyk", score: 27.7, date: "2022-01-17", scoreList: ["33/37", "33/37", "29/37", "33/37", "27/37", "33/37", "31/37", "33/37", "36/37", "33/37", "32/37", "33/37"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1065026880794804378"}
	},
	"3x3x3 Blindfolded One-Handed": {
		single: {name: "Charles Daloz-Baltenberger", time: "47.66", date: "2023-08-20", scramble: "D F L' U' D2 F2 U' D2 R B' D2 F U2 F' D2 B' L2 F L2 F", discordLink: "https://discord.com/channels/329175643877015553/329175643877015553/1142931686338855085"},
	},
	"Relay WCA 17 events": {
		single: {name: "William Phommaha", time: "34:13.57", date: "2020-01-16", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/667414979116531732"}
	},
	"Mini-Guilford Solo": {
		single: {name: "Lucas Déglise", time: "3:27.18", date: "2023-10-02", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1158507714129969254"},
		mo3: {name: "Lucas Déglise", time: "3:32.71", date: "2023-10-02", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1158507714129969254"},
		avg5: {name: "Lucas Déglise", time: "3:31.35", date: "2023-10-02", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1158507714129969254"}
	},
	"Mini-Guilford Duo": {
		single: {names: ["Clément Cherblanc", "Lucas Déglise"], time: "1:52.53", date: "2019-05-06", youtubeVideoId: "7jgfZIpjr3A"},
		mo3: {names: ["Louis Fertier", "Victor Wijsman"], time: "2:23.63", date: "2017-10-26", francocubePostId: "271420"},
		avg5: {names: ["Louis Fertier", "Victor Wijsman"], time: "2:25.69", date: "2017-10-26", francocubePostId: "271420"},
		avg12: {names: ["Louis Fertier", "Victor Wijsman"], time: "2:28.24", date: "2017-10-26", francocubePostId: "271420"}
	},
	"Team Blind": {
		single: {names: ["Axel Brisse", "Wilfrid Py"], time: "11.79", date: "2021-08-25", scramble: "B F2 U2 L2 F2 R2 B2 F R D' B L2 U R' B D2 R2 D2 U", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880048593879302214"},
		mo3: {names: ["Axel Brisse", "Wilfrid Py"], time: "16.42", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"},
		avg5: {names: ["Axel Brisse", "Wilfrid Py"], time: "17.55", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"},
		avg12: {names: ["Axel Brisse", "Wilfrid Py"], time: "18.65", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"},
		avg50: {names: ["Axel Brisse", "Wilfrid Py"], time: "20.73", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"},
		avg100: {names: ["Axel Brisse", "Wilfrid Py"], time: "21.14", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"}
	},
	"Team Solve Duo": {
		single: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "5.36", date: "2022-04-30", scramble: "U2 L2 U2 R' D2 B2 R U2 F' R' B2 R2 U2 B2 U2 R", discordLink: "https://discord.com/channels/329175643877015553/329918000553525258/969880187640623144"},
		mo3: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "10.01", date: "2017-01-04"},
		avg5: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "10.49", date: "2017-01-04"},
		avg12: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "10.97", date: "2017-01-04"},
		avg50: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "11.75", date: "2017-01-04"},
		avg100: {names: ["Juliette Sébastien", "Nicolas Gertner"], time: "12.64", date: "2017-01-04"}
	},
	"2-man 3x3x3 Blindfolded relay": {
		single: {names: ["Arthur Garcin", "Maxime Madrzyk"], time: "39.76", date: "2022-05-24", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/978593706972160011"}
	},
	"Mirror": {
		single: {name: "Axel Brisse", time: "14.41", date: "2021-09-06", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"},
		mo3: {name: "Axel Brisse", time: "18.70", date: "2021-09-06", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"},
		avg5: {name: "Axel Brisse", time: "19.72", date: "2021-09-06", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"},
		avg12: {name: "Axel Brisse", time: "20.99", date: "2021-09-06", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"},
		avg50: {name: "Axel Brisse", time: "22.91", date: "2021-09-06", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"},
		avg100: {name: "Axel Brisse", time: "23.39", date: "2021-09-06", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/884382012956352552"}
	},
	"Inequilateral": {
		single: {name: "Wilfrid Py", time: "23.76", date: "2017-04-08", francocubePostId: "265434"},
		mo3: {name: "Wilfrid Py", time: "32.46", date: "2020-02-12", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"},
		avg5: {name: "Wilfrid Py", time: "32.89", date: "2020-02-12", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"},
		avg12: {name: "Wilfrid Py", time: "35.90", date: "2020-02-12", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"},
		avg50: {name: "Wilfrid Py", time: "37.56", date: "2020-02-12", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"},
		avg100: {name: "Wilfrid Py", time: "38.72", date: "2020-02-12", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/677161207341514792"}
	},
	"Ghost": {
		single: {name: "Matthieu Aubert", time: "1:41.42", date: "2020-08-25"},
		mo3: {name: "Matthieu Aubert", time: "1:51.99", date: "2020-08-25", timeList: ["1:41.42", "1:55.03", "1:59.54"]},
		avg5: {name: "Matthieu Aubert", time: "2:01.45", date: "2020-08-25", timeList: ["2:39.61", "2:09.79", "1:41.42", "1:55.03", "1:59.54"]},
		avg12: {name: "Matthieu Aubert", time: "2:11.15", date: "2020-08-25"}
	},
	"Penrose": {
		single: {name: "Wilfrid Py", time: "27.14", date: "2020-02-10", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/676210497196130304"},
		mo3: {name: "Wilfrid Py", time: "31.56", date: "2020-02-18", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"},
		avg5: {name: "Wilfrid Py", time: "34.40", date: "2020-02-18", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"},
		avg12: {name: "Wilfrid Py", time: "37.22", date: "2020-02-18", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"},
		avg50: {name: "Wilfrid Py", time: "44.37", date: "2020-02-18", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"},
		avg100: {name: "Wilfrid Py", time: "45.30", date: "2020-02-18", discordLink: "https://discordapp.com/channels/329175643877015553/344073328744464384/679390729260367893"}
	},
	"Mastermorphix": {
		single: {name: "Maxime Dotto", time: "10.35", date: "2023-07-08", scramble: "B2 D' L2 D2 R2 F2 D' L D U2 R' B L2 U2 B2 L D' F' R'", reconstruction: ["y2 x // Inspection", "L U' L' x' z' U2 R U' R' U R U' R' // FB", "U' R' U R U (x') L' U' L2 U L' // SB + FS", "U2 R U R' U R U' R' // LS + Counter EO", "U' R U2 R' U' R U' R' // ELL EO antisune", "U R UU R' U' R U' R' U2 R' UU R U R' U R U2 // CPLL skip + ACOLL"], youtubeVideoId: "92B1d3HDiAM", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1127244255908331742"},
		mo3: {name: "Maxime Dotto", time: "17.87", date: "2023-05-10", timeList: ["12.63", "22.51", "18.48"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1105873941156859975"},
		avg5: {name: "Maxime Dotto", time: "19.41", date: "2023-03-08", timeList: ["17.81", "17.89", "20.89", "21.61", "19.46"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1083075702351470752"},
		avg12: {name: "Maxime Dotto", time: "23.92", date: "2022-12-31", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1058566387523653633"},
		avg50: {name: "Maxime Dotto", time: "25.71", date: "2023-03-08", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1083075702351470752"},
		avg100: {name: "Maxime Dotto", time: "25.93", date: "2023-03-08", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1083075702351470752"}
	},
	"Megamorphix": {
		single: {name: "Maxime Dotto", time: "1:36.79", date: "2023-05-04", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1103697869036343468"},
		mo3: {name: "Maxime Dotto", time: "1:56.43", date: "2023-01-20", timeList: ["1:56.24", "2:05.33", "1:47.74"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1065901881815224370"},
		avg5: {name: "Maxime Dotto", time: "2:00.87", date: "2023-01-20", timeList: ["1:56.24", "2:05.33", "1:47.74", "2:01.06", "2:15.03"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1065901881815224370"},
		avg12: {name: "Maxime Dotto", time: "2:04.60", date: "2022-10-30", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1036356089568051320"},
		avg50: {name: "Maxime Dotto", time: "2:10.83", date: "2023-01-20", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1065901881815224370"},
		avg100: {name: "Maxime Dotto", time: "2:19.18", date: "2023-03-08", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1083075702351470752"}
	},
	"Molecube": {
		single: {name: "Balthazar Maignan", time: "7.35", date: "2023-05-04", scramble: "F2 U' F2 U F2 D2 F2 D' B L2 U2 L' D' F2 U F' L' R", youtubeVideoId: "sW3SeJj9gK0"},
		mo3: {name: "Balthazar Maignan", time: "9.11", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"},
		avg5: {name: "Balthazar Maignan", time: "10.11", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"},
		avg12: {name: "Balthazar Maignan", time: "11.05", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"},
		avg50: {name: "Balthazar Maignan", time: "11.89", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"},
		avg100: {name: "Balthazar Maignan", time: "12.48", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"}
	}
};

const avgTypes = ["single", "mo3", "avg5", "avg12", "avg50", "avg100"];
