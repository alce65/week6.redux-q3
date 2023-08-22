export interface Repository<T extends { id: number | string }> {
  get(_id: T['id']): Promise<T>;
  getAll(): Promise<T[]>;
  create(_item: Omit<T, 'id'>): Promise<T>;
  update(_id: T['id'], _item: Partial<T>): Promise<T>;
  delete(_id: T['id']): Promise<void>;
}
