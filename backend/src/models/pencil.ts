import { model, Schema } from 'mongoose'
import { Pencil } from '../types/pencil'

const pencilSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: 'defaultColor'
    }
  },
  {
    timestamps: true
  }
)

export default model<Pencil>('Pencil', pencilSchema)
