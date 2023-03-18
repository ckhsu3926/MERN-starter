import { Pencil as PencilInterface } from '../types/pencil'
import PencilModel from '../models/pencil'

interface PencilRepo {
  getPencils(): Promise<Array<PencilInterface>>
  addPencil(pencil: PencilInterface): Promise<PencilInterface>
}

class PencilRepoImpl implements PencilRepo {
  private constructor() {}

  static of(): PencilRepoImpl {
    return new PencilRepoImpl()
  }

  async getPencils(): Promise<PencilInterface[]> {
    return PencilModel.find()
  }

  async addPencil(pencil: PencilInterface): Promise<PencilInterface> {
    return PencilModel.create(pencil)
  }
}

export { PencilRepoImpl }
