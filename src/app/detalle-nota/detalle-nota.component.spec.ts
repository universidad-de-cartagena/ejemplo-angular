import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNotaComponent } from './detalle-nota.component';
import { Note } from '../modelos/note.model';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotasService } from '../servicios/notas/notas.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('DetalleNotaComponent', () => {
  let component: DetalleNotaComponent;
  let fixture: ComponentFixture<DetalleNotaComponent>;

  let notasServiceSpy = null;

  const RespuestaNota = [
    {title: 'Titulo',
      body: 'Cuerpo',
      author: 'autor',
      created_at: 'fecha',
      uuid: 'id344',
    }
  ] as Note[];

  const RespuestaServicioOk = [];
  beforeEach(async(() => {
    notasServiceSpy = jasmine.createSpyObj('NotasService', ['listar', 'crearNota', 'obtenerSegunId', 'eliminar']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule
      ],providers: [
        {provide: NotasService, useValue: notasServiceSpy}
      ],
      schemas:[NO_ERRORS_SCHEMA],
      declarations: [
        DetalleNotaComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    notasServiceSpy.listar.and.returnValue(of(RespuestaNota));
    fixture = TestBed.createComponent(DetalleNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.dismiss, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(component.noteV).toBeFalsy();
  });

  it('nota existe', () => {
    notasServiceSpy.obtenerSegunId.and.returnValue(of(RespuestaServicioOk));
    component.noteV = '1';
    component.inicializarNote();
    expect(component.ver).toBeFalsy();
  });

  it('nota no existe', () => {
    expect(component.ver).toBeTruthy();
  });

  it('cerrar modal', () => {
    component.cerrar();
    expect(component.dismiss.emit).toHaveBeenCalled();
  });

  it('Crear Nota', () => {
    notasServiceSpy.crearNota.and.returnValue(of(RespuestaNota[0]));
    component.note = RespuestaNota[0];
    component.formNotes.controls.title.setValue('titulo');
    component.formNotes.controls.body.setValue('body');
    component.formNotes.controls.author.setValue('author');
    component.createComnando();
    expect(component.note).toBeTruthy();
    expect(component.exito).toBeTruthy();
  });
});
