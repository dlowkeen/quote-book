import { IDemoData } from '../IDemoData';

export interface IDemoStoreState {
  errorMsg: string;
  demoData: IDemoData;
  loadingDemoData: boolean;
}
