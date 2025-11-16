import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listagem } from './listagem.component';

describe('Listagem', () => {
  let component: Listagem;
  let fixture: ComponentFixture<Listagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listagem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listagem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
