import { CurrentWorker } from './current-worker';
import { PossibleWorker } from './possible-worker';

export interface TaskDetail {
  name: string;
  createdOn: string;
  possibleWorkers: PossibleWorker[];
  currentWorker: CurrentWorker;
  workerOrderingScheme: number;
  history: any[];
  id: number;
}
