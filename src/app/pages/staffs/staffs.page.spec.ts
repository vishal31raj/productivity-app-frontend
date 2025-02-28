import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffsPage } from './staffs.page';

describe('StaffsPage', () => {
  let component: StaffsPage;
  let fixture: ComponentFixture<StaffsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
