import { stringInRange } from "validators/allahNames.validators";
import { Router } from "express";
import api from "utils/api";

const router = Router();

router.get("/", async (req, res) => {
    const numbers = Array.from({ length: 99 }, (_, i) => i + 1).join(",");
    const response = await api.get(`asmaAlHusna/${numbers}`);
    return res.json({ data: response.data.data });
});
router.get("/:numbers", async (req, res) => {
    const { numbers } = req.params;
    const is_valid = stringInRange(numbers);
    if (!is_valid)
        return res
            .status(400)
            .json({ message: "Invalid format of number or nor in range 1-99" });
    const response = await api.get(`asmaAlHusna/${numbers}`);
    return res.json({ data: response.data.data });
});

export default router;
