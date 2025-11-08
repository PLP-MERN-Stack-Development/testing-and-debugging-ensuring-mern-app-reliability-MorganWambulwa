import Bug from "../models/Bug.js";
import { validateBug } from "../utils/validateBug.js";

export const getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.json({ success: true, data: bugs });
  } catch (err) {
    next(err);
  }
};

export const createBug = async (req, res, next) => {
  try {
    validateBug(req.body);
    const bug = await Bug.create(req.body);
    res.status(201).json({ success: true, data: bug });
  } catch (err) {
    next(err);
  }
};

export const updateBug = async (req, res, next) => {
  try {
    const updated = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Bug not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteBug = async (req, res, next) => {
  try {
    const deleted = await Bug.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Bug not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
