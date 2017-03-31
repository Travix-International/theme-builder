import yamlUtils from '../../../src/yamlUtils';

describe('yamlUtils: buildYamlJson', () => {
  it('should return same object if it has no mappings', () => {
    const actualResult = yamlUtils.buildYamlJson({});

    expect(actualResult).toEqual([{}]);
  });
});
