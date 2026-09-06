import {IItemLog} from './itemLog.interface';

export interface IElementItem<T = IItemLog> {
  data: T;
}
