/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GrafikComponent } from './grafik.component';

describe('GrafikComponent', () => {
  let component: GrafikComponent;
  let fixture: ComponentFixture<GrafikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
