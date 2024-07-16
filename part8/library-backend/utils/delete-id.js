/**
 * Transform function for removing the `_id` field of a document
 */
export function deleteId(doc, ret) {
  delete ret._id
  return ret
}
