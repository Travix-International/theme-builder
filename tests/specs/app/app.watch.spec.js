import themeBuilder from '../../../src/app.js';
import jest from 'jest';
import path from 'path';
import fs from 'fs';

describe('App: watch', () => {
  const defaultYaml = path.join(__dirname, '../mocks/default.yaml');
  const customYaml = path.join(__dirname, '../mocks/custom.yaml');

  it('should watch file and rebuild after change', () => {
    const watcher = () => {};

    fs.watchFile = function (fileName, callback) {
      expect(fileName).toBe(defaultYaml);
      callback();
    };

    const builder = themeBuilder({ format: 'scss' });
    builder.watch(defaultYaml, watcher);
  });

  it('should watch files and rebuild after change', () => {
    const watcher = () => {};
    const files = [defaultYaml, customYaml];
    let i=0;
    fs.watchFile = function (fileName, callback) {
      expect(fileName).toBe(files[i]);
      callback();
      i++;
    };
    const builder = themeBuilder({ format: 'scss' });
    builder.build = () => Promise.resolve();
    builder.watch(files, watcher);
  });

  it('should throw an error if callback is missing', () => {
    const builder = themeBuilder({ format: 'scss' });

    expect(() => {
      builder.watch('/some/file.yaml');
    }).toThrow(new Error('callback is required!'));
  });
});
