"use script";

const bodyOnload = () => {
	buildRecords(); // record section with the tables
	fillStandardText('fr'); // text content according to translations
	checkRefactorMessageVisibility(); // temporary message for refactoring explaination
	buildStatistics(); // statistics section at the bottom of the page
};
