const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      console.log(accounts);
      res.status(200).json({ data: accounts });
    })
    .catch(handleError);
});

function handleError(error, res) {
  console.log("error", error);
  res.status(500).json({ message: error.message });
}

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then((account) => {
      res.status(200).json({ data: account });
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then((ids) => {
      db("accounts")
        .where({ id: ids[0] })
        .first()
        .then((account) => {
          res.status(200).json({ data: account });
        });
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.put("/:id", (req, res) => {
  //   const { id } = req.params;
  //   const changes = req.body;

  db("accounts")
    .where(req.params)
    .update(req.body)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.delete("/:id", (req, res) => {
  //   const { id } = req.params;
  db("accounts")
    .where(req.params)
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch((error) => {
      handleError(error, res);
    });
});

function handleError(error, res) {
  console.log("error", error);
  res.status(500).json({ message: error.message });
}

module.exports = router;
