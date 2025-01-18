const Joi = require('joi')

const validationOptions = {
    stripUnknown:true,
    abortEarly:false,
}

const schemas = {
    createNewContent:
        Joi.object().keys({
            key: Joi.string().trim().required(),
            value: Joi.array().items(Joi.string().required().trim()).min(1).required()
        }).options(validationOptions),
    
    updateContent:
        Joi.object().keys({
            key: Joi.string().trim().optional(),
            value: Joi.array().items(Joi.string().required().trim()).min(1).optional()
        }).options(validationOptions).min(0).message("The request's body must include at-least one valid key"),
}



module.exports = schemas