const Medicine = require("../models/medicineModel");

async function createMedicine(req, res) {
  try {
    const {
      name,
      genericName,
      category,
      price,
      quantity,
      minStockLevel,
      expiryDate,
      manufacturer,
      batchNumber,
      description,
    } = req.body;

    if (!name || price === undefined || quantity === undefined || !expiryDate) {
      return res.status(400).json({
        message: "Medicine name, price, quantity, and expiry date are required",
      });
    }

    const medicine = new Medicine({
      name: name.trim(),
      genericName: genericName ? genericName.trim() : "",
      category: category || "Tablet",
      price: Number(price),
      quantity: Number(quantity),
      minStockLevel: minStockLevel !== undefined ? Number(minStockLevel) : 10,
      expiryDate: new Date(expiryDate),
      manufacturer: manufacturer ? manufacturer.trim() : "",
      batchNumber: batchNumber ? batchNumber.trim() : "",
      description: description || "",
    });

    const saved = await medicine.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create medicine", error: error.message });
  }
}

async function getAllMedicines(req, res) {
  try {
    const filter = {};

    if (req.query.search) {
      filter.$or = [
        { name: new RegExp(req.query.search, "i") },
        { genericName: new RegExp(req.query.search, "i") },
      ];
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.lowStock === "true") {
      filter.$expr = { $lte: ["$quantity", "$minStockLevel"] };
    }

    const medicines = await Medicine.find(filter).sort({ name: 1 });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines", error: error.message });
  }
}

async function getLowStockMedicines(req, res) {
  try {
    const lowStockMedicines = await Medicine.find({
      $expr: { $lte: ["$quantity", "$minStockLevel"] },
    }).sort({ quantity: 1 });

    res.status(200).json({
      count: lowStockMedicines.length,
      data: lowStockMedicines,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch low stock medicines", error: error.message });
  }
}

async function getMedicineById(req, res) {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicine", error: error.message });
  }
}

async function updateMedicine(req, res) {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update medicine", error: error.message });
  }
}

async function deleteMedicine(req, res) {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicine", error: error.message });
  }
}

async function adjustStock(req, res) {
  try {
    const { changeQuantity } = req.body;
    if (changeQuantity === undefined || isNaN(changeQuantity)) {
      return res.status(400).json({ message: "changeQuantity number is required (positive or negative)" });
    }

    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    const newQuantity = medicine.quantity + Number(changeQuantity);
    if (newQuantity < 0) {
      return res.status(400).json({
        message: `Insufficient stock. Current stock is ${medicine.quantity}, cannot reduce by ${Math.abs(changeQuantity)}`,
      });
    }

    medicine.quantity = newQuantity;
    const saved = await medicine.save();

    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to adjust stock", error: error.message });
  }
}

module.exports = {
  createMedicine,
  getAllMedicines,
  getLowStockMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  adjustStock,
};
