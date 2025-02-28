import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewTaskPage } from './create-new-task.page';

describe('CreateNewTaskPage', () => {
  let component: CreateNewTaskPage;
  let fixture: ComponentFixture<CreateNewTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
