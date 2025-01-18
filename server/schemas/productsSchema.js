const Joi = require('joi')

const validationOptions = {
    stripUnknown:true,
    abortEarly:false,
}

const schemas = {
    createNewProduct:
        Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().min(0).required(),
            discountPercentage: Joi.number().min(0).max(100).optional(),
            stockQuantity: Joi.number().min(0).required(),
            link: Joi.string().uri().required(),
            picture: Joi.object({
                url: Joi.string().optional(),
                alt: Joi.string().optional()
            }).optional(),
            colors: Joi.array().items(Joi.string()).required(),
            flavors: Joi.array().items(Joi.string()).required(),
            category: Joi.string().required()
        }),
    
    updateProduct:
        Joi.object().keys({
            name: Joi.string().optional(),
            description: Joi.string().optional(),
            price: Joi.number().min(0).optional(),
            discountPercentage: Joi.number().min(0).max(100).optional(),
            stockQuantity: Joi.number().min(0).optional(),
            link: Joi.string().uri().optional(),
            picture: Joi.object({
                url: Joi.string().optional(),
                alt: Joi.string().optional()
            }).optional(),
            colors: Joi.array().items(Joi.string()).optional(),
            flavors: Joi.array().items(Joi.string()).optional(),
            category: Joi.string().optional()
        }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"), 
}

module.exports = schemas