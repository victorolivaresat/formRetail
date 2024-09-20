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

const getAllUsers1 = async (req, res) => {
  try {
    //const { storeId } = req.params;
    const storeId = parseInt(req.params.storeId, 10);
    console.log(storeId)

    // Llama al stored procedure con el parámetro storeId
    const stores = await sequelize.query('EXEC [dbo].[sp_StoresGet] @storeId = :storeId', {
      replacements: { storeId: storeId }, // Usa 1 como valor predeterminado si no se pasa
      type: QueryTypes.RAW // O QueryTypes.SELECT dependiendo de tu SP
    });
    console.log(stores)

    if (stores[0].length === 0) {
      return res.status(404).json({ message: "No stores found" });
    }

    // Formatea los resultados según sea necesario
    const formattedStores = stores[0].map(store => ({
      storeId: store.storeId,
      tiendaNombre: store.tiendaNombre,
      storeType: store.storeType,
      district: store.district,
      province: store.province,
      department: store.department,
      supervisorId: store.supervisorId,
      supervisorNombre: store.supervisorNombre,
      empresaId: store.empresaId,
      empresaNombre: store.empresaNombre,
      zonaId: store.zonaId,
      zonaNombre: store.zonaNombre,
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


module.exports = { getAllStores, getAllUsers,getAllUsers1};