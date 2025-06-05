// cacheManager.js
class Report {
	constructor() {
		if (!Report.instance) {
			this.cache = [];
			Report.instance = this;
		}
		return Report.instance;
	}

	setToReport(value) {
		this.cache.push(value);
	}
	getReport(){
		return this.cache;
	}
	updateReport(testId, updatedData) {
		let data = this.cache;
		for (let report of data) {
			if (report.testId == testId) {
				Object.assign(report, updatedData);
				break;
			}
		}
		this.cache = data;
	}
	deleteReport(testId) {
		let data = this.cache;
		this.cache = data.filter((value) => value.testId != testId);
	}
	clear(){
		this.cache = [];
	}
}

// Ensure that the same instance is used throughout the application
const instance = new Report();
// Object.freeze(instance);

module.exports = instance;