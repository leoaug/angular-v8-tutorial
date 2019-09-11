import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarTarefaComponent } from './salvar-tarefa.component';

describe('SalvarTarefaComponent', () => {
  let component: SalvarTarefaComponent;
  let fixture: ComponentFixture<SalvarTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvarTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
