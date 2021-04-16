import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormnuovoprodottoComponent } from './formnuovoprodotto.component';

describe('FormnuovoprodottoComponent', () => {
  let component: FormnuovoprodottoComponent;
  let fixture: ComponentFixture<FormnuovoprodottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormnuovoprodottoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormnuovoprodottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
