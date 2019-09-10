import { TestBed } from '@angular/core/testing';

import { NotasService } from './notas.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NotePost } from 'src/app/modelos/note.post.model';

describe('NotasService', () => {
  let service: NotasService;
  let httpMock: HttpTestingController;

  const RespuestaServicioOk = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(NotasService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar notas', () => {
    service.listar().subscribe(
      resp => {
        expect(resp).toBeTruthy();
      });
    const request = httpMock.expectOne(_ => true);
    request.flush([]);
    expect(request.request.method).toEqual('GET');
  });

  it('deberia crear una  nota', () => {
    service.crearNota({} as NotePost).subscribe(
      resp => {
        expect(resp).toBeTruthy();
      });
    const request = httpMock.expectOne(_ => true);
    request.flush([]);
    expect(request.request.method).toEqual('POST');
  });

  it('deberia eliminar una  nota', () => {
    service.eliminar('id').subscribe(
      resp => {
        expect(resp).toBeTruthy();
      });
    const request = httpMock.expectOne(_ => true);
    request.flush([]);
    expect(request.request.method).toEqual('DELETE');
  });

  it('deberia obtener una  nota', () => {
    service.obtenerSegunId('id').subscribe(
      resp => {
        expect(resp).toBeTruthy();
      });
    const request = httpMock.expectOne(_ => true);
    request.flush([]);
    expect(request.request.method).toEqual('GET');
  });
});
