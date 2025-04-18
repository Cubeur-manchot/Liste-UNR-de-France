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
		mo3: {name: "Paul Ducruet", time: "28:50.94", date: "2024-01-06", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1193324100416974950"},
		avg5: {name: "Paul Ducruet", time: "29:41.96", date: "2024-01-06", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1193324100416974950"},
		avg12: {name: "Paul Ducruet", time: "30:21.12", date: "2024-01-06", discordLink: "https://discord.com/channels/329175643877015553/330974462239309824/1193324100416974950"}
	},
	"4x4x4 One-Handed": {
		single: {name: "Baptiste Bery", time: "41.23", date: "2025-02-24", scramble: "D' L2 F2 L U2 B2 R' B2 R2 F2 U2 L2 D' B' R2 D' R' F' U' B' L2 Uw2 F2 L U Rw2 D' Uw2 Rw2 B2 R' D2 Uw2 Fw R' D2 B2 D R' Uw Rw F L D' Fw' L'", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1343248816727392386"},
		mo3: {name: "Baptiste Bery", time: "48.11", date: "2025-02-24", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1343239407351890081"},
		avg5: {name: "Baptiste Bery", time: "52.30", date: "2025-02-24", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1343239407351890081"},
		avg12: {name: "Baptiste Bery", time: "55.18", date: "2025-02-24", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1343239407351890081"},
		avg50: {name: "Baptiste Bery", time: "58.26", date: "2025-02-24", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1343239407351890081"},
		avg100: {name: "Baptiste Bery", time: "59.81", date: "2025-02-24", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1343239407351890081"}
	},
	"5x5x5 One-Handed": {
		single: {name: "Baptiste Bery", time: "1:25:00", date: "2024-11-12", scramble: "Bw2 Lw F' B2 D2 B U Lw2 R' F' D2 B2 F2 L D2 Bw Rw2 R L2 Dw' D F2 Lw' Dw Fw R Dw' D Fw' L2 Bw' B U F2 U2 L R U' Rw2 Uw' L' R2 Lw' Rw Bw2 U Bw2 D L2 D' R L Fw B U2 Dw Rw R Bw2 L'", youtubeVideoId: "A2Ytuum1uRc", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1305966761916498120"},
		mo3: {name: "Baptiste Bery", time: "1:36.75", date: "2024-11-12", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1305966761916498120"},
		avg5: {name: "Baptiste Bery", time: "1:39.49", date: "2024-11-12", timeList: ["2:02.57", "2:11.69", "2:09.62", "2:33.92", "2:03.52"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1305966761916498120"},
		avg12: {name: "Baptiste Bery", time: "1:44.51", date: "2024-11-12", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1305966761916498120"},
		avg50: {name: "Baptiste Bery", time: "1:47.90", date: "2024-11-12", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1305966761916498120"},
		avg100: {name: "Baptiste Bery", time: "1:49.97", date: "2024-11-12", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1305966761916498120"}
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
		single: {name: "Rémi Perrin", time: "10.59", date: "2024-05-07", scramble: "R++ D-- R++ D++ R-- D-- R++ D-- R-- D-- U' R++ D-- R-- D-- R++ D-- R-- D-- R++ D++ U R-- D++ R-- D++ R++ D-- R-- D++ R++ D++ U", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1237502691773780020"},
		mo3: {name: "Rémi Perrin", time: "12.87", date: "2024-09-16", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1285264250138394766"},
		avg5: {name: "Rémi Perrin", time: "13.35", date: "2024-09-16", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1285264250138394766"},
		avg12: {name: "Rémi Perrin", time: "14.86", date: "2024-09-16", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1285264250138394766"},
		avg50: {name: "Rémi Perrin", time: "15.64", date: "2024-09-16", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1285264250138394766"},
		avg100: {name: "Rémi Perrin", time: "15.88", date: "2024-09-16", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1285264250138394766"}
	},
	"Masterkilominx": {
		single: {name: "Axel Brisse", time: "3:22.09", date: "2020-07-10", youtubeVideoId: "4ppRIoSbNkg", discordLink: "https://discord.com/channels/329175643877015553/332432847908634644/731197865812295690"},
		mo3: {name: "Matthieu Aubert", time: "3:38.56", date: "2020-08-02"},
		avg5: {name: "Axel Brisse", time: "3:43.76", date: "2022-04-27", timeList: ["4:02.78", "3:38.18", "3:35.77", "3:50.73", "3:42.38"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/968691687499137024"},
		avg12: {name: "Matthieu Aubert", time: "3:49.93", date: "2020-08-02", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/739281133941948526"}
	},
	"Gigaminx": {
		single: {name: "Baptiste Bery", time: "5:31.36", date: "2025-01-29", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1334080803684089926"},
		mo3: {name: "Baptiste Bery", time: "5:45.77", date: "2025-01-06", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1325865677118242929"},
		avg5: {name: "Rémi Perrin", time: "5:50.90", date: "2024-09-04", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1280883091644219402"},
		avg12: {name: "Rémi Perrin", time: "6:00.67", date: "2024-09-04", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1280883091644219402"},
		avg50: {name: "Rémi Perrin", time: "6:17.49", date: "2024-09-04", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1280883091644219402"},
		avg100: {name: "Rémi Perrin", time: "6:20.77", date: "2024-09-04", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1280883091644219402"}
	},
	"3x3x3 Blindfolded": {
		single: {name: "Charles Daloz-Baltenberger", time: "12.11", date: "2024-07-17", scramble: "U' B R F2 R D2 B2 F2 R U2 B2 R' U2 L' U F D' R' D F' L2 Rw Uw", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1262921285634228255"},
		mo3: {name: "Charles Daloz-Baltenberger", time: "14.82", date: "2024-07-17", timeList: ["13.74", "12.11", "18.60"], scrambleList: ["F' L2 B2 D L2 F2 U2 R2 U' R2 U R' D' L2 B' F' R' B' L F Uw2", "U' B R F2 R D2 B2 F2 R U2 B2 R' U2 L' U F D' R' D F' L2 Rw Uw", "D2 L2 B2 R2 U L2 R2 F2 D U2 L2 F' D' F2 R' B L B2 D L' F' Fw Uw'"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1262924396004114547"},
		avg5: {name: "Charles Daloz-Baltenberger", time: "16.10", date: "2024-07-17", timeList: ["13.74", "12.11", "18.60", "18.41", "16.16"], scrambleList: ["F' L2 B2 D L2 F2 U2 R2 U' R2 U R' D' L2 B' F' R' B' L F Uw2", "U' B R F2 R D2 B2 F2 R U2 B2 R' U2 L' U F D' R' D F' L2 Rw Uw", "D2 L2 B2 R2 U L2 R2 F2 D U2 L2 F' D' F2 R' B L B2 D L' F' Fw Uw'", "D' R2 D2 B U2 B U2 F' R2 B' D2 U2 R' B L2 F L F U' F L Fw Uw2", "F L2 R2 D R2 B2 U' L2 R2 B2 U L2 U2 F L' B' D' R2 B' L2 R2 Fw' Uw2"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1262924260444209204"},
		avg12: {name: "Charles Daloz-Baltenberger", time: "19.62", date: "2024-03-20", timeList: ["19.75", "20.98", "18.45", "19.49", "18.36", "16.64", "19.97", "DNF", "19.70", "20.34", "18.61", "20.52"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1220120309664055357"},
		avg50: {name: "Maxime Madrzyk", time: "26.43", date: "2022-12-21", timeList: ["26.22", "22.92", "24.27", "30.28", "20.36", "22.10", "27.56", "26.70", "27.81", "24.15", "DNF", "22.33", "DNF", "22.60", "24.08", "21.01", "27.98", "34.85", "20.75", "22.20", "24.04", "30.14", "28.91", "24.27", "24.57", "22.44", "24.05", "29.53", "24.53", "29.08", "32.00", "27.71", "25.29", "22.02", "DNF", "21.17", "26.76", "25.12", "25.59", "21.90", "24.04", "27.27", "24.90", "35.20", "24.03", "27.07", "27.10", "24.19", "24.51", "49.43"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1054899767290896464"},
		avg100: {name: "Quentin Rivault", time: "40.59", date: "2023-11-25", timeList: ["34.16", "57.55", "34.88", "41.72", "33.89", "45.32", "32.22", "41.56", "50.94", "31.03", "48.72", "32.92", "39.95", "43.00", "1:02.86", "35.62", "30.36", "44.46", "40.41", "37.30", "38.62", "35.88", "32.33", "38.76", "50.88", "31.11", "42.37", "43.02", "57.30", "42.48", "DNF", "36.75", "37.10", "34.81", "DNF", "37.34", "45.67", "37.23", "39.25", "32.77", "34.31", "39.90", "46.74", "1:22.14", "31.80", "37.32", "1:19.78", "35.59", "DNF", "29.09", "39.30", "36.72", "44.06", "36.44", "43.76", "38.03", "52.46", "42.51", "DNF", "47.86", "35.69", "38.53", "32.52", "37.60", "33.61", "29.28", "DNF", "39.11", "41.49", "32.55", "31.94", "32.45", "53.88", "29.22", "36.05", "29.53", "41.39", "35.37", "38.48", "31.61", "29.54", "58.81", "51.16", "42.47", "31.38", "32.13", "46.72", "35.09", "39.62", "36.21", "44.40", "34.48", "35.30", "55.58", "33.52", "45.66", "31.06", "25.65", "31.62", "45.22"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1177947899146031174"}
	},
	"4x4x4 Blindfolded": {
		single: {name: "Arthur Garcin", time: "1:33.43", date: "2023-08-12", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1214883333750657134"},
		mo3: {name: "Tiago Eche", time: "1:56.73", date: "2023-12-25", timeList: ["1:58.46", "1:49.58", "2:02.16"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1188896336301527050"},
		avg5: {name: "William Phommaha", time: "1:52.85", date: "2020-07-31", timeList: ["1:51.50", "1:47.34", "DNF", "1:59.71", "1:35.70"],  memoTimeList: ["39.31", "36.35", "46.40", "54.20", "37.00"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/738859907457089597"},
		avg12: {name: "William Phommaha", time: "2:11.24", date: "2023-09-14", timeList: ["1:55.96", "2:11.73", "DNF", "1:55.74", "2:15.64", "2:15.97", "2:02.88", "1:59.52", "2:10.75", "2:23.55", "2:21.83", "2:14.52"], discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1151942562047864983"}
	},
	"5x5x5 Blindfolded": {
		single: {name: "William Phommaha", time: "3:16.65", date: "2023-06-10", memoTime: "1:19.37", scramble: "Bw' Uw' Fw Rw F Uw2 U2 B Fw2 R' Uw D' U B' Bw2 L2 Uw2 Dw' F Lw' Fw2 Dw' Bw Dw Rw' R2 F2 L Uw2 Dw2 U2 Fw' Lw2 Uw' Lw' Dw' F U2 Fw2 Dw' R Uw Lw' U F2 D' U' Dw' R2 Lw2 F2 R L Bw U F' B2 Dw' L Lw' 3Rw 3Uw'", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1117134397368442980"},
		mo3: {name: "William Phommaha", time: "3:39.98", date: "2023-04-20", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1106261407705616434"},
		avg5: {name: "William Phommaha", time: "3:53.82", date: "2023-04-19", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/1106261407705616434"},
		avg12: {name: "William Phommaha", time: "4:17.48", date: "2020-05-25", discordLink: "https://discordapp.com/channels/329175643877015553/353504450867888128/714539887138963486"}
	},
	"6x6x6 Blindfolded": {
		single: {name: "William Phommaha", time: "12:14.81", date: "2019-03-24", memoTime: "5:40.64", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/559373208457838593"},
		mo3: {name: "Wilfrid Py", time: "1:38:49", date: "2021-07-02", discordLink: "https://discord.com/channels/329175643877015553/353504450867888128/860326277754781716"}
	},
	"Clock Blindfolded": {
		single: {name: "Romain Velcin", time: "22.55", date: "2024-11-07", scramble: "UR1+ DR2- DL4+ UL2- U1- R3- D2- L5- ALL0+ y2 U2+ R2+ D1- L2+ ALL5-", youtubeVideoId: "fuC0mS1dwgo", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1304192010244194305"},
		mo3: {name: "Romain Velcin", time: "31.28", date: "2024-06-07", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1248726571712380999"},
		avg5: {name: "Romain Velcin", time: "33.34", date: "2024-06-07", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1248726571712380999"},
		avg12: {name: "Romain Velcin", time: "38.97", date: "2024-06-07", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1248731007465820160"}
	},
	"3x3x3 Multi-Blindfolded": {
		single: {name: "William Phommaha", score: "37/37", time: "54:50.00", date: "2020-04-16", memoTime: "34:52.00", otherLink: "https://www.speedcubingfrance.org/online_competitions/ConfinementOpen9"},
		mo3: {name: "Maxime Madrzyk", score: "33.33", date: "2025-03-12", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1349468528490840094"},
		avg5: {name: "Maxime Madrzyk", score: "31.67", date: "2025-03-12", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1349468528490840094"},
		avg12: {name: "Maxime Madrzyk", score: "29.80", date: "2025-03-12", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1349468528490840094"},
		avg50: {name: "Maxime Madrzyk", score: "27.86", date: "2025-03-12", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1349468528490840094"}
	},
	"3x3x3 Blindfolded One-Handed": {
		single: {name: "Charles Daloz-Baltenberger", time: "47.66", date: "2023-08-20", scramble: "D F L' U' D2 F2 U' D2 R B' D2 F U2 F' D2 B' L2 F L2 F", discordLink: "https://discord.com/channels/329175643877015553/329175643877015553/1142931686338855085"},
	},
	"Mini-Guilford Solo": {
		single: {name: "Lucas Déglise", time: "3:27.18", date: "2023-10-02", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1158507714129969254"},
		mo3: {name: "Lucas Déglise", time: "3:32.71", date: "2023-10-02", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1158507714129969254"},
		avg5: {name: "Lucas Déglise", time: "3:31.35", date: "2023-10-02", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1158507714129969254"}
	},
	"Mini-Guilford Duo": {
		single: {names: ["Clément Cherblanc", "Juliette Sébastien"], time: "1:34.32", date: "2023-11-28", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1178927173449556059"},
		mo3: {names: ["Clément Cherblanc", "Juliette Sébastien"], time: "1:40.08", date: "2023-11-28", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1178927173449556059"},
		avg5: {names: ["Clément Cherblanc", "Juliette Sébastien"], time: "1:43.14", date: "2023-11-28", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1178927173449556059"},
		avg12: {names: ["Clément Cherblanc", "Juliette Sébastien"], time: "1:49.20", date: "2023-11-28", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1178927173449556059"}
	},
	"Team Blind": {
		single: {names: ["Axel Brisse", "Wilfrid Py"], time: "11.79", date: "2021-08-25", scramble: "B F2 U2 L2 F2 R2 B2 F R D' B L2 U R' B D2 R2 D2 U", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880048593879302214"},
		mo3: {names: ["Axel Brisse", "Wilfrid Py"], time: "16.42", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"},
		avg5: {names: ["Axel Brisse", "Wilfrid Py"], time: "17.55", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"},
		avg12: {names: ["Axel Brisse", "Wilfrid Py"], time: "18.65", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"},
		avg50: {names: ["Axel Brisse", "Wilfrid Py"], time: "20.73", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"},
		avg100: {names: ["Axel Brisse", "Wilfrid Py"], time: "21.14", date: "2021-08-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/880091791238508634"}
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
	"Mastermorphix": {
		single: {name: "Maxime Dotto", time: "10.35", date: "2023-07-08", scramble: "B2 D' L2 D2 R2 F2 D' L D U2 R' B L2 U2 B2 L D' F' R'", reconstruction: ["y2 x // Inspection", "L U' L' x' z' U2 R U' R' U R U' R' // FB", "U' R' U R U (x') L' U' L2 U L' // SB + FS", "U2 R U R' U R U' R' // LS + Counter EO", "U' R U2 R' U' R U' R' // ELL EO antisune", "U R UU R' U' R U' R' U2 R' UU R U R' U R U2 // CPLL skip + ACOLL"], youtubeVideoId: "92B1d3HDiAM", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1127244255908331742"},
		mo3: {name: "Maxime Dotto", time: "17.87", date: "2023-05-10", timeList: ["12.63", "22.51", "18.48"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1105873941156859975"},
		avg5: {name: "Maxime Dotto", time: "19.41", date: "2023-03-08", timeList: ["17.81", "17.89", "20.89", "21.61", "19.46"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1083075702351470752"},
		avg12: {name: "Maxime Dotto", time: "22.63", date: "2024-10-17", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1296456292080029706"},
		avg50: {name: "Maxime Dotto", time: "24.43", date: "2024-10-21", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1297935339515674624"},
		avg100: {name: "Maxime Dotto", time: "25.20", date: "2024-10-21", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1297935339515674624"}
	},
	"Megamorphix": {
		single: {name: "Maxime Dotto", time: "1:30.61", date: "2024-10-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1299406405672894465"},
		mo3: {name: "Maxime Dotto", time: "1:36.61", date: "2024-10-25", timeList: ["1:30.61", "1:51.15", "1:32.13"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1299406405672894465"},
		avg5: {name: "Maxime Dotto", time: "1:42.55", date: "2024-10-27", timeList: ["1:48.19", "1:30.61", "1:47.33", "1:32.12", "1:51.15"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1300220837277995008"},
		avg12: {name: "Maxime Dotto", time: "1:49.72", date: "2024-10-27", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1300220837277995008"},
		avg50: {name: "Maxime Dotto", time: "1:57.45", date: "2024-10-27", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1300220837277995008"},
		avg100: {name: "Maxime Dotto", time: "2:00.36", date: "2024-10-27", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1300220837277995008"}
	},
	"Gigamorphix": {
		single: {name: "Paul Ducruet", time: "3:49.17", date: "2025-01-08", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1326646627825356980"},
		mo3: {name: "Maxime Dotto", time: "4:05.54", date: "2024-11-14", timeList: ["4:10.08", "3:57.71", "4:08.82"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1306536145013702698"},
		avg5: {name: "Maxime Dotto", time: "4:07.72", date: "2024-11-14", timeList: ["4:10.08", "3:57.71", "4:08.82", "4:49.13", "4:04.26"], discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1306536145013702698"},
		avg12: {name: "Paul Ducruet", time: "4:34.89", date: "2024-11-14", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1306515426657832980"}
	},
	"Molecube": {
		single: {name: "Balthazar Maignan", time: "7.35", date: "2023-05-04", scramble: "F2 U' F2 U F2 D2 F2 D' B L2 U2 L' D' F2 U F' L' R", youtubeVideoId: "sW3SeJj9gK0"},
		mo3: {name: "Balthazar Maignan", time: "9.11", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"},
		avg5: {name: "Balthazar Maignan", time: "10.11", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"},
		avg12: {name: "Balthazar Maignan", time: "11.05", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"},
		avg50: {name: "Balthazar Maignan", time: "11.89", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"},
		avg100: {name: "Balthazar Maignan", time: "12.48", date: "2023-06-25", discordLink: "https://discord.com/channels/329175643877015553/344073328744464384/1122481676883345438"}
	},
	"Face Turning Octahedron": {
		single: {name: "Alix Jack", time: "15.14", date: "2025-03-16", discordLink: "https://discord.com/channels/329175643877015553/1271960586405548093/1350801861631938573"},
		mo3: {name: "Alix Jack", time: "18.36", date: "2025-02-07", discordLink: "https://discord.com/channels/329175643877015553/1271960586405548093/1337398499297329244"},
		avg5: {name: "Alix Jack", time: "19.11", date: "2025-03-16", discordLink: "https://discord.com/channels/329175643877015553/1271960586405548093/1350801861631938573"},
		avg12: {name: "Alix Jack", time: "20.14", date: "2025-03-16", discordLink: "https://discord.com/channels/329175643877015553/1271960586405548093/1350801861631938573"},
		avg50: {name: "Alix Jack", time: "21.34", date: "2025-03-16", discordLink: "https://discord.com/channels/329175643877015553/1271960586405548093/1350801861631938573"},
		avg100: {name: "Alix Jack", time: "21.84", date: "2025-03-16", discordLink: "https://discord.com/channels/329175643877015553/1271960586405548093/1350801861631938573"}
	}
};

const avgTypes = ["single", "mo3", "avg5", "avg12", "avg50", "avg100"];
