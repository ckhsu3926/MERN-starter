import { Pencil as PencilInterface } from '../types/pencil'
import PencilModel from '../models/pencil'

interface PencilRepo {
  getPencils(): Promise<Array<PencilInterface>>
  getPencilById(id: String): Promise<PencilInterface | null>
  addPencil(pencil: PencilInterface): Promise<PencilInterface>
  updatePencil(id: String, pencil: PencilInterface): Promise<PencilInterface | null>
  deletePencil(id: String): Promise<PencilInterface | null>
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

  async updatePencil(id: string, pencil: PencilInterface): Promise<PencilInterface | null> {
    return PencilModel.findByIdAndUpdate(id, pencil, { new: true })
  }

  async deletePencil(id: String): Promise<PencilInterface | null> {
    return PencilModel.findByIdAndDelete(id)
  }
}

export { PencilRepoImpl }
