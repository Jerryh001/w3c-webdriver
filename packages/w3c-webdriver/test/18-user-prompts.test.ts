import { session } from '../test-env/session';

describe('User Prompts', () => {
  describe('dismiss alert method', () => {
    it('dismiss an alert in the current page', async () => {

      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      await session.dismissAlert();

      const result = await session.findElement('css selector', '#confirmResult');
      const resultText = await result.getText();
      expect(resultText).toEqual('No');
    });
  });

  describe('accept alert method', () => {
    it('accept an alert in the current page', async () => {

      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      await session.acceptAlert();

      const result = await session.findElement('css selector', '#confirmResult');
      const resultText = await result.getText();
      expect(resultText).toEqual('Yes');
    });
  });

  describe('get alert text', () => {
    it('get text from an alert in the current page', async () => {

      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      const alertText = await session.getAlertText();
      expect(alertText).toEqual('This is an alert for test');

      await session.acceptAlert();
    });
  });
});