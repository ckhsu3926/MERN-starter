import { Pencil as PencilInterface } from '../types/pencil'
import PencilModel from '../models/pencil'

interface PencilRepo {
  getPencils(): Promise<Array<PencilInterface>>
  getPencilById(id: String): Promise<PencilInterface | null>
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

  async getPencilById(id: String): Promise<PencilInterface | null> {
    return PencilModel.findById(id)
  }

  async addPencil(pencil: PencilInterface): Promise<PencilInterface> {
    return PencilModel.create(pencil)
  }
}

export { PencilRepoImpl }
