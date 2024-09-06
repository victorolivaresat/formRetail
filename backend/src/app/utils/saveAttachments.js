const fs = require('fs').promises;
const path = require('path');

const attachmentsDir = path.join(__dirname, '../../../src/assets/attachments');

async function saveAttachmentLocally(content, filename) {
  
  const filePath = path.join(attachmentsDir, filename);

  // Ensure the directory exists
  try {
      await fs.mkdir(attachmentsDir, { recursive: true });
  } catch (err) {
      console.error("Error creating the attachments directory", err);
      throw err;
  }

  // Save the file
  try {
      await fs.writeFile(filePath, content);
      console.log(`File saved: ${filePath}`);
      return filePath;
  } catch (err) {
      console.error("Error saving the attachment", err);
      throw err;
  }
}

module.exports = {
  saveAttachmentLocally
};
