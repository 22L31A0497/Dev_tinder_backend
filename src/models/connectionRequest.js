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

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error("Cannot send connection request to yourself"));
    }
    next(); // Call next() to continue execution
});
const ConnectionRequestModel = mongoose.model(
    "ConnectionRequest", // Fixed incorrect syntax in model definition
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;
