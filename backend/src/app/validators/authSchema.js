const zod = require("zod");

const loginSchema = zod.object({
  nationalId: zod
    .string({
      required_error: "National ID is required",
    })
    .min(8, {
      message: "National ID must be at least 8 characters",
    })
    .max(20, {
      message: "National ID cannot exceed 20 characters",
    }),
});

module.exports = { loginSchema };
