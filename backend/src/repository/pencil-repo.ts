import { Pencil as PencilInterface } from '../types/pencil'
import PencilModel from '../models/pencil'

interface PencilRepo {
  getPencils(): Promise<Array<PencilInterface>>
}

class PencilRepoImpl implements PencilRepo {
  private constructor() {}

  static of(): PencilRepoImpl {
    return new PencilRepoImpl()
  }

  async getPencils(): Promise<PencilInterface[]> {
    return PencilModel.find()
  }
}

export { PencilRepoImpl }
