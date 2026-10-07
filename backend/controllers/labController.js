const LabTest = require("../models/labTestModel");
const LabOrder = require("../models/labOrderModel");
const { generateLabOrderNumber } = require("../utils/sequenceGenerator");

// --- Catalog Lab Tests ---
async function createLabTest(req, res) {
  try {
    const { name, category, price, description, sampleType, normalRange, turnaroundTime } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Test name and price are required" });
    }

    const existing = await LabTest.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Lab test with this name already exists" });
    }

    const test = new LabTest({
      name: name.trim(),
      category: category || "General",
      price: Number(price),
      description: description || "",
      sampleType: sampleType || "Blood",
      normalRange: normalRange || "",
      turnaroundTime: turnaroundTime || "24 hours",
    });

    const saved = await test.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create lab test", error: error.message });
  }
}

async function getAllLabTests(req, res) {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.search) {
      filter.name = new RegExp(req.query.search, "i");
    }

    const tests = await LabTest.find(filter).sort({ name: 1 });
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab tests", error: error.message });
  }
}

async function getLabTestById(req, res) {
  try {
    const test = await LabTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Lab test not found" });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab test", error: error.message });
  }
}

async function updateLabTest(req, res) {
  try {
    const updated = await LabTest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update lab test", error: error.message });
  }
}

async function deleteLabTest(req, res) {
  try {
    const deleted = await LabTest.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Lab test not found" });
    }
    res.status(200).json({ message: "Lab test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete lab test", error: error.message });
  }
}

// --- Lab Orders & Results ---
async function createLabOrder(req, res) {
  try {
    const { patient, doctor, labTestId, notes, sampleCollected } = req.body;

    if (!patient || !labTestId) {
      return res.status(400).json({ message: "Patient and labTestId are required" });
    }

    const labTest = await LabTest.findById(labTestId);
    if (!labTest) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    const orderNumber = await generateLabOrderNumber();

    const order = new LabOrder({
      orderNumber,
      patient,
      doctor: doctor || undefined,
      labTest: labTest._id,
      testName: labTest.name,
      normalRange: labTest.normalRange,
      status: "Pending",
      notes: notes || "",
      sampleCollectedAt: sampleCollected ? new Date() : undefined,
    });

    const saved = await order.save();
    const populated = await LabOrder.findById(saved._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("labTest");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to assign lab test", error: error.message });
  }
}

async function getAllLabOrders(req, res) {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.patient) {
      filter.patient = req.query.patient;
    }

    const orders = await LabOrder.find(filter)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("labTest")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab orders", error: error.message });
  }
}

async function getMyLabOrders(req, res) {
  try {
    const orders = await LabOrder.find({ patient: req.user._id })
      .populate("doctor", "name specialization")
      .populate("labTest")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your lab orders", error: error.message });
  }
}

async function getLabOrdersByPatient(req, res) {
  try {
    const orders = await LabOrder.find({ patient: req.params.patientId })
      .populate("doctor", "name specialization")
      .populate("labTest")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient lab orders", error: error.message });
  }
}

async function getLabOrderById(req, res) {
  try {
    const order = await LabOrder.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("labTest");

    if (!order) {
      return res.status(404).json({ message: "Lab order not found" });
    }

    // Role check: patients can only access their own results
    if (
      req.user.role === "patient" &&
      order.patient._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to access this lab result" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab order", error: error.message });
  }
}

async function updateLabOrderResult(req, res) {
  try {
    const { results, normalRange, remarks, status } = req.body;

    const order = await LabOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Lab order not found" });
    }

    if (results !== undefined) order.results = results;
    if (normalRange !== undefined) order.normalRange = normalRange;
    if (remarks !== undefined) order.remarks = remarks;

    // Default to Completed when results are entered unless specified otherwise
    order.status = status || "Completed";
    if (order.status === "Completed") {
      order.completedAt = new Date();
      order.performedBy = req.user._id;
    }

    const updated = await order.save();
    const populated = await LabOrder.findById(updated._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("labTest");

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update lab order results", error: error.message });
  }
}

module.exports = {
  createLabTest,
  getAllLabTests,
  getLabTestById,
  updateLabTest,
  deleteLabTest,
  createLabOrder,
  getAllLabOrders,
  getMyLabOrders,
  getLabOrdersByPatient,
  getLabOrderById,
  updateLabOrderResult,
};
