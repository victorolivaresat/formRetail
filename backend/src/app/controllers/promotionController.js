const { Op } = require("sequelize");
const Promotion = require("../models/Promotion");

const getAllPromotions = async (req, res) => {
  try {
    const currentDate = new Date();

    const promotions = await Promotion.findAll({
      where: {
        startDate: {
          [Op.lte]: currentDate,
        },
        endDate: {
          [Op.gte]: currentDate,
        },
      },
    });

    if (!promotions || promotions.length === 0) {
      return res
        .status(404)
        .json({ message: "No promotions found within the date range" });
    }

    res.status(200).json({
      success: true,
      data: promotions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching promotions" });
  }
};

module.exports = { getAllPromotions };
