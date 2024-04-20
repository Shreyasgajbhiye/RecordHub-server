import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"],
    }
})

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;


