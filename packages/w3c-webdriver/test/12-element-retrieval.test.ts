// tslint:disable-next-line: match-default-export-name
import expect from 'expect';
import { testEnvironment } from '../test-env/testEnv';

describe('Element Retrieval', () => {
  describe('findElement method', () => {
    it('finds element by CSS selector', async () => {
      const { session } = testEnvironment;
      const element = await session.findElement('css selector', 'h2');

      expect(element).toBeDefined();
    });
  });

  describe('findElements method', () => {
    it('finds all elements by CSS selector', async () => {
      const { session } = testEnvironment;
      const elements = await session.findElements('css selector', 'button');

      expect(elements).toHaveLength(6);
    });
  });

  describe('getActiveElement method', () => {
    it('returns the currently focused element', async () => {
      const { session } = testEnvironment;
      const element = await session.getActiveElement();

      expect(await element.getAttribute('autofocus')).toEqual('true');
    });
  });
});
