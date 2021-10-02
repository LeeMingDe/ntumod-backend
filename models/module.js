const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    course_name: { type: String },
    module_code: { type: String },
    module_name: { type: String },
    au: { type: Number },
    module_description: { type: String },
    not_available_for: { type: String },
    not_available_to_all_programme_with: { type: String },
    exam: { type: String },
    schedule: { type: Array },
    timetable: Schema.Types.Mixed,
    not_available_to_all_programme_with: { type: String },
    is_lab_based: { type: Boolean },
    is_online:  {type: Boolean },
    workload: Schema.Types.Mixed ,
    faculty: { type: Array },
    prerequisite_for: { type: String },
    prerequisite: { type: String },
    is_minor:  {type: Boolean},
    dept_maintain: { type: String },
    is_pass_fail: {type: Boolean }
})

module.exports = mongoose.model('Module', moduleSchema);