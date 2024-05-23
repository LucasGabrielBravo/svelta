export interface IEntity {
  id: string,
  created: Date,
  updated: Date,
}

export interface ICreateEntityProps extends Omit<Partial<IEntity>, "created" | "updated"> {
  created?: Date | string,
  updated?: Date | string,
}

export function createEntity(props: ICreateEntityProps): IEntity {
  let created = new Date()
  let updated = new Date()

  if(props.created){
    created = new Date(props.created)
  }

  if(props.updated){
    updated = new Date(props.updated)
  }  

  return {
    id: props.id || (Math.floor(Math.random() * (10 ** 10)) + (10 ** 10)).toString(36),
    created: created,
    updated: updated,
  }
}