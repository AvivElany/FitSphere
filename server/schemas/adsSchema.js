const Joi = require('joi')

const validationOptions = {
    stripUnknown:true,
    abortEarly:false,
}

const schemas = {
    createNewAd: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        link: Joi.string().uri().required(),
        image: Joi.object().keys({
            url: Joi.string().uri().required(),
            alt: Joi.string().optional()
        }).required(),
        isActive: Joi.boolean().required()
    }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"),
    
    updateAd: Joi.object().keys({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        link: Joi.string().uri().optional(),
        image: Joi.object().keys({
            url: Joi.string().uri().optional(),
            alt: Joi.string().optional()
        }).optional(),
        isActive: Joi.boolean().optional()
    }).options(validationOptions).min(0).message("The request's body must include at-least one valid key")
};



module.exports = schemas