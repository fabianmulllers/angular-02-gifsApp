import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private gifService: GifsService) { }

  get historial(){
    return this.gifService.historial;
  }

  buscar(busqueda: string){
    this.gifService.buscarGifs(busqueda);
  }
}
