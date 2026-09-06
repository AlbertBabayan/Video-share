export interface IElement {
  id: number,
  name: string,
  username: string,
  duration: string,
  size: string,
  lastModifiedDate: Date,
  record: string | ArrayBuffer | null;
  completed: boolean;
}
