import mongoose, { Schema, Document } from "mongoose";

// Interface for the Log schema
export interface ILog extends Document {
  user: string; 
  action: string; 
  accessTime: Date;
  method?: string; 
  endpoint?: string; 
  algoStatus?: string; 
}

// Log Schema definition
const LogSchema: Schema = new Schema({
  user: { type: String, required: true }, 
  action: { type: String, required: true }, 
  accessTime: { type: Date, default: Date.now }, 
  method: { type: String }, 
  endpoint: { type: String }, 
  algoStatus: { type: String }, 
});

// Exporting the Log model
export default mongoose.model<ILog>("Log", LogSchema);
