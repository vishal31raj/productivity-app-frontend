import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewChecklistPage } from './create-new-checklist.page';

describe('CreateNewChecklistPage', () => {
  let component: CreateNewChecklistPage;
  let fixture: ComponentFixture<CreateNewChecklistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewChecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
