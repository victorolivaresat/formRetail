const Store = require('../models/Store');

const getAllStores = async (req, res) => {
  try {
    const { search } = req.query;

    let whereCondition = {};
    
    if (search) {
      whereCondition = {
        storeName: {
          [Op.iLike]: `%${search}%`
        }
      };
    }

    const stores = await Store.findAll({ where: whereCondition });

    if (stores.length === 0) {
      return res.status(404).json({ message: "No stores found" });
    }

    const formattedStores = stores.map(store => ({
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

module.exports = { getAllStores };
