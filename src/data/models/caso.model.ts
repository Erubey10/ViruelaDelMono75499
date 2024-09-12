//Requisitos del Proyecto La API debe manejar los siguientes campos para cada caso de Viruela del Mono

import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    isSent:{
        type: Boolean,
        required: true,
        default: false
    },
    genre:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
        default: 0
    },
    creationDate: {
        type: Date,
        required: false,
        
    }
});

export const CaseModel = mongoose.model('case', caseSchema);