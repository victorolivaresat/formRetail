// controllers/documentTypeController.js
const DocumentType = require("../models/DocumentType");

const getAllDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await DocumentType.findAll();
    res.status(200).json({
      success: true,
      data: documentTypes,
    });
  } catch (error) {
    console.error("Error fetching document types:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching document types",
    });
  }
};

module.exports = {
  getAllDocumentTypes,
};
