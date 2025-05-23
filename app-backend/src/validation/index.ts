import * as Joi from "joi";

export function validatePackagePostRequest(data: Package) {
  const JoiSchema = Joi.object({
    image: Joi.string().required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    price: Joi.string().min(1).required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate({
    image: data.image,
    title:data.title,
    description: data.description,
    price: data.price
  });
}