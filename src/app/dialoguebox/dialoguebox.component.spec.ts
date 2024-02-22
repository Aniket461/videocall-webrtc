import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueboxComponent } from './dialoguebox.component';

describe('DialogueboxComponent', () => {
  let component: DialogueboxComponent;
  let fixture: ComponentFixture<DialogueboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogueboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
