import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistsListPage } from './checklists-list.page';

describe('ChecklistsListPage', () => {
  let component: ChecklistsListPage;
  let fixture: ComponentFixture<ChecklistsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
