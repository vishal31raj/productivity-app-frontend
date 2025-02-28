import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffsListPage } from './staffs-list.page';

describe('StaffsListPage', () => {
  let component: StaffsListPage;
  let fixture: ComponentFixture<StaffsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
