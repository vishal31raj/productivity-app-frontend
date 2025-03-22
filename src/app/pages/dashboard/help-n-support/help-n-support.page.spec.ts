import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpNSupportPage } from './help-n-support.page';

describe('HelpNSupportPage', () => {
  let component: HelpNSupportPage;
  let fixture: ComponentFixture<HelpNSupportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpNSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
