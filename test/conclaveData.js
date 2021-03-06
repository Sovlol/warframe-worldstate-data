const chai = require('chai');
chai.use(require('chai-json'));
chai.use(require('chai-json-schema'));

chai.should();
chai.tv4.banUnknown = true;

const conclaveDataSchema = {
  definitions: {
    mode: {
      type: 'object',
      properties: {
        value: { type: 'string' },
      },
    },
    category: {
      type: 'object',
      properties: {
        value: { type: 'string' },
      },
    },
  },
  type: 'object',
  properties: {
    modes: {
      type: 'object',
      patternProperties: {
        '^PVPMODE_': { $ref: '#/definitions/mode' },
      },
    },
    categories: {
      type: 'object',
      patternProperties: {
        '^PVPChallengeTypeCategory_': { $ref: '#/definitions/category' },
      },
    },
  },
  required: ['modes', 'categories'],
};

describe('conclaveData.json', () => {
  it('should be a valid JSON file', () => {
    './data/conclaveData.json'.should.be.a.jsonFile();
  });

  it('should adhere to the schema', () => {
    require('../data/conclaveData.json').should.be.jsonSchema(conclaveDataSchema);
  });
});
