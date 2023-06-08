import express from "express";
import InvoicesController from "../api/controller/invoices.controller"
export const router =express.Router()
router.get("/invoices",InvoicesController.findAll);