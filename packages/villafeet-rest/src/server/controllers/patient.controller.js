import httpStatus from 'http-status'

import Patient from '../models/patient.model'
import APIError from './../helpers/APIError'
import { updateFieldsInModel } from './../helpers/schemaUtils'

/**
 * Load patient and append to req.
 * @returns {Patient}
 */
async function load(req, res, next) {
  const { patientId } = req.params
  const patient = await Patient.get(patientId)
  req.patient = patient
  return next()
}

/**
 * Get patient
 * @returns {Patient}
 */

async function get(req, res) {
  res.json(req.patient)
}

/**
 * Update existing patient
 * @property {string} req.body - The user fields.
 * @returns {User}
 */
async function update(req, res, next) {
  let { patient } = req
  patient = updateFieldsInModel({ model: patient, updatedData: req.body, skipFields: ['groupId', 'createdAt'] })
  patient.updatedAt = new Date()
  const savedPatient = await patient.save()
  res.json(savedPatient)
}

async function add(req, res, next) {
  const patient = await new Patient(req.body).save()
  res.json(patient)
}

/**
 * Get patients list.
 * @property {number} req.query.page - Page number.
 * @property {number} req.query.limit - Limit number of patiens to be returned.
 * @returns {Patient[]}
 */
async function list(req, res) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 50
  const skip = limit * (page - 1)
  if (page <= 0) throw new APIError('Page number must be gratter than 0', httpStatus.NOT_FOUND)
  const total = await Patient.count()
  const patients = await Patient.list({ limit, skip })
  const response = {
    meta: {
      total,
      pages: Math.ceil(total / limit),
    },
    patients,
  }
  res.json(response)
}

/**
 * Delete patient.
 * @returns {Patient}
 */
async function remove(req, res, next) {
  const { patient } = req
  const deleted = await patient.remove()
  res.json(deleted)
}

export default { load, add, get, update, list, remove }
