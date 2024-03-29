const HttpError = require('../models/http-error');
const Module = require('../models/module');

const getFilteredModules = async (req, res, next) => {
    const queries = req.query;
    let filters = {}
    let modules;
    for (let [key, value] of Object.entries(queries)) {
        if (key == "exam") {
            filters[key] = "Not Applicable";
            continue
        }
        if (key == "au") {
            const newValue = []
            for (let i = 0; i < value.length; i++) {
                if (value[i] === "0") {
                    newValue.push(0, 1);
                    continue
                }
                if (value[i] === "4") {
                    newValue.push(5, 6, 7, 8, 9, 10, 11, 12);
                    continue
                }
                newValue.push(parseInt(value[i]));
            }
            filters[key] = newValue;
            continue
        }
        if (key === "fac") {
            filters["faculty"] = { $all: value }
            continue
        }
        if (key === "prog") {
            filters["programme"] = { $in: value }
            continue
        }
        filters[key] = value;
    };
    try {
        modules = await Module.find(filters).sort({"moduleCode": 1});
    } catch (err) {
        return next(new HttpError("Could not find any modules", 404));
    }
    res.json(modules);
};

const getModule = async (req, res, next) => {
    const moduleName = req.params.moduleName.replace(/-/g, " ");
    const moduleCode = req.params.moduleCode;
    let module;
    try {
        module = await Module.findOne({
            "moduleName": {
                $regex : new RegExp(moduleName, "i")
            },
            "moduleCode": {
                $regex : new RegExp(moduleCode, "i")
            },
        })
    } catch (err) {
        return next(new HttpError("Could not find the module", 404));
    }
    res.json(module)
};

const getRequisite = async (req, res, next) => {
    const queries = req.query;
    let { prerequisite, prerequisiteFor } = queries;
    
    prerequisite = prerequisite.split(" ");
    prerequisiteFor = prerequisiteFor.split(" ");
    
    try {
        prerequisite = await Module.find({ "moduleCode": { $in: prerequisite }}, ["moduleCode", "moduleName"]).sort({"moduleCode": 1});
        prerequisiteFor = await Module.find({ "moduleCode": { $in: prerequisiteFor }}, ["moduleCode", "moduleName"]).sort({"moduleCode": 1});
    } catch (err) {
        return next(new HttpError("Could not find any modules", 404));
    }
    res.json([prerequisite, prerequisiteFor]);
};

exports.getFilteredModules = getFilteredModules;
exports.getModule = getModule;
exports.getRequisite = getRequisite;