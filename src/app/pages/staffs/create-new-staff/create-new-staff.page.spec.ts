import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewStaffPage } from './create-new-staff.page';

describe('CreateNewStaffPage', () => {
  let component: CreateNewStaffPage;
  let fixture: ComponentFixture<CreateNewStaffPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
