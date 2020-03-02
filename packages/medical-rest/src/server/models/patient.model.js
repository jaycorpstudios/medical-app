import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'

/**
 * Patient Schema
 */
const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  firstSurname: {
    type: String,
  },
  secondSurname: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  avatar: {
    type: String,
  },
  lastVisit: {
    type: Date,
    default: Date.now,
  },
  groupId: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  contact: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  address: {
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zip: {
      type: String,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: [
        {
          type: Number,
        },
      ],
    },
  },
  others: {
    profession: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
  },
})

/**
 * Methods
 */
PatientSchema.method({})

/**
 * Statics
 */
PatientSchema.statics = {
  /**
   * Get Patient
   * @param {ObjectId} id - The objectId of patient.
   * @returns {Promise<Patient, APIError>}
   */
  get(id) {
    return this.findById(id).exec().then(patient => {
      if (patient) {
        return patient
      }
      const err = new APIError('No such patient exists!', httpStatus.NOT_FOUND)
      return Promise.reject(err)
    })
  },

  /**
   * List patients in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of patients to be skipped.
   * @param {number} limit - Limit number of patients to be returned.
   * @returns {Promise<Patient[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec()
  },
}

/**
 * @typedef Patient
 */
export default mongoose.model('Patient', PatientSchema)
