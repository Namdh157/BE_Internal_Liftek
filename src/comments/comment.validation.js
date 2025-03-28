const Joi = require("joi");

exports.validateComment = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().trim().hex().length(24).required(),
    content: Joi.string().min(3).max(500).required(),
  });

  const paramsSchema = Joi.object({
    projectId: Joi.string().trim().hex().length(24).required(),
    taskId: Joi.string().trim().hex().length(24).required(),
    issueId: Joi.string().trim().hex().length(24).required(),
  });

  const { error: bodyError } = schema.validate(req.body);
  if (bodyError) next({ status: 400, message: bodyError.details[0].message });

  const { error: paramsError } = paramsSchema.validate(req.params);
  if (paramsError) next({ status: 400, message: paramsError.details[0].message });

  next();
};
