import { Task, TaskNoId } from '../../model/task';
import { Repository } from '../../services/repository';

export class ApiTasksRepository implements Repository<Task> {
  urlBase: string;
  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  async getAll(): Promise<Task[]> {
    const response = await fetch(this.urlBase);
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async get(id: number): Promise<Task> {
    const url = this.urlBase + '/' + id;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async create(item: TaskNoId): Promise<Task> {
    const response = await fetch(this.urlBase, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async update(id: number, item: Partial<Task>): Promise<Task> {
    const url = this.urlBase + '/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async delete(id: number): Promise<void> {
    const url = this.urlBase + '/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}
