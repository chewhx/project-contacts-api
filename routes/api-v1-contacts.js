const router = require("express").Router();
const {
  get_AllContacts,
  get_ContactById,
  post_Contact,
  put_ContactById,
  delete_ContactById,
} = require("../controllers/api-v1-contacts");

router.get("/", get_AllContacts);
router.get("/:id", get_ContactById);
router.post("/", post_Contact);
router.put("/:id", put_ContactById);
router.delete("/:id", delete_ContactById);

module.exports = router;
