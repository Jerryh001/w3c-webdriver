// tslint:disable
declare module 'geckodriver' {
  export const path: string;
}

declare module 'iedriver' {
  export const path: string;
}

declare module 'browserstack-local' {
  interface LocalStartOptions {
    key: string;
  }

  export class Local {
    start: (options: LocalStartOptions, callback: Function) => void;
    stop: (callback: Function) => void;
  }
}

declare namespace jasmine {
  class JestEnvironment {
    addReporter(reporter: any): void;
  }

  function getEnv(): JestEnvironment;
  let testPath: string;
}
