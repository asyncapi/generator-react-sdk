import { transpileFiles } from "../";
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { renderTemplate } from "../../renderer/index";
import { AsyncAPIDocument } from "@asyncapi/parser";
const readFile = promisify(fs.readFile);


describe('Transpiler', () => {
  const testFiles = path.resolve(__dirname, './testfiles');
  const outputFiles = path.resolve(__dirname, './__transpiled_testfiles');
  beforeAll(async (done) => {
    try {
      await transpileFiles(testFiles, outputFiles, {
        recursive: true
      });
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });
  describe('should transpile CommonJS files', () => {
    describe('with a simple setup', () => {
      const testFile = path.resolve(outputFiles, './CommonJS/simple.js');
      test('and import correctly', async () => {
        const content = await readFile(testFile)
        expect(content.toString()).toMatchSnapshot();
        expect(await import(testFile)).toBeDefined();
      });
      test('and render correctly', async () => {
        const content = await renderTemplate(testFile, { asyncapi: {} as AsyncAPIDocument, originalAsyncAPI: "", params: {} });
        expect(content.content).toBe("hello Test"); 
      });
    });
  });
  describe('should transpile ES5 files', () => {
    describe('with a simple setup', () => {
      const testFile = path.resolve(outputFiles, './ES5/simple.js');
      test('and import correctly', async () => {
        const content = await readFile(testFile)
        expect(content.toString()).toMatchSnapshot();
        expect(await import(testFile)).toBeDefined();
      });
      test('and render correctly', async () => {
        const content = await renderTemplate(testFile, { asyncapi: {} as AsyncAPIDocument, originalAsyncAPI: "", params: {} });
        expect(content.content).toBe("hello Test"); 
      });
    });
  });
  describe('should transpile ES6 files', () => {
    describe('with a simple setup', () => {
      const testFile = path.resolve(outputFiles, './ES6/simple.js');
      test('and import correctly', async () => {
        const content = await readFile(testFile)
        expect(content.toString()).toMatchSnapshot();
        expect(await import(testFile)).toBeDefined();
      });
      test('and render correctly', async () => {
        const content = await renderTemplate(testFile, { asyncapi: {} as AsyncAPIDocument, originalAsyncAPI: "", params: {} });
        expect(content.content).toBe("hello Test"); 
      });
    });
  });
});
