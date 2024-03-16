import { useState } from "react"

type NewBookForm = {
  onSubmit: (newItem: string) => void
}

export function NewBookForm(props: NewBookForm) {
  const [newItem, setNewItem] = useState('')
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (newItem === '') return
    props.onSubmit(newItem)

    setNewItem('')
  }
  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="form-row">Add new book</label>
        <input 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
          type="text"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}