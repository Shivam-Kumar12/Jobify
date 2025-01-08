import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String,
        required: true
        
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
},
{ timestamps: true }
);

const Company = mongoose.model('Company', companySchema);

export default Company;
