const Promotion = require('../models/Promotion');

const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();

    if (!promotions) {
      return res.status(404).json({ message: "No promotions found" });
    }

    res.status(200).json({
      success: true,
      data: promotions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching promotions" });
  }
};

module.exports = { getAllPromotions };
