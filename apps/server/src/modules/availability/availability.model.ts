import mongoose, { Document, Schema } from "mongoose";
import { IAvailability } from "./availability.types";
import { COLLECTION_NAMES } from "common/constants";

export interface IAvailabilityDoc extends IAvailability, Document {
    createdAt?: Date;
    updatedAt?: Date;
}

const AvailabilitySchema = new Schema<IAvailabilityDoc>({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAMES.DOCTOR,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAMES.APPOINTMENT,
        default: null
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Availability = mongoose.model<IAvailabilityDoc>(COLLECTION_NAMES.AVAILABILITY, AvailabilitySchema);
export default Availability;