import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistDetailsPage } from './checklist-details.page';

describe('ChecklistDetailsPage', () => {
  let component: ChecklistDetailsPage;
  let fixture: ComponentFixture<ChecklistDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
