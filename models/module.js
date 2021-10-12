const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    programme: { type: Array },
    moduleCode: { type: String },
    moduleName: { type: String },
    au: { type: Number },
    description: { type: String },
    notAvailableFor: { type: String },
    notAvailableToProgramme: { type: String },
    notAvailableToAllProgrammeWith: { type: String },
    notAvailableAsPETo: { type: String },
    "notAvailableAsBD/EUETo": { type: String },
    notAvailableAsCoreTo: { type: String },
    exam: { type: String },
    schedule: { type: Array },
    timetable: Schema.Types.Mixed,
    isLabBased: { type: Boolean },
    isOnline:  { type: Boolean },
    workload: Schema.Types.Mixed,
    faculty: { type: Array },
    prerequisiteFor: { type: String },
    prerequisite: { type: String },
    isMinor:  {type: Boolean},
    deptMaintain: { type: String },
    isPassFail: { type: Boolean }
})

module.exports = mongoose.model('Module', moduleSchema);