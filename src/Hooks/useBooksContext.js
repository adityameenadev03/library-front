import { BooksContext } from "../Context/BooksContext"
import { useContext } from "react"

export const useBooksContext = () => {
  const context = useContext(BooksContext)

  if(!context) {
    throw Error('BooksContext must be used inside a BooksProvider')
  }

  return context
}