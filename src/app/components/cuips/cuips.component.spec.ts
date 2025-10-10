import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuipsComponent } from './cuips.component';

describe('CuipsComponent', () => {
  let component: CuipsComponent;
  let fixture: ComponentFixture<CuipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuipsComponent]
    });
    fixture = TestBed.createComponent(CuipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
