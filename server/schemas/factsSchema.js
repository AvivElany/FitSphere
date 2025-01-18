const Joi = require('joi')

const validationOptions = {
    stripUnknown:true,
    abortEarly:false,
}

const schemas = {
    createNewFact:
        Joi.object().keys({
            kind: Joi.string().required(),
            fact: Joi.string().required(),
        }).required().options(validationOptions),
    
    updateFact:
        Joi.object().keys({
            kind: Joi.string().optional(),
            fact: Joi.string().optional(),
        }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"), 
}

module.exports = schemas