import { TestBed } from '@angular/core/testing';

import { GetTasksDetailsService } from './get-tasks-details.service';

describe('GetTasksDetailsService', () => {
  let service: GetTasksDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTasksDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
