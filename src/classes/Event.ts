export default class Event {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }

  public async run(..._args: any[]): Promise<void> {
    throw new Error(
      `The run method has not been implemented by ${this.name} | ${_args}`
    );
  }
}
