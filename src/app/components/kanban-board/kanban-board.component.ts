import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import { BoardService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';



@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskCardComponent, FormsModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10%)', opacity: 0 }),
        animate('50ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-10%)', opacity: 0 }))
      ])
    ]),
    trigger('columnExpand', [
      state('expanded', style({
        height: '*',  // This will make it adapt to content
        opacity: 1
      })),
      state('collapsed', style({
        height: '90px',
        opacity: 0.8
      })),
      transition('expanded <=> collapsed', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('contentFade', [
      state('expanded', style({ opacity: 1 })),
      state('collapsed', style({ opacity: 0 })),
      transition('expanded <=> collapsed', [
        animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class KanbanBoardComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  columnStates = {
    todo: 'expanded',
    inProgress: 'expanded',
    done: 'expanded'
  };

  toggleColumn(column: 'todo' | 'inProgress' | 'done') {
    this.columnStates[column] = 
      this.columnStates[column] === 'expanded' ? 'collapsed' : 'expanded';
  }

  private readonly HEADER_HEIGHT = 90;
  private readonly MIN_HEIGHT = 90;
  private readonly PADDING = 16;

  @ViewChildren('taskList') taskLists!: QueryList<ElementRef>;
  @ViewChildren('columnContent') columnContents!: QueryList<ElementRef>;

  getColumnHeight(column: 'todo' | 'inProgress' | 'done'): number {
    const columnElement = this.columnContents?.find((el, index) => {
      switch (index) {
        case 0: return column === 'todo';
        case 1: return column === 'inProgress';
        case 2: return column === 'done';
        default: return false;
      }
    });

    if (!columnElement || this.columnStates[column] === 'collapsed') {
      return this.MIN_HEIGHT;
    }

    const taskList = columnElement.nativeElement.querySelector('.task-list');
    if (!taskList) {
      return this.MIN_HEIGHT;
    }

    const taskListHeight = taskList.scrollHeight;
    return this.HEADER_HEIGHT + taskListHeight + this.PADDING;
  }

  // Controle dos Modais
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  // Task sendo editada
  editingTask: Partial<Task> = {};
  editTag: string = '';

  // Nova Task
  newTask: Partial<Task> = {
    title: '',
    description: '',
    priority: 'low',
    assignee: '',
    dueDate: new Date(),
    tags: []
  };
  tag: string = '';

  constructor(
    private taskService: TaskService,
    private boardService: BoardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const boardId = params['id'];
      // Se não houver ID, assume que é o board antigo (id: '1')
      const actualBoardId = boardId || '1';
      const board = this.boardService.getBoardById(actualBoardId);
      if (board) {
        this.todo = board.tasks.todo;
        this.inProgress = board.tasks.inProgress;
        this.done = board.tasks.done;
      }
    });
  }

  // Função para salvar as tasks no serviço
  saveTasks() {
    const boardId = this.route.snapshot.params['id'] || '1';
    const board = this.boardService.getBoardById(boardId);
    if (board) {
      board.tasks = {
        todo: this.todo,
        inProgress: this.inProgress,
        done: this.done
      };
      this.boardService.saveBoard(board);
    }
  }

  // Função para lidar com o drop de drag and drop
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Atualiza o status da task movida
      const movedTask = event.container.data[event.currentIndex];
      switch (event.container.id) {
        case 'todoList':
          movedTask.status = 'todo';
          break;
        case 'inProgressList':
          movedTask.status = 'inProgress';
          break;
        case 'doneList':
          movedTask.status = 'done';
          break;
        default:
          break;
      }
    }
    this.saveTasks();
  }

  // Função para deletar uma task
  deleteTask(task: Task) {
    this.todo = this.todo.filter(t => t.id !== task.id);
    this.inProgress = this.inProgress.filter(t => t.id !== task.id);
    this.done = this.done.filter(t => t.id !== task.id);
    this.saveTasks();
  }


  // Função para abrir o modal de adição
  openAddModal() {
    this.isAddModalOpen = true;
    this.newTask = {
      title: '',
      description: '',
      priority: 'low',
      assignee: '',
      dueDate: new Date(),
      tags: []
    };
    this.tag = '';
  }

  // Função para fechar o modal de adição
  closeAddModal() {
    this.isAddModalOpen = false;
    this.newTask = {};
    this.tag = '';
  }

  // Função para salvar uma nova task
  saveTask() {
    if (!this.newTask.title?.trim() || !this.newTask.assignee?.trim() || !this.newTask.dueDate) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const task: Task = {
      id: this.generateUniqueId(),
      title: this.newTask.title.trim(),
      description: this.newTask.description?.trim() || '',
      priority: this.newTask.priority as 'low' | 'medium' | 'high',
      status: 'todo',
      createdAt: new Date(),
      dueDate: new Date(this.newTask.dueDate),
      assignee: this.newTask.assignee.trim(),
      tags: this.newTask.tags || []
    };

    this.todo.push(task);
    this.saveTasks();
    this.closeAddModal();
  }

  // Função para adicionar uma tag na criação
  addTag() {
    const newTag = this.tag.trim();
    if (newTag && !this.newTask.tags?.includes(newTag)) {
      this.newTask.tags = this.newTask.tags ? [...this.newTask.tags, newTag] : [newTag];
    }
    this.tag = '';
  }

  // Função para remover uma tag na criação
  removeTag(tagToRemove: string) {
    if (this.newTask.tags) {
      this.newTask.tags = this.newTask.tags.filter(tag => tag !== tagToRemove);
    }
  }

  // Função para lidar com o evento de edição emitido pelo TaskCardComponent
  editTask(task: Task) {
    this.editingTask = { ...task };
    this.isEditModalOpen = true;
    this.editTag = '';
  }

  // Função para salvar as alterações da task editada
  saveEdit() {
    if (
      !this.editingTask.title?.trim() ||
      !this.editingTask.assignee?.trim() ||
      !this.editingTask.dueDate
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const updatedTask: Task = {
      id: this.editingTask.id!,
      title: this.editingTask.title.trim(),
      description: this.editingTask.description?.trim() || '',
      priority: this.editingTask.priority as 'low' | 'medium' | 'high',
      status: this.editingTask.status as 'todo' | 'inProgress' | 'done',
      createdAt: this.editingTask.createdAt!,
      dueDate: new Date(this.editingTask.dueDate),
      assignee: this.editingTask.assignee.trim(),
      tags: this.editingTask.tags || []
    };

    // Atualiza a task na lista correspondente
    switch (updatedTask.status) {
      case 'todo':
        this.todo = this.todo.map(t => (t.id === updatedTask.id ? updatedTask : t));
        break;
      case 'inProgress':
        this.inProgress = this.inProgress.map(t => (t.id === updatedTask.id ? updatedTask : t));
        break;
      case 'done':
        this.done = this.done.map(t => (t.id === updatedTask.id ? updatedTask : t));
        break;
      default:
        break;
    }

    this.saveTasks();
    this.closeEditModal();
  }

  // Função para fechar o modal de edição
  closeEditModal() {
    this.isEditModalOpen = false;
    this.editingTask = {};
    this.editTag = '';
  }

  // Função para adicionar uma tag na edição
  addEditTag() {
    const newTag = this.editTag.trim();
    if (newTag && !this.editingTask.tags?.includes(newTag)) {
      this.editingTask.tags = this.editingTask.tags ? [...this.editingTask.tags, newTag] : [newTag];
    }
    this.editTag = '';
  }

  // Função para remover uma tag na edição
  removeEditTag(tagToRemove: string) {
    if (this.editingTask.tags) {
      this.editingTask.tags = this.editingTask.tags.filter(tag => tag !== tagToRemove);
    }
  }

  // Função para gerar um ID único
  private generateUniqueId(): string {
    return Date.now().toString();
  }
}