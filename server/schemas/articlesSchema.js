const Joi = require('joi')

const validationOptions = {
    stripUnknown:true,
    abortEarly:false,
}

const schemas = {
    createNewArticle:
        Joi.object().keys({
            title: Joi.string().required(),
            introduction: Joi.string().required(),
            writer: Joi.string().required(),
            params: Joi.object().keys({
                title: Joi.string().optional(),
                content: Joi.string().required(),
                picture: Joi.object({
                    url: Joi.string().optional().default(""),
                    alt: Joi.string().optional().default(""),
                }).optional(),
                isGold: Joi.boolean().required()
            }).required(),
            link: Joi.string().uri().required(),
            section: Joi.string().required(),
            isPremium: Joi.boolean().required(),
            mainPicture: Joi.object({
                url: Joi.string().optional(),
                alt: Joi.string().optional()
            }).optional(),
            /* pictures: Joi.object().keys({
                url: Joi.string().optional(),
                alt: Joi.string().optional()
            }).optional() */
        }),
    
    updateArticle:
        Joi.object().keys({
            title: Joi.string().optional(),
            introduction: Joi.string().optional(),
            writer: Joi.string().optional(),
            params: Joi.object().keys({
                title: Joi.string().optional(),
                content: Joi.string().optional(),
                picture: Joi.object({
                    url: Joi.string().optional(),
                    alt: Joi.string().optional()
                }).optional(),
                isGold: Joi.boolean().optional()
            }).optional(),
            link: Joi.string().uri().optional(),
            likes: Joi.object().keys({
                users: Joi.array().items(Joi.string()).optional(),
                name: Joi.object().keys({
                    first: Joi.string().optional(),
                    middle: Joi.string().optional().default(""),
                    last: Joi.string().optional(),
                }).optional(),
            }).optional(),
            section: Joi.string().optional(),
            isPremium: Joi.boolean().optional(),
            mainPicture: Joi.object({
                url: Joi.string().optional(),
                alt: Joi.string().optional()
            }).optional(),
            pictures: Joi.object().keys({
                url: Joi.string().optional(),
                alt: Joi.string().optional()
        }).optional()
        }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"), 
}

module.exports = schemas