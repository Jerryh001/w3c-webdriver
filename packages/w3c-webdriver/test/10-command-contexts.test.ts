// tslint:disable-next-line: match-default-export-name
import expect from 'expect';
import { Browser, testEnvironment, WebDriverHost } from '../test-env/testEnv';

async function createWindow(): Promise<string> {
  const { session } = testEnvironment;
  const handlesBefore = await session.getWindowHandles();
  await session.executeScript(`window.open()`);
  const handlesAfter = await session.getWindowHandles();
  const newHandle = handlesAfter.find((handle: string) => !handlesBefore.includes(handle));

  if (!newHandle) {
    throw new Error('Creating new Window was not successful');
  }

  await session.switchToWindow(newHandle);

  return newHandle;
}

describe('Command Contexts', () => {
  describe('getWindowHandle', () => {
    it('return the current window handle', async () => {
      const { session } = testEnvironment;
      const handle = await session.getWindowHandle();
      expect(handle).toMatch(/[a-zA-z0-9-]{2,}/)
    });
  });

  describe('closeWindow', () => {
    it('closes current browsing context', async () => {
      const { session } = testEnvironment;
      const initialHandle = await session.getWindowHandle();
      const handlesBefore = await session.getWindowHandles();
      const newHandle = await createWindow();
      await session.closeWindow();
      const handlesAfter = await session.getWindowHandles();
      expect(handlesAfter).toEqual(handlesBefore);
      expect(handlesAfter).not.toContain(newHandle);
      await session.switchToWindow(initialHandle);
    });
  });

  describe('switchToWindow', () => {
    it('Switches to different browsing context', async () => {
      const { session } = testEnvironment;
      const initialHandle = await session.getWindowHandle();
      expect(await session.getTitle()).not.toEqual('');
      const handle = await createWindow();
      await session.switchToWindow(handle);
      expect(await session.getTitle()).toEqual('');
      await session.closeWindow();
      await session.switchToWindow(initialHandle);
    });

    it('throws no such window Error if called with not existing handle', async () => {
      const { session } = testEnvironment;
      let errorMessage;
      try {
        await session.switchToWindow('not existing handle');
      } catch (e) {
        if (e instanceof Error) {
          errorMessage = e.message;
        }
      }
      expect(errorMessage).toContain('WebDriverError(no such window)');
    });
  });

  describe('switchToFrame', () => {
    it('switches browsing context to iframe specified by Element', async () => {
      const { session } = testEnvironment;
      const iframe = await session.findElement('css selector', 'iframe');
      await session.switchToFrame(iframe);
      const paragraph = await session.findElement('css selector', 'p');
      expect(await paragraph.getText()).toEqual('The content of the iframe');
    });

    it('switches to top-level browsing context if null is provided', async () => {
      const { session } = testEnvironment;
      await session.switchToFrame(await session.findElement('css selector', 'iframe'));
      expect(await session.getPageSource()).not.toContain('<iframe');
      // tslint:disable-next-line: no-null-keyword
      await session.switchToFrame(null);
      expect(await session.getPageSource()).toContain('<iframe');
    });
  });

  describe('switchToParentFrame', () => {
    it('switches to parent browsing context ', async () => {
      const { session } = testEnvironment;
      await session.switchToFrame(await session.findElement('css selector', 'iframe'));
      expect(await session.getPageSource()).not.toContain('<iframe');
      // tslint:disable-next-line: no-null-keyword
      await session.switchToParentFrame();
      expect(await session.getPageSource()).toContain('<iframe');
    });
  });

  describe('getWindowHandles', () => {
    it('return all window handles', async () => {
      const { session } = testEnvironment;
      const handles = await session.getWindowHandles();
      expect(handles).toHaveLength(1);
      expect(handles[0]).toMatch(/[a-zA-z0-9-]{2,}/)
    });
  });

  describe('getWindowRect/maximizeWindow method', () => {
    it('validates window rect before and after maximizing the window', async () => {
      const { session, driver } = testEnvironment;

      if (driver.host === WebDriverHost.BrowserStack) {
        return;
      }

      const rectBeforeMax = await session.getWindowRect();

      await session.maximizeWindow();

      const rectAfterMax = await session.getWindowRect();
      expect(rectBeforeMax).not.toEqual(rectAfterMax);
    });
  });

  describe('setWindowRect method', () => {
    it('set current window to specified rect', async () => {
      const { session } = testEnvironment;
      const testRect = { x: 9, y: 9, width: 520, height: 520 }

      await session.setWindowRect(testRect);

      const rectAfterMax = await session.getWindowRect();
      expect(rectAfterMax).toEqual(testRect);
    });
  });

  describe('minimizeWindow method', () => {
    it('minimizes the current window', async () => {
      const { session, browser } = testEnvironment;
      if ([Browser.Safari].includes(browser)) {
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
      const { session, browser } = testEnvironment;

      if ([Browser.Safari].includes(browser)) {
        return;
      }
      const rectBeforeFull = await session.getWindowRect();

      await session.fullScreenWindow();

      const rectAfterFull = await session.getWindowRect();
      expect(rectBeforeFull).not.toEqual(rectAfterFull);
    });
  });

});
