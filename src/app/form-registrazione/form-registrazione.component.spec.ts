import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistrazioneComponent } from './form-registrazione.component';

describe('FormRegistrazioneComponent', () => {
  let component: FormRegistrazioneComponent;
  let fixture: ComponentFixture<FormRegistrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistrazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
