import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Note } from './modelos/note.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotasService } from './servicios/notas/notas.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    notasServiceSpy.listar.and.returnValue(of(RespuestaNota));
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('eliminar Nota', () => {
    notasServiceSpy.eliminar.and.returnValue(of(RespuestaServicioOk));
    component.deleteNote('id');
    expect(notasServiceSpy.listar).toHaveBeenCalled();
  });

  it('deberia cerrar modal', () => {
    component.dismiss();
    expect(notasServiceSpy.listar).toHaveBeenCalled();
  });

  it('deberia abrir modal para ver detalles ', () => {
    component.verDetalle('1');
    expect(component.idNote).toBe('1');
  });
});
