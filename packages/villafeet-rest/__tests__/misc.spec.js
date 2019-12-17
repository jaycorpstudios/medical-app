import request from 'supertest'
import httpStatus from 'http-status'
//TODO: Update babel config with polyfill
import '@babel/polyfill'
import mockgoose from '../src/config/mockgoose'
import app from '../src'

describe('## Misc', () => {
  beforeAll(async done => {
    await mockgoose.connect()
    done()
  })

  afterAll(() => {
    mockgoose.close()
  })

  it('# GET /api/health-check', async done => {
    return request(app).get('/health-check').expect(httpStatus.OK).then(res => {
      expect(res.text).toBe('OK')
      done()
    })
  })

  describe('# GET /404', () => {
    it('should return 404 status', done => {
      request(app)
        .get('/404')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).toBe('Not Found')
          done()
        })
        .catch(done)
    })
  })
})
