import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowItemsDialogComponent } from './show-items-dialog.component';

describe('ShowItemsDialogComponent', () => {
  let component: ShowItemsDialogComponent;
  let fixture: ComponentFixture<ShowItemsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowItemsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowItemsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
