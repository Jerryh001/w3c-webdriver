import { IElement } from './core';
import { GET, POST } from './rest';

/**
 * This object represents a WebDriver element.
 */
export class Element implements IElement {
  private readonly url: string;
  private readonly sessionId: string;
  private readonly elementId: string;
  private readonly options: { JsonWire: boolean };

  constructor(url: string, sessionId: string, elementId: string, options: { JsonWire: boolean }) {
    this.url = url;
    this.sessionId = sessionId;
    this.elementId = elementId;
    this.options = options;
  }

  public async sendKeys(text: string): Promise<void> {
    await POST(
      `${this.url}/session/${this.sessionId}/element/${this.elementId}/value`,
      !this.options.JsonWire ? { text } : { value: [text] }
    );
  }

  public async click(): Promise<void> {
    await POST(`${this.url}/session/${this.sessionId}/element/${this.elementId}/click`, {});
  }

  public async getText(): Promise<string> {
    return GET<string>(
      `${this.url}/session/${this.sessionId}/element/${this.elementId}/text`
    );
  }

  public async getCss(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.url}/session/${this.sessionId}/element/${this.elementId}/css/${propertyName}`
    );
  }
}
