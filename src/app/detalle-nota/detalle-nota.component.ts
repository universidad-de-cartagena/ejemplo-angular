import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotePost } from '../modelos/note.post.model';
import { NotasService } from '../servicios/notas/notas.service';
import { Note } from '../modelos/note.model';

@Component({
  selector: 'app-detalle-nota',
  templateUrl: './detalle-nota.component.html',
  styleUrls: ['./detalle-nota.component.css']
})
export class DetalleNotaComponent implements OnInit {

  @Output() dismiss = new EventEmitter();
  noteV: string;
  @Input()
  set idNotaExiste(dataIn: string) {
    this.noteV = dataIn;
    this.ver = true;
    this.inicializarNote();
  }
  constructor(public fb: FormBuilder, public notesService: NotasService) { }

  note = new NotePost();
  exito: boolean;
  ver: boolean;
  formNotes = this.fb.group({
    title: [null, [Validators.required]],
    body: [null, [Validators.required]],
    author: ['Unknown']
  });

  inicializarNote() {
    if (!!this.noteV) {
      this.notesService.obtenerSegunId(this.noteV).subscribe(resp => {
        this.formNotes.controls.title.setValue(resp.title);
        this.formNotes.controls.body.setValue(resp.body);
        this.formNotes.controls.author.setValue(resp.author);
        this.ver = false;
        });
    }
  }

  ngOnInit() {
    this.exito = false;
    this.ver = true;
  }
  cerrar() {
    this.dismiss.emit();
    this.formNotes.reset();
  }

  createComnando() {
    this.note.author = this.formNotes.get('author').value;
    this.note.body = this.formNotes.get('body').value;
    this.note.title = this.formNotes.get('title').value;
    this.notesService.crearNota(this.note).subscribe(resp => {
      this.exito = true;
      this.formNotes.reset();
    });
  }
}
