import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {timestamps: true});
  
export default mongoose.model('Project', ProjectSchema);
  