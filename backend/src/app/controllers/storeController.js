const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");
const Store = require("../models/Store");

const getAllStores = async (req, res) => {
  try {
    const { search } = req.query;

    let whereCondition = {};

    if (search) {
      whereCondition = {
        storeName: {
          [Op.iLike]: `%${search}%`,
        },
      };
    }

    const stores = await Store.findAll({ where: whereCondition });

    if (stores.length === 0) {
      return res.status(404).json({ message: "No stores found" });
    }

    const formattedStores = stores.map((store) => ({
      storeId: store.storeId,
      storeName: store.storeName,
    }));

    res.status(200).json({
      success: true,
      data: formattedStores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching stores" });
  }
};

const getStoreDetails = async (req, res) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    console.log(storeId);
    const stores = await sequelize.query(
      "EXEC [dbo].[sp_StoresGet] @storeId = :storeId",
      {
        replacements: { storeId: storeId },
        type: QueryTypes.RAW,
      }
    );
    console.log(stores);

    if (stores[0].length === 0) {
      return res.status(404).json({ message: "No stores found" });
    }

    res.status(200).json({
      success: true,
      data: stores[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching stores" });
  }
};

module.exports = { getAllStores, getStoreDetails };
