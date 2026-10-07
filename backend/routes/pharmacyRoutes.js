const express = require("express");
const router = express.Router();

const {
  createMedicine,
  getAllMedicines,
  getLowStockMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  adjustStock,
} = require("../controllers/pharmacyController");

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");

router.get("/medicines/low-stock", authenticate, authorizeRoles("admin", "pharmacist"), getLowStockMedicines);
router.get("/medicines", getAllMedicines);
router.get("/medicines/:id", getMedicineById);

router.post("/medicines", authenticate, authorizeRoles("admin", "pharmacist"), createMedicine);
router.put("/medicines/:id", authenticate, authorizeRoles("admin", "pharmacist"), updateMedicine);
router.delete("/medicines/:id", authenticate, authorizeRoles("admin", "pharmacist"), deleteMedicine);
router.put("/medicines/:id/adjust-stock", authenticate, authorizeRoles("admin", "pharmacist"), adjustStock);

module.exports = router;
