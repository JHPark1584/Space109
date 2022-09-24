const createError = require("http-errors");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
// 이미지가 저장될 기본 경로
const BASE_THUMBNAIL_PATH = "/tmp/space109";

const itemsRouter = require("./src/items/items.controller");
const salesRouter = require("./src/sales/sales.controller");
const walletRouter = require("./src/wallet/wallet.controller");
const nftRouter = require("./src/nft/nft.controller");
const galleryRouter = require("./src/gallery/gallery.controller");

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/thumbnail", express.static(BASE_THUMBNAIL_PATH));

app.use("/items", itemsRouter);
app.use("/sales", salesRouter);
app.use("/wallet", walletRouter);
app.use("/nft", nftRouter);
app.use("/gallery", galleryRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404);
  res.send(createError(404));
});

// error handler
app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
