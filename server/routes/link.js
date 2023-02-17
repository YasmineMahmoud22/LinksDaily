const express = require("express");

const router = express.Router();

// controllers
const { postLink, links } = require("../controllers/link");
const { requireSignin } = require("../controllers/auth");

router.post("/post-link", requireSignin, postLink);
router.get("/links", links);
// router.put("/update", requireSignin, update);
// router.delete("/remove", requireSignin, remove);

module.exports = router;
