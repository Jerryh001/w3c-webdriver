import { browserName } from '../test-env/browser';
import { session } from '../test-env/session';

describe('Command Contexts', () => {
  describe('getWindowHandle', () => {
    it('return the current window handle', async () => {
      const handle = await session.getWindowHandle();
      expect(handle).toMatch(/[a-zA-z0-9-]{10,}/)
    });
  });

  describe('getWindowRect/maximizeWindow method', () => {
    it('validates window rect before and after maximizing the window', async () => {
      if (['firefox', 'chrome'].includes(browserName)) {
        await session.minimizeWindow();
      }
      const rectBeforeMax = await session.getWindowRect();

      await session.maximizeWindow();

      const rectAfterMax = await session.getWindowRect();
      expect(rectBeforeMax).not.toEqual(rectAfterMax);
    });
  });

  describe('setWindowRect method', () => {
    it('set current window to specified rect', async () => {
      const testRect = { x: 9, y: 9, width: 1005, height: 705, }

      if (['chrome', 'firefox', 'internet explorer', 'safari'].includes(browserName)) {
        return;
      }

      await session.setWindowRect(testRect);

      const rectAfterMax = await session.getWindowRect();
      expect(rectAfterMax).toEqual(testRect);
    });
  });

  describe('minimizeWindow method', () => {
    it('minimizes the current window', async () => {
      if (['safari'].includes(browserName)) {
        return;
      }
      await session.maximizeWindow();
      const rectBeforeMin = await session.getWindowRect();

      await session.minimizeWindow();

      const rectAfterMin = await session.getWindowRect();
      expect(rectBeforeMin).not.toEqual(rectAfterMin);
    });
  });

  describe('FullScreenWindow method', () => {
    it('increases the current window to full screen', async () => {

      if (['internet explorer', 'safari'].includes(browserName)) {
        return;
      }
      const rectBeforeFull = await session.getWindowRect();

      await session.fullScreenWindow();

      const rectAfterFull = await session.getWindowRect();
      expect(rectBeforeFull).not.toEqual(rectAfterFull);
    });
  });

});
