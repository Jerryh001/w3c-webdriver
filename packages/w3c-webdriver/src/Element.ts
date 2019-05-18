import { GET, POST } from './rest';

const WEB_ELEMENT_IDENTIFIER = 'element-6066-11e4-a52e-4f735466cecf';

type WebElement = {
  'element-6066-11e4-a52e-4f735466cecf': string
}

/**
 * This object represents a WebDriver element.
 */
export class Element {
  private readonly host: string;
  private readonly sessionId: string;
  private readonly elementId: string;

  constructor(host: string, sessionId: string, elementId: string) {
    this.host = host;
    this.sessionId = sessionId;
    this.elementId = elementId;
  }

  /**
   * Get WebElement object of current instance
   */
  public getWebElement(): WebElement {
    return { [WEB_ELEMENT_IDENTIFIER]: this.elementId };
  }

  /**
   * Send a sequence of key strokes to an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-send-keys|WebDriver spec}
   * @example
   * const input = await session.findElement('css selector', '[name="first-name"]');
   * await input.sendKeys('Hello World');
   */
  public async sendKeys(text: string): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/element/${this.elementId}/value`, { text });
  }

  /**
   * Click on an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-click|WebDriver spec}
   * @example
   * const submitButton = await session.findElement('css selector', 'button[type="submit"]');
   * await submitButton.click();
   */
  public async click(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/element/${this.elementId}/click`, {});
  }

  /**
   * Clear content of an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-clear|WebDriver spec}
   * @example
   * const fieldA = await session.findElement('css selector', '#a');
   * await submitButton.clear();
   */
  public async clear(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/element/${this.elementId}/clear`, {});
  }

  /**
   * Returns the visible text for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-text|WebDriver spec}
   * @example
   * const result = await session.findElement('css selector', '#result');
   * const text = await result.getText();
   */
  public async getText(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/element/${this.elementId}/text`);
  }

  /**
   * Returns the computed value of the given CSS property for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-css-value|WebDriver spec}
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getCss('background-color');
   * // backgroundColor = 'rgba(255, 0, 0, 1)'
   */
  public async getCss(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/css/${propertyName}`
    );
  }

  /**
   * Returns the Attribute of a Element
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-attribute|WebDriver spec}
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getAttribute('css');
   */
  public async getAttribute(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/attribute/${propertyName}`
    );
  }

  /**
   * Returns the Attribute of a Element
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-attribute|WebDriver spec}
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getProperty('class');
   */
  public async getProperty(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/property/${propertyName}`
    );
  }

  /**
   * Returns the tagName of a Element
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-tag-name|WebDriver spec}
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getTagName();
   */
  public async getTagName(): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/name`
    );
  }

}
