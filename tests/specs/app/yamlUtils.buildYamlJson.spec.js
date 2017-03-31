import yamlUtils from '../../../src/yamlUtils';
import path from 'path';

describe('yamlUtils: buildYamlJson', () => {
  const defaultYaml = path.join(__dirname, '../mocks/default.yaml');

  it('should return same object if it has no mappings', () => {
    const actualResult = yamlUtils.buildYamlJson({});

    expect(actualResult).toEqual([{}]);
  });

});
