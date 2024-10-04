const zod = require("zod");

const dataFormSchema = zod.object({
  userId: zod
    .number({
      required_error: "El ID de usuario es obligatorio",
    })
    .int()
    .positive({
      message: "El ID de usuario debe ser un número entero positivo",
    }),

  storeId: zod
    .number({
      required_error: "El ID de la tienda es obligatorio",
    })
    .int()
    .positive({
      message: "El ID de la tienda debe ser un número entero positivo",
    }),

  promotionId: zod
    .number({
      required_error: "El ID de la promoción es obligatorio",
    })
    .int()
    .positive({
      message: "El ID de la promoción debe ser un número entero positivo",
    }),

  documentTypeId: zod
    .number({
      required_error: "El ID del tipo de documento es obligatorio",
    })
    .int()
    .positive({
      message: "El ID del tipo de documento debe ser un número entero positivo",
    }),

  
  ticketTypeId: zod
    .number({
      required_error: "El ID del tipo de ticket es obligatorio",
    })
    .int()
    .positive({
      message: "El ID del tipo de ticket debe ser un número entero positivo",
    }),

  exchangeDate: zod
    .string({
      required_error: "La fecha es obligatoria",
    })
    .refine((dateString) => !isNaN(Date.parse(dateString)), {
      message: "Formato de fecha inválido",
    })
    .transform((dateString) => new Date(dateString)),

  clientName: zod
    .string({
      required_error: "El nombre del cliente es obligatorio",
    })
    .min(1, { message: "El nombre del cliente es obligatorio" })
    .max(255, {
      message: "El nombre del cliente no puede exceder los 255 caracteres",
    }),

  numberDocumentClient: zod
    .string({
      required_error: "El número de documento del cliente es obligatorio",
    })
    .min(1, { message: "El número de documento del cliente es obligatorio" })
    .max(12, {
      message:
        "El número de documento del cliente no puede exceder los 12 caracteres",
    }),

  ticketNumber: zod
    .string({ required_error: "El número de ticket es obligatorio" })
    .min(1, { message: "El número de ticket es obligatorio" })
    .max(10, {
      message: "El número de ticket no puede exceder los 10 caracteres",
    }),
    

  image: zod
    .string()
    .max(255, {
      message: "La URL de la imagen no puede exceder los 255 caracteres",
    })
    .optional(),

  path: zod
    .string()
    .max(255, { message: "La ruta no puede exceder los 255 caracteres" })
    .optional(),
});

module.exports = { dataFormSchema };
