const zod = require("zod");

const dataFormSchema = zod.object({
  
  userId: zod.number().int().positive(),
  storeId: zod.number().int().positive(),
  promotionId: zod.number().int().positive(),
  documentTypeId: zod.number().int().positive(),

  exchangeDate: zod
    .string()
    .refine((dateString) => !isNaN(Date.parse(dateString)), {
      message: "Invalid date format",
    })
    .transform((dateString) => new Date(dateString)),

  clientName: zod
    .string()
    .min(1, { message: "Client name is required" })
    .max(255, { message: "Client name cannot exceed 255 characters" }),

  numberDocumentClient: zod
    .string()
    .min(1, { message: "Number document client is required" })
    .max(12, { message: "Number document client cannot exceed 12 characters" }),

  ticketNumber: zod
    .string()
    .min(1, { message: "Ticket number is required" })
    .max(12, { message: "Ticket number cannot exceed 12 characters" }),

  image: zod
    .string()
    .max(255, { message: "Image URL cannot exceed 255 characters" })
    .optional(),

  path: zod
    .string()
    .max(255, { message: "Path cannot exceed 255 characters" })
    .optional(),

  
});

module.exports = { dataFormSchema };
