const mongoose = require("mongoose");
const { applyTimestamps } = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String, // Fixed 'string' to 'String'
        required: true,
        enum: {
            values: ["ignored","interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect `
        },
    },
}, {
    timestamps: true,
});

connectionRequestSchema.pre("save",function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to your self");
        
    }
    next();
});
const ConnectionRequestModel = mongoose.model(
    "ConnectionRequest", // Fixed incorrect syntax in model definition
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;
