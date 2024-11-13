import mongoose, { Schema, Document } from 'mongoose';

interface EnergyData extends Document {
  createdAt: Date;
  serialNo: string;
  clientID: mongoose.Types.ObjectId;
  deviceMapID: mongoose.Types.ObjectId;
  devices: mongoose.Types.ObjectId[];
  total_kwh: number;
  updatedAt: Date;
  ac_run_hrs: number;
  ac_fan_hrs: number;
  algo_status: number;
  billing_ammount: number;
  cost_reduction: number;
  energy_savings: {
    savings_percent: number;
    ref_kwh: number;
    us_meter: number;
    us_calc: number;
    inv_factor: number;
  };
  mitigated_co2: number;
  weather: {
    max_temp: number;
    min_temp: number;
  };
}

const EnergyDataSchema: Schema = new Schema({
  createdAt: { type: Date, required: true },
  serialNo: { type: String, required: true },
  clientID: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  deviceMapID: { type: Schema.Types.ObjectId, ref: 'DeviceMap', required: true },
  devices: [{ type: Schema.Types.ObjectId, ref: 'Device', required: true }],
  total_kwh: { type: Number, required: true },
  updatedAt: { type: Date, required: true },
  ac_run_hrs: { type: Number, required: true },
  ac_fan_hrs: { type: Number, required: true },
  algo_status: { type: Number, required: true },
  billing_ammount: { type: Number, required: true },
  cost_reduction: { type: Number, required: true },
  energy_savings: {
    savings_percent: { type: Number, required: true },
    ref_kwh: { type: Number, required: true },
    us_meter: { type: Number, required: true },
    us_calc: { type: Number, required: true },
    inv_factor: { type: Number, required: true },
  },
  mitigated_co2: { type: Number, required: true },
  weather: {
    max_temp: { type: Number, required: true },
    min_temp: { type: Number, required: true },
  },
});

export default mongoose.model<EnergyData>('EnergyData', EnergyDataSchema);
