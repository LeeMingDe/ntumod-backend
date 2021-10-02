const HttpError = require('../models/http-error');
const Module = require('../models/module');

const getFilteredModules = async (req, res, next) => {
    const queries = req.query;
    filters = {}
    let modules;
    for (const [key, value] of Object.entries(queries)) {
        filters[key] = value;
        if (key == "exam") {
            filters[key] = "Not Applicable";
        }
    };
    try {
        modules = await Module.find(filters);
    } catch (err) {
        return next(new HttpError("Could not any modules", 404));
    }
    res.json(modules);
};

const getModule = async (req, res, next) => {
    const moduleName = req.params.moduleName;
    const moduleCode = req.params.moduleCode;
    let module;
    try {
        module = await Module.findOne({
            "module_name": {
                $regex : new RegExp(moduleName, "i")
            },
            "module_code": {
                $regex : new RegExp(moduleCode, "i")
            },
        })
    } catch (err) {
        return next(new HttpError("Could not the module", 404));
    }
    res.json(module)
};

exports.getFilteredModules = getFilteredModules;
exports.getModule = getModule;