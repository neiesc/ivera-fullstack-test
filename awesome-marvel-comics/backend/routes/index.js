const express = require("express");

const db = require("../db");
const historyRequestsService = require("../services/history-requests");
const charactersService = require("../services/characters");
const authenticationService = require("../services/authentication");
const authorizationService = require("../services/authorization");

const router = express.Router();

router.get(
  "/v1/characters",
  historyRequestsService.logRequests,
  charactersService.getAllCharacters
);
router.get(
  "/v1/characters/:characterId",
  historyRequestsService.logRequests,
  charactersService.getCharacter
);

router.get(
  "/admin/history",
  authorizationService,
  historyRequestsService.getAll
);

router.post("/admin/login", authenticationService);

module.exports = router;
