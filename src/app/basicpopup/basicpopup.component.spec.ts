import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicpopupComponent } from './basicpopup.component';

describe('BasicpopupComponent', () => {
  let component: BasicpopupComponent;
  let fixture: ComponentFixture<BasicpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
