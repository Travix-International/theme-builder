import path from 'path';
import themeBuilder from '../../../src/app';

describe('App: build', () => {
  const defaultYaml = path.join(__dirname, '../mocks/default.yaml');
  const customYaml = path.join(__dirname, '../mocks/custom.yaml');
  const failYaml = path.join(__dirname, '../mocks/fail.yaml');

  it('should build yaml file to scss with default prefix', (done) => {
    const builder = themeBuilder({ format: 'scss' });

    builder.build(defaultYaml)
      .then((themeScss) => {
        expect(themeScss).toMatchSnapshot();
        done();
      });
  });

  it('should build yaml file to scss with "tx" prefix', (done) => {
    const builder = themeBuilder({ format: 'scss', prefix: 'tx' });

    builder.build(defaultYaml)
      .then((themeScss) => {
        expect(themeScss).toMatchSnapshot();
        done();
      });
  });

  it('should merge yaml files and build correct scss', (done) => {
    const builder = themeBuilder({ format: 'scss', prefix: 'tx' });

    builder.build([
      defaultYaml,
      customYaml
    ])
      .then((themeScss) => {
        expect(themeScss).toMatchSnapshot();
        done();
      });
  });

  it('should throw error them yaml file is not valid', (done) => {
    const builder = themeBuilder({ format: 'scss', prefix: 'tx' });

    builder.build(failYaml)
      .catch((err) => {
        expect(err.message).toEqual('There are some errors in AST, please contact developer');
        done();
      });
  });
});
