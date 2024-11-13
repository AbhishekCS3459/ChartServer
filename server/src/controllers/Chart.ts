import express, { Request, Response } from "express";
import mongoose from "mongoose";
import EnergyData from "../models/EnergyData"; // Assuming your model file is in the `models` folder
import fs from "fs";
import path from "path";

class Chart {
  /**
   * Inserts data from data.json into MongoDB
   */
  static async insertData(req: Request, res: Response) {
    try {
      // Load and parse the data.json file
      const dataFilePath = path.join(__dirname, "./data.json"); // Adjust the path as necessary
      const rawData = fs.readFileSync(dataFilePath, "utf-8");
      const jsonData = JSON.parse(rawData);

      // Map and sanitize the data for MongoDB insertion
      const documents = jsonData.map((item: any) => ({
        createdAt: new Date(item.createdAt["$date"]),
        serialNo: item.serialNo,
        clientID: new mongoose.Types.ObjectId(item.clientID["$oid"]),
        deviceMapID: new mongoose.Types.ObjectId(item.deviceMapID["$oid"]),
        devices: item.devices.map(
          (device: any) => new mongoose.Types.ObjectId(device["$oid"])
        ),
        total_kwh: item.total_kwh,
        updatedAt: new Date(item.updatedAt["$date"]),
        ac_run_hrs: item.ac_run_hrs,
        ac_fan_hrs: item.ac_fan_hrs,
        algo_status: item.algo_status,
        billing_ammount: item.billing_ammount,
        cost_reduction: item.cost_reduction,
        energy_savings: {
          savings_percent: item.energy_savings.savings_percent,
          ref_kwh: item.energy_savings.ref_kwh,
          us_meter: item.energy_savings.us_meter,
          us_calc: item.energy_savings.us_calc,
          inv_factor: item.energy_savings.inv_factor,
        },
        mitigated_co2: item.mitigated_co2,
        weather: {
          max_temp: item.weather.max_temp,
          min_temp: item.weather.min_temp,
        },
      }));

      // Insert documents into MongoDB
      await EnergyData.insertMany(documents);

      res.status(201).json({
        message: "Data inserted successfully",
        totalInserted: documents.length,
      });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Failed to insert data" });
    }
  }

  static async getData(req: Request, res: Response, next: any) {
    try {
      // Fetch all data from MongoDB
      const data = await EnergyData.find();

      res.status(200).json(data);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Failed to retrieve data" });
    }
  }
}

export default Chart;
