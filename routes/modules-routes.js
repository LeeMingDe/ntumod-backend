const express = require('express');

const modulesController =  require('../controllers/modules-controller');

const router = express.Router();

router.get('/', modulesController.getFilteredModules);

router.get('/:moduleCode/:moduleName', modulesController.getModule);

router.get('/get-requisite', modulesController.getRequisite);

module.exports = router;