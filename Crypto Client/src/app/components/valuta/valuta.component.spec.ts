import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ValutaComponent } from './valuta.component';

describe('ValutaComponent', () => {
  let component: ValutaComponent;
  let fixture: ComponentFixture<ValutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValutaComponent);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
