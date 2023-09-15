import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from 'src/app/services/notes.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  @Input() notes: Note[];
}
