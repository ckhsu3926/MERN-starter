import { model, Schema } from 'mongoose'
import { Pencil } from '../types/pencil'

const pencilSchema: Schema = new Schema(
  {
    color: {
      type: String,
      default: 'defaultColor'
    }
  },
  {
    timestamps: true
  }
)

pencilSchema.set('toJSON', {
  virtuals: true,
  versionKey: false
})

export default model<Pencil>('Pencil', pencilSchema)
